<template>
    <section>
        <v-container grid-list-lg fluid>
        <v-layout row justify-center>
            <v-dialog v-model="adddialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Tambah Infosubscribe</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field
                                v-model="newItem.nama_infosubscribe"
                                box
                                label="Judul"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea
                                v-model="newItem.isi_infosubscribe"
                                box
                                label="Isi Infosubscribe"
                                required
                            ></v-textarea>
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
                Infosubscribe Pelanggan
            </v-card-title>
        </v-card>
        <v-card color="blue-grey lighten-4">
            <v-card-title class="headline font-weight-bold">
            <v-btn large block color="primary" @click="adddialog = true">
                Tambah Infosubscribe
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
            :items="infosubscribe"
            :search="search"
            >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.nama_infosubscribe }}</td>
                <td>{{ props.item.isi_infosubscribe }}</td>
                <td>
                    <v-layout row justify-center>
                        <!-- <v-btn small fab color="warning" @click="$router.push('/admin/infosubscribe/'+ props.item.id)"><v-icon small>search</v-icon></v-btn> -->
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
                                    <span class="headline">Edit Infosubscribe</span>
                                </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-text-field label="Judul" required v-model="editItem.nama_infosubscribe"></v-text-field>
                                            <v-textarea label="Deskripsi" required v-model="editItem.isi_infosubscribe"></v-textarea>
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
                        <v-btn small fab color="error" slot="activator" @click="onDelInfosubscribe(props.item)"><v-icon small>mdi-delete</v-icon>
                        </v-btn>
                            <v-card>
                            <v-card-title class="headline">Delete Infosubscribe?</v-card-title>
                            <v-card-text>Judul : {{onDel.nama_infosubscribe}}</v-card-text>
                            <v-card-text>Isi : {{onDel.isi_infosubscribe}}</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" flat="flat" @click.native="deletedialog = false">Cancel</v-btn>
                                <v-btn color="red darken-4" flat="flat" @click.native="deletedialog = false, deleteinfosubscribe()">Delete</v-btn>
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
  const infosubscribeRef = db2.collection('infosubscribe');
  export default {
    layout: 'admin',
    computed: {
      infosubscribe : function (){
        return this.$store.getters['infosubscribeStore/activeInfosubscribe']
      }
    },
    data() {
      return {
        search: '',
        deletedialog: false,
        editdialog: false,
        showdialog: false,
        adddialog: false,
        headers: [
          { text: 'Judul', value: 'nama_infosubscribe' },
          { text: 'Isi', value: 'isi_infosubscribe' },
          { text: 'Actions', value: '' }
        ],
        pagination: {
            rowsPerPage: 1,
        },
        nameRules: [
        v => !!v || 'Name is required',
        ],
        newItem : {
          nama_infosubscribe:'',
          isi_infosubscribe:''
        },
        editItem : {
          nama_infosubscribe:'',
          isi_infosubscribe:''
        },
        onDel: {
          id : '',
          nama_infosubscribe:'',
          isi_infosubscribe:''
        },
        detailurl: {
          id : '',
        }
      }
    },
    mounted(){
        this.listData()
    },
    methods: {
        listData()  {
         this.$store.dispatch('infosubscribeStore/actionListInfosubscribe')
        },  
        addData()   {
        this.$store.dispatch('infosubscribeStore/actionSaveInfosubscribe', this.newItem).
        then(()=>   {
            this.adddialog = false
            })
        },
        onDelInfosubscribe(items) {
        console.log(items)
        this.onDel.id = items.id
        this.onDel.nama_infosubscribe = items.nama_infosubscribe
        this.onDel.isi_infosubscribe = items.isi_infosubscribe
        },
        deleteinfosubscribe() {
         this.$store.dispatch('infosubscribeStore/actionDeleteInfosubscribe', this.onDel)
        },
        editData(data){
        var self = this
        self.editItem.id = data.id
        self.editItem.nama_infosubscribe = data.nama_infosubscribe
        self.editItem.isi_infosubscribe = data.isi_infosubscribe
        },
        updateData(){
        this.$store.dispatch('infosubscribeStore/actionUpdateInfosubscribe', this.editItem)
        }
    }
  }
</script>