import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ParagraphHikeDetails = (props) => {
  const classes = classNames(
    'blog-details',
    {[`${props.datakey}`]: props.datakey},
    {[`${props.classes}`]: props.classes}
  );

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  
  const d = new Date(props.date)
  const year = d.getFullYear() 
  const date = d.getDate()
  const monthName = months[d.getMonth()]
  const dayName = days[d.getDay()]
  const formatted = `${dayName}, ${monthName} ${date}, ${year}`

  return (
   
  <table className={classes} summary="hike-details">
      <tbody>

        {props.date && <tr><td className="blog-details__label">Date</td>
        <td className="blog-details__content">{formatted}</td></tr>}

        {props.weather && <tr><td className="blog-details__label">Weather</td>
        <td className="blog-details__content">{props.weather}</td></tr>}

        {props.trailConditions && <tr><td className="blog-details__label">Trail Conditions</td>
        <td className="blog-details__content">{props.trailConditions}</td></tr>}

        {props.todayMiles && <tr><td className="blog-details__label">Today's Miles</td>
        <td className="blog-details__content">{props.todayMiles}</td></tr>}

        {props.tripMiles && <tr><td className="blog-details__label">Trip Miles</td>
        <td className="blog-details__content">{props.tripMiles}</td></tr>}
          
        
    </tbody>
  </table>

  );
}

ParagraphHikeDetails.propTypes = {
  /** Content */
  weather: PropTypes.string,
  date: PropTypes.string,
  todayMiles: PropTypes.string,
  trailConditions: PropTypes.string,
  tripMiles: PropTypes.string,
  /** Additional classes. */
  classes: PropTypes.string
}

export default ParagraphHikeDetails;
