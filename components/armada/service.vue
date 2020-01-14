<template>
<section>
  <v-container grid-list-xl>
  <v-layout row wrap>
    <v-flex xs12 sm4 v-for="armada in armada" :key="armada.id">
      <v-hover>
        <v-card
          slot-scope="{ hover }"
          class="mx-auto"
          color="grey lighten-4"
          max-width="600"
        >
          <v-img
            :aspect-ratio="4/3"
            :src=armada.image
          >
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out orange darken-2 px-4 py-3 v-card--reveal body-2 white--text"
                style="height: 100%;"
              >
                {{armada.desc_armada}}
              </div>
            </v-expand-transition>
          </v-img>
          <v-card-text
            class="pt-4"
            style="position: relative;"
          >
            <v-btn
              absolute
              color="red"
              class="white--text"
              fab
              right
              top
              @click="$router.push('/armada/'+ armada.id)"
            >
              <v-icon>mdi-cart</v-icon>
            </v-btn>
            <h3 class="display-1 font-weight-light red--text mb-2">{{armada.nama_armada}}</h3>
            <div class="font-weight-light title mb-2">
              {{armada.slogan_armada}}
            </div>
          </v-card-text>
        </v-card>
  </v-hover>
    </v-flex>
  </v-layout>
  </v-container>
</section>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import {auth,db2} from '@/services/fireinit.js'
  const armadaRef = db2.collection('armada');
  export default {
    computed: {
      armada : function (){
        return this.$store.getters['armadaStore/activeArmada']
      }
    },
    data () {
      return {

      }
    },
    mounted(){
        this.listData()
    },
    methods: {
      listData()  {
        this.$store.dispatch('armadaStore/actionListArmada')
      },  
      ambilslug(){
        this.id = this.$route.params.armada 
      }
    }
  }
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .8;
  position: absolute;
  width: 100%;
  letter-spacing: 0px;
}
</style>