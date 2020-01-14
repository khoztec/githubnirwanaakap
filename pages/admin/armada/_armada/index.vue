<template>
    <section>
        <v-card color="orange lighten-4">
            <v-card-title class="headline font-weight-bold">
                Armada : {{namaurl}}
            </v-card-title>
        </v-card>
        <v-dialog v-model="adddialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Tambah Gambar</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs8>
                            <v-text-field
                                v-model="nama_fotoarmada"
                                box
                                label="Nama Fotoarmada"
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
                <v-btn color="blue darken-1" flat @click.native="addData">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-card>
            <v-card-title class="headline font-weight-bold">
            <v-btn large block color="primary" @click="adddialog = true">
                Tambah Fotoarmada
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
            :items="fotoarmada"
            :search="search"
            >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.nama_fotoarmada }}</td>
                <td class="px-2 py-3">
                    <v-img :src="props.item.image" width="80%"></v-img>
                </td>
                <td>
                    <v-layout row justify-center>
                        <v-btn small fab color="warning" slot="activator" @click="onDelFotoarmada(props.item)"><v-icon small>search</v-icon></v-btn>
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
                                <span class="headline">Edit Fotoarmada</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="Nama Negara" required v-model="editItem.nama_armada"></v-text-field>
                                    <v-text-field label="Nama Negara" required v-model="editItem.image"></v-text-field>
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
                        <v-btn small fab color="error" slot="activator" @click="onDelFotoarmada(props.item)"><v-icon small>mdi-delete</v-icon>
                        </v-btn>
                            <v-card>
                            <v-card-title class="headline">Delete Fotoarmada ?</v-card-title>
                            <v-card-text>Nama Fotoarmada : {{onDel.nama_fotoarmada}}</v-card-text>
                            <v-card-text>Image : {{onDel.image}}</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" flat="flat" @click.native="deletedialog = false">Cancel</v-btn>
                                <v-btn color="red darken-4" flat="flat" @click.native="deletedialog = false, deletefotoarmada()">Delete</v-btn>
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
    </section>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import {auth,db2} from '@/services/fireinit.js'
  const fotoarmadaRef = db2.collection('armada');
  export default {
    layout: 'admin',

    computed: {
      fotoarmada : function (){
        return this.$store.getters['fotoarmadaStore/activeFotoarmada']
      },
      armada : function (){
        return this.$store.getters['armadaStore/activeArmada']
      }
    },
    data() {
      return {
          nama_fotoarmada : '',
          image: '',
          url: '',
          imageUrl: '',
          imageName: '',
          namaurl: '',
    headers: [
        { text: 'Nama Fotoarmada', value: 'nama_fotoarmada' },
        { text: 'Image', value: 'image' },
        { text: 'Actions', value: '' }
    ],
    search: '',
    deletedialog: false,
    editdialog: false,
    showdialog: false,
    adddialog: false,
    newItem : {
        id_armada: this.$route.params.armada,
        nama_fotoarmada: '',
        image: ''
    },
    editItem : {
        id_armada: this.$route.params.armada,
        nama_fotoarmada: '',
        image: ''
    },
    onDel: {
        id_armada : this.$route.params.armada,
        nama_fotoarmada : '',
        image: ''
    },
      }
    },
    mounted(){
        this.ambilslug(),
        this.listData()
    },
    methods: {
        listData()  {
                this.$store.dispatch('fotoarmadaStore/actionListFotoarmada', {id_armada : this.$route.params.armada})
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
            var self = this
                const newitem2 = {
                id_armada: self.$route.params.armada,
                nama_fotoarmada: self.nama_fotoarmada,
                image: self.image
                }
                console.log(newitem2)
                this.$store.dispatch('fotoarmadaStore/actionSaveFotoarmada', newitem2)
                this.adddialog = false
            },
        onDelFotoarmada(items) {
                this.onDel.id = items.id
                this.onDel.nama_armada = items.nama_armada
                this.onDel.image = items.image
                console.log(items)
            },
        deletefotoarmada() {
                this.$store.dispatch('fotoarmadaStore/actionDeleteFotoarmada', this.onDel)
            },
        editData(data){
                this.editItem.id = data.id
                this.editItem.id_armada = this.$route.params.armada,
                this.editItem.nama_armada = data.nama_armada
                this.editItem.image = data.image
                console.log(data)
            },
        updateData(){
                this.$store.dispatch('fotoarmadaStore/actionUpdateFotoarmada', this.editItem)
            },
        ambilslug(){
                this.namaurl = this.$route.params.armada
        }
    }
  }
</script>