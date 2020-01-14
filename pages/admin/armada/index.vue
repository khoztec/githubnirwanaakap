<template>
    <section>
        <v-container grid-list-lg fluid>
        <v-layout row justify-center>
            <v-dialog v-model="adddialog" persistent max-width="800px">
            <v-card>
                <v-card-title>
                <span class="headline">Tambah Armada</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs8>
                            <v-text-field
                                v-model="nama_armada"
                                box
                                label="Nama Armada"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field
                                v-model="seat_armada"
                                box
                                label="Seat"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="slogan_armada"
                                box
                                label="Slogan"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea
                                v-model="desc_armada"
                                box
                                label="Deskripsi Singkat"
                                required
                            ></v-textarea>
                        </v-flex>
                        <v-flex xs12>
                            <no-ssr>
                                <vue-editor v-model="details_armada"></vue-editor>
                            </no-ssr>
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
                Armada
            </v-card-title>
        </v-card>
        <v-card light color="blue-grey lighten-4">
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
            :items="armada"
            :search="search"
            >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.nama_armada }}</td>
                <td>{{ props.item.seat_armada }}</td>
                <td>{{ props.item.slogan_armada }}</td>
                <td style="padding:10px 0px"><img :src=props.item.image height="80px"></td>
                <td>
                    <v-layout row justify-center>
                        <v-btn small fab color="warning" @click="$router.push('/admin/armada/'+ props.item.id)"><v-icon small>search</v-icon></v-btn>
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
                                    <span class="headline">Edit Armada</span>
                                </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-text-field label="Nama Armada" required v-model="editItem.nama_armada"></v-text-field>
                                            <v-text-field label="Seat" required v-model="editItem.seat_armada"></v-text-field>
                                            <v-text-field label="Seat" required v-model="editItem.slogan_armada"></v-text-field>
                                            <v-textarea label="Deskripsi" required v-model="editItem.desc_armada"></v-textarea>
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
                        <v-btn small fab color="error" slot="activator" @click="onDelArmada(props.item)"><v-icon small>mdi-delete</v-icon>
                        </v-btn>
                            <v-card>
                            <v-card-title class="headline">Delete Armada ?</v-card-title>
                            <v-card-text>Armada : {{onDel.nama_armada}}</v-card-text>
                            <v-card-text>Seat : {{onDel.seat_armada}}</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" flat="flat" @click.native="deletedialog = false">Cancel</v-btn>
                                <v-btn color="red darken-4" flat="flat" @click.native="deletedialog = false, deletearmada()">Delete</v-btn>
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
  import { VueEditor } from "vue2-editor";
  const armadaRef = db2.collection('armada');
  export default {
    layout: 'admin',
    computed: {
      armada : function (){
        return this.$store.getters['armadaStore/activeArmada']
      }
    },
    components: {
      VueEditor
    },
    data() {
      return {
        search: '',
        image: '',
        url: '',
        imageUrl: '',
        imageName: '',
        nama_armada:'',
        seat_armada:'',
        slogan_armada:'',
        desc_armada:'',
        details_armada:'',
        image: '',
        deletedialog: false,
        editdialog: false,
        showdialog: false,
        adddialog: false,
        headers: [
          { text: 'Nama Armada', value: 'nama_armada' },
          { text: 'Seat', value: 'seat_armada' },
          { text: 'Slogan', value: 'slogan_armada' },
          { text: 'Image', value: 'image' },
          { text: 'Actions', value: '' }
        ],
        nameRules: [
        v => !!v || 'Name is required',
        ],
        editItem : {
          nama_armada:'',
          seat_armada:'',
          slogan_armada:'',
          desc_armada:'',
          details_armada:'',
          image: ''
        },
        onDel: {
          id : '',
          nama_armada:'',
          slogan_armada:'',
          seat_armada:'',
          details_armada:'',
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
         this.$store.dispatch('armadaStore/actionListArmada')
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
            return;
            this.createImage(files[0]);
            console.log(e)
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
        addData()   {
            var newItem = {
            'nama_armada': this.nama_armada,
            'seat_armada': this.seat_armada,
            'slogan_armada': this.slogan_armada,
            'desc_armada': this.desc_armada,
            'details_armada': this.details_armada,
            'image': this.image,
            'url'  : this.url
            }
            this.$store.dispatch('armadaStore/actionSaveArmada', newItem).
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
        onDelArmada(items) {
            console.log(items)
            this.onDel.id = items.id
            this.onDel.nama_armada = items.nama_armada
            this.onDel.seat_armada = items.seat_armada
            this.onDel.slogan_armada = items.slogan_armada
            this.onDel.image = items.image            
        },
        deletearmada() {
            this.$store.dispatch('armadaStore/actionDeleteArmada', this.onDel)
        },
        editData(data){
            var self = this
            self.editItem.id = data.id
            self.editItem.nama_armada = data.nama_armada
            self.editItem.seat_armada = data.seat_armada
            self.editItem.slogan_armada = data.slogan_armada
            self.editItem.desc_armada = data.desc_armada
            self.editItem.details_armada = data.details_armada
        },
        updateData(){
            this.$store.dispatch('armadaStore/actionUpdateArmada', this.editItem)
        },
        ambilslug(){
            this.id = this.$route.params.armada 
        }
    }
  }
</script>