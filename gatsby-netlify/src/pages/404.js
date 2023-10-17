import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import Layout from "../components/layout"
import Title from "../components/field/title"

const NotFoundPage = data => {
  const fullTitle = "Oops!"
  const coverImage = "../images/404-marmot.jpeg"
  const socialImage = "../images/at_social.jpeg"
  const thisPath = "/404"
  return (
    <Layout>
      <Seo
        title="404: Page not found"
        description="All of the daily reports about Gravity's long-distance hikes."
        keywords={[
          `Pacific Crest Trail`,
          `Appalachian Trail`,
          `Continental Divide Trail`,
          `Mojave Desert`,
          `Sierra Nevada`,
          `Great Smoky Mountains`,
          `White Mountains`,
          `Springer Mountain`,
          `Mount Katahdin`,
          'Benton MacKaye',
          'Pinhoti Trail',
          `AT`,
          `PCT`,
          `CDT`,
          `thru-hiking`,
          `thru-gear`,
          `Triple Crown`,
          `backpacking`,
          `hiking`,
          `trail`,
          `long distance hiking`,
          `blog`,
          `Gravity`,
          'Hike with Gravity',
        ]}
        nodePath={thisPath}
        nodeImage={socialImage}
      />
      <div className="h-screen relative max-h-96 list-page">
        <div className="heading-container absolute flex justify-center items-center bottom-20 w-full">
          <div className="mx-2 text-center w-9/12 cover-text">
            <Title>{fullTitle}</Title>
          </div>
        </div>

        <div className="fixed -z-10 cover-image h-screen max-h-96">
          <div className="w-full">
            <StaticImage
              alt="404: Page not found"
              src={coverImage}
              className="cover-img h-screen max-h-96"
              loading="eager"
            />
          </div>
        </div>
      </div>
      <div className="relative z-0 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="mt-6 text-2xl prose mx-auto max-w-3xl px-5 py-4 text-gravBlack">
            <h2 className="gravBlack text-center font-bold text-2xl md:text-3xl lg:text-4xl my-4">
              Looks like you've wandered off the trail!
            </h2>
            <p>
              Something went wrong with the link you clicked and you wound up on
              this page.
            </p>
            <p>
              To get back on the trail, try using the{" "}
              <Link to="/search">search page</Link>.
            </p>
            <p>
              If you still can't find your way, please{" "}
              <Link to="/contact">send me a message</Link> and let me know where
              the trail is mis-marked.
            </p>
            <p>&nbsp;</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage
