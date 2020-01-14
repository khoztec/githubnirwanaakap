<template>
    <section>
        <v-container grid-list-lg fluid>
        <v-layout row justify-center>
            <v-dialog v-model="adddialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Keuntungan PPDB MAN 1 Tangerang</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs10>
                            <v-text-field
                                v-model="newItem.judul_advantagearmada"
                                box
                                label="Judul"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea
                                v-model="newItem.isi_advantagearmada"
                                box
                                label="Isi Advantagearmada"
                                required
                            ></v-textarea>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="newItem.icon_advantagearmada"
                                box
                                label="Icon"
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
                Keuntungan Armada Nirwana
            </v-card-title>
        </v-card>
        <v-card color="blue-grey lighten-4">
            <v-card-title class="headline font-weight-bold">
            <v-btn large block color="primary" @click="adddialog = true">
                Tambah Poin
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
            :items="advantagearmada"
            :search="search"
            >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.judul_advantagearmada }}</td>
                <td>
                    <v-icon>
                        {{ props.item.icon_advantagearmada }}
                    </v-icon>
                </td>
                <td>
                    <v-layout row justify-center>
                        <!-- <v-btn small fab color="warning" @click="$router.push('/admin/advantagearmada/'+ props.item.id)"><v-icon small>search</v-icon></v-btn> -->
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
                                    <span class="headline">Edit Advantage (General)</span>
                                </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-text-field label="Judul" required v-model="editItem.judul_advantagearmada"></v-text-field>
                                            <v-textarea label="Deskripsi" required v-model="editItem.isi_advantagearmada"></v-textarea>
                                            <v-text-field label="Icon" required v-model="editItem.icon_advantagearmada"></v-text-field>
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
                        <v-btn small fab color="error" slot="activator" @click="onDelAdvantagearmada(props.item)"><v-icon small>mdi-delete</v-icon>
                        </v-btn>
                            <v-card>
                            <v-card-title class="headline">Delete Advantage (General) ?</v-card-title>
                            <v-card-text>Judul : {{onDel.judul_advantagearmada}}</v-card-text>
                            <v-card-text>Isi : {{onDel.isi_advantagearmada}}</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" flat="flat" @click.native="deletedialog = false">Cancel</v-btn>
                                <v-btn color="red darken-4" flat="flat" @click.native="deletedialog = false, deleteadvantagearmada()">Delete</v-btn>
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
      advantagearmada : function (){
        return this.$store.getters['advantagearmadaStore/activeAdvantagearmada']
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
          { text: 'Judul Advantage (General)', value: 'judul_advantagearmada' },
          { text: 'Icon', value: 'icon_advantagearmada' },
          { text: 'Actions', value: '' }
        ],
        pagination: {
            rowsPerPage: 1,
        },
        nameRules: [
        v => !!v || 'Name is required',
        ],
        newItem : {
          judul_advantagearmada:'',
          isi_advantagearmada:'',
          icon_advantagearmada:''
        },
        editItem : {
          judul_advantagearmada:'',
          isi_advantagearmada:'',
          icon_advantagearmada:''
        },
        onDel: {
          id : '',
          isi_advantagearmada:'',
          icon_advantagearmada:''
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
         this.$store.dispatch('advantagearmadaStore/actionListAdvantagearmada')
        },  
        addData()   {
        this.$store.dispatch('advantagearmadaStore/actionSaveAdvantagearmada', this.newItem).
        then(()=>   {
            this.adddialog = false
            })
        },
        onDelAdvantagearmada(items) {
        // console.log(items)
        this.onDel.id = items.id
        this.onDel.judul_advantagearmada = items.judul_advantagearmada
        this.onDel.isi_advantagearmada = items.isi_advantagearmada
        this.onDel.icon_advantagearmada = items.icon_advantagearmada
        },
        deleteadvantagearmada() {
         this.$store.dispatch('advantagearmadaStore/actionDeleteAdvantagearmada', this.onDel)
        },
        editData(data){
        var self = this
        self.editItem.id = data.id
        self.editItem.judul_advantagearmada = data.judul_advantagearmada
        self.editItem.isi_advantagearmada = data.isi_advantagearmada
        self.editItem.icon_advantagearmada = data.icon_advantagearmada
        },
        updateData(){
        this.$store.dispatch('advantagearmadaStore/actionUpdateAdvantagearmada', this.editItem)
        }
    }
  }
</script>