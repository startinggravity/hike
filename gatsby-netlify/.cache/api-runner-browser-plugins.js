module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Hike with Gravity","short_name":"Gravity","start_url":"/","background_color":"#8eb48c","theme_color":"#8eb48c","display":"minimal-ui","icon":"src/assets/images/hike_with_gravity.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"5b87d110c9fc8aa7f245a0aef44ac903"},
    },{
      plugin: require('../node_modules/gatsby-plugin-google-gtag/gatsby-browser.js'),
      options: {"plugins":[],"trackingIds":["UA-91337611-1"],"gtagConfig":{"anonymize_ip":true,"cookie_expires":0},"pluginConfig":{"head":true,"respectDNT":true,"exclude":["/preview/**","/do-not-track/me/too/"],"origin":"https://www.googletagmanager.com"}},
    },{
      plugin: require('../node_modules/gatsby-plugin-offline/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby/dist/internal-plugins/partytown/gatsby-browser.js'),
      options: {"plugins":[]},
    }]
