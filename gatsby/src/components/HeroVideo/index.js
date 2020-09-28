import React from "react"
import Img from "gatsby-image"
import quoteImage from "../../assets/images/quote-min.png"
import firstFrame from "../../assets/images/blog_loop_first_frame.jpg"
import video from "../../assets/video/blog_loop.mp4"


const HeroVideo = (title, subtitle) => (
  <div className="hero-video">
    <video
      className="hero-video__player"
      autoPlay
      muted
      playsinline
      loop=""
      poster={firstFrame}
      preload="auto"
      src={video}
    >
    </video>

    <div className="hero-video__text">
      <img
        src={quoteImage}
        alt="In every walk with nature, one receives far more than he seeks. - John Muir"
        className="quote-img"
      />
      {/* <h2 className="hero-video__quote">
        "In every walk with nature, one receives far more than he seeks."
      </h2>
      <h3 className="hero-video__quote-attribution">John Muir</h3> */}
    </div>
  </div>
)

export default HeroVideo
