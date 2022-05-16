import React from "react";
import CoverImage from "./cover-image";
import Title from "./field/title";
import SubTitle from "./field/subtitle";

export default function Cover({ title, subtitle, alt, coverImage }) {
  return (
    <div className="prose prose-lg max-w-6xl mx-auto">
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
      <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
        <CoverImage title={alt} fluid={coverImage?.gatsbyImageData} />
      </div>
    </div>
  );
}
