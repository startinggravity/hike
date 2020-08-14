import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Parser from "html-react-parser"

const ParagraphQuotation = (props) => {

  const classes = classNames(
    'quotation',
    `quotation__${props.type}`,
    {[`${props.datakey}`]: props.datakey},
    {[`${props.classes}`]: props.classes}
  );

  return (

     <div className={classes}>
       {Parser(props.text.processed)}
       {props.link && (<a href={props.link.uri} title="See more about this quote">{props.link.title}</a>)}
     </div>

  );
}

ParagraphQuotation.propTypes = {
  /** Content */
  text: PropTypes.shape({
    processed: PropTypes.string
  }),
  link: PropTypes.shape({
    uri: PropTypes.string,
    title: PropTypes.string
  }),
  type: PropTypes.string,
  /** Additional classes. */
  classes: PropTypes.string
}

export default ParagraphQuotation;
