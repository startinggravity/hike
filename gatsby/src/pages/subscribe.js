import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Layout from "../components/layout"
import addToMailchimp from "gatsby-plugin-mailchimp"

export default class Subscribe extends React.Component {
  state = {
    fname: null,
    lname: null,
    email: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      heroImage: this.props.data.semiHero.cis.f,
    }
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
        <SEO
          title="Subscribe to my Newsletter"
          description="Following me on the trail is easy! Just leave your email address here.
      I'll let you know when I have made new hiking plans."
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
            `email newsletter`,
            `Gravity`,
          ]}
        />

        <div className="semi-hero">
          <div className="semi-hero__image">
            <Img
              className="semi-hero__image-img"
              fluid={this.state.heroImage}
              alt="Chicago Basin, Weminuche Wilderness Area, Colorado"
              sizes={{ ...this.state.heroImage, aspectRatio: 32 / 9 }}
            />
          </div>
          <div className="semi-hero__text">
            <h1>Follow Gravity</h1>
            <h2>Subscribe to My Newsletter</h2>
          </div>
        </div>
        <div className="main__content">
          <div className="body-text">
            <p>
              Following me on the trail is easy! Just leave your email address
              here. I'll let you know when I have made new hiking plans.
            </p>
            <div className="contact">
              <form
                onSubmit={this._handleSubmit}
                className="mailchimp-signup-subscribe-form"
              >
                <div className="js-form-item form-item">
                  <label className="js-form-required form-required form-item__label">
                    First Name
                  </label>
                  <input
                    type="text"
                    onChange={this._handleChange}
                    name="fname"
                    className="form-text form-item__textfield"
                  />
                </div>
                <div className="js-form-item form-item">
                  <label className="js-form-required form-required form-item__label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    onChange={this._handleChange}
                    name="lname"
                    className="form-text form-item__textfield"
                  />
                </div>
                <div className="js-form-item form-item">
                  <label className="js-form-required form-required form-item__label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    onChange={this._handleChange}
                    name="email"
                    className="form-text form-item__textfield"
                  />
                </div>
                <div
                  className="form-actions js-form-wrapper form-wrapper"
                  id="edit-actions"
                >
                  <input
                    type="submit"
                    value="Subscribe"
                    className="button js-form-submit form-submit form-item__textfield"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  query {
    semiHero: file(
      relativePath: { eq: "weminunche-wilderness_chicago-basin.jpeg" }
    ) {
      cis: childImageSharp {
        f: fluid(srcSetBreakpoints: [480, 640, 960, 1280, 2560]) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
