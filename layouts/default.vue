<template>
  <v-app light>
    <customtoolbar />
    <v-content>
        <nuxt />
    </v-content>
    <customfooter />
  </v-app>
</template>

<script>
import customtoolbar from '~/components/customtoolbar.vue'
import customfooter from '~/components/customfooter.vue'
export default {
  components: {
    customtoolbar,
    customfooter
  },
  mounted(){
    // this.tawk()
  },
  methods:{
    // tawk(){
    //   var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    //   (function(){
    //   var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    //   s1.async=true;
    //   s1.src='https://embed.tawk.to/5c74e5b33341d22d9ce61dfd/default';
    //   s1.charset='UTF-8';
    //   s1.setAttribute('crossorigin','*');
    //   s0.parentNode.insertBefore(s1,s0);
    //   })();
    // }
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
