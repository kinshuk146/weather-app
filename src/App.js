import React, { useState, useEffect, useRef, Suspense } from "react";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import axios from 'axios'
import ForecastCard from "./components/ForecastCard/ForecastCard";
import DropDown from "./components/Dropdown/DropDown";
import Switch from "./components/Switch/Switch";
import './App.css'
import { ImSpinner11 } from "react-icons/im";

function App() {
  const weather_api_key = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const [weatherState, setWeatherState] = useState({
    unit: 'Celsius',
    currentCity: 'New York',
    latitude: 40.7127281,
    longitude: -74.0060152
  })

  const [data, setData] = useState(null);
  const [city, setCity] = useState('New York');
  const [checked, setChecked] = React.useState(true);
  const [startPoint, setStartPoint] = useState(0);
  const [pullChange, setPullChange] = useState();
  const refreshCont = useRef(0);
  const [loading, setLoading] = useState(false);

  const initLoading = () => {
    refreshCont.current.classList.add("loading");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const pullStart = (e) => {
    const { screenY } = e.targetTouches[0];
    setStartPoint(screenY);
  };

  const pull = (e) => {
    const touch = e.targetTouches[0];
    const { screenY } = touch;
    let pullLength = startPoint < screenY ? Math.abs(screenY - startPoint) : 0;
    setPullChange(pullLength);
  };

  const changeTemp = () => {
    weatherState.unit == 'Celsius' ? setWeatherState({ ...weatherState, unit: 'Farenheit' }) : setWeatherState({ ...weatherState, unit: 'Celsius' });
  }

  const handleRefresh = () => {
    const previousCity = JSON.parse(localStorage.getItem('latestCity'))?.city.trim().toLowerCase();
    if (previousCity && previousCity === city.trim().toLowerCase()) {
      setData(JSON.parse(localStorage.getItem('latestCity')).data)
    }
    else {
      if (city.length == 0) {
        alert('Please enter a city');
        return;
      }
      getGeoLocation();
    }
  }

  const setValue = (city) => {
    setCity(city);
  }

  const getGeoLocation = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${weather_api_key}`
      );
      if (res.data.length > 0) {
        setWeatherState((prevState) => ({
          ...prevState,
          currentCity: city,
          latitude: res.data[0].lat,
          longitude: res.data[0].lon,
        }));
      }
      else {
        alert('Please enter a valid city.');
      }
    } catch (err) {
      alert('Please check your internet connection');
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${weatherState.latitude}&lon=${weatherState.longitude}&exclude=hourly,minutely&APPID=${weather_api_key}`
        );
        if (res.data) {
          setLoading(false);
          setData(res.data);
        }

      } catch (err) {
        const localStorageData = JSON.parse(localStorage.getItem('latestCity'))?.data;
        if (localStorageData) {
          setData(localStorageData)
          setWeatherState((prevState) => ({
            ...prevState,
            currentCity: JSON.parse(localStorage.getItem('latestCity')).city,
          }));
          setLoading(false);
        }
        else {
          alert('Please check your internet connection');
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [weatherState.latitude, weatherState.longitude, weatherState.currentCity]);

  useEffect(() => {
    if (data) {
      localStorage.setItem('latestCity', JSON.stringify({ city: weatherState.currentCity, data: data }));
    }
  }, [data, weatherState.currentCity])

  useEffect(() => {
    window.addEventListener("touchstart", pullStart);
    window.addEventListener("touchmove", pull);
    window.addEventListener("touchend", endPull);
    return () => {
      window.removeEventListener("touchstart", pullStart);
      window.removeEventListener("touchmove", pull);
      window.removeEventListener("touchend", endPull);
    };
  });

  const endPull = (e) => {
    setStartPoint(0);
    setPullChange(0);
    if (pullChange > 220) initLoading();
  };


  return (
    <div className="App-Container">
      {!loading && <div className="App row" ref={refreshCont} style={{ marginTop: pullChange / 3.118 || "" }}>
        <div className="search-element">
          <DropDown className="col-6" setValue={(val) => {
            setValue(val);
          }} />
          <button onClick={handleRefresh} className="button-2">Search</button>
        </div>
        <div className="toggle-temp">
          <p>Farenheit</p>
          <Switch
            isOn={checked}
            handleToggle={() => {
              setChecked(!checked);
              changeTemp();
            }}
            colorOne="#EF476F"
            colorTwo="#06D6A0"
          />
          <p>Celsius</p>
        </div>
        <div class="row">
          {data &&
            <CurrentWeather data={data} queryInfo={{ unit: weatherState.unit, city: weatherState.currentCity }} />
          }
        </div>

        <div className="ForecastCardContainer col-12 col-s-6">
          {data?.daily?.slice(1, 6).map((singleDay) => (
            <ForecastCard singleDay={singleDay} unit={weatherState.unit} offset={data.timezone_offset} />
          ))}

        </div>
      </div>}
      {loading && <ImSpinner11 className="loading-icon" />}
    </div>
  );
}

export default App;
