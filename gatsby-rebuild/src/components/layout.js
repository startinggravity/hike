import React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"
import HeaderMenu from "./HeaderMenu"
import SocialMedia from "./SocialMedia"
import Footer from "./Footer"
import Trigger from "./trigger"


const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  return (
    <>
      <Trigger />
      <HeaderMenu />
      <main className="main overflow-hidden">
        {children}
        <div className="py-0 bg-white">
          <div className="main__social mt-6 mx-auto max-w-3xl px-5">
            <SocialMedia />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
