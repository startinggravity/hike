import React from "react"
import { graphql } from "gatsby"
import uuid from "react-uuid"
import { componentResolver } from "../../helpers/component-resolver"
import Cover from "../../components/cover"
import Body from "../../components/field/body"
import PropTypes from "prop-types"
import { Embed } from "hyvor-talk-react"
import Seo from "../../components/seo"
import Layout from "../../components/layout"
import GearMenu from "../../components/gear-menu"

const NodeBlogTemplate = ({ data: { node }, pageContext }) => {
  const { title, subtitle } = node
  const components = componentResolver(node?.relationships?.field_body_elements)
  let subTitle = ""
  let fullTitle = ""
  // let gearTitle = title + ": " + subtitle
  const blogType = node.type.tid
  const socialImageSrc = node.relationships.social.publicUrl
  let contentType = ""

  if (node.type.tid === 1) {
    contentType = "main-content hike-blog-page"
    fullTitle = node.rel.cat.name + ": " + title
    subTitle = subtitle
  } else if (node.type.tid === 2) {
    contentType = "main-content gear-blog-page"
    fullTitle = subtitle
    subTitle = title
  } else {
    contentType = "main-content about-blog-page"
    fullTitle = node.rel.cat.name + ": " + title
    subTitle = subtitle
  }

  // For previous article.
  const prev = pageContext.prev
    ? {
        url: pageContext.prev.path.alias,
        title: pageContext.prev.title,
      }
    : null
  // For next article.
  const next = pageContext.next
    ? {
        url: pageContext.next.path.alias,
        title: pageContext.next.title,
      }
    : null

  const PrevNextLinks = () => {
    return (
      <nav className="prev-next mt-6">
        <div className="prev-next__prev">
          {prev && (
            <a
              href={prev.url}
              title="Go to the Previous Post"
              className="prev-next__prev--link"
            >
              <div className="prev-next__inner">
                <p>Previous</p>
                <h3>{prev.title}</h3>
              </div>
            </a>
          )}
        </div>
        <div className="prev-next__next">
          {next && (
            <a
              href={next.url}
              title="Go to the Next Post"
              className="prev-next__next--link"
            >
              <div className="prev-next__inner">
                <p>Next</p>
                <h3>{next.title}</h3>
              </div>
            </a>
          )}
        </div>
      </nav>
    )
  }

  return (
    <>
      <Seo
        title={fullTitle}
        description={subTitle}
        nodePath={node.path.alias}
        nodeImage={socialImageSrc}
      />
      <Layout>
        <div className={contentType}>
          <Cover
            title={fullTitle}
            subtitle={subTitle}
            alt={node.alt.alt}
            image={node.relationships.cover.gatsbyImage}
            type={node.type.tid}
          />
          <div className="w-screen py-2.5 bg-white">
            <article className="mx-auto max-w-5xl">
              {blogType === 2 ? <GearMenu /> : ""}
              <Body content={node?.intro?.processed} />
              {components &&
                components.map(item => {
                  return <React.Fragment key={uuid()}>{item}</React.Fragment>
                })}

              <div className="comments mt-6 text-2xl prose mx-auto max-w-3xl px-5 text-gravBlack">
                <h3 className="comments__header">Comments</h3>
                <p className="comments__quote">
                  "Nothing to tell now. Let the words be yours, I'm done with
                  mine."
                  <span>
                    <a href="https://youtu.be/dBFwuXXOSPE">ref.</a>
                  </span>
                </p>
                <Embed
                  websiteId={1614}
                  id={node.path.alias}
                  loadMode="scroll"
                />
              </div>

              {blogType === 1 ? <PrevNextLinks /> : ""}
            </article>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default NodeBlogTemplate

export const query = graphql`
  query nodeBlog($slug: Int) {
    node: nodeBlog(drupal_internal__nid: { eq: $slug }) {
      title
      path {
        alias
      }
      nid: drupal_internal__nid
      intro: field_summary {
        processed
      }
      subtitle: field_secondary_title
      rel: relationships {
        cat: field_blog_category {
          name
        }
      }
      type: field_blog_type {
        tid: drupal_internal__target_id
      }
      alt: field_main_image {
        alt
      }
      relationships {
        cover: field_main_image {
          gatsbyImage(width: 2048, aspectRatio: 1.778)
        }
        social: field_main_image {
          gatsbyImage(layout: FIXED, width: 600, height: 338, formats: JPG)
          publicUrl
        }
        field_body_elements {
          __typename
          ...ParagraphBody
          ...ParagraphHorizontalImage
          ...ParagraphVerticalImage
          ...ParagraphHikeDetails
          ...ParagraphQuotation
        }
      }
    }
  }
`

NodeBlogTemplate.propTypes = {
  /** Content */
  text: PropTypes.shape({
    processed: PropTypes.string,
  }),
  alt: PropTypes.shape({
    alt: PropTypes.string,
  }),
  media: PropTypes.shape({
    /** Image Tag */
    photo: PropTypes.symbol,
  }),
  /* Blog type */
  type: PropTypes.shape({
    tid: PropTypes.number,
  }),
  /** Additional classes. */
  classes: PropTypes.string,
}
