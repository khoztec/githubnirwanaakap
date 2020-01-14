<template>
    <v-container grid-list-lg fluid>
        <v-layout row wrap>
          <v-flex xs12>
        <v-card dark color="light-blue darken-4">
            <v-card-title class="headline font-weight-bold">
                Pesan
            </v-card-title>
        </v-card>
        <v-card color="blue-grey lighten-4">
            <v-data-table
            :headers="headers"
            :items="pesan"
            hide-actions
            >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.created_at }}</td>
                <td>{{ props.item.nama_pesan }}</td>
                <td>{{ props.item.nohp_pesan }}</td>
                <td>{{ props.item.email_pesan }}</td>
                <td>{{ props.item.isipesan_pesan }}</td>
                <td>
                  <v-layout row justify-center class="py-2">
                    <v-dialog max-width="1000" v-model="showdialog">
                      <v-btn small fab color="primary" slot="activator" @click="onDelPesan(props.item)"><v-icon small>mdi-file-find</v-icon>
                      </v-btn>
                      <v-card>
                        <v-card-text> <span class="font-weight-bold">Nama : </span> <br>{{onDel.nama_pesan}}</v-card-text>
                        <v-card-text> <span class="font-weight-bold">E-Mail : </span> <br>{{onDel.email_pesan}}</v-card-text>
                        <v-card-text> <span class="font-weight-bold">No. HP : </span> <br>{{onDel.nohp_pesan}}</v-card-text>
                        <v-card-text> <span class="font-weight-bold">Pesan : </span> <br>{{onDel.isipesan_pesan}}</v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" flat="flat" @click.native="showdialog = false">Close</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog max-width="600" v-model="deletedialog">
                      <v-btn small fab color="error" slot="activator" @click="onDelPesan(props.item)"><v-icon small>mdi-delete</v-icon>
                      </v-btn>
                      <v-card>
                        <v-card-title class="headline">Delete Pesan ?</v-card-title>
                        <v-card-text>Nama : {{onDel.nama_pesan}}</v-card-text>
                        <v-card-text>E-Mail : {{onDel.email_pesan}}</v-card-text>
                        <v-card-text>No. HP : {{onDel.nohp_pesan}}</v-card-text>
                        <v-card-text>Pesan : {{onDel.isipesan_pesan}}</v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" flat="flat" @click.native="deletedialog = false">Cancel</v-btn>
                        <v-btn color="red darken-4" flat="flat" @click.native="deletedialog = false, deletepesan()">Delete</v-btn>
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
          </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    layout: 'admin',
    computed: {
      pesan : function (){
        return this.$store.getters['pesanStore/activePesan']
      }
    },
    data() {
      return {
        search: '',
        deletedialog: false,
        showdialog: false,
        headers: [
          { text: 'Tanggal', value: 'created_at' },
          { text: 'Nama', value: 'nama_pesan' },
          { text: 'E-Mail', value: 'email_pesan' },
          { text: 'No. HP', value: 'nohp_pesan' },
          { text: 'Actions', value: '' }
        ],
        onDel: {
          id : '',
          nama_pesan : '',
          email_pesan : '',
          nohp_pesan : '',
          isipesan_pesan : ''
        }
      }
    },
    mounted(){
      if(!this.pesan.length > 0){
        this.listData()
      }
    },
    methods: {
        listData()  {
         this.$store.dispatch('pesanStore/actionListPesan')
        },  
        onDelPesan(items) {
        // console.log(items)
        this.onDel.id = items.id
        this.onDel.nama_pesan = items.nama_pesan
        this.onDel.email_pesan = items.email_pesan
        this.onDel.nohp_pesan = items.nohp_pesan
        this.onDel.isipesan_pesan = items.isipesan_pesan
        },
        deletepesan() {
         this.$store.dispatch('pesanStore/actionDeletePesan', this.onDel)
        }
    }
  }
</script>