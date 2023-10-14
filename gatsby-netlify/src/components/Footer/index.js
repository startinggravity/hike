import React from "react"
import { Link } from "gatsby"
import footerLogo from "./footer_logo.svg"
import ccLogo from "./creative_commons.svg"

function FooterLogo() {
  return <img src={footerLogo} alt="Hike with Gravity Logo" loading="lazy" />
}

function CreativeCommonsLogo() {
  return <img src={ccLogo} alt="Creative Commons license Logo" loading="lazy" />
}

const Footer = () => (
  <footer className="footer">
    <nav role="navigation" aria-labelledby="footer-menu" id="footer-menu">
      <h2 className="visually-hidden footer-menu__title">Menu</h2>
      <ul className="footer-menu">
        <li className="footer-menu__item">
          <Link to="/" title="Home page" className="footer-menu__link">
            Home
          </Link>
        </li>
        <li className="footer-menu__item">
          <Link
            to="/hikes"
            title="Latest hike reports"
            className="footer-menu__link"
          >
            Hikes
          </Link>
        </li>
        <li className="footer-menu__item">
          <Link
            to="/gear"
            title="Gear I carry or have used"
            className="footer-menu__link"
          >
            Gear
          </Link>
        </li>
        <li className="footer-menu__item">
          <Link
            to="/about"
            title="About Gravity and this site"
            className="footer-menu__link"
          >
            About
          </Link>
        </li>
        <li className="footer-menu__item">
          <Link
            to="/contact"
            title="Send a message to Gravity"
            className="footer-menu__link"
          >
            Contact
          </Link>
        </li>
        <li className="footer-menu__item">
          <Link
            to="/subscribe"
            title="Sign up to receive email updates"
            className="footer-menu__link"
          >
            Subscribe
          </Link>
        </li>
      </ul>
    </nav>

    <div className="footer-credits">
      <div className="footer-credits__image">
        <a href="/" title="Home page">
          <FooterLogo />
        </a>
      </div>
      <div className="footer-credits__copyright">
        Copyright 2017 - {new Date().getFullYear()} by Jim "Gravity" Smith
      </div>
      <div className="footer-credits__links">
        <a
          rel="license"
          title="Creative Commons license"
          href="http://creativecommons.org/licenses/by-nc/4.0/"
        >
          <CreativeCommonsLogo />
        </a>
        <p>
          This work is licensed under a
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-nc/4.0/"
          >
            &nbsp;Creative Commons Attribution-NonCommercial 4.0 International
            License.
          </a>
        </p>
        <p>
          This site was built by
          <a href="https://www.startinggravity.com"> Starting Gravity</a> using
          the open-source projects <a href="https://drupal.org">Drupal</a> and
          <a href="https://gatsbyjs.org"> GatsbyJS</a>.
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
