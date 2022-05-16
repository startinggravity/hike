const path = require("path")

const { inlineImagesFieldExtractor } = require(`./src/helpers/node-body-parser`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.onCreateNode = async ({
  createNodeId,
  node,
  actions,
  store,
  cache,
  getCache,
}) => {
  const { createNode, createNodeField } = actions

  const contentTypes = ["node__page", "node__blog"]
  if (contentTypes.includes(node.internal.type)) {
    const { nodeBodyContent, nodeInlineImages } =
      inlineImagesFieldExtractor(node)
    if (nodeInlineImages.length === 0) {
      // Create bodyProcessedWithInlineImages field
      createNodeField({
        node,
        name: "bodyProcessedWithInlineImages",
        value: nodeBodyContent,
      })

      return
    }

    let bodyProcessedWithInlineImages = nodeBodyContent
    const inlineImageField = []
    for (const nodeInlineImage of nodeInlineImages) {
      // Copied from gatsby-source-drupal
      const fileNode = await createRemoteFileNode({
        url: nodeInlineImage.remotePath,
        name: path.parse(decodeURIComponent(nodeInlineImage.remotePath)).name,
        store,
        cache,
        createNode,
        createNodeId,
        getCache,
      })
      // Copied from gatsby-source-drupal

      if (fileNode) {
        inlineImageField.push({
          originalImageUrl: nodeInlineImage.relativePath,
          localFile___NODE: fileNode.id,
        })
      }

      // Replace image relativePath with remotePath
      bodyProcessedWithInlineImages = bodyProcessedWithInlineImages.replace(
        nodeInlineImage.relativePath,
        nodeInlineImage.remotePath
      )
    }

    // Create bodyProcessedWithInlineImages field
    createNodeField({
      node,
      name: "bodyProcessedWithInlineImages",
      value: bodyProcessedWithInlineImages,
    })

    // Create inlineImages field
    if (inlineImageField.length > 0) {
      createNodeField({
        node,
        name: "inlineImages",
        value: inlineImageField,
      })
    }
  }
}

// exports.createPages = ({ actions, graphql }) => {
//   const { createPage } = actions

//   return new Promise((resolve, reject) => {
//     const blogTemplate = path.resolve(`src/pages/{nodeBlog.path__alias}.js`)

//     resolve(
//       graphql(
//         `
//           {
//             allNodeBlog(
//               filter: { status: { eq: true } }
//               sort: { fields: [created], order: [ASC] }
//             ) {
//               edges {
//                 node {
//                   title
//                   status
//                   nid: drupal_internal__nid
//                   path {
//                     alias
//                   }
//                   fields {
//                     slug
//                   }
//                 }
//               }
//             }
//           }
//         `
//       ).then(result => {
//         if (result.errors) reject(result.errors)
//         if (!result.data) reject("No data found. Fix your GraphQL stuff")
//         console.log("Creating Blog Nodes")
//         result.data.allNodeBlog.edges.forEach(({ node }, index) => {
//           createPage({
//             path: node.path.alias,
//             component: blogTemplate,
//             context: {
//               slug: node.fields.slug,
//               prev:
//                 index === 0
//                   ? null
//                   : result.data.allNodeBlog.edges[index - 1].node,
//               next:
//                 index === result.data.allNodeBlog.edges.length - 1
//                   ? null
//                   : result.data.allNodeBlog.edges[index + 1].node,
//             },
//           })
//         })
//       })
//     )
//   })
// }

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  const slug = `${node.drupal_internal__nid}`
  createNodeField({
    node,
    name: `slug`,
    value: slug,
  })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)
  return graphql(
    `
      {
        allNodeBlog(
          filter: { status: { eq: true } }
          sort: { fields: [created], order: [ASC] }
        ) {
          edges {
            node {
              title
              status
              nid: drupal_internal__nid
              path {
                alias
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.allNodeBlog.edges
    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node
      createPage({
        ...page,
        context: {
          ...page.context,
          foo: post.node.fields.slug,
        },
      })
    })
  })
}
