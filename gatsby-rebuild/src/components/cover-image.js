import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function CoverImage({ image, alt }) {
  return (
    <div className="w-full">
      <GatsbyImage
        alt={alt}
        image={getImage(image)}
        className="cover-img h-screen"
      />
    </div>
  )
}
