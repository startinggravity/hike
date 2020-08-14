// Prevent Gatsby from returning to scroll position on refresh.

exports.onInitialClientRender = () => {
  window.scrollTo(0, 0)
}


