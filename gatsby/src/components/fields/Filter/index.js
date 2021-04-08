import React from "react"
import { Link } from "gatsby"

const Filter = () => (
  <div className="secondary-menu">
    <ul className="secondary-menu__list">
      <li className="secondary-menu__item">
        <Link to="/hikes/cdt-2021">Continental Divide Trail 2021</Link>
      </li>
      <li className="secondary-menu__item">
        <Link to="/hikes/bmt-2020">Benton MacKaye Trail 2020</Link>
      </li>
      <li className="secondary-menu__item">
        <Link to="/hikes/pct-2019">Pacific Crest Trail 2019</Link>
      </li>
      <li className="secondary-menu__item">
        <Link to="/hikes/at-2017">Appalachian Trail 2017</Link>
      </li>
      <li className="secondary-menu__item">
        <Link to="/hikes/frozen-head">Frozen Head State Park</Link>
      </li>
      <li className="secondary-menu__item">
        <Link to="/hikes">All</Link>
      </li>
    </ul>
  </div>
)

export default Filter
