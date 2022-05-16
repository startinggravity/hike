import React from "react";
// import { GatsbyImage } from "gatsby-plugin-image";

export default function ParagraphHorizontalImage({ text, image, alt }) {

  return (
    <div className="py-16">
      {/* <GatsbyImage
        image={image}
        alt={alt}
      /> */}
        
      <div className="mt-6 text-2xl prose max-w-6xl text-gray-500 mx-auto">
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
  );
}
