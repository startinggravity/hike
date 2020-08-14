import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Layout from "../components/layout"

const NotFoundPage = ({ data }) => (
  <Layout>
    <SEO title="404: Not found" />
    <div className="semi-hero">
      <div className="semi-hero__image">
        <Img
          className="semi-hero__image-img"
          fluid={data.semiHero.cis.f}
          alt="Gravity in the Sierra Nevada"
          sizes={{ ...data.semiHero.cis.f, aspectRatio: 32 / 9 }}
        />
      </div>
      <div className="semi-hero__text">
        <h1>Oops! You've wandered off the trail</h1>
      </div>
    </div>
    <div className="main__content">
      <div className="body-text">
        <p>
          Something went wrong with the link you clicked and you wound up on
          this page.
        </p>
        <p>
         To get back on the trail, try using the <Link to="/search">search page</Link>.
        </p>
        <p>
          If you still can't find your way, please <Link to="/contact">send me 
          a message</Link> and let me know where the trail is mis-marked.
        </p>
        <p>&nbsp;</p>
      </div>
      <div className="quotation quotation__lyric">
        <p>
          Going where the wind don't blow so strange
          <br />
          Maybe off on some high cold mountain range
          <br />
          Lost one round but the price wasn't anything
          <br />A knife in the back and more of the same
        </p>
        <a
          href="https://youtu.be/dRwq9HrkTI0"
          title="See more about this quote"
        >
          From "He's Gone" by Robert Hunter and Jerry Garcia
          (Grateful Dead)
        </a>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage

export const query = graphql`
  query {
    semiHero: file(relativePath: { eq: "gravity-in-sierra.jpeg" }) {
      cis: childImageSharp {
        f: fluid(srcSetBreakpoints: [480, 640, 960, 1280, 2560]) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
