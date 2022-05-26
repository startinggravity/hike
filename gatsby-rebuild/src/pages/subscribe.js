import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import Layout from "../components/layout"
import Title from "../components/field/title"
import SubTitle from "../components/field/subtitle"
import addToMailchimp from "gatsby-plugin-mailchimp"

const fullTitle = "Subscribe"
const subTitle = "to Follow Gravity"
const coverImage = "../images/wind-river-range_cirque-of-towers.jpeg"
const socialImage = "/subscribe_page.jpeg"
const thisPath = "/subscribe"

export default class Subscribe extends React.Component {
  state = {
    fname: null,
    lname: null,
    email: null,
  }

  _handleChange = e => {
    this.setState({
      [`${e.target.name}`]: e.target.value,
    })
  }

  _handleSubmit = e => {
    e.preventDefault()

    addToMailchimp(this.state.email, this.state)
      .then(({ msg, result }) => {
        console.log("msg", `${result}: ${msg}`)

        if (result !== "success") {
          throw msg
        }
        alert(msg)
      })
      .catch(err => {
        console.log("err", err)
        alert(err)
      })
  }

  render() {
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
                  Following me on the trail is easy! Just leave your email
                  address here. I'll let you know when I have made new hiking
                  plans. Emails are sent infrequently, so you don't have to
                  worry about being spammed.
                </p>
                <div className="contact">
                  <form
                    onSubmit={this._handleSubmit}
                    className="mailchimp-signup-subscribe-form"
                  >
                    <div className="js-form-item form-item">
                      <label
                        className="js-form-required form-required form-item__label contact-form__label"
                        htmlFor="fname"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        onChange={this._handleChange}
                        name="fname"
                        className="form-text form-item__textfield contact-form__input"
                        id="fname"
                      />
                    </div>
                    <div className="js-form-item form-item">
                      <label
                        className="js-form-required form-required form-item__label contact-form__label"
                        htmlFor="lname"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        onChange={this._handleChange}
                        name="lname"
                        className="form-text form-item__textfield contact-form__input"
                        id="lname"
                      />
                    </div>
                    <div className="js-form-item form-item">
                      <label
                        className="js-form-required form-required form-item__label contact-form__label"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        onChange={this._handleChange}
                        name="email"
                        className="form-text form-item__textfield contact-form__input"
                        id="email"
                      />
                    </div>
                    <div
                      className="form-actions js-form-wrapper form-wrapper"
                      id="edit-actions"
                    >
                      <input
                        type="submit"
                        value="Subscribe"
                        className="button js-form-submit form-submit form-item__textfield contact__button"
                      />
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
}
