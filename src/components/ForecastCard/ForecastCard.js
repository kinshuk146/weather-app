import React from 'react'
import './ForecastCard.css'
import ConvertTimeToDate from '../../hooks/ConvertTimeToDate.js'

const ForecastCard = ({singleDay,unit,offset}) => {
  return (
    <div className='ForeCastCardComponent col-l-1 col-xs-2 col-s-4 col-2'>
      <p>{ConvertTimeToDate(singleDay.dt,offset)}</p>
      <p>max: {unit == 'Celsius' ? (singleDay.temp.max - 273).toPrecision(4) : ((singleDay.temp.max - 273) * 9 / 5 + 32).toPrecision(4)}°{unit == 'Celsius'?'C':'F'}</p>
      <p>min: {unit == 'Celsius' ? (singleDay.temp.min - 273).toPrecision(4) : ((singleDay.temp.min - 273) * 9 / 5 + 32).toPrecision(4)}°{unit == 'Celsius'?'C':'F'}</p>
      <img src={`https://openweathermap.org/img/wn/${singleDay.weather[0].icon}@2x.png`} width={50} height={50} />
    </div>
  )
}

export default ForecastCard
