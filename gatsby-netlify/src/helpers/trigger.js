import React, { Component } from "react"

class Trigger extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.toggleBodyClass)
    this.toggleBodyClass()
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.toggleBodyClass)
  }

  toggleBodyClass = () => {
    if (window.scrollY < 100) {
      document.body.classList.remove("content--scroll")
    } else {
      document.body.classList.add("content--scroll")
    }
  }
  render() {
    return <div />
  }
}

export default Trigger
