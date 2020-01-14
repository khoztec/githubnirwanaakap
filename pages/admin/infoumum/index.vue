<template>
    <section>
        <v-container grid-list-lg fluid>
        <v-layout row justify-center>
            <v-dialog v-model="adddialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Tambah Info</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field
                                v-model="newItem.nama_info"
                                box
                                label="Nama Info"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea
                                v-model="newItem.isi_info"
                                box
                                label="Isi Info"
                                required
                            ></v-textarea>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="newItem.icon_info"
                                box
                                label="Icon Info"
                                required
                            ></v-text-field>
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
                Info Umum
            </v-card-title>
        </v-card>
        <v-card color="blue-grey lighten-4">
            <v-card-title class="headline font-weight-bold">
            <v-btn large block color="primary" @click="adddialog = true">
                Tambah Info
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
            :items="infoumum"
            :search="search"
            >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.nama_info }}</td>
                <td>{{ props.item.isi_info }}</td>
                <td>
                    <v-layout row justify-center>
                        <!-- <v-btn small fab color="warning" @click="$router.push('/admin/infoumum/'+ props.item.id)"><v-icon small>search</v-icon></v-btn> -->
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
                                    <span class="headline">Edit Bagian</span>
                                </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-text-field label="Nama Info" required v-model="editItem.nama_info"></v-text-field>
                                            <v-textarea label="Isi Info" required v-model="editItem.isi_info"></v-textarea>
                                            <v-text-field label="Icon Info" required v-model="editItem.icon_info"></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" flat @click.native="editdialog = false">Close</v-btn>
                                <v-btn color="blue darken-1" flat @click.native="editdialog = false, updateData()">Save</v-btn>
                            </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog max-width="600" v-model="deletedialog">
                        <v-btn small fab color="error" slot="activator" @click="onDelInfoumum(props.item)"><v-icon small>mdi-delete</v-icon>
                        </v-btn>
                            <v-card>
                                <v-card-title class="headline">Delete Info ?</v-card-title>
                                <v-card-text>Judul : {{onDel.nama_info}}</v-card-text>
                                <v-card-text>Isi : {{onDel.isi_info}}</v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="green darken-1" flat="flat" @click.native="deletedialog = false">Cancel</v-btn>
                                    <v-btn color="red darken-4" flat="flat" @click.native="deletedialog = false, deleteinfoumum()">Delete</v-btn>
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
  const infoumumRef = db2.collection('infoumum');
  export default {
    layout: 'admin',
    computed: {
      infoumum : function (){
        return this.$store.getters['infoumumStore/activeInfoumum']
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
          { text: 'Nama Info', value: 'nama_info' },
          { text: 'Isi Info', value: 'isi_info' },
          { text: 'Actions', value: '' }
        ],
        pagination: {
            rowsPerPage: 1,
        },
        nameRules: [
        v => !!v || 'Name is required',
        ],
        newItem : {
          nama_info:'',
          isi_info:'',
          icon_info:''
        },
        editItem : {
          nama_info:'',
          isi_info:'',
          icon_info:''
        },
        onDel: {
          id : '',
          nama_info:'',
          isi_info:''
        },
        detailurl: {
          id : '',
        }
      }
    },
    mounted(){
      if(!this.infoumum.length > 0){
        this.listData()
      }
    },
    methods: {
        listData()  {
         this.$store.dispatch('infoumumStore/actionListInfoumum')
        },  
        addData()   {
        this.$store.dispatch('infoumumStore/actionSaveInfoumum', this.newItem).
        then(()=>   {
            this.adddialog = false
            })
        },
        onDelInfoumum(items) {
        // console.log(items)
        this.onDel.id = items.id
        this.onDel.nama_info = items.nama_info
        this.onDel.isi_info = items.isi_info
        },
        deleteinfoumum() {
         this.$store.dispatch('infoumumStore/actionDeleteInfoumum', this.onDel)
        },
        editData(data){
        var self = this
        self.editItem.id = data.id
        self.editItem.nama_info = data.nama_info
        self.editItem.isi_info = data.isi_info
        self.editItem.icon_info = data.icon_info
        },
        updateData(){
        this.$store.dispatch('infoumumStore/actionUpdateInfoumum', this.editItem)
        }
    }
  }
</script>