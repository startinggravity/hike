import React from "react"

export default function PostSubTitle({ children }) {
  return (
    <h2 className="text-gray-100 font-extrabold text-4xl md:text-5xl lg:text-7xl leading-none">
      {children}
    </h2>
  )
}
