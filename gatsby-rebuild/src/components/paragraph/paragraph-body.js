import React from "react"

export default function ParagraphText({ text }) {
  return (
    <div className="py-16 bg-white">
      <div className="mt-6 text-2xl prose max-w-6xl text-gray-500 mx-auto">
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
  )
}
