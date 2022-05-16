// import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Logo from "../components/Logo"

function Header({ siteTitle }) {

  return (
    <div className="site-logo">
      <Logo />
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
