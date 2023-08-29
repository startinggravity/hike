import React from "react"
import { Link } from "gatsby"
import { Highlight, Snippet } from "react-instantsearch-dom"

const PostPreview = ({ hit }) => {

  return (
    <div>
      <h3>
        <Link to={hit.url}>
          <Highlight hit={hit} attribute="title" tagName="mark" />
        </Link>
      </h3>
      <p>
        <Snippet hit={hit} attribute="elements" tagName="mark" />
      </p>
    </div>
  )
}

export default PostPreview