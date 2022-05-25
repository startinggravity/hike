import React from "react";

export default function PostTitle({ children }) {
  return (
    <h1 className="text-gray-100 font-bold text-2xl sm:text-3xl lg:text-5xl leading-none py-10">
      {children}
    </h1>
  )
}
