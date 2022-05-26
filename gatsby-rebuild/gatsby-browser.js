/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import './src/styles/globals.css'

exports.onInitialClientRender = () => {
  if (typeof window !== `undefined`) {
    window.scrollTo(0, 0)
  }
}