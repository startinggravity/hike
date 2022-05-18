import React from "react"

export default function ParagraphText({ text }) {
  return (
    <div className="py-0">
      <div className="mt-6 text-2xl prose mx-auto max-w-3xl px-5 text-gravBlack">
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
  )
}
