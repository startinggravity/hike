import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import Layout from "../../components/layout"
import Pager from "../../components/pager"
import Title from "../../components/field/title"
import SubTitle from "../../components/field/subtitle"
import Seo from "../../components/seo"

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    allNodeBlog(
      sort: { created: ASC }
      filter: {
        moderation_state: { eq: "published" }
        relationships: {
          field_blog_category: { drupal_internal__tid: { in: 18 } }
        }
      }
      skip: $skip
      limit: $limit
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
        }
      }
      totalCount
    }
  }
`

const BlogArchive = ({ data, pageContext }) => {
  const posts = data.allNodeBlog.edges
  const totalPosts = data.allNodeBlog.totalCount
  const fullTitle = "Hike Reports:"
  const subTitle = "Continental Divide Trail 2021"
  const coverImage = "../../images/cdt_header.jpeg"
  const socialImage = "/cdt_social.jpeg"
  const thisPath = "/hikes/cdt-2021/"
  return (
    <>
      <Seo
        title={fullTitle + ` ` + subTitle}
        description={
          `A collection of blog posts from Gravity's ` +
          subTitle +
          ` thru-hike.`
        }
        nodePath={thisPath}
        nodeImage={socialImage}
      />
      <Layout>
        <div className="h-screen relative max-h-96 list-page">
          <div className="heading-container absolute flex justify-center items-center bottom-20 w-full">
            <div className="mx-2 text-center w-9/12 cover-text">
              <Title>{fullTitle}</Title>
              <SubTitle>{subTitle}</SubTitle>
            </div>
          </div>

          <div className="fixed -z-10 cover-image h-screen max-h-96">
            <StaticImage
              alt={`A photo from ` + subTitle}
              src={coverImage}
              className="h-screen max-h-96"
              loading="eager"
            />
          </div>
        </div>
        <div className="relative z-0 bg-white">
          <div className="mx-auto max-w-5xl">
            <div className="mt-6 text-2xl prose mx-auto max-w-3xl px-5 py-4 text-gravBlack">
              <p>
                I thru-hiked the Continental Divide Trail in 2021. Day-by-day
                reports of my hike are found below. Read more about the
                CDT{" "}
                <Link
                  to={"/about/the-continental-divide-trail"}
                  title={"The Continental Divide Trail"}
                >
                  here
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-5xl py-2.5">
            <div className="hike-list">
              {posts.map(({ node }) => {
                const postTitle = node.title
                const thumb = node.relationships.field_main_image.gatsbyImage
                const alt = node.field_main_image.alt
                return (
                  <article key={node.fields.slug} className="hike-list__item">
                    <Link to={node.path.alias}>
                      <div className="hike-list__text">
                        <h3>{postTitle}</h3>
                      </div>
                      <div className="hike-list__image">
                        <GatsbyImage
                          alt={alt}
                          image={getImage(thumb)}
                          className="blog-thumb"
                        />
                      </div>
                    </Link>
                  </article>
                )
              })}
            </div>
          </div>
          <div className="mx-auto max-w-5xl py-2.5">
            <Pager pageContext={pageContext} totalPosts={totalPosts} />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default BlogArchive
