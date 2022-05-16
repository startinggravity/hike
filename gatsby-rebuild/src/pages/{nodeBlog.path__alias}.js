import React from "react"
import { graphql } from "gatsby"
import Container from "../components/container"
import Header from "../components/header"
// import Footer from "../components/footer";
// import Cover from "../components/cover"
// import Seo from "../components/seo"
import Body from "../components/field/body"
import uuid from "react-uuid"
import { componentResolver } from "../helpers/component-resolver"
// import { PrevNextLinks } from "../helpers/node-prevnext.js"

export default function Post({ data: { node }, pageContext }) {
  // let fullTitle = node.rel.cat.name + ": " + node.title
  // let gearTitle = node.title + ": " + node.subtitle
  // let blogType = node.type.tid

  const components = componentResolver(node?.relationships?.field_body_elements)

console.log(pageContext)
  return (
    <>
      
      {/* <Seo
        title={blogType === 2 ? gearTitle : fullTitle}
        description={node.subtitle}
        nodePath={node.path.alias}
        nodeImage={
          node.thumb.field_main_image.localFile.childImageSharp.fixed.src
        }
      /> */}
      <Container>
        <Header />
{/* 
        <Cover
          className="prose prose-lg max-w-6xl mx-auto"
          title={fullTitle}
          category={node.rel.cat.name}
          subtitle={node.subtitle}
          alt={node.alt.alt}
          coverImage={node.cover.field_main_image.localFile.childImageSharp}
        /> */}

        <article className="prose prose-lg max-w-6xl mx-auto">
          <Body content={node?.intro?.processed} />

          {components &&
            components.map(item => {
              return <React.Fragment key={uuid()}>{item}</React.Fragment>
            })}
          {/* <PrevNextLinks /> */}
          <pre>{JSON.stringify(node, {}, 2)}</pre>
        </article>
      </Container>
    </>
  )
}

export const query = graphql`
  query nodeBlog($id: String) {
    node: nodeBlog(id: { eq: $id }) {
      title
      path {
        alias
      }
      nid: drupal_internal__nid
      intro: field_summary {
        processed
      }
      subtitle: field_secondary_title
      rel: relationships {
        cat: field_blog_category {
          name
        }
      }
      type: field_blog_type {
        tid: drupal_internal__target_id
      }
      alt: field_main_image {
        alt
      }
      relationships {
        field_body_elements {
          __typename
          ...ParagraphBody
          ...ParagraphHorizontalImage
          ...ParagraphVerticalImage
          ...ParagraphHikeDetails
          ...ParagraphQuotation
        }
      }
    }
  }
`
