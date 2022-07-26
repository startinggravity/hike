import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import Layout from "../components/layout"
import Title from "../components/field/title"

const Gear = () => {
  const fullTitle = "Gear That I Use"
  const coverImage = "../images/gravity-in-sierra.jpeg"
  const socialImage = "/gear-page.jpeg"
  const thisPath = "/gear"
  return (
    <Layout>
      <Seo
        title={fullTitle}
        description="Lists of the gear I carry on long-distance hikes."
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
          "Benton MacKaye",
          "Pinhoti",
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
          "Hike with Gravity",
        ]}
        nodePath={thisPath}
        nodeImage={socialImage}
      />
      <div className="main__content gear-list-page">
        <div className="h-screen relative max-h-96 list-page">
          <div className="heading-container absolute flex justify-center items-center bottom-20 w-full">
            <div className="mx-2 text-center w-9/12 cover-text">
              <Title>{fullTitle}</Title>
            </div>
          </div>

          <div className="fixed -z-10 cover-image h-screen max-h-96">
            <div className="w-full">
              <StaticImage
                alt="Gravity on the Pacific Crest Trail"
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
              <p>
                I've put together lists of clothing and gear I carry on my
                hikes. I also created a{" "}
                <a href="https://lighterpack.com/r/u89wvg">
                  Lighterpack.com page
                </a>{" "}
                for the gear I carried on the CDT in 2021.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-5xl py-2.5">
            <div className="gear-list-teasers">
              <article className="hike-list__item">
                <Link to={"/gear/hiking"}>
                  <div className="hike-list__text">
                    <h3>Hiking</h3>
                  </div>
                  <div className="hike-list__image">
                    <StaticImage
                      alt="Polecat walking on the PCT"
                      src="../images/hiking_teaser.jpeg"
                      width="330"
                      aspectRatio={1}
                      className="blog-thumb"
                    />
                  </div>
                </Link>
              </article>
              <article className="hike-list__item">
                <Link to={"/gear/shelter-sleeping"}>
                  <div className="hike-list__text">
                    <h3>Shelter and Sleep System</h3>
                  </div>
                  <div className="hike-list__image">
                    <StaticImage
                      alt="Tents on the PCT"
                      src="../images/shelter_teaser.jpeg"
                      width="330"
                      aspectRatio={1}
                      className="blog-thumb"
                    />
                  </div>
                </Link>
              </article>
              <article className="hike-list__item">
                <Link to={"/gear/clothing-shoes"}>
                  <div className="hike-list__text">
                    <h3>Clothing and Shoes</h3>
                  </div>
                  <div className="hike-list__image">
                    <StaticImage
                      alt="Gravity on the PCT"
                      src="../images/clothing_teaser.jpeg"
                      width="330"
                      aspectRatio={1}
                      className="blog-thumb"
                    />
                  </div>
                </Link>
              </article>
              <article className="hike-list__item">
                <Link to={"/gear/cooking-filtration"}>
                  <div className="hike-list__text">
                    <h3>Cooking and Filtration</h3>
                  </div>
                  <div className="hike-list__image">
                    <StaticImage
                      alt="A stove at a campsite"
                      src="../images/cooking_teaser.jpeg"
                      width="330"
                      aspectRatio={1}
                      className="blog-thumb"
                    />
                  </div>
                </Link>
              </article>
              <article className="hike-list__item">
                <Link to={"/gear/first-aid-hygiene-miscellaneous"}>
                  <div className="hike-list__text">
                    <h3>First Aid, Hygiene, and Miscellaneous</h3>
                  </div>
                  <div className="hike-list__image">
                    <StaticImage
                      alt="A view of a footpath"
                      src="../images/first-aid_teaser.jpeg"
                      width="330"
                      aspectRatio={1}
                      className="blog-thumb"
                    />
                  </div>
                </Link>
              </article>
              <article className="hike-list__item">
                <Link to={"/gear/electronics"}>
                  <div className="hike-list__text">
                    <h3>Eectronics</h3>
                  </div>
                  <div className="hike-list__image">
                    <StaticImage
                      alt="Yellow wildflowers"
                      src="../images/electronics_teaser.jpeg"
                      width="330"
                      aspectRatio={1}
                      className="blog-thumb"
                    />
                  </div>
                </Link>
              </article>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Gear
