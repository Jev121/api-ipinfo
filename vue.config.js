module.exports = {
  devServer: {
    allowedHosts: 'all',
  },
  pwa: {
    name: 'IP Address Lookup',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      cacheId: 'pwa-sample',
      swDest: 'service-worker.js',
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24
            },
            fetchOptions: {
              mode: 'cors',
            },
            matchOptions: {
              ignoreSearch: false,
            },
          }
        }
      ]
    }
  }
}