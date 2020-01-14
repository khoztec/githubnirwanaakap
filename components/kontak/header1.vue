<template>
  <section>
    <v-img :src="kontak.image" gradient="to top, rgba(255, 255, 255), rgba(0, 0, 0, 0.1)" contain>
      <v-layout align-center justify-center row wrap fill-height>
        <v-flex xs12 text-xs-center class="display-2 font-weight-bold">
          <h1 class="display-2 font-weight-bold mb-3 text-xs-center"> {{kontak.judul_header}}</h1>
        <h4 class="title align-center text-xs-center">{{kontak.slogan_header}}</h4>
        </v-flex>
      </v-layout>
    </v-img>
  </section>
</template>

<script>
  import {auth,db2} from '@/services/fireinit.js'
  const headerRef = db2.collection('header')
  export default {
    data () {
      return {
        kontak: ''
      }
    },
    mounted(){
        this.listHeader()
    },
    methods: {
      listHeader() {
          db2.collection('header').doc('kontak').get().then((doc) => {
            const data = {
              id: doc.id,
              judul_header: doc.data().judul_header,
              slogan_header: doc.data().slogan_header,
              image: doc.data().image
            }
            this.kontak = data
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
}
</style>