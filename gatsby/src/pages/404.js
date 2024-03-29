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
          fluid={{ ...data.semiHero.cis.f, aspectRatio: 32 / 9 }}
        />
      </div>
      <div className="semi-hero__text">
        <h1>Looks like you've wandered off the trail</h1>
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
     
    </div>
  </Layout>
)

export default NotFoundPage

export const query = graphql`
  query {
    semiHero: file(relativePath: { eq: "404-marmot.jpeg" }) {
      cis: childImageSharp {
        f: fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
