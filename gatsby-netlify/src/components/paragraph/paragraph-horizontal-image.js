import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function ParagraphHorizontalImage({ text, image, alt }) {
  return (
    <div className="py-0">
      <GatsbyImage
        alt={alt}
        image={getImage(image)}
        className="border-gray-200 border-2"
      />

      <div className="mt-6 text-2xl prose mx-auto max-w-3xl px-5 text-gravBlack">
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
  )
}
