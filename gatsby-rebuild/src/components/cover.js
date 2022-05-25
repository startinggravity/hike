import React from "react"
import CoverImage from "./cover-image"
import Title from "./field/title"
import SubTitle from "./field/subtitle"

export default function Cover({ title, subtitle, alt, image, type }) {
   let blogTypeClasses = ""
   if (type === 1 || type === 3) {
     blogTypeClasses = "h-screen"
   } else {
     blogTypeClasses = "h-screen max-h-96"
   }
  return (
    <div className={`relative ${blogTypeClasses}`}>
      <div className="heading-container absolute flex justify-center items-center bottom-20 w-full">
        <div className="mx-2 text-center w-9/12 cover-text">
          <Title>{title}</Title>
          <SubTitle>{subtitle}</SubTitle>
        </div>
      </div>

      <div className={`fixed -z-10 cover-image w-full ${blogTypeClasses}`}>
        <CoverImage alt={alt} image={image} />
      </div>
    </div>
  )
}
