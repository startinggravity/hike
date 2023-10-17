import { graphql } from "gatsby"

export const ParagraphQuotation = graphql`
  fragment ParagraphQuotation on paragraph__quotation {
    text: field_quote_text {
      processed
    }
    type: field_quote_type
    link: field_quote_link {
      uri
      title
    }
  }
`

export const ParagraphHikeDetails = graphql`
  fragment ParagraphHikeDetails on paragraph__hike_details {
    field_hike_date
    field_hike_miles_today
    field_hike_conditions
    field_hike_miles_trip
    field_hike_weather
  }
`

export const ParagraphBody = graphql`
  fragment ParagraphBody on paragraph__body_text {
    field_text {
      processed
    }
  }
`

export const ParagraphHorizontalImage = graphql`
  fragment ParagraphHorizontalImage on paragraph__body_image {
    field_body_image_caption {
      processed
    }
    field_image {
      alt
    }
    relationships {
      field_image {
        gatsbyImage(width: 1024, aspectRatio: 1.778, formats: [AUTO, WEBP])
      }
    }
  }
`

export const ParagraphVerticalImage = graphql`
  fragment ParagraphVerticalImage on paragraph__vertical_image {
    field_body_image_caption {
      processed
    }
    field_image {
      alt
    }
    relationships {
      field_image {
        gatsbyImage(width: 900, aspectRatio: 0.5625, formats: [AUTO, WEBP])
      }
    }
  }
`
