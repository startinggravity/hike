import React from "react"
import { graphql } from "gatsby"
import algoliasearch from "algoliasearch/lite"
import {
  connectStateResults,
  InstantSearch,
  SearchBox,
  Hits,
  PoweredBy,
  Pagination,
} from "react-instantsearch-dom"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostPreview from "../components/post-preview"
import Title from "../components/field/title"
import "../styles/search.css"

const searchClient = algoliasearch(
  "GRBKEZ1C17",
  "db67d4305a01539b0d9b3e4fb1a0871a"
)

class BlogIndex extends React.Component {
  render() {
    const fullTitle = "Search"
    const coverImage = "../images/weminunche-wilderness_chicago-basin.jpeg"
    const socialImage = "/gear-page.jpeg"
    const thisPath = "/search"

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
      <Layout>
        <Seo
          title="Search"
          description="Search for trip reports from any of my hikes."
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
            "Benton MacKaye",
            "Pinhoti",
            `AT`,
            `PCT`,
            `CDT`,
            `thru-hiking`,
            `thru-gear`,
            `Triple Crown`,
            `backpacking`,
            `hiking`,
            `trail`,
            `long distance hiking`,
            `blog`,
            `Gravity`,
            "Hike with Gravity",
          ]}
          nodePath={thisPath}
          nodeImage={socialImage}
        />
        <div className="main__content search-results-page">
          <div className="h-screen relative max-h-96 list-page">
            <div className="heading-container absolute flex justify-center items-center bottom-20 w-full">
              <div className="mx-2 text-center w-9/12 cover-text">
                <Title>{fullTitle}</Title>
              </div>
            </div>

            <div className="fixed -z-10 cover-image h-screen max-h-96">
              <div className="w-full">
                <StaticImage
                  alt="Cirue of the Towers, Wind River Range, Wyoming"
                  src={coverImage}
                  className="h-screen max-h-96 cover-img"
                />
              </div>
            </div>
          </div>
          <div className="relative z-0 bg-white">
            <div className="mx-auto max-w-5xl">
              <div className="mt-6 text-2xl prose mx-auto max-w-3xl px-5 py-4 text-gravBlack">
                <InstantSearch
                  searchClient={searchClient}
                  indexName="hike_BLOG"
                >
                  <SearchBox placeholder="Find it here..." />
                  <HitCount />
                  <Hits hitComponent={PostPreview} />
                  <Pagination />
                  <PoweredBy />
                </InstantSearch>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
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
  }
`
