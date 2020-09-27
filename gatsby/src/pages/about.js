import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Layout from "../components/layout"

const About = ({ data }) => (
  <Layout>
    <SEO
      title="About"
      description="Information about Gravity and the trails he hikes."
      keywords={[
        `Pacific Crest Trail`,
        `Appalachian Trail`,
        `Continental Divide Trail`,
        `Mojave Desert`,
        `Sierra Nevada`,
        `Great Smoky Mountains`,
        `White Mountains`,
        `Springer Mountain`,
        `Mount Katahdin`,
        `AT`,
        `PCT`,
        `CDT`,
        `thru-hiking`,
        `thru-gear`,
        `Triple Crown`,
        `backpacking`,
        `hiking`,
        `trail`,
        `long distance hiking`,
        `blog`,
        `Gravity`,
      ]}
    />
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
        <h1>About</h1>
        <h2>Gravity and Trails</h2>
      </div>
    </div>
    <div className="main__content">
      <div className="body-text">
        <p>Here is a little information about me, this site, and some of the trails I have hiked.</p>
      </div>
      <div className="container">
        <ul className="hike-list">
          {/* Gravity */}
          <li className="hike-list__item">
            <Link to="/about/gravity" title="About Gravity">
              <div className="hike-list__text">
                <h2>Gravity</h2>
              </div>
              <div className="hike-list__image">
                <Img
                  fluid={data.gravityImage.cis.f}
                  alt="Gravity on the AT"
                  sizes={{ ...data.gravityImage.cis.f, aspectRatio: 1 / 1 }}
                />
              </div>
            </Link>
          </li>
          {/* Trail name */}
          <li className="hike-list__item">
            <Link to="/about/my-trail-name" title="About my Trail Name">
              <div className="hike-list__text">
                <h2>My Trail Name</h2>
              </div>
              <div className="hike-list__image">
                <Img
                  fluid={data.gravityTrailImage.cis.f}
                  alt="Gravity hiking in Frozen Head State Park"
                  sizes={{
                    ...data.gravityTrailImage.cis.f,
                    aspectRatio: 1 / 1,
                  }}
                />
              </div>
            </Link>
          </li>
          {/* This site */}
          <li className="hike-list__item">
            <Link to="/about/this-site" title="About This Site">
              <div className="hike-list__text">
                <h2>This Site</h2>
              </div>
              <div className="hike-list__image">
                <Img
                  fluid={data.gravityLogo.cis.f}
                  alt="Hike with Gravity logo"
                  sizes={{
                    ...data.gravityLogo.cis.f,
                    aspectRatio: 1 / 1,
                  }}
                />
              </div>
            </Link>
          </li>
          {/* The AT */}
          <li className="hike-list__item">
            <Link
              to="/about/the-appalachian-trail"
              title="About the Appalachian Trail"
            >
              <div className="hike-list__text">
                <h2>The Appalachian Trail</h2>
              </div>
              <div className="hike-list__image">
                <Img
                  fluid={data.atImage.cis.f}
                  alt="A rock with the Appalachian Trail emblem painted on it"
                  sizes={{ ...data.atImage.cis.f, aspectRatio: 1 / 1 }}
                />
              </div>
            </Link>
          </li>
          {/* Cooking & Filtration */}
          <li className="hike-list__item">
            <Link
              to="/about/the-pacific-crest-trail"
              title="About the Pacific Crest Trail"
            >
              <div className="hike-list__text">
                <h2>The Pacific Crest Trail</h2>
              </div>
              <div className="hike-list__image">
                <Img
                  fluid={data.pctImage.cis.f}
                  alt="Goat Rocks on the PCT"
                  sizes={{ ...data.pctImage.cis.f, aspectRatio: 1 / 1 }}
                />
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </Layout>
)

export default About

export const query = graphql`
  query {
    semiHero: file(relativePath: { eq: "gravity-in-maine.jpeg" }) {
      cis: childImageSharp {
        f: fluid(srcSetBreakpoints: [480, 640, 960, 1280, 2560]) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    gravityImage: file(relativePath: { eq: "gravity_teaser.jpg" }) {
      cis: childImageSharp {
        f: fluid(
          maxWidth: 500
          grayscale: true
        ) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    gravityTrailImage: file(relativePath: { eq: "gravity-trail_teaser.jpeg" }) {
      cis: childImageSharp {
        f: fluid(
          maxWidth: 500
          grayscale: true
        ) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    gravityLogo: file(relativePath: { eq: "about-site_teaser.jpeg" }) {
      cis: childImageSharp {
        f: fluid(
          maxWidth: 500
          grayscale: true
        ) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    atImage: file(relativePath: { eq: "at_teaser.jpeg" }) {
      cis: childImageSharp {
        f: fluid(
          maxWidth: 500
          grayscale: true
        ) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    pctImage: file(relativePath: { eq: "pct_teaser.jpeg" }) {
      cis: childImageSharp {
        f: fluid(
          maxWidth: 500
          grayscale: true
        ) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
