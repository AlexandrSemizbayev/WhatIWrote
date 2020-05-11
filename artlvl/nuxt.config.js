
export default {
  mode: 'universal',
  // mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name:'keywords', content:'Фотосъемка, съемка, фотограф, Алматы, детский, репортаж, Фуфачева, Алена'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    
  ],
  
  /*
  ** Nuxt.js modules
  */
  modules: [

    [
      '@nuxtjs/firebase',
    {
      config:{
          //firebase config data here
      },
      services: {
        auth: true,
        // firestore: true,
        // functions: true,
        storage: true,
        realtimeDb: true,
        // messaging: true,
        // performance: true,
        // analytics: true,
        // remoteConfig: true
      }      
    },
    
  
  
    ]
  ],
  /*
  ** Build configuration
  */
  build: {
    // vendor: [
    //   'firebase'
    // ],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}