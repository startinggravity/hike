import React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import PropTypes from "prop-types"
import Seo from "../components/seo"
import Layout from "../components/layout"
import LastTwelve from "../components/last-twelve"

const IndexPage = ({
  data: {
    allNodeBlog: { edges },
  },
}) => {
  const Posts = edges.map(edge => (
    <LastTwelve key={edge.node.nid} post={edge.node} />
  ))
  const thisPath = ""
  return (
    <Layout>
      <Seo
        title="Hike with Gravity"
        description="Hike with Gravity is the website of Jim 'Gravity' Smith, a Triple Crown thru-hiker."
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
        nodeImage="/homepage.jpeg"
      />
      <div className="main__content">
        <h1 className="visually-hidden">Hike with Gravity</h1>
        <div className="welcome-outer relative overflow-hidden">
          <div className="heading-container absolute welcome w-full h-full">
            <div className="mx-auto max-w-5xl relative h-full grid grid-cols-4 grid-rows-3 content-center items-center">
              <div className="welcome__text text-2xl prose mx-auto max-w-3xl text-gravBlack">
                <h2>Hello, I'm Gravity.</h2>
                <p>
                  I'm a long-distance hiker who has completed the Appalachian
                  Trail, the Pacific Crest Trail, and the Continental Trail.
                  This site shares my experiences on those and a few other
                  trails.
                </p>
              </div>
              <div className="welcome__photo">
                <StaticImage
                  src="../images/gravity.jpeg"
                  alt="Gravity"
                  placeholder="blurred"
                  className="grav-photo"
                />
              </div>
            </div>
          </div>
          <div className="welcome-bg fixed -z-10 cover-image">
            <StaticImage
              src="../images/blog_loop_first_frame.jpg"
              alt="Trees"
              placeholder="blurred"
              className="welcome-bg__img"
              loading="eager"
            />
          </div>
        </div>
        <div className="mx-auto max-w-5xl py-2.5 mb-8">
          <div className="text-2xl prose text-gravBlack py-2 mx-auto my-0">
            <nav className="secondary-menu welcome__links">
              <ul className="secondary-menu__list">
                <li className="secondary-menu__item">
                  <Link
                    to={"/hikes"}
                    title="My Hikes"
                    className="welcome__links--hikes"
                  >
                    My Hikes
                  </Link>
                </li>
                <li className="secondary-menu__item">
                  <Link
                    to={"/gear"}
                    title="My Gear"
                    className="welcome__links--gear"
                  >
                    My Gear
                  </Link>
                </li>
                <li className="secondary-menu__item">
                  <Link
                    to={"/about"}
                    title="About Me"
                    className="welcome__links--about"
                  >
                    About Me
                  </Link>
                </li>
              </ul>
            </nav>
            <h2 className="text-center mt-6">My Latest Trail Reports</h2>
          </div>
          <div className="hike-list">{Posts}</div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allNodeBlog(
      sort: { created: DESC }
      limit: 12
      filter: { moderation_state: { eq: "published" } }
    ) {
      edges {
        node {
          title
          nid: drupal_internal__nid
          path {
            alias
          }
          created
          relationships {
            field_main_image {
              gatsbyImage(width: 300, height: 300)
            }
          }
          field_main_image {
            alt
          }
          fields {
            slug
          }
          moderation_state
        }
      }
      totalCount
    }
  }
`
IndexPage.propTypes = {
  /** Content */
  text: PropTypes.shape({
    processed: PropTypes.string,
  }),
  alt: PropTypes.shape({
    alt: PropTypes.string,
  }),
  media: PropTypes.shape({
    /** Image Tag */
    photo: PropTypes.symbol,
  }),
  /* Blog type */
  type: PropTypes.shape({
    tid: PropTypes.number,
  }),
  /** Additional classes. */
  classes: PropTypes.string,
  nid: PropTypes.string,
}
