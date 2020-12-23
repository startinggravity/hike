// Prevent Gatsby from returning to scroll position on refresh.

exports.onInitialClientRender = () => {
  if (typeof window !== `undefined`) {
    window.scrollTo(0, 0)
  }
}
