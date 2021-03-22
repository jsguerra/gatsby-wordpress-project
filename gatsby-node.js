/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

// exports.createResolvers = async (
//   {
//     actions,
//     cache,
//     createNodeId,
//     createResolvers,
//     store,
//     reporter,
//   },
// ) => {
//   const { createNode } = actions

//   await createResolvers({
//     WPGraphQL_MediaItem: {
//       imageFile: {
//         type: "File",
//         async resolve(source) {
//           let sourceUrl = source.sourceUrl

//           if (source.mediaItemUrl !== undefined) {
//             sourceUrl = source.mediaItemUrl
//           }

//           return await createRemoteFileNode({
//             url: encodeURI(sourceUrl),
//             store,
//             cache,
//             createNode,
//             createNodeId,
//             reporter,
//           })
//         },
//       },
//     },
//   })
// }

exports.createPages = async({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const BlogPostTemplate = path.resolve("./src/templates/BlogPosts.js")
  const PageTemplate = path.resolve("./src/templates/Page.js")

  const result = await graphql(`
    {
      allWpPost {
        edges {
          node {
            title
            slug
            id
          }
        }
      }
      allWpPage {
        edges {
          node {
            title
            slug
            id
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const BlogPosts = result.data.allWpPost.edges

  BlogPosts.forEach(post => {
    createPage({
      path: `/post/${post.node.slug}`,
      component: BlogPostTemplate,
      context: {
        id: post.node.id,
      },
    })
  })

  const Pages = result.data.allWpPage.edges

  Pages.forEach(page => {
    createPage({
      path: `/${page.node.slug}`,
      component: PageTemplate,
      context: {
        id: page.node.id,
      },
    })
  })
}