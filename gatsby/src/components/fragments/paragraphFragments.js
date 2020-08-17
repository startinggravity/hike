import { graphql } from 'gatsby';

export const bodyImageFragment = graphql`
  fragment horizImageFragment on paragraph__body_image {
    text:field_body_image_caption {
      value
      processed
    }
    alt: field_image {
      alt
    }
    r: relationships {
      image: field_image {
        localFile {
          cis: childImageSharp {
            f: fluid(
              srcSetBreakpoints: [480, 640, 960, 1920]
              cropFocus: CENTER
            ) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
          extension
          publicURL
        }
      }
    }
  }
`;

export const vertImageFragment = graphql`
  fragment vertImageFragment on paragraph__vertical_image {
    text:field_body_image_caption {
      value
      processed
    }
    alt: field_image {
      alt
    }
    r: relationships {
      image: field_image {
        localFile {
          cis: childImageSharp {
            f: fluid(
              srcSetBreakpoints: [480, 640, 720, 1440]
              cropFocus: CENTER
            ) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
          extension
          publicURL
        }
      }
    }
  }
`;

export const bodyTextFragment = graphql`
  fragment bodyTextFragment on paragraph__body_text {
    text: field_text {
      value
      processed
    } 
  }
`;

export const hikeDetailsFragment = graphql`
  fragment hikeDetailsFragment on paragraph__hike_details {
    date:field_hike_date
    todayMiles:field_hike_miles_today
    trailConditions:field_hike_conditions
    tripMiles:field_hike_miles_trip
    weather:field_hike_weather
  }
`;

export const gearDetailsFragment = graphql`
  fragment gearDetailsFragment on paragraph__gear_details {
    price:field_gear_price
    source:field_gear_source {
      uri
      title
    }
    weight:field_gear_weight
  }
`;

export const quotationFragment = graphql`
  fragment quotationFragment on paragraph__quotation {
    text:field_quote_text {
      processed
    }
    type:field_quote_type
    link:field_quote_link {
      uri
      title
    }
  }
`
