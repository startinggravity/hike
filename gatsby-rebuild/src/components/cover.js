import React from "react"
import CoverImage from "./cover-image"
import Title from "./field/title"
import SubTitle from "./field/subtitle"

export default function Cover({ title, subtitle, alt, image }) {
  return (
    <div className="bg-center bg-fixed bg-no-repeat bg-cover h-screen relative">
      <div className="heading-container absolute flex justify-center items-center bottom-20 w-full">
        <div class="mx-2 text-center w-9/12 cover-text">
          <Title>{title}</Title>
          <SubTitle>{subtitle}</SubTitle>
        </div>
      </div>

      <div className="fixed -z-10 cover-image h-screen">
        <CoverImage alt={alt} image={image} />
      </div>
    </div>
  )
}
