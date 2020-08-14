import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import { Helmet } from "react-helmet"
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
              {/* <h3>{node.field_secondary_title}</h3> */}
            </div>
            <div className="hike-list__image">
              <Img
                fluid={media}
                alt={hike.node.alt.alt}
                sizes={{ ...media, aspectRatio: 1 / 1 }}
              />
            </div>
          </Link>
        </li>
      )
    })

    return (
      <Layout>
        <SEO
          title="Hikes: Frozen Head State Park"
          description="I am fortunate to live near Frozen Head State Park in Tennessee.
          It has many scenic and sometimes-challenging trails, which are
          perfect for when I'm training for a thru-hike. Here are some of my
          favorite hikes in Frozen Head."
          keywords={[
            `Frozen Head State Park`,
            `day hiking`,
            `Tennessee`,
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
              alt="A trail in Frozen Head State Park, Tennessee"
              sizes={{ ...this.props.data.file.cis.f, aspectRatio: 32 / 9 }}
            />
          </div>
          <div className="semi-hero__text">
            <h1>Trail Reports</h1>
            <h2>Frozen Head State Park</h2>
          </div>
        </div>
        <div className="main__content">
          <Filter />
          <div className="body-text">
            <p>
              I am fortunate to live near Frozen Head State Park in Tennessee.
              It has many scenic and sometimes-challenging trails, which are
              perfect for when I'm training for a thru-hike. Here are some of my
              favorite hikes in Frozen Head.
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
          field_blog_category: { drupal_internal__tid: { in: [7] } }
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
                  fluid(maxWidth: 500, quality: 50) {
                    src
                    srcSet
                    aspectRatio
                    sizes
                  }
                }
              }
            }
            category: field_blog_category {
              tid: drupal_internal__tid
            }
          }
          field_secondary_title
          alt: field_main_image {
            alt
          }
        }
      }
    }
    file(relativePath: { eq: "frozen-head-state-park-trail.jpeg" }) {
      cis: childImageSharp {
        f: fluid(srcSetBreakpoints: [480, 640, 960, 1280, 2560]) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
