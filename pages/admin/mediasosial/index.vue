<template>
    <section>
        <v-container grid-list-lg fluid>
        <v-layout row justify-center>
            <v-dialog v-model="adddialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Tambah Media Sosial</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field
                                v-model="newItem.nama_medsos"
                                box
                                label="Nama Medsos"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="newItem.link_medsos"
                                box
                                label="Link Medsos"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="newItem.icon_medsos"
                                box
                                label="Icon Medsos"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="newItem.warna_medsos"
                                box
                                label="Warna Medsos"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-btn fab :color="newItem.warna_medsos">
                                <v-icon color="white">
                                    {{newItem.icon_medsos}}
                                </v-icon>
                            </v-btn>
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
                Media Sosial
            </v-card-title>
        </v-card>
        <v-card color="blue-grey lighten-4">
            <v-card-title class="headline font-weight-bold">
            <v-btn large block color="primary" @click="adddialog = true">
                Tambah Medsos
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
            :items="mediasosial"
            :search="search"
            >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.nama_medsos }}</td>
                <td>{{ props.item.link_medsos }}</td>
                <td class="pa-2 text-xs-center">
                    <v-icon large>
                        {{ props.item.icon_medsos }}
                    </v-icon>
                </td>
                <td class="pa-2 text-xs-center">
                    <v-btn round readonly :color=props.item.warna_medsos></v-btn>
                </td>
                <td>
                    <v-layout row justify-center>
                        <!-- <v-btn small fab color="warning" @click="$router.push('/admin/mediasosial/'+ props.item.id)"><v-icon small>search</v-icon></v-btn> -->
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
                                            <v-text-field label="Nama Medsos" required v-model="editItem.nama_medsos"></v-text-field>
                                            <v-text-field label="Link Medsos" required v-model="editItem.link_medsos"></v-text-field>
                                            <v-text-field label="Icon Medsos" required v-model="editItem.icon_medsos"></v-text-field>
                                            <v-text-field label="Warna Medsos" required v-model="editItem.warna_medsos"></v-text-field>
                                            <v-btn fab :color="editItem.warna_medsos">
                                                <v-icon color="white">
                                                    {{editItem.icon_medsos}}
                                                </v-icon>
                                            </v-btn>
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
                        <v-btn small fab color="error" slot="activator" @click="onDelMediasosial(props.item)"><v-icon small>mdi-delete</v-icon>
                        </v-btn>
                            <v-card>
                            <v-card-title class="headline">Delete Medsos ?</v-card-title>
                            <v-card-text>Media : {{onDel.nama_medsos}}</v-card-text>
                            <v-card-text>Link : {{onDel.link_medsos}}</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" flat="flat" @click.native="deletedialog = false">Cancel</v-btn>
                                <v-btn color="red darken-4" flat="flat" @click.native="deletedialog = false, deletemediasosial()">Delete</v-btn>
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
  const mediasosialRef = db2.collection('mediasosial');
  export default {
    layout: 'admin',
    computed: {
      mediasosial : function (){
        return this.$store.getters['mediasosialStore/activeMediasosial']
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
          { text: 'Nama Medsos', value: 'nama_medsos' },
          { text: 'Link Medsos', value: 'link_medsos' },
          { text: 'Icon Medsos', value: 'icon_medsos' },
          { text: 'Warna Medsos', value: 'warna_medsos' },
          { text: 'Actions', value: '' }
        ],
        pagination: {
            rowsPerPage: 1,
        },
        nameRules: [
        v => !!v || 'Name is required',
        ],
        newItem : {
          nama_medsos:'',
          link_medsos:'',
          icon_medsos:'',
          warna_medsos:''
        },
        editItem : {
          nama_medsos:'',
          link_medsos:'',
          icon_medsos:'',
          warna_medsos:''
        },
        onDel: {
          id : '',
          nama_medsos:'',
          link_medsos:'',
          icon_medsos:''
        },
        detailurl: {
          id : '',
        }
      }
    },
    mounted(){
      if(!this.mediasosial.length > 0){
        this.listData()
      }
    },
    methods: {
        listData()  {
         this.$store.dispatch('mediasosialStore/actionListMediasosial')
        },  
        addData()   {
        this.$store.dispatch('mediasosialStore/actionSaveMediasosial', this.newItem).
        then(()=>   {
            this.adddialog = false
            })
        },
        onDelMediasosial(items) {
        console.log(items)
        this.onDel.id = items.id
        this.onDel.nama_medsos = items.nama_medsos
        this.onDel.link_medsos = items.link_medsos
        this.onDel.icon_medsos = items.icon_medsos
        },
        deletemediasosial() {
         this.$store.dispatch('mediasosialStore/actionDeleteMediasosial', this.onDel)
        },
        editData(data){
        var self = this
        self.editItem.id = data.id
        self.editItem.nama_medsos = data.nama_medsos
        self.editItem.link_medsos = data.link_medsos
        self.editItem.icon_medsos = data.icon_medsos
        self.editItem.warna_medsos = data.warna_medsos
        },
        updateData(){
        this.$store.dispatch('mediasosialStore/actionUpdateMediasosial', this.editItem)
        }
    }
  }
</script>