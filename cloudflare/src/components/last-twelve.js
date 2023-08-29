import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const LastTwelve = ({ post }) => (
  
  <article key={post.nid} className="hike-list__item">
    <Link to={post.path.alias}>
      <div className="hike-list__text">
        <h3>{post.title}</h3>
      </div>
      <div className="hike-list__image">
        <GatsbyImage
          alt={post.field_main_image.alt}
          image={post.relationships.field_main_image.gatsbyImage}
          className="blog-thumb"
        />
      </div>
    </Link>
  </article>
)
export default LastTwelve
