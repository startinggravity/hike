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
          fluid={{ ...data.semiHero.cis.f, aspectRatio: 32 / 9 }}
        />
      </div>
      <div className="semi-hero__text">
        <h1>About</h1>
        <h2>Gravity and Trails</h2>
      </div>
    </div>
    <div className="main__content">
      <div className="body-text">
        <p>
          Here is a little information about me, this site, and some of the
          trails I have hiked.
        </p>
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
                  alt="Gravity on the AT"
                  fluid={{ ...data.gravityImage.cis.f, aspectRatio: 1 / 1 }}
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
                  alt="Gravity hiking in Frozen Head State Park"
                  fluid={{
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
                  alt="Hike with Gravity code"
                  fluid={{
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
                  alt="A rock with the Appalachian Trail emblem painted on it"
                  fluid={{ ...data.atImage.cis.f, aspectRatio: 1 / 1 }}
                />
              </div>
            </Link>
          </li>
          {/* The PCT */}
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
                  alt="Goat Rocks on the PCT"
                  fluid={{ ...data.pctImage.cis.f, aspectRatio: 1 / 1 }}
                />
              </div>
            </Link>
          </li>
          {/* The CDT */}
          <li className="hike-list__item">
            <Link
              to="/about/the-continental-divide-trail"
              title="About the Continental Divide Trail"
            >
              <div className="hike-list__text">
                <h2>The Continental Divide Trail</h2>
              </div>
              <div className="hike-list__image">
                <Img
                  alt="Wind River Range, Wyoming"
                  fluid={{ ...data.cdtImage.cis.f, aspectRatio: 1 / 1 }}
                />
              </div>
            </Link>
          </li>
          {/* The BMT */}
          <li className="hike-list__item">
            <Link
              to="/about/the-benton-mackaye-trail"
              title="About the Benton MacKaye Trail"
            >
              <div className="hike-list__text">
                <h2>The Benton MacKaye Trail</h2>
              </div>
              <div className="hike-list__image">
                <Img
                  alt="Davis Creek on the BMT"
                  fluid={{ ...data.bmtImage.cis.f, aspectRatio: 1 / 1 }}
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
        f: fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    gravityImage: file(relativePath: { eq: "gravity_teaser.jpg" }) {
      cis: childImageSharp {
        f: fluid(maxWidth: 500, grayscale: true) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    gravityTrailImage: file(relativePath: { eq: "gravity-trail_teaser.jpeg" }) {
      cis: childImageSharp {
        f: fluid(maxWidth: 500, grayscale: true) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    gravityLogo: file(relativePath: { eq: "about-site_teaser.jpeg" }) {
      cis: childImageSharp {
        f: fluid(maxWidth: 500, grayscale: true) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    atImage: file(relativePath: { eq: "at_teaser.jpeg" }) {
      cis: childImageSharp {
        f: fluid(maxWidth: 500, grayscale: true) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    pctImage: file(relativePath: { eq: "pct_teaser.jpeg" }) {
      cis: childImageSharp {
        f: fluid(maxWidth: 500, grayscale: true) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    cdtImage: file(relativePath: { eq: "cdt_teaser.jpeg" }) {
      cis: childImageSharp {
        f: fluid(maxWidth: 500, grayscale: true) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    bmtImage: file(relativePath: { eq: "bmt_teaser.jpeg" }) {
      cis: childImageSharp {
        f: fluid(maxWidth: 500, grayscale: true) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
