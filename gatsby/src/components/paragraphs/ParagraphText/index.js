import React from 'react'
import classNames from 'classnames'

const ParagraphText = (props) => {
  const classes = classNames(
    'text',
    {[`${props.datakey}`]: props.datakey},
    {[`${props.classes}`]: props.classes}
  );

  const markup = props.text.processed

  return (
    <div className={classes} dangerouslySetInnerHTML={{ __html: markup }}/>
      
  );
}

export default ParagraphText;
