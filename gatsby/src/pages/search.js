import React from "react"
import { graphql } from "gatsby"
import algoliasearch from "algoliasearch/lite"
import {
  connectStateResults,
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  PoweredBy,
  Pagination,
} from "react-instantsearch-dom"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostPreview from "../components/post-preview"

const searchClient = algoliasearch(
  "GRBKEZ1C17",
  "db67d4305a01539b0d9b3e4fb1a0871a"
)

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    const HitCount = connectStateResults(({ searchResults }) => {
      const hitCount = searchResults && searchResults.nbHits
      return hitCount > 0 ? (
        <div className="HitCount">
          <h2>
            {hitCount} result{hitCount !== 1 ? `s` : ``} were found
          </h2>
        </div>
      ) : (
        <div className="HitCount">
          <h2>No results were found for your search.</h2>
          <p>Check your spelling and try again.</p>
        </div>
      )
    })

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Search"
          description="Search for trip reports from my hikes of the Appalachian Trail in 2017 and the Pacific Crest Trail in 2019."
          keywords={[
            `Pacific Crest Trail`,
            `Appalachian Trail`,
            `Continental Divide Trail`,
            `Mojave Desert`,
            `Sierra Nevada`,
            `Great Smoky Mountains`,
            `White Mountains`,
            `Springer Mountain`,
            `Mount Katahdin`,
            `AT`,
            `PCT`,
            `CDT`,
            `thru-hiking`,
            `thru-hike`,
            `Triple Crown`,
            `backpacking`,
            `hiking`,
            `trail`,
            `long distance hiking`,
            `blog`,
          ]}
        />
        <div className="semi-hero">
          <div className="semi-hero__image">
            <Img
              className="semi-hero__image-img"
              fluid={this.props.data.file.cis.f}
              alt="Sun filters through trees in Maine on the Appalachian Trail"
              fluid={{ ...this.props.data.file.cis.f, aspectRatio: 32 / 9 }}
            />
          </div>
          <div className="semi-hero__text">
            <h1>Search</h1>
          </div>
        </div>
        <div className="main__content">
          <InstantSearch searchClient={searchClient} indexName="hike_BLOG">
            <SearchBox placeholder="Find it here..." />
            <HitCount />
            <Hits hitComponent={PostPreview} />
            <Pagination />
            <PoweredBy />
          </InstantSearch>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allNodeBlog(
      sort: { fields: [created], order: [DESC] }
      filter: {
        relationships: {
          field_blog_category: {
            drupal_internal__tid: { in: [5, 6, 7, 8, 16] }
          }
        }
      }
    ) {
      edges {
        node {
          title
          status
          objectID: drupal_internal__nid
          path {
            alias
          }
          field_summary {
            processed
          }
          created
          relationships {
            field_body_elements {
              ... on paragraph__body_image {
                field_body_image_caption {
                  processed
                }
              }
              ... on paragraph__body_text {
                field_text {
                  processed
                }
              }
              ... on paragraph__hike_details {
                field_hike_date(formatString: "dddd, MMMM DD, YYYY")
              }
              ... on paragraph__quotation {
                field_quote_text {
                  processed
                }
              }
              ... on paragraph__vertical_image {
                field_body_image_caption {
                  processed
                }
              }
            }
          }
        }
      }
    }
    file(relativePath: { eq: "sun-trees-appalachian-trail.jpeg" }) {
      cis: childImageSharp {
        f: fluid(srcSetBreakpoints: [480, 640, 960, 1280, 2560]) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
