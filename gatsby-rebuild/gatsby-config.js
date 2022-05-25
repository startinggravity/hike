module.exports = {
  siteMetadata: {
    title: `Hike with Gravity`,
    siteUrl: `https://hikewithgravity.com`,
    description: `The hiking journal of Jim 'Gravity' Smith, a Triple Crown thru-hikers (Appalachian Trail 2017, Pacific Crest Trail 2019, and Continental Divide Trail 2021).`,
    author: `Jim 'Gravity' Smith`,
    social: {
      twitter: `@hikewithgravity`,
      facebook: `jim.smith`,
    },
    keywords: [
      `Pacific Crest Trail`,
      `Appalachian Trail`,
      `Continental Divide Trail`,
      `Triple Crown`,
      `Benton MacKaye Trail`,
      `Pinhoti Trail`,
      `Great Smoky Mountains`,
      `backpacking`,
      `hiking`,
      `thru-hiking`,
      `long distance hiking`,
      `blog`,
    ],
  },
  trailingSlash: "always",
  plugins: [
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `https://dev-hike-with-gravity.pantheonsite.io/`,
        skipFileDownloads: true,
        concurrentFileRequests: 20,
        fastBuilds: true,
        disallowedLinkTypes: [
          `self`,
          `describedby`,
          `contact_message--feedback`,
          `contact_message--personal`,
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Hike with Gravity`,
        short_name: `Gravity`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/hike_with_gravity.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://hikewithgravity.us15.list-manage.com/subscribe/post?u=ff584127a6439f807d508408a&amp;id=199af66482",
        timeout: 3500,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "UA-91337611-1", // Google Analytics / GA
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ["/preview/**", "/do-not-track/me/too/"],
          // Defaults to https://www.googletagmanager.com
          origin: "https://www.googletagmanager.com",
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: false,
        develop: false,
        tailwind: true,
        purgeCSSOptions: {
          safelist: [
            "search-results-page",
            "HitCount",
            "ais-SearchBox",
            "ais-SearchBox-submitIcon",
            "ais-SearchBox-resetIcon",
            "ais-SearchBox-input",
            "ais-SearchBox-submit",
            "ais-Hits",
            "ais-Hits-list",
            "ais-Hits-item",
            "ais-PoweredBy",
            "ais-Pagination",
            "ais-Pagination-link",
            "ais-Pagination-link--selected",
            "ais-Pagination-item",
            "ais-Pagination-item--firstPage",
            "ais-Pagination-item--nextPage",
            "ais-Pagination-item--disabled",
          ],
        },
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: require(`./gatsby-plugin-algolia-config.js`),
    },
  ],
}
