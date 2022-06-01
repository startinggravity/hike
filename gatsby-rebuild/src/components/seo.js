/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import defaultImagePath from "../assets/images/hike-with-gravity-logo.jpg"

function SEO({
  description,
  keywords,
  lang,
  meta,
  title,
  category,
  nodePath,
  nodeImage,
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  // const defaultTitle = site.siteMetadata.title
  // const metaKeywords = keywords || site.siteMetadata.keywords
  const defaultImage = `${site.siteMetadata.siteUrl}${defaultImagePath}`
  const defaultUrl = site.siteMetadata.siteUrl
  const blogPath = site.siteMetadata.siteUrl + nodePath
  const imagePath = site.siteMetadata.siteUrl + nodeImage
  const url = blogPath + `/` || defaultUrl
  const metaImage = imagePath || defaultImage
  const metaTitle = title || site.siteMetadata.title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `HandheldFriendly`,
          content: `true`,
        },
        {
          name: `MobileOptimized`,
          content: `width`,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `thumbnail`,
          content: metaImage,
        },
        {
          property: `image`,
          content: metaImage,
        },
        {
          property: `og:site_name`,
          content: `Hike with Gravity`,
        },
        {
          property: `og:title`,
          content: metaTitle,
        },
        {
          property: `og:url`,
          content: url,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: metaImage,
        },
        {
          property: `og:image:type`,
          content: `image/jpeg`,
        },
        {
          name: `og:image:alt`,
          content: metaTitle,
        },
        {
          name: `og:image:width`,
          content: `1200`,
        },
        {
          name: `og:image:height`,
          content: `675`,
        },
        {
          property: `article:author`,
          content: `641895471`,
        },
        {
          property: `article:publisher`,
          content: `https://www.facebook.com/jim.smith`,
        },
        {
          name: `twitter:site`,
          content: `@hikewithgravity`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          property: `twitter:image`,
          content: metaImage,
        },
        {
          name: `twitter:site:id`,
          content: `2986914490`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:creator:id`,
          content: `2986914490`,
        },
        {
          name: `twitter:title`,
          content: metaTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image:alt`,
          content: metaTitle,
        },
        {
          name: `twitter:image:width`,
          content: `600`,
        },
        {
          name: `twitter:image:height`,
          content: `338`,
        },
        {
          name: `news_keywords`,
          content: `backpacking, hiking, Appalachian Trail, Continental Divide Trail, Pacific Crest Trail, AT, PCT, CDT, long distance hiking, thru-hiking`,
        },
        {
          name: `keywords`,
          content: `backpacking, hiking, Appalachian Trail, Continental Divide Trail, Pacific Crest Trail, AT, PCT, CDT, long distance hiking, thru-hiking`,
        },
        {
          name: `google-site-verification`,
          content: `x_GeJdd3hdrVD476zhxG_VKS_kITt0_24ILpqhfkPhk`,
        },
        {
          property: `fb:app_id`,
          content: `1224500344298525`,
        },
        {
          property: `fb:admins`,
          content: `641895471`,
        },
        // {
        //   name: `keywords`,
        //   content: metaKeywords.join(", "),
        // },
        {
          name: `robots`,
          content: `index, follow`,
        },
        {
          name: `referrer`,
          content: `no-referrer-when-downgrade`,
        },
        {
          name: `rights`,
          content: `This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License.`,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
