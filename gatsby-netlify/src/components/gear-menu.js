import React from "react"
import { Link } from "gatsby"

const GearMenu = () => (
  <div className="secondary-menu">
    <ul className="secondary-menu__list">
      <li className="secondary-menu__item">
        <Link to="/gear/hiking">Hiking</Link>
      </li>
      <li className="secondary-menu__item">
        <Link to="/gear/shelter-sleeping">Shelter and Sleep System</Link>
      </li>
      <li className="secondary-menu__item">
        <Link to="/gear/clothing-shoes">Clothing and Shoes</Link>
      </li>
      <li className="secondary-menu__item">
        <Link to="/gear/cooking-filtration">Cooking and Filtration</Link>
      </li>
      <li className="secondary-menu__item">
        <Link to="/gear/first-aid-hygiene-miscellaneous">
          First Aid, Hygiene, and Miscellaneous
        </Link>
      </li>
      <li className="secondary-menu__item">
        <Link to="/gear/electronics">Electronics</Link>
      </li>
    </ul>
  </div>
)

export default GearMenu
