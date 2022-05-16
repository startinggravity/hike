import React from "react";

export default function PostSubTitle({ children }) {
  return (
    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
      {children}
    </h2>
  )
}
