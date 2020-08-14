import React from "react"
import PropTypes from "prop-types"
import Parser from "html-react-parser"

const Summary = ({ content }) => (
  <div className="summary-text">{Parser(props.summary.processed)}</div>
)

Summary.propTypes = {
  summary: PropTypes.shape({
    processed: PropTypes.string,
  }),
}

export default Summary
