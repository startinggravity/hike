const path = require("path")

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Hike with Gravity`,
    siteUrl: `https://hikewithgravity.com`,
    description: `The hiking journal of Jim 'Gravity' Smith, who completed thru-hikes of the Appalachian Trail in 2017 and the Pacific Crest Trail in 2019.`,
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
      `Great Smoky Mountains`,
      `backpacking`,
      `hiking`,
      `trail`,
      `long distance hiking`,
      `blog`,
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: `https://hikewithgravity.com`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-prefetch-google-fonts`,
    //   options: {
    //     fonts: [
    //       {
    //         family: `Quattrocento Sans`,
    //         variants: [`400`, `700`],
    //       },
    //       {
    //         family: `Work Sans`,
    //         variants: [`600`],
    //       },
    //     ],
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-webfonts`,
    //   options: {
    //     fonts: {
    //       google: [
    //         {
    //           family: `Quattrocento Sans`,
    //           variants: [`400`, `700`],
    //         },
    //         {
    //           family: `Work Sans`,
    //           variants: [`600`],
    //         },
    //       ],
    //     },
    //     usePreload: true,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allNodeBlog } }) =>
              allNodeBlog.edges.map(edge =>
                Object.assign({}, edge.node.id, {
                  id: edge.node.id,
                  description:
                    edge.node.field_summary.processed +
                    '<p>Continue reading at <a href="' +
                    site.siteMetadata.siteUrl +
                    edge.node.path.alias +
                    '">' +
                    site.siteMetadata.siteUrl +
                    edge.node.path.alias +
                    "</a></p>",
                  title: edge.node.title,
                  url: site.siteMetadata.siteUrl + edge.node.path.alias,
                  enclosure: edge.node.relationships.field_main_image
                    .localFile && {
                    url:
                      site.siteMetadata.siteUrl +
                      edge.node.relationships.field_main_image.localFile.cis.f
                        .src,
                  },
                  guid: site.siteMetadata.siteUrl + edge.node.path.alias,
                  custom_elements: [
                    { pubDate: edge.node.created + " " + "GMT" },
                  ],
                })
              ),
            query: `
              {
                allNodeBlog(
                  filter: { status: { eq: true } }
                  sort: { fields: [created], order: [DESC] }
                  limit: 10
                ) {
                  edges {
                    node {
                      id
                      title
                      status
                      created(formatString: "ddd, DD MMM YYYY hh:mm:ss")
                      nid: drupal_internal__nid
                      path {
                        alias
                      }
                      field_summary {
                        processed
                      }
                      relationships {
                        field_main_image {
                          localFile {
                            cis: childImageSharp {
                              f: fixed(width: 600, height: 338) {
                                src
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: "/hikes.xml",
            title: "Hike with Gravity RSS Feed",
            link: "https://hikewithgravity.com/hikes.xml",
            match: "^/hikes/",
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Hike with Gravity`,
        short_name: `Gravity`,
        start_url: `/`,
        background_color: `#8EB48B`,
        theme_color: `#8EB48B`,
        display: `minimal-ui`,
        icon: `src/assets/images/hike_with_gravity.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: require(`./gatsby-plugin-algolia-config.js`),
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://hikewithgravity.us15.list-manage.com/subscribe/post?u=ff584127a6439f807d508408a&amp;id=199af66482",
        timeout: 3500,
      },
    },
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: "https://dev-hike-with-gravity.pantheonsite.io/",
        concurrentFileRequests: 5,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-91337611-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        // exclude: ["/preview/**", "/do-not-track/me/too/"],
        // // Delays sending pageview hits on route update (in milliseconds)
        // pageTransitionDelay: 0,
        // // Enables Google Optimize using your container Id
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // // Enables Google Optimize Experiment ID
        // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // // Set Variation ID. 0 for original 1,2,3....
        // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // // Defers execution of google analytics script after page load
        // defer: false,
        // // Any additional optional fields
        // sampleRate: 5,
        // siteSpeedSampleRate: 10,
        // cookieDomain: "example.com",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
