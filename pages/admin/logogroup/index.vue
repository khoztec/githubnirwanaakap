<template>
    <section>
        <v-container grid-list-lg fluid>
        <v-layout row wrap justify-center>
            <v-flex xs12>
            <v-dialog v-model="adddialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Tambah Logo</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field
                                v-model="nama_logo"
                                box
                                label="Nama Logo"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                            <img :src="image" width="310px"/>
                            <!-- <v-btn label="Select Image" @click='pickFile' v-model='image'  prepend-icon='attach_file'></v-btn> -->
                            <input type="file" name="image" :src="image" @change="onFileChange">
                            <span @click="removeImage" style="color:red">Remove image</span>
                        </v-flex>
                        <v-flex xs12>
                            <img :src="image" width="100%" v-if="imageUrl"/>
                        </v-flex>
                    </v-layout>
                </v-container>
                </v-card-text>
                <v-card-text>
                    {{url}}
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="adddialog = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="inputFile2()">Save</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
            </v-flex>
            <v-flex xs12>
        <v-card color="light-blue lighten-4">
            <v-card-title class="headline font-weight-bold">
                Group Logo
            </v-card-title>
        </v-card>
        <v-card color="blue-grey lighten-4">
            <v-card-title class="headline font-weight-bold">
            <v-btn large block color="primary" @click="adddialog = true">
                Tambah Logo
            </v-btn>
            </v-card-title>
        </v-card>
        <v-data-table
            :headers="headers"
            :items="logogroup"
            :search="search"
            >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.nama_logo }}</td>
                <td style="padding:20px 10px">
                    <img :src="props.item.image" height="75px">
                </td>
                <td>
                    <v-layout row justify-center>
                        <v-dialog max-width="600" v-model="deletedialog">
                        <v-btn small fab color="error" slot="activator" @click="onDelLogo(props.item)"><v-icon small>mdi-delete</v-icon>
                        </v-btn>
                            <v-card>
                            <v-card-title class="headline">Delete Bagian ?</v-card-title>
                            <v-card-text>Judul : {{onDel.nama_logo}}</v-card-text>
                            <v-card-text>Isi : {{onDel.url}}</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" flat="flat" @click.native="deletedialog = false">Cancel</v-btn>
                                <v-btn color="red darken-4" flat="flat" @click.native="deletedialog = false, deletelogo()">Delete</v-btn>
                            </v-card-actions>
                            </v-card>
                        </v-dialog>
                        </v-layout>
                </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
            </v-data-table>
            </v-flex>
 
        </v-layout>
        </v-container>
    </section>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import {auth,db2} from '@/services/fireinit.js'
  import FileUpload from 'vue-upload-component'
  import firebase, {storageRef} from '@/services/fireinit.js'
  const logogroupRef = db2.collection('logogroup');
  export default {
    layout: 'admin',
    components: {
    FileUpload,
    },
    computed: {
      logogroup : function (){
        return this.$store.getters['logogroupStore/activeLogogroup']
      }
    },
    data() {
      return {
        search: '',
        image: '',
        url: '',
        nama_logo: '',
        imageUrl: '',
        imageName: '',
        deletedialog: false,
        editdialog: false,
        showdialog: false,
        adddialog: false,
        headers: [
          { text: 'Nama Logo', value: 'nama_logo' },
          { text: 'Image', value: 'image' },
          { text: 'Actions', value: '' }
        ],
        pagination: {
            rowsPerPage: 1,
        },
        nameRules: [
        v => !!v || 'Name is required',
        ],
        newItem : {
            nama_logo: '',
            url: ''
        },
        editItem : {
          nama_logo:''
        },
        onDel: {
          id : '',
          nama_logo:'',
          url: ''
        },
        detailurl: {
          id : '',
        },
        files: []
      }
    },
    mounted(){
        this.listData()
    },
    methods: {
    listData()  {
         this.$store.dispatch('logogroupStore/actionListLogogroup')
    },  
    onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImage(files[0]);
        console.log(e)
    },
    onDelLogo(items) {
        console.log(items)
        this.onDel.id = items.id
        this.onDel.nama_logo = items.nama_logo
        this.onDel.url = items.url
    },
    deletelogo() {
         this.$store.dispatch('logogroupStore/actionDeleteLogogroup', this.onDel)
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    removeImage: function (e) {
      this.image = '';
    },
    
    inputFile(newFile, oldFile) {
            var self = this
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            var imagesRef = storageRef.child('images/'+text);

            imagesRef.putString(this.image, 'data_url').then(function(snapshot) {
                imagesRef.getDownloadURL().then(function(url) {
                self.url = url
                })
        })
    },
    inputFile2()  {
        var newItem2 = {
            'nama_logo': this.nama_logo,
            'image': this.image,
            'url'  : this.url
        }
        this.$store.dispatch('logogroupStore/actionInputFile', newItem2).
        then(()=>   {
            this.adddialog = false
        })
        },
    addData()   {
        var newItem2 = {
            'nama_logo': this.nama_logo,
            'image': this.url,
        }
        console.log(newItem2)
        this.$store.dispatch('logogroupStore/actionSaveLogogroup', newItem2)
        }
    }
  }
</script>