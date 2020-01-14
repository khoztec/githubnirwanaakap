<template>
    <section>
        <header1 />
        <v-card>
          <v-container grid-list-lg>
            <v-layout justify-center row wrap>
              <v-flex xs12 sm6>
                <div class="display-1 text-xs-center font-weight-bold mb-4">
                  Visi
                </div>
                <ul v-for="visi in visi" :key="visi.id">
                  <li>
                    {{visi.nama_visi}}
                  </li>
                </ul>
              </v-flex>
              <v-flex xs12 sm6>
                <v-img :src=visimisi.image_visi class="elevation-7" width="100%">
                </v-img>
              </v-flex>
              <v-flex xs12 text-xs-center class="display-1 font-weight-bold my-4" v-for="motto in motto" :key="motto.id">
                "{{motto.nama_motto}}"
              </v-flex>
              <v-flex xs12 sm6>
                <v-img :src=visimisi.image_misi class="elevation-7" width="100%">

                </v-img>
              </v-flex>
              <v-flex xs12 sm6>
                <div class="display-1 text-xs-center font-weight-bold mb-4">
                  Misi
                </div>
                <ul v-for="misi in misi" :key="misi.id">
                  <li>
                    {{misi.nama_misi}}
                  </li>
                </ul>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
    </section>
</template>

<script>
  import { auth, db2 } from '@/services/fireinit.js'
  import header1 from '~/components/profilsingkat/header1.vue'
  export default {
    components: {
      header1
    },
    computed: {
      misi : function (){
        return this.$store.getters['misiStore/activeMisi']
      },
      visi : function (){
        return this.$store.getters['visiStore/activeVisi']
      },
      motto : function (){
        return this.$store.getters['mottoStore/activeMotto']
      }
    },
    data () {
      return {
        detailprofilsekolah: {},
        visimisi: ''
      }
    },
    mounted(){
        if(!this.visi.length > 0){
        this.listVisi()
      }
      if(!this.misi.length > 0){
        this.listMisi()
      }
      if(!this.motto.length > 0){
        this.listMotto()
      }
        this.listFotoVisiMisi()
    },
    methods: {
      listMisi()  {
         this.$store.dispatch('misiStore/actionListMisi')
      },
      listVisi()  {
         this.$store.dispatch('visiStore/actionListVisi')
      },
      listMotto()  {
         this.$store.dispatch('mottoStore/actionListMotto')
      },
      listFotoVisiMisi() {
          db2.collection('fotovisimisi').doc('visimisi').get().then((doc) => {
            const data = {
              id: doc.id,
              image_visi: doc.data().image_visi,
              image_misi: doc.data().image_misi
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