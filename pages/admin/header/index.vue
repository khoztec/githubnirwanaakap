<template>
    <section>
        <v-container grid-list-lg fluid>
        <v-layout row justify-center>
            <v-dialog v-model="adddialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                <span class="headline">Tambah Header</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-flex xs12 sm6 d-flex>
                                <v-select
                                :items="bagian"
                                label="Halaman"
                                box
                                required
                                ></v-select>
                            </v-flex>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="slogan_header"
                                box
                                label="Slogan"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <input type="file" name="image" :src="image" @change="onFileChange">
                            <img :src="image" width="100%"/>
                        </v-flex>
                    </v-layout>
                </v-container>
                <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="adddialog = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="addData">Save</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-layout>
        <v-card dark color="light-blue darken-4">
            <v-card-title class="headline font-weight-bold">
                Header
            </v-card-title>
        </v-card>
        <v-card color="blue-grey lighten-4">
            <v-card-title class="headline font-weight-bold">
            <v-btn large block color="primary" @click="adddialog = true">
                Tambah
            </v-btn>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
            </v-card-title>
            <v-data-table
            :headers="headers"
            :items="header"
            :search="search"
            >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.judul_header }}</td>
                <td>{{ props.item.slogan_header }}</td>
                <td style="padding:10px 0px"><img :src=props.item.image height="80px"></td>
                <td>
                    <v-layout row justify-center>
                        <v-btn small fab color="warning" @click="$router.push('/admin/header/'+ props.item.id)"><v-icon small>search</v-icon></v-btn>
                        <v-dialog max-width="600" v-model="editdialog">
                        <v-tooltip slot="activator" left>
                            <v-btn color="success" fab small dark slot="activator" @click="editData(props.item)">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                                <span>edit</span>
                            </v-tooltip>
                                <div class="hidden-sm-and-down">Edit</div>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Edit Header</span>
                                </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-text-field label="Seat" required v-model="judul_header"></v-text-field>
                                            <v-text-field label="Seat" required v-model="slogan_header"></v-text-field>
                                            <input type="file" name="image" :src="image" @change="onFileChange2">
                                            <img :src="image" width="100%"/>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" flat @click.native="editdialog = false">Close</v-btn>
                                <v-btn color="blue darken-1" flat @click.native="editdialog= false, updateData()">Save</v-btn>
                            </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog max-width="600" v-model="deletedialog">
                        <v-btn small fab color="error" slot="activator" @click="onDelHeader(props.item)"><v-icon small>mdi-delete</v-icon>
                        </v-btn>
                            <v-card>
                            <v-card-title class="headline">Delete Header ?</v-card-title>
                            <v-card-text>Seat : {{onDel.judul_header}}</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" flat="flat" @click.native="deletedialog = false">Cancel</v-btn>
                                <v-btn color="red darken-4" flat="flat" @click.native="deletedialog = false, deleteheader()">Delete</v-btn>
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
        </v-card>
        </v-container>
    </section>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import {auth,db2} from '@/services/fireinit.js'
  import FileUpload from 'vue-upload-component'
  import firebase, {storageRef} from '@/services/fireinit.js'
  const headerRef = db2.collection('header');
  export default {
    layout: 'admin',
    computed: {
      header : function (){
        return this.$store.getters['headerStore/activeHeader']
      }
    },
    data() {
      return {
        search: '',
        image: '',
        url: '',
        imageUrl: '',
        imageName: '',
        judul_header:'',
        slogan_header:'',
        image: '',
        deletedialog: false,
        editdialog: false,
        showdialog: false,
        adddialog: false,
        headers: [
          { text: 'Judul Header', value: 'judul_header' },
          { text: 'Slogan', value: 'slogan_header' },
          { text: 'Image', value: 'image' },
          { text: 'Actions', value: '' }
        ],
        bagian: [
            'Profil', 'Kontak', 'Armada', 'Reservasi'
        ],
        nameRules: [
        v => !!v || 'Name is required',
        ],
        editItem : {
          judul_header:'',
          slogan_header:'',
          desc_header:'',
          image: ''
        },
        onDel: {
          id : '',
          slogan_header:'',
          judul_header:'',
          image: ''
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
         this.$store.dispatch('headerStore/actionListHeader')
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
            return;
            this.createImage(files[0]);
            // console.log(e)
        },
        onFileChange2(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
            return;
            this.editImage(files[0]);
            // console.log(e)
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
        editImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;
            reader.onload = (e) => {
                vm.editData.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        removeImage: function (e) {
            this.image = '';
        },
        addData()   {
            var newItem = {
            'judul_header': this.judul_header,
            'slogan_header': this.slogan_header,
            'desc_header': this.desc_header,
            'image': this.image,
            'url'  : this.url
            }
            this.$store.dispatch('headerStore/actionSaveHeader', newItem).
            then(()=>   {
                this.adddialog = false
                })
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
        onDelHeader(items) {
            // console.log(items)
            this.onDel.id = items.id
            this.onDel.judul_header = items.judul_header
            this.onDel.slogan_header = items.slogan_header
            this.onDel.image = items.image            
        },
        deleteheader() {
            this.$store.dispatch('headerStore/actionDeleteHeader', this.onDel)
        },
        editData(data){
            var self = this
            self.editItem.id = data.id
            self.editItem.judul_header = data.judul_header
            self.editItem.slogan_header = data.slogan_header
            self.editItem.image = data.image

        },
        updateData(){
            var newItem3 = {
            'judul_header': this.judul_header,
            'slogan_header': this.slogan_header,
            'desc_header': this.desc_header,
            'image': this.image,
            'url'  : this.url
            }
            this.$store.dispatch('headerStore/actionUpdateHeader', newItem3)
        }
    }
  }
</script>