import React from "react"
import PropTypes from "prop-types"

// Paragraphs
import ParagraphHorizImage from "../../paragraphs/ParagraphHorizImage"
import ParagraphVertImage from "../../paragraphs/ParagraphVertImage"
import ParagraphText from "../../paragraphs/ParagraphText"
import ParagraphHikeDetails from "../../paragraphs/ParagraphHikeDetails"
import ParagraphGearDetails from "../../paragraphs/ParagraphGearDetails"
import ParagraphQuotation from "../../paragraphs/ParagraphQuotation"

const Content = ({ content }) => (
  <>
    {content.map((section, i) => {
      const datakey = `paragraph-${section["__typename"]}--${i}`
      section.datakey = datakey

      switch (section["__typename"]) {
        case "paragraph__body_image":
          return <ParagraphHorizImage {...section} key={datakey} />
        case "paragraph__vertical_image":
          return <ParagraphVertImage {...section} key={datakey} />
        case "paragraph__body_text":
          return <ParagraphText {...section} key={datakey} />
        case "paragraph__hike_details":
          return <ParagraphHikeDetails {...section} key={datakey} />
        case "paragraph__gear_details":
          return <ParagraphGearDetails {...section} key={datakey} />
        case "paragraph__quotation":
          return <ParagraphQuotation {...section} key={datakey} />
        default:
          console.log(section["__typename"])
          return ""
      }
    })}
  </>
)

Content.propTypes = {
  content: PropTypes.array,
}

export default Content