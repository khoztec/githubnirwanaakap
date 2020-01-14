<template>
  <section>
        <v-img :src=visimisi.image height="480" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
            <v-layout
            align-center
            column
            justify-center
            class="shadowtext overlay2"
            >
                <h1 class="display-2 font-weight-bold mb-3 text-xs-center">{{visimisi.judul_header}}</h1>
                <h4 class="title align-center text-xs-center">{{visimisi.slogan_header}}</h4>
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
        visimisi: ''
      }
    },
    mounted(){
        this.listHeader()
    },
    methods: {
      listHeader() {
          db2.collection('header').doc('visimisi').get().then((doc) => {
            const data = {
              id: doc.id,
              judul_header: doc.data().judul_header,
              slogan_header: doc.data().slogan_header,
              image: doc.data().image
            }
            this.visimisi = data
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