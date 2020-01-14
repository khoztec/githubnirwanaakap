<template>
  <section>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list class="pa-1">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src=logonirwana.image>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>Nirwana Bus</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
          <v-divider></v-divider>

          <v-list-tile to="/">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Beranda</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/profilsingkat">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Tentang Kami</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/kontak">
            <v-list-tile-action>
              <v-icon>phone</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Kontak</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-btn color="light-blue darken-4" dark @click.stop="drawer = !drawer">
          Tutup
        </v-btn>
      </v-navigation-drawer>
      <v-toolbar
        fixed
        app
        height="75px"
      >
            <img :src=logonirwana.image aspect-ratio="1" width="13%" class="hidden-sm-and-down">
            <img :src=logonirwana.image aspect-ratio="1" width="12%" class="hidden-sm-and-up">

            <v-toolbar-side-icon to="/admin/home"></v-toolbar-side-icon>
          <v-spacer></v-spacer>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            bottom
            origin="center center"
            transition="scale-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                color="error"
                dark
                v-on="on"
              >
                Login
              </v-btn>
            </template>
            <v-card>
              <v-toolbar color="error" class="font-weight-bold white--text headline">
                Login
              </v-toolbar>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-text-field solo label="E-Mail">

                      </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field solo label="Password" type="password">

                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-card-actions>
                  <v-btn round color="error">
                    Login
                  </v-btn>
                  <v-btn round color="warning">
                    Lupa Password
                  </v-btn>
                </v-card-actions>
            </v-card>
          </v-menu>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat class="red--text" to="/">Beranda</v-btn>
            <v-btn flat class="red--text" to="/reservasi">Reservasi</v-btn>
            <v-btn flat class="red--text" to="/armada">Armada</v-btn>
            <v-btn flat class="red--text" to="/profilsingkat">Tentang Kami</v-btn>
            <v-btn flat class="red--text" to="/kontak">Kontak</v-btn>
          </v-toolbar-items>
          <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
      </v-toolbar>  
  </section>
</template>

<script>
import {auth,db2} from '@/services/fireinit.js'
export default {
    data () {
      return {
        fav: true,
        menu: false,
        message: false,
        hints: true,
        drawer: null,
        logonirwana: '',
        namasekolah: '',
      }
    },
    mounted() {
      this.listLogo()
      this.listNamaWeb()
    },
    methods: {
      listLogo() {
          db2.collection('logoutama').doc('logonirwana').get().then((doc) => {
            const data = {
              id: doc.id,
              image: doc.data().image
            }
            this.logonirwana = data
          })
      },
      listNamaWeb() {
          db2.collection('infoumum').doc('namasekolah').get().then((doc) => {
            const data = {
              id: doc.id,
              nama_info: doc.data().nama_info,
              isi_info: doc.data().isi_info,
              icon_info: doc.data().icon_info
            }
            this.namasekolah = data
          })
        }
    }
}
</script>

