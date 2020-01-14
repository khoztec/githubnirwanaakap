<template>
    <section>
        <header1 />
        <v-container grid-list-lg>
            <v-layout row wrap justify-center>
                <v-flex xs12 sm6 text-xs-center>
                    <v-card color="white">
                        <v-img src="n2.png" width="50%" class="d-inline-block"></v-img>
                        <v-card-title class="headline font-weight-bold">
                            Alamat
                        </v-card-title>
                        <v-card-text class="mb-2 title font-weight-light text-xs-left">
                            {{alamat.isi_info}}
                        </v-card-text>
                        <v-card-title class="headline font-weight-bold">
                            Telepon
                        </v-card-title>
                        <v-card-text class="mb-2 title font-weight-light text-xs-left">
                            {{telepon.isi_info}}
                        </v-card-text>
                        <v-card-title class="headline font-weight-bold">
                            E-Mail
                        </v-card-title>
                        <v-card-text class="mb-2 title font-weight-light text-xs-left">
                            {{email.isi_info}}
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs12 sm6 text-xs-center>
                    <v-card color="white">
                        <iframe :src=maps.isi_info width="100%" height="400" frameborder="0" style="border:0" allowfullscreen></iframe>
                    </v-card>
                </v-flex>
                <v-flex xs12 text-xs-center>
                    <v-card color="red darken-4" dark>
                        <v-card-text class="headline font-weight-bold">
                            Kirim Pesan
                        </v-card-text>
                        <v-card-text class="subheadline">
                            Jika ada yang ingin ditanyakan, silahkan kirim pesan di kotak ini
                        </v-card-text>
                        <v-container fluid grid-list-md>
                            <v-form>
                                <v-text-field
                                light
                                v-model="nama_pesan"
                                label="Nama"
                                required
                                solo
                                ></v-text-field>
                                <v-text-field
                                v-model="email_pesan"
                                label="E-mail"
                                solo
                                light
                                required
                                ></v-text-field>
                                <v-text-field
                                v-model="nohp_pesan"
                                label="No. HP"
                                solo
                                light
                                required
                                ></v-text-field>
                                <v-textarea
                                v-model="isipesan_pesan"
                                solo
                                light
                                required
                                name="input-7-2"
                                label="Isi Pesan"
                                ></v-textarea>
                                <v-dialog
                                    v-model="savedialog"
                                    width="500"
                                >
                                    <v-btn slot="activator" round color="light-blue darken-1" large @click="addPesan">
                                        <div class="font-weight-bold white--text">
                                        Kirim
                                        </div>
                                    </v-btn>
                                    <v-card>
                                    <v-card-title
                                        class="headline grey lighten-2"
                                        primary-title
                                    >
                                        Privacy Policy
                                    </v-card-title>

                                    <v-card-text>
                                        Terimakasih atas pesannya. Kami akan menindaklanjuti isi pesan tersebut secepatnya.
                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn round color="light-blue darken-1" large @click="savedialog = false">
                                        <div class="font-weight-bold white--text">
                                        Kirim
                                        </div>
                                        </v-btn>
                                    </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-form>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </section>
</template>

<script>
  import header1 from '~/components/kontak/header1.vue'
  import {auth2,db2} from '@/services/fireinit.js'
  export default {
    components: {
      header1
    },
    data() {
      return {
        savedialog: false,
        nameRules: [
        v => !!v || 'Name is required',
        ],
        alamat: '',
        email: '',
        telepon: '',
        maps: '',
        nama_pesan: '',
        email_pesan: '',
        nohp_pesan: '',
        isipesan_pesan: ''
      }
    },
    mounted () {
        this.listTelepon()
        this.listAlamat()
        this.listEmail()
        this.listMaps()
    },
    methods: {
        addPesan()   {
            var newItem = {
            'nama_pesan'      : this.nama_pesan,
            'email_pesan'     : this.email_pesan,
            'nohp_pesan'      : this.nohp_pesan,
            'isipesan_pesan'  : this.isipesan_pesan,
            }
            this.$store.dispatch('pesanStore/actionSavePesan', newItem)
        },
        listTelepon() {
          db2.collection('infoumum').doc('telepon').get().then((doc) => {
            const data = {
              id: doc.id,
              nama_info: doc.data().nama_info,
              isi_info: doc.data().isi_info,
              icon_info: doc.data().icon_info
            }
            this.telepon = data
          })
        },
        listAlamat() {
            db2.collection('infoumum').doc('alamat').get().then((doc) => {
                const data = {
                id: doc.id,
                nama_info: doc.data().nama_info,
                isi_info: doc.data().isi_info,
                icon_info: doc.data().icon_info
                }
                this.alamat = data
            })
        },
        listEmail() {
            db2.collection('infoumum').doc('email').get().then((doc) => {
                const data = {
                id: doc.id,
                nama_info: doc.data().nama_info,
                isi_info: doc.data().isi_info,
                icon_info: doc.data().icon_info
                }
                this.email = data
            })
        },
        listMaps() {
            db2.collection('infoumum').doc('maps').get().then((doc) => {
                const data = {
                id: doc.id,
                nama_info: doc.data().nama_info,
                isi_info: doc.data().isi_info,
                icon_info: doc.data().icon_info
                }
                this.maps = data
            })
        },
        // addPesan()   {
        // this.$store.dispatch('pesanStore/actionSavePesan', this.newItem).
        // then(()=>   {
        //     this.savedialog = true
        //     })
        // }
    }
  }
</script>

<style scoped>
.nolink {
    text-decoration: none
}
.shadowtext{
  text-shadow: 1px 1px 4px #ce0e0e;
  color: #ffffff
}
.overlay {
  background-color: #dd63127a !important;
}
.overlay2 {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
}
</style>