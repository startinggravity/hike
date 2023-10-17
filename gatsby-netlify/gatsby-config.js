const siteUrl = `https://hikewithgravity.com`

module.exports = {
  siteMetadata: {
    title: `Hike with Gravity`,
    siteUrl: `https://hikewithgravity.com`,
    description: `The hiking journal of Jim 'Gravity' Smith, a Triple Crown thru-hiker (Appalachian Trail 2017, Pacific Crest Trail 2019, and Continental Divide Trail 2021).`,
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
      `Bartram Trail`,
      `Foothills Trail`,
      `Art Loeb Trail`,
      `Great Smoky Mountains`,
      `backpacking`,
      `hiking`,
      `thru-hiking`,
      `long-distance hiking`,
      `blog`,
    ],
  },
  trailingSlash: "always",
  plugins: [
    `gatsby-plugin-netlify`,
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
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `blurred`,
          quality: 50,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    `gatsby-transformer-sharp`,
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
                  filter: {status: {eq: true}}
                  sort: {drupal_internal__nid: ASC}
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
            title: "Hike with Gravity",
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
          // "", // Google Ads / Adwords / AW
          // "", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          // optimize_id: "",
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
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allNodeBlog(
            sort: {changed: DESC}
            filter: {moderation_state: {eq: "published"}}
          ) {
            edges {
              node {
                changed
                path {
                  alias
                }
              }
            }
          }
        }`,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({ allNodeBlog }) => {
          const posts = allNodeBlog.edges.map(edge => {
            return {
              path: edge.node.path.alias + '/',
              lastmod: edge.node.changed,
            }
          })

          const home = {
            path: "/",
            lastmod: posts[0].lastmod,
          }

          return [...posts, home]
        },
        serialize: ({ path, lastmod, changefreq, priority }) => {
          return {
            url: path,
            lastmod,
            changefreq,
            priority,
          }
        },
      },
    },
  ],
}
