<template>
  <section>
  <v-img :src="armada.image" gradient="to top, rgba(255, 255, 255), rgba(0, 0, 0, 0.1)" contain>
    <v-layout align-center justify-center row wrap fill-height>
      <v-flex xs12 text-xs-center class="display-2 font-weight-bold">
        <h1 class="display-2 font-weight-bold mb-3 text-xs-center"> {{armada.judul_header}}</h1>
      <h4 class="title align-center text-xs-center">{{armada.slogan_header}}</h4>
      </v-flex>
    </v-layout>
  </v-img>
  </section>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import {auth,db2} from '@/services/fireinit.js'
  const headerRef = db2.collection('header')
  const logogroupRef = db2.collection('logogroup')
  export default {
    computed: {
      header : function (){
        return this.$store.getters['headerStore/activeHeader']
      },
      logogroup : function (){
        return this.$store.getters['logogroupStore/activeLogogroup']
      }
    },
    data () {
      return {
        title: 'Nirwana Prototype',
        nirwana: '',
        armada: '',
        dialog: false,
        valid: false,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => v.length <= 10 || 'Name must be less than 10 characters'
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        links: [
          { title: 'Home', to: '/', icon: 'mdi-file-lock' },
          { title: 'Armada', to: '/armada', icon: 'mdi-tag-plus' },
          { title: 'Info Pembayaran', to: '/payment', icon: 'mdi-credit-card' },
          { title: 'Galeri', to: '/gallery', icon: 'mdi-book-open' },
          { title: 'Tentang Kami', to: '/about', icon: 'mdi-account-group' },
          { title: 'Kontak', to: '/contact', icon: 'mdi-comment-question' }
        ]
      }
    },
    mounted(){
        this.listHeader()
    },
    methods: {
      listHeader() {
          db2.collection('header').doc('armada').get().then((doc) => {
            const data = {
              id: doc.id,
              nama_header: doc.data().nama_header,
              judul_header: doc.data().judul_header,
              slogan_header: doc.data().slogan_header,
              image: doc.data().image
            }
            this.armada = data
          })
      },
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
  background-color: #0a5c9e7a !important;
}
</style>
