import React from "react"

export default function ParagraphHikeDetails({
  weather,
  date,
  today,
  trip,
  conditions,
}) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]

  const d = new Date(date)
  const year = d.getFullYear()
  const hikeDate = d.getDate()
  const monthName = months[d.getMonth()]
  const dayName = days[d.getDay()]
  const formatted = `${dayName}, ${monthName} ${hikeDate}, ${year}`

  return (
    <table className="blog-details blog-details--hike" summary="hike-details">
      <tbody>
        {hikeDate && (
          <tr>
            <td className="blog-details__label">Date</td>
            <td className="blog-details__content">{formatted}</td>
          </tr>
        )}

        {weather && (
          <tr>
            <td className="blog-details__label">Weather</td>
            <td className="blog-details__content">{weather}</td>
          </tr>
        )}

        {conditions && (
          <tr>
            <td className="blog-details__label">Trail Conditions</td>
            <td className="blog-details__content">{conditions}</td>
          </tr>
        )}

        {today && (
          <tr>
            <td className="blog-details__label">Today's Miles</td>
            <td className="blog-details__content">{today}</td>
          </tr>
        )}

        {trip && (
          <tr>
            <td className="blog-details__label">Trip Miles</td>
            <td className="blog-details__content">{trip}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
