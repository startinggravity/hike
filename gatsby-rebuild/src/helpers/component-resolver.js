import React from "react"

import ParagraphQuotation from "../components/paragraph/paragraph-quotation";
import ParagraphVerticalImage from "../components/paragraph/paragraph-vertical-image";
import ParagraphHorizontalImage from "../components/paragraph/paragraph-horizontal-image";
import ParagraphBody from "../components/paragraph/paragraph-body";
import ParagraphHikeDetails from "../components/paragraph/paragraph-hike-details"

const resolve = (component) => {

    if (component.__typename.includes(`paragraph__body_text`)) {
      return (
        <ParagraphBody 
          text={component.field_text.processed}
        />
      )
    }

    if (component.__typename.includes(`paragraph__quotation`)) {
      const linkTitle = component.link ? component.link.title : ""
      const linkUri = component.link ? component.link.uri : ""
      return (
        <ParagraphQuotation
          quote={component.text.processed}
          linkTitle={linkTitle}
          linkUrl={linkUri}
          type={component.type}
        />
      )
    }

    if (component.__typename.includes(`paragraph__body_image`)) {
      return (
        <ParagraphHorizontalImage 
          text={component.field_body_image_caption.processed}
          image={component.relationships.field_image.gatsbyImage}
          alt={component.field_image.alt}
        />
      )
    }
    if (component.__typename.includes(`paragraph__vertical_image`)) {
      return (
        <ParagraphVerticalImage 
          text={component.field_body_image_caption.processed}
          image={component.relationships.field_image.gatsbyImage}
          alt={component.field_image.alt}
        />
      )
    }
    if (component.__typename.includes(`paragraph__hike_details`)) {
      return (
        <ParagraphHikeDetails 
            date={component.field_hike_date}
            today={component.field_hike_miles_today}
            trip={component.field_hike_miles_trip}
            weather={component.field_hike_weather}
            conditions={component.field_hike_conditions}
          />
      )
    }



    return 
}

export const componentResolver = (data = []) => {
    const components = []

    data.forEach((component) => {
        components.push(resolve(component))
    })

    return components
}

export default componentResolver;
