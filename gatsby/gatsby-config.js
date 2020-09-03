const path = require("path")

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Hike with Gravity`,
    siteUrl: `https://www.hikewithgravity.com`,
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
            variants: [`400`, `700`]
          },
          {
            family: `Work Sans`,
            variants: [`600`]
          },
        ],
      },
    },
    {
    resolve: `@fec/gatsby-plugin-advanced-feed`,
      options: {
        feeds: [
          {
            // Configure the feed; smart defaults are choosen if not set
            author: false, // default: site.siteMetadata.author
            copyright: undefined, // default: "All rights reserved {year}, {site.siteMetadata.author}"
            description: `The hiking journal of Jim 'Gravity' Smith, who completed a thru-hike of the Appalachian Trail in 2017 and the Pacific Crest Trail in 2019.`, // default: site.siteMetadata.description
            email: false, // default: false ➞ no email in feed; undefined ➞ site.siteMetadata.email
            id: `https://www.hikewithgravity.com`, // default: site.siteMetadata.siteUrl
            link: `https://www.hikewithgravity.com`, // default: site.siteMetadata.siteUrl
            title: `Hike with Gravity`, // default: site.siteMetadata.title

            // Add <link> tags in <head> to feeds
            createLinkInHead: true, // `true` for all pages or regular expression to match pathnames

            // Number of articles to include in feed
            limit: 10,

            // Include all pages which `fileAbsolutePath` matches this regular expression
            match: "^/blog/",

            // File names of generated feeds
            output: {
              rss2: "hikes.xml",
              atom: "atom.xml",
              json: "feed.json",
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    // `gatsby-plugin-feed`,
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
