var plugins = [{
      name: 'gatsby-plugin-gatsby-cloud',
      plugin: require('/Users/startinggravity/Documents/Development/Sites/hike_blog/github/gatsby-rebuild/node_modules/gatsby-plugin-gatsby-cloud/gatsby-ssr.js'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-plugin-react-helmet',
      plugin: require('/Users/startinggravity/Documents/Development/Sites/hike_blog/github/gatsby-rebuild/node_modules/gatsby-plugin-react-helmet/gatsby-ssr.js'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-plugin-image',
      plugin: require('/Users/startinggravity/Documents/Development/Sites/hike_blog/github/gatsby-rebuild/node_modules/gatsby-plugin-image/gatsby-ssr.js'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-plugin-manifest',
      plugin: require('/Users/startinggravity/Documents/Development/Sites/hike_blog/github/gatsby-rebuild/node_modules/gatsby-plugin-manifest/gatsby-ssr.js'),
      options: {"plugins":[],"name":"Hike with Gravity","short_name":"Gravity","start_url":"/","background_color":"#8eb48c","theme_color":"#8eb48c","display":"minimal-ui","icon":"src/assets/images/hike_with_gravity.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"5b87d110c9fc8aa7f245a0aef44ac903"},
    },{
      name: 'gatsby-plugin-feed',
      plugin: require('/Users/startinggravity/Documents/Development/Sites/hike_blog/github/gatsby-rebuild/node_modules/gatsby-plugin-feed/gatsby-ssr.js'),
      options: {"plugins":[],"query":"\n          {\n            site {\n              siteMetadata {\n                title\n                description\n                siteUrl\n              }\n            }\n          }\n        ","feeds":[{"query":"\n              {\n                allNodeBlog(\n                  filter: { status: { eq: true } }\n                  sort: { fields: [created], order: [DESC] }\n                  limit: 10\n                ) {\n                  edges {\n                    node {\n                      id\n                      title\n                      status\n                      created(formatString: \"ddd, DD MMM YYYY hh:mm:ss\")\n                      nid: drupal_internal__nid\n                      path {\n                        alias\n                      }\n                      field_summary {\n                        processed\n                      }\n                      relationships {\n                        feedimg: field_main_image {\n                          gatsbyImage(layout: FIXED, width: 600, height: 338, formats: JPG)\n                          publicUrl\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            ","output":"/hikes.xml","title":"Hike with Gravity","link":"https://hikewithgravity.com/hikes.xml","match":"^/hikes/"}]},
    },{
      name: 'gatsby-plugin-google-gtag',
      plugin: require('/Users/startinggravity/Documents/Development/Sites/hike_blog/github/gatsby-rebuild/node_modules/gatsby-plugin-google-gtag/gatsby-ssr.js'),
      options: {"plugins":[],"trackingIds":["UA-91337611-1","",""],"gtagConfig":{"optimize_id":"","anonymize_ip":true,"cookie_expires":0},"pluginConfig":{"head":true,"respectDNT":true,"exclude":["/preview/**","/do-not-track/me/too/"],"origin":"https://www.googletagmanager.com"}},
    },{
      name: 'gatsby-plugin-offline',
      plugin: require('/Users/startinggravity/Documents/Development/Sites/hike_blog/github/gatsby-rebuild/node_modules/gatsby-plugin-offline/gatsby-ssr.js'),
      options: {"plugins":[]},
    },{
      name: 'partytown',
      plugin: require('/Users/startinggravity/Documents/Development/Sites/hike_blog/github/gatsby-rebuild/node_modules/gatsby/dist/internal-plugins/partytown/gatsby-ssr.js'),
      options: {"plugins":[]},
    }]
/* global plugins */
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

function augmentErrorWithPlugin(plugin, err) {
  if (plugin.name !== `default-site-plugin`) {
    // default-site-plugin is user code and will print proper stack trace,
    // so no point in annotating error message pointing out which plugin is root of the problem
    err.message += ` (from plugin: ${plugin.name})`
  }

  throw err
}

export function apiRunner(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  plugins.forEach(plugin => {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      return
    }

    try {
      const result = apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  })

  return results.length ? results : [defaultReturn]
}

export async function apiRunnerAsync(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  for (const plugin of plugins) {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      continue
    }

    try {
      const result = await apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  }

  return results.length ? results : [defaultReturn]
}
