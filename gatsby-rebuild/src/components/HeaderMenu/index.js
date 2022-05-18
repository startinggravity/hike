import React from "react"
import Logo from "../Logo"
import { Link } from "gatsby"

class HeaderMenu extends React.Component {
  state = { showMenu: false, showSearch: false }

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    })
  }

  render() {
    const menuActive = this.state.showMenu ? "show-menu" : "no-menu"

    return (
      <>
        <div className={`off-canvas ${menuActive}`}>
          <div className="search-menu">
            <nav role="navigation" className="main-menu">
              <h2 className="visually-hidden">Main navigation</h2>

              <ul className="main-menu__list">
                <li className="main-menu__item main-menu__item--expanded">
                  <Link
                    to="/hikes"
                    title="Hike Reports"
                    className="main-menu__link main-menu__link--hikes text-3xl"
                  >
                    Hikes
                  </Link>
                  <ul
                    className="menu main-menu__submenu"
                    style={{ borderTop: "1px solid #999" }}
                  >
                    <li className="main-menu__item">
                      <Link
                        to="/hikes/at-2017"
                        title="Hike Reports: Aooalachian Trail 2017"
                        className="main-menu__link main-menu__link--appalachian-trail-2017"
                      >
                        Appalachian Trail 2017
                      </Link>
                    </li>
                    <li className="main-menu__item">
                      <Link
                        to="/hikes/pct-2019"
                        title="Hike Reports: Pacific Crest Trail 2019"
                        className="main-menu__link main-menu__link--pacific-crest-trail-2019"
                      >
                        Pacific Crest Trail 2019
                      </Link>
                    </li>
                    <li className="main-menu__item">
                      <Link
                        to="/hikes/bmt-2020"
                        title="Hike Reports: Benton MacKaye Trail 2020"
                        className="main-menu__link main-menu__link--benton-mackaye-trail-2020"
                      >
                        Benton MacKaye Trail 2020
                      </Link>
                    </li>
                    <li className="main-menu__item">
                      <Link
                        to="/hikes/cdt-2021"
                        title="Hike Reports: Continental Divide Trail 2021"
                        className="main-menu__link main-menu__link--continental-divide-trail-2021"
                      >
                        Continental Divide Trail 2021
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="main-menu__item main-menu__item--active-trail">
                  <Link
                    to="/gear"
                    title="Gear"
                    className="main-menu__link main-menu__link--gear text-3xl"
                  >
                    Gear
                  </Link>
                </li>
                <li className="main-menu__item">
                  <Link
                    to="/about"
                    title="About Gravity and this site"
                    className="main-menu__link main-menu__link--about text-3xl"
                  >
                    About
                  </Link>
                </li>
                <li className="main-menu__item">
                  <Link
                    to="/contact"
                    title="Contact Gravity"
                    className="main-menu__link main-menu__link--contact text-3xl"
                  >
                    Contact
                  </Link>
                </li>
                <li className="main-menu__item">
                  <Link
                    to="/subscribe"
                    title="Sign up to receive email updates"
                    className="main-menu__link main-menu__link--subscribe text-xl"
                  >
                    Sign up to receive email updates
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="header__wrapper">
            <div className="header__inner flex flex-row justify-between items-start">
              <div className="site-header__menu-button">
                <button
                  className="menu-button__toggle js-toggle__menu"
                  href="#"
                  onClick={this.toggleMenu}
                  aria-label="Menu"
                >
                  <span className="menu-button__text">Menu</span>
                </button>
              </div>
              <div className="site-logo">
                <Logo />
              </div>
              <div className="site-header__search-button">
                <Link
                  aria-label="Search"
                  className="search-button__toggle js-toggle__search"
                  to="/search"
                >
                  <span className="search-button__text">Search</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default HeaderMenu
