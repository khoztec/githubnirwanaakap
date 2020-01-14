<template>
  <section>
    <v-parallax :src=id_armada.image height="400">

    </v-parallax>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>
            <v-layout row wrap>
                <v-flex xs12 class="my-4" text-xs-center>
                    <div class="display-1 font-weight-bold">
                        {{id_armada.nama_armada}}
                    </div>
                </v-flex>
                <v-flex xs12 class="my-4" text-xs-center>
                    <div class="title font-weight-light">
                        {{id_armada.desc_armada}}
                    </div>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 sm8>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-carousel hide-delimiters height="auto">
                        <v-carousel-item
                        v-for="fotoarmada in fotoarmada"
                        :key="fotoarmada.id"
                        >
                        <img :src="fotoarmada.image" width="100%">
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
                <v-flex xs12 class="my-4" text-xs-center>
                    <div class="display-1 font-weight-bold">
                        Fitur
                    </div>
                </v-flex>
                <v-flex xs6 sm3 text-xs-center>
                    <v-card class="elevation-5 pa-2">
                        <v-icon large color="error">
                        mdi-seat-recline-extra
                        </v-icon>
                        <div class="subheadline font-weight-bold">
                        {{ id_armada.seat_armada }} Seat
                        </div>
                    </v-card>
                </v-flex>
                <v-flex 
                xs6 sm3 text-xs-center
                v-for="features in features"
                :key="features.title">
                    <v-card class="elevation-5 pa-2">
                        <v-icon large color="error">
                        {{ features.icon }}
                        </v-icon>
                        <div class="subheadline font-weight-bold">
                        {{ features.title }}
                        </div>
                    </v-card>
                </v-flex>
                <!-- <v-flex xs12 class="my-4">
                    <div class="display-1 font-weight-bold">
                        Quick Booking
                    </div>
                </v-flex>
                <v-flex xs6>
                    <v-menu
                        ref="menu"
                        :close-on-content-click="false"
                        v-model="menu"
                        :nudge-right="40"
                        :return-value.sync="date"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                    >
                    <v-text-field
                        slot="activator"
                        v-model="date"
                        label="Pilih Tanggal Berangkat"
                        box
                        ></v-text-field>
                        <v-date-picker v-model="date" @input="$refs.menu.save(date)"></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs6>
                    <v-menu
                        ref="menu2"
                        :close-on-content-click="false"
                        v-model="menu2"
                        :nudge-right="40"
                        :return-value.sync="date2"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                    >
                    <v-text-field
                        slot="activator"
                        v-model="date2"
                        label="Pilih Tanggal Kembali"
                        box
                        ></v-text-field>
                        <v-date-picker v-model="date2" @input="$refs.menu2.save(date2)"></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs6>
                    <v-btn block large color="success">
                        Confirm
                    </v-btn>
                </v-flex> -->
            </v-layout>
        </v-flex>
        <v-flex xs12 sm4>
            <v-layout row wrap>
                <v-flex xs12>
                  <div v-html="id_armada.details_armada"></div>
                </v-flex>
            </v-layout>
        </v-flex>
        <!-- <info /> -->
      </v-layout>
    </v-container>
  </section>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import {auth,db2} from '@/services/fireinit.js'
  const armadaRef = db2.collection('armada')
  export default {
    computed: {
      armada : function (){
        return this.$store.getters['armadaStore/activeArmada']
      },
      fotoarmada : function (){
        return this.$store.getters['fotoarmadaStore/activeFotoarmada']
      }
    },
    layout: 'default',
    data () {
      return {
        date: null,
        date2: null,
        menu: false,
        modal: false,
        menu2: false,
        id_armada: '',
        nama_armada: '',
        image: '',
        features: [
          { title: 'Full AC', icon: 'mdi-air-conditioner' },
          { title: 'Entertainment', icon: 'mdi-library-music' },
          { title: 'Large Baggage', icon: 'mdi-wallet-travel' },
        ],
        search: '',
      }
    },
    mounted(){
        this.listItem()
        this.listFotoarmada()
    },
    methods: {
        listData()  {
            this.$store.dispatch('armadaStore/actionListArmada', {id_armada : this.$route.params.id})
        },
        listFotoarmada() {
            this.$store.dispatch('fotoarmadaStore/actionListFotoarmada', {id_armada : this.$route.params.id})
        },
        listItem() {
          var id_armada = this.$route.params.id
          db2.collection('armada').doc(id_armada).get().then((doc) => {
            const data = {
              id: doc.id,
              nama_armada: doc.data().nama_armada,
              seat_armada: doc.data().seat_armada,
              desc_armada: doc.data().desc_armada,
              details_armada: doc.data().details_armada,
              image: doc.data().image
            }
            this.id_armada = data
          })
        }
    }
  }
</script>
