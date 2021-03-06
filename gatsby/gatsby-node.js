const path = require(`path`)

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogTemplate = path.resolve(`src/templates/NodeBlogTemplate/index.js`)

    resolve(
      graphql(
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
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) reject(result.errors)
        if (!result.data) reject("No data found. Fix your GraphQL stuff")
        console.log("Creating Blog Nodes")
        result.data.allNodeBlog.edges.forEach(({ node }, index) => {
          createPage({
            path: node.path.alias,
            component: blogTemplate,
            context: {
              slug: node.nid,
              prev:
                index === 0
                  ? null
                  : result.data.allNodeBlog.edges[index - 1].node,
              next:
                index === result.data.allNodeBlog.edges.length - 1
                  ? null
                  : result.data.allNodeBlog.edges[index + 1].node,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (
    node.internal.type === `node__blog`
  ) {
    const slug = `${node.nid}`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
