import { graphql } from "gatsby"

export const nodeBlogFragment = graphql`
  fragment nodeBlogFragment on node__blog {
    nid: drupal_internal__nid
    title
    subtitle: field_secondary_title
    summary: field_summary {
      processed
      value
    }
    alt: field_main_image {
      alt
    }
    path {
      alias
    }
    r: relationships {
      main: field_main_image {
        localFile {
          cis: childImageSharp {
            f: fluid (
              cropFocus: CENTER
              ) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      category: field_blog_category {
        name
      }
      type: field_blog_type {
        tid: drupal_internal__tid
      }
      content: field_body_elements {
        __typename
        ... on paragraph__body_image {
          ...horizImageFragment
        }
        ... on paragraph__body_text {
          ...bodyTextFragment
        }
        ... on paragraph__hike_details {
          ...hikeDetailsFragment
        }
        ... on paragraph__quotation {
          ...quotationFragment
        }
        ... on paragraph__vertical_image {
          ...vertImageFragment
        }
      }
    }
  }
`
