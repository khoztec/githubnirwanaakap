const pkg = require('./package')


const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      },
      { rel: 'stylesheet', href: 'https://cdn.materialdesignicons.com/2.1.19/css/materialdesignicons.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/hover.css/2.3.1/css/hover-min.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],
  router: {
    middleware: 'router-auth',
    // mode: 'history'
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    // '~/plugins/moment.js',
    '~/plugins/fireauth.js',
    { src: '~/plugins/vue2-editor', ssr: false },
    {src: '~/plugins/excel.js', ssr: false }

  ],
  modules: [
    '@nuxtjs/toast',
    ['@nuxtjs/moment', { locales: ['id'], defaultLocale: 'id' }]
  ],
  toast: {
    duration: 3000,
    action: { 'text': '×',
      'onClick': (e, toast) => {
        toast.goAway(0)
      } },
    position: 'top-right',
    'theme': 'bubble'
  },
  /*
  ** Nuxt.js modules
  */
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  buildDir: 'nuxt',
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },
    
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
