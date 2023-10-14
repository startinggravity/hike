import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import Layout from "../components/layout"
import Title from "../components/field/title"
import SubTitle from "../components/field/subtitle"

const Hikes = () => {
  const fullTitle = "Hike Reports:"
  const subTitle = "All Hikes"
  const coverImage = "../images/sun-trees-appalachian-trail.jpeg"
  const socialImage = "/all-hikes.jpeg"
  const thisPath = "/hikes"
  return (
    <Layout>
      <Seo
        title={subTitle}
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
          `Benton MacKaye`,
          `Pinhoti Trail`,
          `Foothills Trail`,
          `Bartram Trail`,
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
          `Hike with Gravity`,
        ]}
        nodePath={thisPath}
        nodeImage={socialImage}
      />
      <div className="main__content">
        <div className="h-screen relative max-h-96 list-page">
          <div className="heading-container absolute flex justify-center items-center bottom-20 w-full">
            <div className="mx-2 text-center w-9/12 cover-text">
              <Title>{fullTitle}</Title>
              <SubTitle>{subTitle}</SubTitle>
            </div>
          </div>

          <div className="fixed -z-10 cover-image h-screen max-h-96">
            <StaticImage
              alt={`A photo from ` + subTitle}
              src={coverImage}
              className="h-screen max-h-96"
              loading="eager"
            />
          </div>
        </div>
        <div className="relative z-0 bg-white">
          <div className="mx-auto max-w-5xl">
            <div className="mt-6 text-2xl prose mx-auto max-w-3xl px-5 py-4 text-gravBlack">
              <p>
                I kept detailed notes during my long-distance hikes. Then after
                returning home, I wrote reports about each day. You can find
                these by following the links below.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-5xl py-2.5">
            <h2 className="gravBlack text-center font-bold text-2xl md:text-3xl lg:text-4xl my-4">
              The Triple Crown of Long-distance Hiking
            </h2>
            <div className="hike-list-triple">
              <article className="hike-list__item">
                <Link to={"/hikes/at-2017/"}>
                  <div className="hike-list__text">
                    <h3>Appalachian Trail 2017</h3>
                  </div>
                  <div className="hike-list__image">
                    <StaticImage
                      alt="Appalachian Trail 2017"
                      src="../images/appalachian-trail_mcafee-knob.jpeg"
                      width={1024}
                      aspectRatio={6}
                      className="blog-thumb"
                    />
                  </div>
                </Link>
              </article>
              <article className="hike-list__item">
                <Link to={"/hikes/pct-2019/"}>
                  <div className="hike-list__text">
                    <h3>Pacific Crest Trail 2019</h3>
                  </div>
                  <div className="hike-list__image">
                    <StaticImage
                      alt="Pacific Crest Trail 2019"
                      src="../images/pacific-crest-trail_goat-rocks.jpeg"
                      width={1024}
                      aspectRatio={6}
                      className="blog-thumb"
                    />
                  </div>
                </Link>
              </article>
              <article className="hike-list__item">
                <Link to={"/hikes/cdt-2021/"}>
                  <div className="hike-list__text">
                    <h3>Continental Divide Trail 2021</h3>
                  </div>
                  <div className="hike-list__image">
                    <StaticImage
                      alt="Continental Divide Trail 2021"
                      src="../images/cdt_header.jpeg"
                      width={1024}
                      aspectRatio={6}
                      className="blog-thumb"
                    />
                  </div>
                </Link>
              </article>
            </div>
          </div>
          <div className="mx-auto max-w-5xl pt-2.5 pb-6">
            <h2 className="gravBlack text-center font-bold text-2xl md:text-3xl lg:text-4xl my-4">
              Other Hikes
            </h2>
            <div className="hike-list">
              <article className="hike-list__item">
                <Link to={"/hikes/bmt-2020/"}>
                  <div className="hike-list__text">
                    <h3>Benton MacKaye Trail 2020</h3>
                  </div>
                  <div className="hike-list__image">
                    <StaticImage
                      alt="Benton MacKaye Trail 2020"
                      src="../images/bmt_teaser.jpeg"
                      width={330}
                      aspectRatio={1}
                      className="blog-thumb"
                    />
                  </div>
                </Link>
              </article>
              <article className="hike-list__item">
                <Link to={"/hikes/alt-2021/"}>
                  <div className="hike-list__text">
                    <h3>
                      Art Loeb Trail 2021
                    </h3>
                  </div>
                  <div className="hike-list__image">
                    <StaticImage
                      alt="Art Loeb Trail 2021"
                      src="../images/alt_teaser.jpeg"
                      width={330}
                      aspectRatio={1}
                      className="blog-thumb"
                    />
                  </div>
                </Link>
              </article>
              <article className="hike-list__item">
                <Link to={"/hikes/pt-2022/"}>
                  <div className="hike-list__text">
                    <h3>
                      Pinhoti Trail 2022
                      <br />
                      <span>(reports coming soon)</span>
                    </h3>
                  </div>
                  <div className="hike-list__image">
                    <StaticImage
                      alt="Pinhoti Trail 2022"
                      src="../images/pt_teaser.jpeg"
                      width={330}
                      aspectRatio={1}
                      className="blog-thumb"
                    />
                  </div>
                </Link>
              </article>
              <article className="hike-list__item">
                <Link to={"/hikes/fht-bt-2022/"}>
                  <div className="hike-list__text">
                    <h3>
                      Foothills and Bartram trails 2022
                      <br />
                      <span>(reports coming soon)</span>
                    </h3>
                  </div>
                  <div className="hike-list__image">
                    <StaticImage
                      alt="Foothills and Bartram trails 2022"
                      src="../images/fht-bt_teaser.jpeg"
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

export default Hikes
