<template>
    <section>
        <v-container grid-list-lg fluid>
        <v-layout row justify-center>
            <v-dialog v-model="adddialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Tambah Motto</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field
                                v-model="newItem.nama_motto"
                                box
                                label="Motto Sekolah"
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
        <v-card color="light-blue lighten-4">
            <v-card-title class="headline font-weight-bold">
                Motto
            </v-card-title>
        </v-card>
        <v-card dark color="light-blue darken-4">
            <v-card-title class="headline font-weight-bold">
            <v-btn large block color="primary" @click="adddialog = true">
                Tambah Motto
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
            :items="motto"
            :search="search"
            >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.nama_motto }}</td>
                <td>
                    <v-layout row justify-center>
                        <!-- <v-btn small fab color="warning" @click="$router.push('/admin/motto/'+ props.item.id)"><v-icon small>search</v-icon></v-btn> -->
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
                                            <v-text-field label="Motto" required v-model="editItem.nama_motto"></v-text-field>
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
                        <v-btn small fab color="error" slot="activator" @click="onDelMotto(props.item)"><v-icon small>mdi-delete</v-icon>
                        </v-btn>
                            <v-card>
                                <v-card-title class="headline">Delete Info ?</v-card-title>
                                <v-card-text>Judul : {{onDel.motto}}</v-card-text>
                                <v-card-text>Isi : {{onDel.isi_info}}</v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="green darken-1" flat="flat" @click.native="deletedialog = false">Cancel</v-btn>
                                    <v-btn color="red darken-4" flat="flat" @click.native="deletedialog = false, deletemotto()">Delete</v-btn>
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
  export default {
    layout: 'admin',
    computed: {
      motto : function (){
        return this.$store.getters['mottoStore/activeMotto']
      }
    },
    data() {
      return {
        nama_motto: '',
        search: '',
        deletedialog: false,
        editdialog: false,
        showdialog: false,
        adddialog: false,
        headers: [
          { text: 'Motto', value: 'motto' },
          { text: 'Actions', value: '' }
        ],
        pagination: {
            rowsPerPage: 1,
        },
        nameRules: [
        v => !!v || 'Name is required',
        ],
        newItem : {
          nama_motto:''
        },
        editItem : {
          nama_motto:''
        },
        onDel: {
          id : '',
          nama_motto:''
        }
      }
    },
    mounted(){
      if(!this.motto.length > 0){
        this.listData()
      }
    },
    methods: {
        listData()  {
         this.$store.dispatch('mottoStore/actionListMotto')
        },  
        addData()   {
        this.$store.dispatch('mottoStore/actionSaveMotto', this.newItem).
        then(()=>   {
            this.adddialog = false
            })
        },
        onDelMotto(items) {
        // console.log(items)
        this.onDel.id = items.id
        this.onDel.nama_motto = items.nama_motto
        },
        deletemotto() {
         this.$store.dispatch('mottoStore/actionDeleteMotto', this.onDel)
        },
        editData(data){
        var self = this
        self.editItem.id = data.id
        self.editItem.nama_motto = data.nama_motto
        },
        updateData(){
        this.$store.dispatch('mottoStore/actionUpdateMotto', this.editItem)
        }
    }
  }
</script>
