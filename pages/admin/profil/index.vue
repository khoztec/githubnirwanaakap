<template>
    <section>
        <v-container grid-list-lg fluid>
        <v-layout row justify-center>
            <v-dialog v-model="adddialog" persistent max-width="800px">
            <v-card>
                <v-card-title>
                    <span class="headline">Tambah Profil</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs8>
                                <v-text-field
                                    v-model="judul_profil"
                                    box
                                    label="Judul Profil"
                                    required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <no-ssr>
                                    <vue-editor v-model="isi_profil"></vue-editor>
                                </no-ssr>
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
                Profil
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
            :items="profil"
            :search="search"
            >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.judul_profil }}</td>
                <td>
                    <v-layout row justify-center>
                        <v-btn small fab color="warning"><v-icon small>mdi-message-reply-text</v-icon></v-btn>
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
                                    <span class="headline">Edit Profil</span>
                                </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-text-field label="Nama Profil" required v-model="editItem.judul_profil"></v-text-field>
                                            <no-ssr>
                                                <vue-editor required v-model="editItem.isi_profil"></vue-editor>
                                            </no-ssr>
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
                        <v-btn small fab color="error" slot="activator" @click="onDelProfil(props.item)"><v-icon small>mdi-delete</v-icon>
                        </v-btn>
                            <v-card>
                            <v-card-title class="headline">Delete Profil ?</v-card-title>
                            <v-card-text>Profil : {{onDel.judul_profil}}</v-card-text>
                            <v-card-text>Seat : {{onDel.penulis_profil}}</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" flat="flat" @click.native="deletedialog = false">Cancel</v-btn>
                                <v-btn color="red darken-4" flat="flat" @click.native="deletedialog = false, deleteprofil()">Delete</v-btn>
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
    import { VueEditor } from "vue2-editor";
  export default {
    layout: 'admin',
    computed: {
      profil : function (){
        return this.$store.getters['profilStore/activeProfil']
      }
    },
    components: {
      VueEditor
    },
    data() {
      return {
        search: '',
        judul_profil:'',
        isi_profil:'',
        deletedialog: false,
        editdialog: false,
        showdialog: false,
        adddialog: false,
        headers: [
          { text: 'Judul', value: 'judul_profil' },
          { text: 'Actions', value: '' }
        ],
        nameRules: [
        v => !!v || 'Name is required',
        ],
        editItem : {
          judul_profil:'',
          isi_profil:''
        },
        onDel: {
          id : '',
          judul_profil:'',
          isi_profil:''
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
         this.$store.dispatch('profilStore/actionListProfil')
        },
        addData()   {
            var newItem = {
            'judul_profil': this.judul_profil,
            'isi_profil': this.isi_profil,
            }
            this.$store.dispatch('profilStore/actionSaveProfil', newItem).
            then(()=>   {
                this.adddialog = false
                })
        },
        onDelProfil(items) {
            // console.log(items)
            this.onDel.id = items.id
            this.onDel.judul_profil = items.judul_profil
            this.onDel.penulis_profil = items.penulis_profil
            this.onDel.isi_profil = items.isi_profil            
        },
        deleteprofil() {
            this.$store.dispatch('profilStore/actionDeleteProfil', this.onDel)
        },
        editData(data){
            var self = this
            self.editItem.id = data.id
            self.editItem.judul_profil = data.judul_profil
            self.editItem.isi_profil = data.isi_profil
        },
        updateData(){
            this.$store.dispatch('profilStore/actionUpdateProfil', this.editItem)
        },
        ambilslug(){
            this.id = this.$route.params.profil 
        }
    }
  }
</script>