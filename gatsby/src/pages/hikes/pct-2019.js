import React, { Component } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import SEO from "../../components/seo"
import Layout from "../../components/layout"
import Filter from "../../components/fields/Filter"

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
    document.body.scrollTop = document.documentElement.scrollTop = 250
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
          title="Hikes: Pacific Crest Trail 2019"
          description="I hiked the Pacific Crest Trail in 2019, starting from from the
          U.S. border with Mexico on March 24."
          keywords={[
            `Pacific Crest Trail`,
            `Mojave Desert`,
            `Sierra Nevada`,
            `PCT`,
            `2019`,
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
              alt="Goat Rocks on the Pacific Crest Trail with a view of Mt. Ranier"
              fluid={{ ...this.props.data.file.cis.f, aspectRatio: 32 / 9 }}
            />
          </div>
          <div className="semi-hero__text">
            <h1>Trail Reports</h1>
            <h2>Pacific Crest Trail 2019</h2>
          </div>
        </div>
        <div className="main__content">
          <Filter />
          <div className="body-text">
            <p>
              I hiked the <Link to="/about/the-pacific-crest-trail">Pacific Crest Trail</Link> in 2019, starting from from the
              U.S. border with Mexico on March 24.
            </p>
            <p>
              Because of unusually-heavy snowfall in the Sierra Nevada, I chose
              to flip to Washing to complete my hike.
            </p>
            <p>
              I am still writing posts about this hike, so please check back
              regularly for additions.
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
      sort: { fields: [created], order: [ASC] }
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
                  fluid(
                    maxWidth: 500
                    grayscale: true
                  ) {
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
    file(relativePath: { eq: "pacific-crest-trail_goat-rocks.jpeg" }) {
      cis: childImageSharp {
        f: fluid(srcSetBreakpoints: [480, 640, 960, 1280, 2560]) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
