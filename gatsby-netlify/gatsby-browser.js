/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

export function shouldUpdateScroll(prevRouterProps, { location }) {
  window.scrollTo(0, 0)
  const body = document.getElementsByTagName("body")[0]
  body.scrollTop = 0
  return false
}