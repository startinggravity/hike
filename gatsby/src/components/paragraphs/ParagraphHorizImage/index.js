import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import Parser from "html-react-parser"
import Img from "gatsby-image"

const ParagraphHorizImage = props => {
  const classes = classNames(
    "horizontal-image",
    { [`${props.datakey}`]: props.datakey },
    { [`${props.classes}`]: props.classes }
  )
  let media = props.r.image.localFile.cis.f
  let fullMedia = props.r.image.localFile.publicURL
  let imageClass = "horizontal-image__img"

  return (
    <div className={classes}>
      <a
        href={fullMedia}
        title="Click to view a full-sized version of this photo."
      >
        {media && (
          <Img
            className={imageClass}
            fluid={media}
            alt={props.alt.alt}
            sizes={{ ...media, aspectRatio: 16 / 9 }}
          />
        )}
      </a>
      {Parser(props.text.processed)}
    </div>
  )
}

ParagraphHorizImage.propTypes = {
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
  /** Additional classes. */
  classes: PropTypes.string,
}

export default ParagraphHorizImage
