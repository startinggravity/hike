import React from "react"

export default function Body({ content }) {
  return (
    <div className="mt-6 text-2xl prose mx-auto max-w-3xl px-5 text-gravBlack ">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
