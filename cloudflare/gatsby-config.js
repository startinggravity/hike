const siteUrl = `https://hikewithgravity.com`

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
      `PCT`,
      `Appalachian Trail`,
      `AT`,
      `Continental Divide Trail`,
      `CDT`,
      `Triple Crown`,
      `Benton MacKaye Trail`,
      `Pinhoti Trail`,
      `Great Smoky Mountains`,
      `backpacking`,
      `hiking`,
      `thru-hiking`,
      `long distance hiking`,
      `blog`,
      `Hike with Gravity`
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
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`,
          quality: 50,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Hike with Gravity`,
        short_name: `Gravity`,
        start_url: `/`,
        background_color: `#8eb48c`,
        theme_color: `#8eb48c`,
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
                  enclosure: edge.node.relationships.feedimg.publicUrl && {
                    url:
                      site.siteMetadata.siteUrl +
                      edge.node.relationships.feedimg.publicUrl,
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
                        feedimg: field_main_image {
                          gatsbyImage(layout: FIXED, width: 600, height: 338, formats: JPG)
                          publicUrl
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: "/hikes.xml",
            title: 'Hike with Gravity',
            link: "https://hikewithgravity.com/hikes.xml",
            match: "^/hikes/",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "UA-91337611-1", // Google Analytics / GA
          "", // Google Ads / Adwords / AW
          "", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: "",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ["/preview/**", "/do-not-track/me/too/"],
          // Defaults to https://www.googletagmanager.com
          origin: "https://www.googletagmanager.com",
        },
      },
    },
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
            "ais-SearchBox-reset",
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
            "content--scroll",
            "gear-blog-page",
            "th",
            "gear-list",
            "gear-list__heading",
            "gear-list__table",
            "gear-list__item",
            "gear-list__weight",
            "gear-disclaimer",
            "aria-current",
            "hike-blog-page",
            "about-blog-page",
            "gatsby-image-wrapper",
            "gatsby-image-wrapper-constrained",
            "cover-img",
          ],
        },
      },
    },
    `gatsby-plugin-split-css`,
    {
      resolve: `gatsby-plugin-algolia`,
      options: require(`./gatsby-plugin-algolia-config.js`),
    },
    {
      resolve: `gatsby-plugin-complex-sitemap-tree`,
      options: {
        query: `
          {
            allNodePage {
              edges {
                node {
                  path {
                    alias
                  }
                  changed
                }
              }
            }
            allNodeBlog {
              edges {
                node {
                  path {
                    alias
                  }
                  changed
                  relationships {
                    field_main_image {
                      publicUrl
                    }
                  }
                }
              }
            }
          }`,
        sitemapTree: {
          fileName: "sitemap.xml",
          children: [
            {
              fileName: "sitemap-posts.xml",
              queryName: "allNodeBlog",
              urlsetAnchorAttributes: `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`,
              serializer: edge => ({
                loc: edge.path.alias + "/",
                "image:image": {
                  "image:loc":
                    siteUrl + edge.relationships.field_main_image.publicUrl,
                },
                lastmod: edge.changed,
              }),
            },
            {
              fileName: "sitemap-pages.xml",
              queryName: "allNodePage",
              serializer: edge => ({
                loc: edge.path.alias + "/",
                lastmod: edge.changed,
              }),
            },
          ],
        },
      },
    },
  ],
}
