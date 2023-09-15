import React from "react"
import { Link } from "gatsby"

const Pager = ({ pageContext, totalPosts }) => {
  const { previousPagePath, nextPagePath, pageNumber } = pageContext
  let noMore = 1
  const showPages = Math.ceil(totalPosts / 24) - 1
  if (pageNumber === showPages || isNaN(showPages) || showPages < 1) {
    noMore = null
  }

  return (
    <nav className="prev-next-archive mt-6 w-full">
      <div className="prev-next__prev w-full">
        {previousPagePath && (
          <Link to={previousPagePath}>
            <div className="prev-next__inner">
              <button
                className="prev-next__prev--link w-full"
                title="Go to Earlier Posts"
              >
                Earlier Posts
              </button>
            </div>
          </Link>
        )}
      </div>

      <div className="prev-next-back w-full">
        <div className="prev-next__inner">
          <Link to={"/hikes"}>
            <button
              className="prev-next__back--link w-full"
              title="Go to back to see all hikes"
            >
              All Hikes
            </button>
          </Link>
        </div>
      </div>

      <div className="prev-next__next w-full">
        {noMore && (
          <Link to={nextPagePath}>
            <div className="prev-next__inner">
              <button
                className="prev-next__next--link w-full"
                title="Go to Later Posts"
              >
                Later Posts
              </button>
            </div>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Pager
