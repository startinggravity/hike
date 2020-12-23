import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import Parser from "html-react-parser"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import SEO from "../../components/seo"
import HyvorTalk from "hyvor-talk-react"

// Layout
import Layout from "../../components/layout"

// Fields
import Content from "../../components/fields/Content"
import GearMenu from "../../components/fields/GearMenu"

const NodeBlogTemplate = ({ data, pageContext }) => {
  const { title, subtitle, summary, r, alt, path, rel } = data.nodeBlog
  const { content, category, type } = data.nodeBlog.r

  let media = r.main.localFile.cis.f
  let imageClass = "hero__image-img"
  let fullTitle = category.name + ": " + title
  let gearTitle = title + ": " + subtitle
  let blogType = r.type.tid

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
      <div className="prev-next">
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

  const HeroImage = () => {
    return (
      <div className="hero">
        <div className="hero__image">
          {media && (
            <Img
              className={imageClass}
              fluid={media}
              alt={alt.alt}
              fluid={{
                ...media,
                aspectRatio: 16 / 9,
              }}
            />
          )}
        </div>
        <div className="hero__text">
          <h1>
            {category.name}: {title}
          </h1>
          <h2>{subtitle}</h2>
        </div>
      </div>
    )
  }

  const SemiHeroImage = () => {
    return (
      <div className="semi-hero">
        <div className="semi-hero__image">
          {media && (
            <Img
              className="semi-hero__image-img"
              fluid={media}
              alt={alt.alt}
              fluid={{
                ...media,
                aspectRatio: 32 / 9,
              }}
            />
          )}
        </div>
        <div className="semi-hero__text">
          <h1>{title}:</h1>
          <h2>{subtitle}</h2>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <SEO
        title={blogType === 2 ? gearTitle : fullTitle}
        description={subtitle}
        nodePath={path.alias}
        nodeImage={rel.img.localFile.childImageSharp.fixed.src}
      />

      {blogType === 2 ? <SemiHeroImage /> : <HeroImage />}

      <div className="main__content">
        {blogType === 2 ? <GearMenu /> : ""}
        <article>
          <div className="body-text">{Parser(summary.processed)}</div>
          <Content content={content} />

          <div className="comments">
            <h3 className="comments__header">Comments</h3>
            <p className="comments__quote">
              "Nothing to tell now. Let the words be yours, I'm done with mine."
              <span>
                <a href="https://youtu.be/3aMBIeD0ThU?t=16s">ref.</a>
              </span>
            </p>
            <HyvorTalk.Embed websiteId={1614} id={path.alias} loadMode="scroll" />
          </div>

          {blogType === 1 ? <PrevNextLinks /> : ""}
        </article>
      </div>
    </Layout>
  )
}

export default NodeBlogTemplate

export const query = graphql`
  query Template($slug: Int) {
    nodeBlog(drupal_internal__nid: { eq: $slug }) {
      ...nodeBlogFragment
      rel: relationships {
        img: field_main_image {
          localFile {
            childImageSharp {
              fixed(width: 600, height: 338) {
                src
              }
            }
          }
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
