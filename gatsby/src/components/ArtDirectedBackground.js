import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"

import BackgroundImage from "gatsby-background-image"

const ArtDirectedBackground = ({ className }) => {
  const { mobileImage, desktopImage } = useStaticQuery(
    graphql`
      query {
        mobileImage: file(relativePath: {eq: "no_video_background.jpg"}) {
            childImageSharp {
              fluid(webpQuality: 70) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
        }
        desktopImage: file(relativePath: {eq: "blog_loop_first_frame.jpg"}) {
            childImageSharp {
              fluid(webpQuality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
        }
      }
    `
  )

  const sources = [
    mobileImage.childImageSharp.fluid,
    {
      ...desktopImage.childImageSharp.fluid,
      media: `(min-width: 491px)`,
    },
  ]

  return (
    <BackgroundImage
      Tag={`section`}
      id={`media-test`}
      className={`hero-video`}
      fluid={sources}
    >
    </BackgroundImage>
  )
}

const StyledArtDirectedBackground = styled(ArtDirectedBackground)`
  width: 100%;
  min-height: 100vh;
  /* You should set a background-size as the default value is "cover"! */
  background-size: cover;
  /* So we won't have the default "lightgray" background-color. */
  background-color: transparent;
`

export default StyledArtDirectedBackground
