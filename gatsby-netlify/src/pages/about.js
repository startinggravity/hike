import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import Layout from "../components/layout"
import Title from "../components/field/title"
import SubTitle from "../components/field/subtitle"

const About = () => {
  const fullTitle = "About"
  const subTitle = "Gravity and Trails"
  const coverImage = "../images/gravity-in-maine.jpeg"
  const socialImage = "/gear-page.jpeg"
  const thisPath = "/about"
  return (
    <Layout>
      <Seo
        title={fullTitle}
        description="Information about myself, this website, and the trails I have hiked."
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
      <div className="main__content about-list-page">
        <div className="h-screen relative max-h-96 list-page">
          <div className="heading-container absolute flex justify-center items-center bottom-20 w-full">
            <div className="mx-2 text-center w-9/12 cover-text">
              <Title>{fullTitle}</Title>
              <SubTitle>{subTitle}</SubTitle>
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
                Here is a little information about me, this site, and some of
                the trails I have hiked.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-5xl py-2.5">
            <div className="gear-list-teasers">
              <article className="hike-list__item">
                <Link to={"/about/gravity/"}>
                  <div className="hike-list__text">
                    <h3>Gravity</h3>
                  </div>
                  <div className="hike-list__image">
                    <StaticImage
                      alt="A photo of Gravity"
                      src="../images/gravity_teaser.jpg"
                      width={330}
                      aspectRatio={1}
                      className="blog-thumb"
                    />
                  </div>
                </Link>
              </article>
              <article className="hike-list__item">
                <Link to={"/about/my-trail-name/"}>
                  <div className="hike-list__text">
                    <h3>My Trail Name</h3>
                  </div>
                  <div className="hike-list__image">
                    <StaticImage
                      alt="Gravity standing on Beauty Spot on the AT"
                      src="../images/gravity-trail_teaser.jpeg"
                      width={330}
                      aspectRatio={1}
                      className="blog-thumb"
                    />
                  </div>
                </Link>
              </article>
              <article className="hike-list__item">
                <Link to={"/hikes/about/my-triple-crown-hikes/"}>
                  <div className="hike-list__text">
                    <h3>My Triple Crown Hikes</h3>
                  </div>
                  <div className="hike-list__image">
                    <StaticImage
                      alt="Gravity walking in Oregon on the PCT"
                      src="../images/gravity-triple_teaser.jpg"
                      width={330}
                      aspectRatio={1}
                      className="blog-thumb"
                    />
                  </div>
                </Link>
              </article>
              <article className="hike-list__item">
                <Link to={"/about/this-site/"}>
                  <div className="hike-list__text">
                    <h3>This Site</h3>
                  </div>
                  <div className="hike-list__image">
                    <StaticImage
                      alt="A computer screen displays website code"
                      src="../images/about-site_teaser.jpeg"
                      width={330}
                      aspectRatio={1}
                      className="blog-thumb"
                    />
                  </div>
                </Link>
              </article>
              <article className="hike-list__item">
                <Link to={"/about/the-appalachian-trail/"}>
                  <div className="hike-list__text">
                    <h3>The Appalachian Trail</h3>
                  </div>
                  <div className="hike-list__image">
                    <StaticImage
                      alt="A rock in Roan Highlands"
                      src="../images/at_teaser.jpeg"
                      width={330}
                      aspectRatio={1}
                      className="blog-thumb"
                    />
                  </div>
                </Link>
              </article>
              <article className="hike-list__item">
                <Link to={"/about/the-pacific-crest-trail/"}>
                  <div className="hike-list__text">
                    <h3>The Pacific Crest Trail</h3>
                  </div>
                  <div className="hike-list__image">
                    <StaticImage
                      alt="The PCT in Washington"
                      src="../images/pct_teaser.jpeg"
                      width={330}
                      aspectRatio={1}
                      className="blog-thumb"
                    />
                  </div>
                </Link>
              </article>
              <article className="hike-list__item">
                <Link to={"/about/the-continental-divide-trail/"}>
                  <div className="hike-list__text">
                    <h3>The Continental Divide Trail</h3>
                  </div>
                  <div className="hike-list__image">
                    <StaticImage
                      alt="Wind River Range"
                      src="../images/cdt_teaser.jpeg"
                      width={330}
                      aspectRatio={1}
                      className="blog-thumb"
                    />
                  </div>
                </Link>
              </article>
              <article className="hike-list__item">
                <Link to={"/about/the-benton-mackaye-trail/"}>
                  <div className="hike-list__text">
                    <h3>The Benton MacKaye Trail</h3>
                  </div>
                  <div className="hike-list__image">
                    <StaticImage
                      alt="A creek on the BMT"
                      src="../images/bmt_teaser.jpeg"
                      width={330}
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

export default About
