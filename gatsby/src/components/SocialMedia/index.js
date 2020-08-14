import React from "react"


const SocialMedia = () => (

  <div className="social-media">
    <p>Follow me and subscribe to my email newsletter</p>
    <ul className="social-media__list">
      <li className="social-media__item">
        <a href="https://twitter.com/hikewithgravity" title="Follow me on Twitter" 
        className="social-media__link social-media__link--twitter"><span className="visually-hidden">Twitter</span></a>
      </li>
      <li className="social-media__item">
        <a href="https://www.instagram.com/hikewithgravity/" title="Instagram" 
        className="social-media__link social-media__link--instagram"><span className="visually-hidden">Instagram</span></a>
      </li>
      <li className="social-media__item">
        <a href="https://www.facebook.com/jim.smith" title="Facebook" 
        className="social-media__link social-media__link--facebook"><span className="visually-hidden">Facebook</span></a>
      </li>
      <li className="social-media__item">
        <a href="/subscribe" title="Sign up to receive email updates" 
        className="social-media__link social-media__link--subscribe"><span className="visually-hidden">Subscribe</span></a>
      </li>
      <li className="social-media__item">
        <a href="/hikes.xml" title="RSS Feed" 
        className="social-media__link social-media__link--rss"><span className="visually-hidden">RSS</span></a>
      </li>
    </ul>
  </div>

)
  
export default SocialMedia

 