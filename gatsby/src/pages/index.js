import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import HeroVideo from "../components/HeroVideo"
import SEO from "../components/seo"
import Filter from "../components/fields/Filter"

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hikes: this.props.data.posts.edges,
      currentPage: 1,
      ItemsPerPage: 12,
      pageNumbers: null,
    }
  }

  render() {
    const { hikes, currentPage, ItemsPerPage } = this.state

    const indexOfLastItem = currentPage * ItemsPerPage
    const indexOfFirstItem = indexOfLastItem - ItemsPerPage
    const currentItems = hikes.slice(indexOfFirstItem, indexOfLastItem)

    const renderContent = currentItems.map(hike => {
      let media =
        hike.node.relationships.field_main_image.localFile.childImageSharp.fluid
      return (
        <li className="hike-list__item" key={hike.node.nid}>
          <Link to={hike.node.path.alias}>
            <div className="hike-list__text">
              <h2>{hike.node.title}</h2>
            </div>
            <div className="hike-list__image">
              <Img
                fluid={media}
                alt={hike.node.alt.alt}
                fluid={{ ...media, aspectRatio: 1 / 1 }}
              />
            </div>
          </Link>
        </li>
      )
    })

    return (
      <Layout>
        <SEO
          title="Home | Hike with Gravity"
          description="This site is the trail journal of Jim 'Gravity' Smith, who thru-hiked the Appalachian Trail in 2017 and the Pacific Crest Trail in 2019."
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
          ]}
        />

        <HeroVideo />
        <div className="main__content">
          <div className="body-text">
            <p>
              Hello! I'm a long distance hiker, and as you might have already
              guessed, my trail name is Gravity. I thru-hiked the{" "}
              <Link to="/hikes/at-2017">Appalachian Trail in 2017</Link> and the{" "}
              <Link to="/hikes/pct-2019">Pacific Crest Trail in 2019</Link>. You
              can find daily reports about those hikes on this site. A little more 
              information about me and the trails I've hiked can be found on{" "}
              <Link to="/about">my About page</Link>.
            </p>
            <p>
              I also completed a thru-hike of the Benton MacKaye Trail in 2020,
              and I'm now attempting to thru-hike the Continental Divid Trail. I
              will be writing trail reports about those hikes once I return from
              the CDT. Although I'm not live-blogging, I will be posting from
              time to time on{" "}
              <a href="https://twitter.com/hikewithgravity">Twitter</a>,{" "}
              <a href="https://www.instagram.com/hikewithgravity/">Instagram</a>
              , and <a href="https://www.facebook.com/jim.smith">Facebook</a>.
            </p>
            <h2 className="centered-heading">Latest Reports from the Trail</h2>
          </div>
          <div className="container">
            <ul className="hike-list">{renderContent}</ul>
          </div>
          <div className="bottom-links">
            <p>Find more hike reports here</p>
            <Filter />
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage

export const hikeQuery = graphql`
  {
    posts: allNodeBlog(
      sort: { fields: [created], order: [DESC] }
      filter: {
        relationships: {
          field_blog_category: { drupal_internal__tid: { in: [16] } }
        }
      }
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
              id
              localFile {
                childImageSharp {
                  fluid(maxWidth: 500, grayscale: true) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            category: field_blog_category {
              tid: drupal_internal__tid
            }
          }
          alt: field_main_image {
            alt
          }
        }
      }
    }
  }
`
