import React from "react"
import { graphql } from "gatsby"
// import { Helmet } from "react-helmet"
// import Parser from "html-react-parser"
import uuid from "react-uuid"
import { componentResolver } from "../../helpers/component-resolver"
import Cover from "../../components/cover"
import Body from "../../components/field/body"
import PropTypes from "prop-types"
import { Embed } from "hyvor-talk-react"

// // Layout
import Layout from "../../components/layout"

// // Fields
// import Content from "../../components/fields/Content"
// import GearMenu from "../../components/fields/GearMenu"

const NodeBlogTemplate = ({ data: { node }, pageContext }) => {
  const { title, subtitle } = node
  const components = componentResolver(node?.relationships?.field_body_elements)
  // let media = r.main.localFile.cis.f
  // let imageClass = "hero__image-img"
  let subTitle = subtitle
  let fullTitle = node.rel.cat.name + ": " + title
  // let gearTitle = title + ": " + subtitle
  let blogType = 1

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
      <div className="prev-next mt-6">
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
      </div>
    )
  }

  return (
    <Layout>
      <div className="main__content">
        <Cover
          className="bg-center bg-fixed bg-no-repeat bg-center bg-cover h-screen relative"
          title={fullTitle}
          subtitle={subTitle}
          alt={node.alt.alt}
          image={node.relationships.field_main_image.gatsbyImage}
        />
        <div className="w-screen py-2.5 bg-white">
          <article className="mx-auto max-w-5xl">
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
              <Embed websiteId={1614} id={node.path.alias} loadMode="scroll" />
            </div>

            {blogType === 1 ? <PrevNextLinks /> : ""}
          </article>
        </div>
      </div>
    </Layout>
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
        field_main_image {
          gatsbyImage(width: 2048)
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
