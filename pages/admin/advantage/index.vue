<template>
    <section>
        <v-container grid-list-lg fluid>
        <v-layout row justify-center>
            <v-dialog v-model="adddialog" persistent max-width="800px">
            <v-card>
                <v-card-title>
                    <span class="headline">Tambah Advantage</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs8>
                                <v-text-field
                                    v-model="nama_advantage"
                                    box
                                    label="Nama Advantage"
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
        <v-card color="light-blue lighten-4">
            <v-card-title class="headline font-weight-bold">
                Advantage
            </v-card-title>
        </v-card>
        <v-card dark color="light-blue darken-4">
            <v-card-title class="headline font-weight-bold">
            <v-btn color="primary" @click="adddialog = true">
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
            :items="advantage"
            :search="search"
            >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.nama_advantage }}</td>
                <td>{{ props.item.created_at }}</td>
                <td>
                    <v-layout row justify-center>
                        <v-dialog max-width="600" v-model="deletedialog">
                        <v-btn small fab color="error" slot="activator" @click="onDelAdvantage(props.item)"><v-icon small>mdi-delete</v-icon>
                        </v-btn>
                            <v-card>
                            <v-card-title class="headline">Delete Advantage ?</v-card-title>
                            <v-card-text>Advantage : {{onDel.nama_advantage}}</v-card-text>
                            <v-card-text>Seat : {{onDel.penulis_advantage}}</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" flat="flat" @click.native="deletedialog = false">Cancel</v-btn>
                                <v-btn color="red darken-4" flat="flat" @click.native="deletedialog = false, deleteadvantage()">Delete</v-btn>
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
  import FileUpload from 'vue-upload-component'
  import firebase, {storageRef} from '@/services/fireinit.js'
  export default {
    layout: 'admin',
    computed: {
      advantage : function (){
        return this.$store.getters['advantageStore/activeAdvantage']
      }
    },
    data() {
      return {
        search: '',
        image: '',
        url: '',
        imageUrl: '',
        imageName: '',
        nama_advantage:'',
        detail_advantage:'',
        deletedialog: false,
        editdialog: false,
        showdialog: false,
        adddialog: false,
        headers: [
          { text: 'Nama', value: 'nama_advantage' },
          { text: 'Tgl. Buat', value: 'created_at' },
          { text: 'Actions', value: '' }
        ],
        nameRules: [
        v => !!v || 'Name is required',
        ],
        editItem : {
          nama_advantage:'',
        },
        onDel: {
          id : '',
          nama_advantage:'',
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
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
            return;
            this.createImage(files[0]);
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
        removeImage: function (e) {
            this.image = '';
        },
        listData()  {
         this.$store.dispatch('advantageStore/actionListAdvantage')
        },
        addData()   {
            var newItem = {
            'nama_advantage': this.nama_advantage,
            'image': this.image,
            'url'  : this.url
            }
            this.$store.dispatch('advantageStore/actionSaveAdvantage', newItem).
            then(()=>   {
                this.adddialog = false
                })
        },
        onDelAdvantage(items) {
            // console.log(items)
            this.onDel.id = items.id
            this.onDel.nama_advantage = items.nama_advantage
            this.onDel.detail_advantage = items.slogan_advantage            
        },
        deleteadvantage() {
            this.$store.dispatch('advantageStore/actionDeleteAdvantage', this.onDel)
        },
        editData(data){
            var self = this
            self.editItem.id = data.id
            self.editItem.nama_advantage = data.nama_advantage
            self.editItem.detail_advantage = data.detail_advantage
        },
        updateData(){
            this.$store.dispatch('advantageStore/actionUpdateAdvantage', this.editItem)
        },
        ambilslug(){
            this.id = this.$route.params.advantage 
        }
    }
  }
</script>