<template>
  <section>
    <v-card>
      <header1 />
            <v-container grid-list-xl>
              <v-layout row wrap justify-center class="py-5">
                <v-flex xs12 sm4 v-for="armada in armada" :key="armada.id">
                  <v-hover>
                    <v-card slot-scope="{ hover }">
                      <v-img :src=armada.image aspect-ratio="1" gradient="to top right, rgba(0, 0, 0, 0.34), rgba(0, 0, 0, 0.9)">
                        <v-layout row wrap align-center justify-center fill-height>
                          <v-flex xs12 text-xs-center class="pa-5">
                            <div class="display-1 font-weight-bold white--text">
                              {{armada.nama_armada}}
                            </div>
                            <div class="subheadline font-weight-bold white--text">
                              {{armada.slogan_armada}}
                            </div>
                          </v-flex>
                        </v-layout>
                        <v-expand-transition>
                          <v-card
                            v-if="hover"
                            class="transition-fast-in-fast-out align-center justify-center red darken-1 px-4 py-3 v-card--reveal body-2 white--text"
                            style="height: 100%;"
                          >
                            <v-container fill-height fluid grid-list-md>
                              <v-card color="transparent" dark class="elevation-0">
                                <v-card-text class="text-xs-justify">
                                  {{armada.desc_armada}}
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    color="red"
                                    large
                                    class="white--text"
                                    @click="$router.push('/armada/'+ armada.id)"
                                  >
                                    <v-icon>mdi-cart</v-icon>
                                  </v-btn>
                                  <v-spacer></v-spacer>
                                </v-card-actions>
                              </v-card>
                            </v-container>
                          </v-card>
                        </v-expand-transition>
                      </v-img>
                    </v-card>
                  </v-hover>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 text-xs-center>
                    <div class="display-1 font-weight-bold">
                        Kami menjamin Armada Bus Nirwana:
                    </div>
                </v-flex>
                <v-flex xs12 sm4 text-xs-center class="mt-3" v-for="advantagearmada in advantagearmada" :key="advantagearmada.id">
                  <v-card class="elevation-0">
                    <v-container fluid grid-list-sm>
                      <v-layout row wrap align-center>
                        <v-flex xs3 text-xs-center>
                          <v-btn color="error" fab dark>
                            <v-icon color="white">
                              {{ advantagearmada.icon_advantagearmada }}
                            </v-icon>
                          </v-btn>
                        </v-flex>
                        <v-flex xs9 text-xs-center>
                          <div class="font-weight-bold headline">
                            {{ advantagearmada.judul_advantagearmada }}
                          </div>
                        </v-flex>
                        <v-flex xs12 text-xs-justify class="mt-3">
                            {{ advantagearmada.isi_advantagearmada }}
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-flex>
            </v-layout>
            </v-container>
    </v-card>
  </section>
</template>

<script>
  import header1 from '~/components/armada/header1.vue'
  import { mapState, mapActions, mapGetters } from 'vuex'
  import {auth,db2} from '@/services/fireinit.js'
  const armadaRef = db2.collection('armada')
  const headerRef = db2.collection('header')
  const logogroupRef = db2.collection('logogroup')
  export default {
    components: {
      header1
    },
    computed: {
      header : function (){
        return this.$store.getters['headerStore/activeHeader']
      },
      logogroup : function (){
        return this.$store.getters['logogroupStore/activeLogogroup']
      },
      armada : function (){
        return this.$store.getters['armadaStore/activeArmada']
      },
      advantagearmada : function (){
        return this.$store.getters['advantagearmadaStore/activeAdvantagearmada']
      }
    },
    data () {
      return {
        title: 'Nirwana Prototype',
        nirwana: '',
        dialog: false,
        valid: false,
        name: '',
      }
    },
    mounted(){
        this.listHeader()
        this.listData()
        this.listAdvantage()
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
            this.header = data
          })
      },
      listData()  {
        this.$store.dispatch('armadaStore/actionListArmada')
      },
      listAdvantage()  {
        this.$store.dispatch('advantagearmadaStore/actionListAdvantagearmada')
      },
      ambilslug(){
        this.id = this.$route.params.armada 
      }
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
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 1;
  position: absolute;
  width: 100%;
  letter-spacing: 0px;
}
</style>

