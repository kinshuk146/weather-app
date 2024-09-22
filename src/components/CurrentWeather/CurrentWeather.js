import React, { useState, useEffect } from 'react'
import './CurrentWeather.css'
import ConvertTimeToDate from '../../hooks/ConvertTimeToDate.js'


const CurrentWeather = ({ data, queryInfo }) => {
let description = data.current.weather[0].description;
let capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);
  return (
    <div className='CurrentWeather row'>
      <div className='city-header col-m-4'>{queryInfo.city}</div>
      <div className='weather-info-block col-m-8'>
        <h2>{queryInfo.unit == 'Celsius' ? (data.current.temp - 273).toPrecision(4) : ((data.current.temp - 273) * 9 / 5 + 32).toPrecision(4)} °{queryInfo.unit == 'Celsius' ? 'C' : 'F'}</h2>
        <img src={`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`} width={60} height={60} />
        <h4>{capitalizedDescription}</h4>
        <p>{ConvertTimeToDate(data.current.dt,data.timezone_offset)}</p>
      </div>
    </div>
  )
}

export default CurrentWeather
