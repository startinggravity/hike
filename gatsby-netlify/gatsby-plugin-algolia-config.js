require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const flatten = require("flat").flatten
const striptags = require("striptags")

const blogQuery = `{
        posts: allNodeBlog(
         filter: {status: {eq: true}}
         sort: {drupal_internal__nid: ASC}
        ) {
          edges {
            node {
              title
              status
              objectID: drupal_internal__nid
              internal {
                contentDigest
              }
              path {
                alias
              }
              field_summary {
                processed
              }
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
                  ... on paragraph__quotation {
                    field_quote_text {
                      processed
                    }
                    field_quote_link {
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }`

const queries = [
  {
    query: blogQuery,
    transformer: ({ data }) =>
      data.posts.edges.map(
        ({
          node: {
            title,
            objectID,
            path,
            internal,
            field_summary,
            relationships,
            ...rest
          },
        }) => {
          let text = striptags(field_summary.processed.toString())
          let url = path.alias.toString()
          let date = relationships.field_body_elements[0].field_hike_date
          let paragraphs = Object.values(
            flatten(relationships.field_body_elements)
          )
          let html = text + paragraphs.join(" ")
          let elements = striptags(html)

          return {
            title,
            objectID,
            url,
            date,
            elements,
            digest: internal.contentDigest,
          }
        }
      ),
    settings: { attributesToSnippet: [`elements:20`] },
  },
]

module.exports = {
  appId: process.env.GATSBY_ALGOLIA_APP_ID,
  apiKey: process.env.GATSBY_ALGOLIA_ADMIN_API_KEY,
  indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
  queries,
  enablePartialUpdates: false,
}
