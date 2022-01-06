import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Filter from "../components/fields/Filter"

class Hikes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hikes: this.props.data.posts.edges,
      currentPage: 1,
      ItemsPerPage: 30,
      pageNumbers: null,
    }
    this.handleClickPagination = this.handleClickPagination.bind(this)
  }

  componentDidMount() {
    let numberOfPages = calcpagenumbers(
      this.state.hikes,
      this.state.ItemsPerPage
    )
    numberOfPages !== null &&
      this.setState({
        pageNumbers: numberOfPages,
      })
  }

  handleClickPagination(event) {
    this.setState({
      currentPage: Number(event.target.id),
    })
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }

  render() {
    const { hikes, currentPage, ItemsPerPage, pageNumbers } = this.state

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
          title="Hikes: All Trail Reports"
          description="I thru-hiked the Appalachian Trail in 2017, the Pacific Crest Trail 
             in 2019, the Benton MacKaye Trail in 2020, and the Continental Divide Trail
             in 2021."
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
        <div className="semi-hero">
          <div className="semi-hero__image">
            <Img
              className="semi-hero__image-img"
              fluid={this.props.data.file.cis.f}
              alt="Sun filters through trees in Maine on the Appalachian Trail"
              fluid={{ ...this.props.data.file.cis.f, aspectRatio: 32 / 9 }}
            />
          </div>
          <div className="semi-hero__text">
            <h1>Trail Reports</h1>
            <h2>All Hikes</h2>
          </div>
        </div>
        <div className="main__content">
          <Filter />
          <div className="body-text">
            <p>
              I thru-hiked the{" "}
              <Link to="/about/the-appalachian-trail">Appalachian Trail</Link>{" "}
              in 2017, the{" "}
              <Link to="/about/the-pacific-crest-trail">
              Pacific Crest Trail</Link>{" "}in 2019, and the{" "}
              <Link to="/about/the-continental-divide-trail">Continental Divide{" "}
              Trail</Link>{" "} 
              in 2021. You will find daily reports of those hikes and others on this page.
            </p>
            <p>
              The links to the posts of my hikes appear here in reverse{* *}
              chronological order as they're written. If you prefer to read about
              one of those hikes from the beginning of the trip, select one of the{* *}
              links above.
            </p>
          </div>
          <div className="container">
            <ul className="hike-list">{renderContent}</ul>
            <div className="pager">
              <ul className="pager-list">
                {this.state.pageNumbers !== null &&
                  this.state.pageNumbers.map(number => {
                    return (
                      <li
                        key={number}
                        id={number}
                        className={
                          number === this.state.currentPage
                            ? "pager-list__item pager-list__item--active"
                            : "pager-list__item"
                        }
                        onClick={this.handleClickPagination}
                      >
                        {number}
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Hikes

const calcpagenumbers = (items, itemsPerPage) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }
  return pageNumbers
}

export const hikeQuery = graphql`
  {
    posts: allNodeBlog(
      sort: { fields: [created], order: [DESC] }
      filter: {
        relationships: {
          field_blog_category: {
            drupal_internal__tid: { in: [5, 6, 7, 8, 16, 17, 18] }
          }
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
    file(relativePath: { eq: "sun-trees-appalachian-trail.jpeg" }) {
      cis: childImageSharp {
        f: fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
