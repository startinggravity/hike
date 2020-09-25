const path = require("path")

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Hike with Gravity`,
    siteUrl: `https://hikewithgravity.com`,
    description: `The hiking journal of Jim 'Gravity' Smith, who completed a thru-hike of the Appalachian Trail in 2017 and the Pacific Crest Trail in 2019.`,
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
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Quattrocento Sans`,
            variants: [`400`, `700`],
          },
          {
            family: `Work Sans`,
            variants: [`600`],
          },
        ],
      },
    },
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
            serialize: ({ query: { site, allNodeBlog } }) => allNodeBlog.edges.map(edge => Object.assign({}, edge.node.id, {
              id: edge.node.id,
              description: edge.node.field_summary.processed + "Continue reading at " + site.siteMetadata.siteUrl + edge.node.path.alias,
              title: edge.node.title,
              url: site.siteMetadata.siteUrl + edge.node.path.alias,
              guid: site.siteMetadata.siteUrl + edge.node.path.alias,
              custom_elements: [{ pubDate: edge.node.fields.created_formatted }]
            })),
            query: `
              {
                allNodeBlog(
                  filter: { status: { eq: true } }
                  sort: { fields: [created], order: [ASC] }
                ) {
                  edges {
                    node {
                      id
                      title
                      status
                      nid: drupal_internal__nid
                      path {
                        alias
                      }
                      field_summary {
                        processed
                      }
                    }
                  }
                }
              }
            `,
            output: "/hikes.xml",
            title: "RSS Feed | Hike with Gravity",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname
            // of current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/hikes/",
          },
        ],
      }
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
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
