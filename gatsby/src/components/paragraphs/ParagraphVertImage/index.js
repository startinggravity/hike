import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import Parser from "html-react-parser"
import Img from "gatsby-image"

const ParagraphVertImage = props => {
  const classes = classNames(
    "vertical-image",
    { [`${props.datakey}`]: props.datakey },
    { [`${props.classes}`]: props.classes }
  )
  let media = props.r.image.localFile.cis.f
  let fullMedia = props.r.image.localFile.publicURL
  let imageClass = "vertical-image__img"

  return (
    <div className={classes}>
      <a
        href={fullMedia}
        title="Click view a full-sized version of this photo."
      >
        {media && (
          <Img
            className={imageClass}
            fluid={media}
            alt={props.alt.alt}
            fluid={{ ...media, aspectRatio: 9 / 16 }}
          />
        )}
      </a>
      {Parser(props.text.processed)}
    </div>
  )
}

ParagraphVertImage.propTypes = {
  /** Content */
  text: PropTypes.shape({
    processed: PropTypes.string,
  }),
  alt: PropTypes.shape({
    alt: PropTypes.string,
  }),
  /** Media Component Properties. */
  media: PropTypes.shape({
    /** Image Tag */
    photo: PropTypes.symbol,
    /** Video Iframe */
    video: PropTypes.symbol,
    /** Credit / Caption */
  }),
  /** Additional classes. */
  classes: PropTypes.string,
}

export default ParagraphVertImage
