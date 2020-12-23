import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Layout from "../components/layout"

const Gear = ({ data }) => (
  <Layout>
    <SEO
      title="Gear That I Use"
      description="This page lists clothing and gear I carried on my hikes. 
          Some items were shipped home when weather conditions changed."
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
        <h1>Gear That I Use</h1>
      </div>
    </div>
    <div className="main__content">
      <div className="body-text">
        <p>
          I've put together lists of clothing and gear I carried on my hikes.
          Some items are no longer used, but I've included them with notes on
          why I switched.
        </p>
      </div>
      <div className="container">
        <ul className="hike-list">
          {/* Hiking */}
          <li className="hike-list__item">
            <Link to="/gear/hiking" title="Hiking">
              <div className="hike-list__text">
                <h2>Hiking</h2>
              </div>
              <div className="hike-list__image">
                <Img
                  fluid={data.hikingImage.cis.f}
                  alt="Hiking on the PCT"
                  fluid={{ ...data.hikingImage.cis.f, aspectRatio: 1 / 1 }}
                />
              </div>
            </Link>
          </li>
          {/* Shelter & Sleep System */}
          <li className="hike-list__item">
            <Link to="/gear/shelter-sleeping" title="Shelter & Sleep System">
              <div className="hike-list__text">
                <h2>Shelter & Sleep System</h2>
              </div>
              <div className="hike-list__image">
                <Img
                  fluid={data.shelterImage.cis.f}
                  alt="Tents on the PCT"
                  fluid={{ ...data.shelterImage.cis.f, aspectRatio: 1 / 1 }}
                />
              </div>
            </Link>
          </li>
          {/* Clothing */}
          <li className="hike-list__item">
            <Link to="/gear/clothing-shoes" title="Clothing and Shoes">
              <div className="hike-list__text">
                <h2>Clothing & Shoes</h2>
              </div>
              <div className="hike-list__image">
                <Img
                  fluid={data.clothingImage.cis.f}
                  alt="Gravity on the PCT"
                  fluid={{ ...data.clothingImage.cis.f, aspectRatio: 1 / 1 }}
                />
              </div>
            </Link>
          </li>
          {/* Cooking & Filtration */}
          <li className="hike-list__item">
            <Link to="/gear/cooking-filtration" title="Cooking and Filtration">
              <div className="hike-list__text">
                <h2>Cooking & Filtration</h2>
              </div>
              <div className="hike-list__image">
                <Img
                  fluid={data.cookingImage.cis.f}
                  alt="Cooking on the AT"
                  fluid={{ ...data.cookingImage.cis.f, aspectRatio: 1 / 1 }}
                />
              </div>
            </Link>
          </li>
          {/* First Aid, Hygiene, Miscellaneous */}
          <li className="hike-list__item">
            <Link to="/gear/first-aid-hygiene-miscellaneous" title="First Aid, Hygiene, Miscellaneous">
              <div className="hike-list__text">
                <h2>First Aid, Hygiene, Miscellaneous</h2>
              </div>
              <div className="hike-list__image">
                <Img
                  fluid={data.firstAidImage.cis.f}
                  alt="The Pacific Crest Trail"
                  fluid={{ ...data.firstAidImage.cis.f, aspectRatio: 1 / 1 }}
                />
              </div>
            </Link>
          </li>
          {/* Electronics */}
          <li className="hike-list__item">
            <Link to="/gear/electronics" title="Electronics">
              <div className="hike-list__text">
                <h2>Electronics</h2>
              </div>
              <div className="hike-list__image">
                <Img
                  fluid={data.electronicsImage.cis.f}
                  alt="Flowers on the Pacific Crest Trail"
                  fluid={{ ...data.electronicsImage.cis.f, aspectRatio: 1 / 1 }}
                />
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </Layout>
)

export default Gear

export const query = graphql`
  query {
    semiHero: file(relativePath: { eq: "gravity-in-sierra.jpeg" }) {
      cis: childImageSharp {
        f: fluid(srcSetBreakpoints: [480, 640, 960, 1280, 2560]) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    hikingImage: file(relativePath: { eq: "hiking_teaser.jpeg" }) {
      cis: childImageSharp {
        f: fluid(
          maxWidth: 500
          grayscale: true
        ) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    shelterImage: file(relativePath: { eq: "shelter_teaser.jpeg" }) {
      cis: childImageSharp {
        f: fluid(
          maxWidth: 500
          grayscale: true
        ) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    clothingImage: file(relativePath: { eq: "clothing_teaser.jpeg" }) {
      cis: childImageSharp {
        f: fluid(
          maxWidth: 500
          grayscale: true
        ) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    cookingImage: file(relativePath: { eq: "cooking_teaser.jpeg" }) {
      cis: childImageSharp {
        f: fluid(
          maxWidth: 500
          grayscale: true
        ) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    firstAidImage: file(relativePath: { eq: "first-aid_teaser.jpeg" }) {
      cis: childImageSharp {
        f: fluid(
          maxWidth: 500
          grayscale: true
        ) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    electronicsImage: file(relativePath: { eq: "electronics_teaser.jpeg" }) {
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
