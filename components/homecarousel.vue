<template>
  <v-card class="customcolor animated fadeInRightBig hidden-sm-and-down">
    <v-layout row wrap>
        <v-flex xs12>
            <v-carousel fixed hide-delimiters height="640px">
              <v-carousel-item
              v-for="carousel in carousel" :key="carousel.id"
              >
                <v-img :src=carousel.image width="100%">
                </v-img>
              </v-carousel-item>
            </v-carousel>
        </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
  export default {
    computed: {
      carousel : function (){
        return this.$store.getters['carouselStore/activeCarousel']
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
        this.$store.dispatch('carouselStore/actionListCarousel')
    }
  }
}
</script>

<style scoped>
.customcolor {
  background-color: #96c5df
}
</style>
