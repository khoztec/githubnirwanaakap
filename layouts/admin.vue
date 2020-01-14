<template>
  <v-app light>
    <v-navigation-drawer
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-toolbar dark color="amber lighten-5" flat class="transparent px-2 py-3 text-xs-center">
        <v-list>
          <v-list-tile>
              <img :src=logonirwana.image width="100%">

          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>
      <v-list>
        <v-list-tile
          router
          exact
          to="/admin/home"
        >
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group
                    prepend-icon="format_paint"
                    no-action
                  >
                    <v-list-tile slot="activator">
                      <v-list-tile-content>
                        <v-list-tile-title>Halaman Utama</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile v-for="(item, i) in halamanindex" :key="i"
                      :to="item.to"
                    >
                      <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                      </v-list-tile-action>
                    </v-list-tile>
        </v-list-group>
        <v-list-group
              prepend-icon="format_paint"
              no-action
            >
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>Armada</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-for="(item, i) in halamanarmada" :key="i"
                :to="item.to"
              >
                <v-list-tile-content>
                  <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon v-html="item.icon"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
        </v-list-group>
        <v-list-group
              prepend-icon="format_paint"
              no-action
            >
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>Profil</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-for="(item, i) in halamanprofil" :key="i"
                :to="item.to"
              >
                <v-list-tile-content>
                  <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon v-html="item.icon"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
        </v-list-group>
        <v-list-group
              prepend-icon="format_paint"
              no-action
            >
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>Armada</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-for="(item, i) in halamankontak" :key="i"
                :to="item.to"
              >
                <v-list-tile-content>
                  <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon v-html="item.icon"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
        </v-list-group>
        <v-list-tile
          router
          exact
          @click.native="logout"
        >
          <v-list-tile-action>
            <v-icon>mdi-power</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark color="orange darken-3" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        to="/"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>Super Admin</v-toolbar-title>
      <v-btn icon>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
        <nuxt />
    </v-content>
    <v-footer :fixed="fixed" app>
      &copy;2019 — <strong>Nirwana Bus.</strong>&nbsp;<span>All rights reserved.</span>
    </v-footer>
  </v-app>
</template>

<script>
  import {auth,db2} from '@/services/fireinit.js'
  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        halamankontak: [
          { icon: 'format_paint', title: 'Pesan', to: '/admin/pesan' },
          { icon: 'format_paint', title: 'Info Umum', to: '/admin/infoumum' }
        ],
        halamanindex: [
          { icon: 'format_paint', title: 'Carousel', to: '/admin/carousel' },
          { icon: 'format_paint', title: 'Advantage', to: '/admin/advantage' },
          { icon: 'format_paint', title: 'Profil', to: '/admin/profil' },
          { icon: 'format_paint', title: 'Info Subscribe', to: '/admin/infosubscribe' },
          { icon: 'format_paint', title: 'Media Sosial', to: '/admin/mediasosial' },
          { icon: 'format_paint', title: 'Logo Group', to: '/admin/logogroup' },
          { icon: 'format_paint', title: 'Gallery', to: '/admin/gallery' },
          { icon: 'format_paint', title: 'Header', to: '/admin/header' },
          { icon: 'format_paint', title: 'Logo Utama', to: '/admin/logoutama' },
        ],
        halamanarmada: [
          { icon: 'format_paint', title: 'List Armada', to: '/admin/armada' },
          { icon: 'format_paint', title: 'Keuntungan (Armada)', to: '/admin/advantagearmada' }
        ],
        halamanprofil: [
          { icon: 'format_paint', title: 'Visi', to: '/admin/visi' },
          { icon: 'format_paint', title: 'Misi', to: '/admin/misi' },
          { icon: 'format_paint', title: 'Foto (Visi/Misi)', to: '/admin/fotovisimisi' },
          { icon: 'format_paint', title: 'Motto', to: '/admin/motto' }
        ],
        miniVariant: false,
        right: true,
        logonirwana: '',
        rightDrawer: false,
        title: 'Admin Nirwana Web'
      }
    },
    mounted() {
      this.listLogo()
    },
    methods: {
      logout () {
        var r = confirm("logged out!");
        if (r == true) {
          this.$store.dispatch('signOut').then(() => {
          location.href = '/';
        })
        }else{
          this.menu = false
        }
      },
      listLogo() {
          db2.collection('logoutama').doc('logonirwana').get().then((doc) => {
            const data = {
              id: doc.id,
              nama_logoutama: doc.data().nama_logoutama,
              image: doc.data().image
            }
            this.logonirwana = data
          })
      }
    }
  }
</script>
