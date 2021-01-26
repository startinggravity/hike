import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Layout from "../components/layout"

const Contact = ({ data }) => (
  <Layout>
    <SEO
      title="Contact"
      description="Send a message to 'Gravity.'"
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
        `thru-hike`,
        `Triple Crown`,
        `backpacking`,
        `hiking`,
        `trail`,
        `long distance hiking`,
        `blog`,
        `contact`,
        `Gravity`,
      ]}
    />

    <div className="semi-hero">
      <div className="semi-hero__image">
        <Img
          className="semi-hero__image-img"
          fluid={data.semiHero.cis.f}
          alt="Cirque of the Towers, Wind River Range"
          fluid={{ ...data.semiHero.cis.f, aspectRatio: 32 / 9 }}
        />
      </div>
      <div className="semi-hero__text">
        <h1>Contact</h1>
        <h2>Gravity</h2>
      </div>
    </div>
    <div className="main__content">
      <div className="body-text">
        <p>
          Thanks for visiting my site. If you have a comment or question, or
          just want to say hello, please use this form.
        </p>

        <div className="contact-disclaimer">
          <p>
            Please do not contact me to request a product review, mention or
            endorsement.
          </p>
        </div>

        <div className="contact">
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="contact__name">
              <label htmlFor="name">
                <div className="contact-form__label">Your Name:</div>
                <div className="contact-form__input">
                  <input type="text" name="name" />
                </div>
              </label>
            </div>
            <div className="contact__email">
              <label htmlFor="email">
                <div className="contact-form__label">Your Email:</div>
                <div className="contact-form__input">
                  <input type="email" name="email" />
                </div>
              </label>
            </div>
            <div className="contact__subject">
              <label htmlFor="subject">
                <div className="contact-form__label">Subject:</div>
                <div className="contact-form__input">
                  <input type="text" name="subject" />
                </div>
              </label>
            </div>
            <div className="contact__message">
              <label htmlFor="message">
                <div className="contact-form__label">Message:</div>
                <div className="contact-form__input">
                  <textarea rows="12" columns="60" name="message"></textarea>
                </div>
              </label>
            </div>
            <div className="contact__button">
              <button 
              aria-label="Submit"
              type="submit"
            >Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Layout>
)

export default Contact

export const query = graphql`
  query {
    semiHero: file(
      relativePath: { eq: "wind-river-range_cirque-of-towers.jpeg" }
    ) {
      cis: childImageSharp {
        f: fluid(srcSetBreakpoints: [480, 640, 960, 1280, 2560]) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
