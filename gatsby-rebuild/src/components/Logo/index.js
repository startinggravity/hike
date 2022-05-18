import React from "react"
import logoSvg from "./logo.svg"

const Logo = () => (
  <a href="/" rel="Home" className="site-header__logo-link">
    <div className="site-header__logo-img site-header__logo-img--sm md:site-header__logo-img--med lg:site-header__logo-img--lg">
      <img src={logoSvg} alt="Hike with Gtravity" />
    </div>
  </a>
)
  
  export default Logo

 