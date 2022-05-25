import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import Layout from "../components/layout"
import Title from "../components/field/title"
import SubTitle from "../components/field/subtitle"

const Contact = () => {
  const fullTitle = "Contact"
  const subTitle = "Gravity"
  const coverImage = "../images/wind-river-range_cirque-of-towers.jpeg"
  const socialImage = "/gear-page.jpeg"
  const thisPath = "/contact"
  return (
    <Layout>
      <Seo
        title={fullTitle + ` ` + subTitle}
        description="Contact me using the form on this page."
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
          "Benton MacKaye",
          "Pinhoti",
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
          "Hike with Gravity",
        ]}
        nodePath={thisPath}
        nodeImage={socialImage}
      />
      <div className="main__content about-list-page">
        <div className="h-screen relative max-h-96 list-page">
          <div className="heading-container absolute flex justify-center items-center bottom-20 w-full">
            <div className="mx-2 text-center w-9/12 cover-text">
              <Title>{fullTitle}</Title>
              <SubTitle>{subTitle}</SubTitle>
            </div>
          </div>

          <div className="fixed -z-10 cover-image h-screen max-h-96">
            <div className="w-full">
              <StaticImage
                alt="Cirue of the Towers, Wind River Range, Wyoming"
                src={coverImage}
                className="cover-img h-screen max-h-96"
              />
            </div>
          </div>
        </div>
        <div className="relative z-0 bg-white">
          <div className="mx-auto max-w-5xl">
            <div className="mt-6 text-2xl prose mx-auto max-w-3xl px-5 py-4 text-gravBlack">
              <p>
                Thanks for visiting my site. If you have a comment or question,
                or just want to say hello, please use this form.
              </p>

              <div className="contact-disclaimer">
                <p>
                  Please do not contact me to request a product review, mention
                  or endorsement.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-2.5">
              <div className="contact mt-6 text-2xl prose mx-auto max-w-3xl px-5 pb-4 text-gravBlack">
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
                        <textarea
                          rows="12"
                          columns="60"
                          name="message"
                        ></textarea>
                      </div>
                    </label>
                  </div>
                  <div className="contact__button">
                    <button aria-label="Submit" type="submit">
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
