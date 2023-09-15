const { paginate } = require("gatsby-awesome-pagination")
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
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) reject(result.errors)
        if (!result.data) reject("No data found. Fix your GraphQL stuff")

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
        // AT teasers
        paginate({
          createPage,
          items: result.data.allNodeBlog.edges,
          itemsPerPage: 24,
          pathPrefix: "/hikes/at-2017",
          component: path.resolve("src/templates/hikes/blog-archive_at.js"),
        })
        // PCT Teasers
        paginate({
          createPage,
          items: result.data.allNodeBlog.edges,
          itemsPerPage: 24,
          pathPrefix: "/hikes/pct-2019",
          component: path.resolve("src/templates/hikes/blog-archive_pct.js"),
        })
        // CDT Teasers
        paginate({
          createPage,
          items: result.data.allNodeBlog.edges,
          itemsPerPage: 24,
          pathPrefix: "/hikes/cdt-2021",
          component: path.resolve("src/templates/hikes/blog-archive_cdt.js"),
        })
        // BMT Teasers
        paginate({
          createPage,
          items: result.data.allNodeBlog.edges,
          itemsPerPage: 24,
          pathPrefix: "/hikes/bmt-2020",
          component: path.resolve("src/templates/hikes/blog-archive_bmt.js"),
        })
        // PT Teasers
        paginate({
          createPage,
          items: result.data.allNodeBlog.edges,
          itemsPerPage: 24,
          pathPrefix: "/hikes/alt-2021",
          component: path.resolve("src/templates/hikes/blog-archive_alt.js"),
        })
        // PT Teasers
        paginate({
          createPage,
          items: result.data.allNodeBlog.edges,
          itemsPerPage: 24,
          pathPrefix: "/hikes/pt-2022",
          component: path.resolve("src/templates/hikes/blog-archive_pt.js"),
        })
        // PT Teasers
        paginate({
          createPage,
          items: result.data.allNodeBlog.edges,
          itemsPerPage: 24,
          pathPrefix: "/hikes/fht-bt-2022",
          component: path.resolve("src/templates/hikes/blog-archive_fht-bt.js"),
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `node__blog`) {
    const slug = `${node.drupal_internal__nid}`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
