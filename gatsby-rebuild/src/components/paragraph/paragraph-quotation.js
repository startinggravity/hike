import React from "react";

export default function ParagraphQuotation({ quote, linkUrl, linkTitle, type }) {

  return (
    <div className={type === `text` ? "quote-wrapper quote-wrapper--music" : "quote-wrapper quote-wrapper--text"}>
      <div className="mt-6 text-2xl prose max-w-6xl text-gray-500 mx-auto">
        <div className="quote" dangerouslySetInnerHTML={{ __html: quote }} />
        {linkUrl && <div><a href={linkUrl} title="More about this quote">{linkTitle}</a></div>}
      </div>
    </div>
  )
}