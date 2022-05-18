import React from "react";

export default function ParagraphQuotation({ quote, linkUrl, linkTitle, type }) {

  return (
    <div
      className={
        type === `text`
          ? "quote-wrapper quote-wrapper--text"
          : "quote-wrapper quote-wrapper--music"
      }
    >
      <div className="mt-6 text-2xl prose mx-auto max-w-3xl text-gravBlack ">
        <div className="quote" dangerouslySetInnerHTML={{ __html: quote }} />
        {linkUrl && (
          <div>
            <a
              className="text-gravRed link-underline hover:text-gravDkGray hover:bg-gravDkGrayFade hover:link-hover-underline"
              href={linkUrl}
              title="More about this quote"
            >
              {linkTitle}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}