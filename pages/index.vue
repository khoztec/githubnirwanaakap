<template>
  <section>
    <v-layout
      row wrap
      justify-center
      align-center
    >
      <v-flex xs12>
        <homecarousel />
      </v-flex>
    </v-layout>
      <v-card color="grey darken-4">
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="py-5">
            <v-flex xs12 sm4 v-for="advantage in advantage" :key="advantage.id">
                <v-card>
                  <v-img :src=advantage.image aspect-ratio="1" gradient="to top right, rgba(0, 0, 0, 0.34), rgba(0, 0, 0, 0.9)">
                    <v-layout row wrap align-center justify-center fill-height class="hvr-float">
                      <v-flex xs12 text-xs-center class="pa-5 display-1 font-weight-bold white--text">
                        <div>
                          {{advantage.nama_advantage}}
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-img>
                </v-card>
            </v-flex>
            <v-flex xs12 sm4>
                <v-card color="transparent" class="elevation-0">
                  <v-img :src=armada.image aspect-ratio="1" gradient="to top right, rgba(0, 0, 0, 0.34), rgba(0, 0, 0, 0.9)">
                    <v-layout row wrap align-center justify-center fill-height>
                      <v-flex xs12 text-xs-center class="pa-5 headline font-weight-light white--text">
                        Cek Armada
                        <v-divider></v-divider>
                        <v-btn block large flat round outline color="red darken-1" to="/armada">
                          <v-icon left>
                            mdi-bus
                          </v-icon>
                          Armada
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-img>
                </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card>
        <v-container grid-list-xl>
          <v-layout row wrap class="py-5 px-4">
            <v-flex xs12>
              <v-card class="customround" color="red darken-4" dark>
                <v-card-text class="headline text-xs-center font-weight-bold">
                  Form Pencarian
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12>
              <v-card class="customround" color="red darken-4" dark>
                <v-container fluid grid-list-sm>
                  <v-layout row wrap>
                    <v-flex xs12 sm6>
                      <v-text-field label="Berangkat dari" box>

                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field label="Menuju ke" box>

                      </v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="date"
                            label="Tgl. Berangkat"
                            prepend-icon="event"
                            readonly
                            box
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs6>
                      <v-menu
                        v-model="menu4"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="date2"
                            label="Tgl. Kembali"
                            prepend-icon="event"
                            readonly
                            box
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="date2" @input="menu4 = false"></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs6 sm4>
                      <v-btn block round color="primary">
                        Cari
                      </v-btn>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs6 sm4>
                      <v-btn block round color="warning">
                        Reset
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card>
        <v-container grid-list-xl>
          <v-layout row wrap class="py-5 px-4">
            <v-flex xs12 class="my-4" v-for="profil in profil" :key="profil.id" text-xs-center>
              <div class="display-2 font-weight-bold mt-3">
                {{profil.judul_profil}}
              </div>
              <div class="title dark-grey--text mt-4 font-weight-light" v-html="profil.isi_profil">
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <!-- <v-card color="orange darken-4" dark>
        <v-container grid-list-xl>
          <v-layout row wrap fill-height align-center justify-center class="my-3" v-for="layanan in layanan" :key="layanan.id">
            <v-flex xs12 sm6 text-xs-center>
              <div class="display-1 font-weight-bold mt-3">
                {{layanan.judul_layanan}}
              </div>
            </v-flex>
            <v-flex xs12 text-xs-center class="mt-3">
              <div class="headline font-weight-light" v-html="layanan.isi_layanan">
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card> -->
      <v-card color="grey darken-4" dark>
          <v-layout row wrap fill-height align-center justify-center>
            <v-flex xs6 sm3 text-xs-center v-for="gallery in gallery" :key="gallery.id">
              <v-card>
                <v-img :src=gallery.image aspect-ratio="1" class="hvr-grow"></v-img>
              </v-card>
            </v-flex>
          </v-layout>
      </v-card>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import homecarousel from '~/components/homecarousel.vue'

export default {
  components: {
    Logo,
    VuetifyLogo,
    homecarousel
  },
  computed: {
      advantage : function (){
        return this.$store.getters['advantageStore/activeAdvantage']
      },
      armada : function (){
        return this.$store.getters['armadaStore/activeArmada']
      },
      profil : function (){
        return this.$store.getters['profilStore/activeProfil']
      },
      gallery : function (){
        return this.$store.getters['galleryStore/activeGallery']
      },
      layanan : function (){
        return this.$store.getters['layananStore/activeLayanan']
      }
    },
  data () {
      return {
        items: [
          { src: 'background1.jpg' }, { src: 'background2.jpg' }
        ],
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,
        date2: new Date().toISOString().substr(0, 10),
        menu3: false,
        modal2: false,
        menu4: false,
      }
    },
  mounted(){
        this.listData()
        this.listArmada()
        this.listProfil()
        this.listGallery()
    },
    methods: {
      listData()  {
         this.$store.dispatch('advantageStore/actionListAdvantage')
        },
      listArmada()  {
         this.$store.dispatch('armadaStore/actionListArmada')
        },
      listProfil()  {
         this.$store.dispatch('profilStore/actionListProfil')
        },
      listGallery()  {
         this.$store.dispatch('galleryStore/actionListGallery')
        },
      listLayanan()  {
         this.$store.dispatch('layananStore/actionListLayanan')
        }
    }
}
</script>

<style scoped>
.bottom-gradient {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
  }
.customround {
  border-radius: 10px
}
</style>
