<template>
    <v-footer height="auto">
      <v-layout row wrap>
          <v-card color="red darken-4" width="100%">
            <v-layout row wrap class="py-1 px-5" align-center justify-center v-for="infosubscribe in infosubscribe" :key="infosubscribe.id">
              <v-flex xs12 sm7 class="pa-3">
                <div class="white--text headline font-weight-light text-xs-justify">
                {{ infosubscribe.isi_infosubscribe }}
                </div>
                <v-layout row wrap>
                  <v-flex xs12 text-xs-center>
                    <v-layout row wrap class="hidden-sm-and-down">
                      <div class="mt-3" v-for="mediasosial in mediasosial" :key="mediasosial.id">
                        <v-btn small fab dark :color="mediasosial.warna_medsos" class="mr-3" :href="mediasosial.link_medsos">
                            <v-icon dark>{{mediasosial.icon_medsos}}</v-icon>
                        </v-btn>
                      </div>
                    </v-layout>
                    <v-layout row wrap class="hidden-sm-and-up">
                      <div class="mt-3 text-xs-center" v-for="mediasosial in mediasosial" :key="mediasosial.id">
                        <v-btn small fab dark :color="mediasosial.warna_medsos" class="mr-3" :href="mediasosial.link_medsos">
                            <v-icon dark>{{mediasosial.icon_medsos}}</v-icon>
                        </v-btn>
                      </div>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm5 class="pa-3">
                <v-card class="orange darken-2 pa-3">
                  <v-layout row wrap class="py-1 px-2" align-center justify-center>
                    <v-flex xs12 text-xs-center>
                      <div class="font-weight-bold title white--text">
                        {{ infosubscribe.nama_infosubscribe }}
                      </div>
                    </v-flex>
                    <v-flex xs12 sm8 class="pa-1">
                      <v-text-field hide-details solo placeholder="E-Mail">

                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4 class="pa-1">
                      <v-btn block large dark color="red darken-4">
                        subscribe
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        <v-layout row wrap class="py-3" align-center justify-center>
          <v-flex xs12 text-xs-center sm8 class="px-5">
            <div class="headline font-weight-bold my-2">
              Pahala Kencana Group
            </div>
            <div class="subheadline my-3 text-xs-justify">
              {{ profilsingkat.isi_info }}
            </div>
            <v-layout row wrap>
                <v-flex xs12 sm4 class="pa-2" v-for="logogroup in logogroup" :key="logogroup.id">
                        <img :src=logogroup.image width="60%">
                </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 text-xs-right sm4 class="px-5 py-4">
            <img :src=logoman.image width="90%" alt="">
            <div class="body-1 mt-3 pl-5 font-weight-bold">
              {{ alamat.isi_info }}
            </div>
            <div class=" mb-3 font-weight-bold">
              {{ telepon.isi_info }}
            </div>
            <div>
              &copy;2019 — <strong>Pahala Kencana Group.</strong> <span>All rights reserved.</span>
            </div>
          </v-flex>
        </v-layout>
      </v-layout>

    </v-footer>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import {auth,db2} from '@/services/fireinit.js'
  const infoumumRef = db2.collection('infoumum')
  const mediasosialRef = db2.collection('mediasosial')
  const logogroupRef = db2.collection('logogroup')
  const infosubscribeRef = db2.collection('infosubscribe')
  export default {
    computed: {
      infoumum : function (){
        return this.$store.getters['infoumumStore/activeInfoumum']
      },
      mediasosial : function (){
        return this.$store.getters['mediasosialStore/activeMediasosial']
      },
      logogroup : function (){
        return this.$store.getters['logogroupStore/activeLogogroup']
      },
      infosubscribe : function (){
        return this.$store.getters['infosubscribeStore/activeInfosubscribe']
      }
    },
    data () {
      return {
        nama_perusahaan: '',
        alamat: '',
        telepon: '',
        whatsapp: '',
        nirwana: '',
        profilsingkat: '',
        logoman: '',
        links: [
          { title: 'Infoumum', to: '/inspire', icon: 'mdi-tag-plus' },
          { title: 'Info Pembayaran', to: '/payment', icon: 'mdi-credit-card' },
          { title: 'Galeri', to: '/gallery', icon: 'mdi-book-open' },
          { title: 'Kebijakan Privasi', to: '/', icon: 'mdi-file-lock' },
          { title: 'Tentang Kami', to: '/about', icon: 'mdi-account-group' },
          { title: 'Kontak', to: '/contact', icon: 'mdi-comment-question' }
        ]
      }
    },
    mounted(){
        this.listAlamat()
        this.listTelepon()
        this.listWhatsapp()
        this.listMediasosial()
        this.listLogoNirwana()
        this.listProfilSingkat()
        this.listData()
        this.listSubscribe()
        this.listLogoMA()
    },
    methods: {
      listLogoMA() {
          db2.collection('logoutama').doc('logoman').get().then((doc) => {
            const data = {
              id: doc.id,
              image: doc.data().image
            }
            this.logoman = data
          })
      },
      listLogoNirwana() {
          db2.collection('logogroup').doc('nirwana').get().then((doc) => {
            const data = {
              id: doc.id,
              nama_logo: doc.data().nama_logo,
              image: doc.data().image
            }
            this.nirwana = data
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
      listWhatsapp() {
          db2.collection('infoumum').doc('whatsapp').get().then((doc) => {
            const data = {
              id: doc.id,
              nama_info: doc.data().nama_info,
              isi_info: doc.data().isi_info,
              icon_info: doc.data().icon_info
            }
            this.whatsapp = data
          })
      },
      listProfilSingkat() {
          db2.collection('infoumum').doc('profilsingkat').get().then((doc) => {
            const data = {
              id: doc.id,
              nama_info: doc.data().nama_info,
              isi_info: doc.data().isi_info,
              icon_info: doc.data().icon_info
            }
            this.profilsingkat = data
          })
      },
      listMediasosial()  {
         this.$store.dispatch('mediasosialStore/actionListMediasosial')
         console.log()
      },
      listData()  {
          this.$store.dispatch('logogroupStore/actionListLogogroup')
      },
      listSubscribe()  {
          this.$store.dispatch('infosubscribeStore/actionListInfosubscribe')
      },
    }
}
</script>

<style scoped>
.nolink {
  text-decoration: none
}
</style>
