import React from "react"

export default function PostTitle({ children }) {
  return (
    <h1 className="text-gray-100 font-bold text-1xl sm:text-2xl lg:text-3xl leading-none py-10">
      {children}
    </h1>
  )
}
