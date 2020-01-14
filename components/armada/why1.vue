<template>
<section>
  <v-card color="black">
    <v-container grid-list-lg>
      <v-layout row wrap>
              <v-flex xs12 text-xs-center>
                <div class="headline font-weight-bold">
                  Kami menjamin bahwa seluruh Armada Nirwana Bus
                </div>
              </v-flex>
              <v-flex xs12 sm3 text-xs-center v-for="advantagearmada in advantagearmada" :key="advantagearmada.id">
                <v-card class="px-3 py-3 cardcustom" color="orange darken-4">
                  <v-icon size="75" class="my-3" color="white">{{advantagearmada.icon_advantagearmada}}</v-icon>
                    <div>
                      <h3 class="title my-3 white--text">{{advantagearmada.judul_advantagearmada}}</h3>
                    </div>
                </v-card>
              </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</section>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import {auth,db2} from '@/services/fireinit.js'
  const advantagearmadaRef = db2.collection('advantagearmada');
  export default {
    computed: {
      advantagearmada : function (){
        return this.$store.getters['advantagearmadaStore/activeAdvantagearmada']
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
        this.$store.dispatch('advantagearmadaStore/actionListAdvantagearmada')
      },  
      ambilslug(){
        this.id = this.$route.params.advantagearmada 
      }
    }
  }
</script>

<style>
.cardcustom {
  border-style: solid;
  border-radius: 30px;
  border-width: 0px;
  background: rgb(250, 152, 61)
}
</style>