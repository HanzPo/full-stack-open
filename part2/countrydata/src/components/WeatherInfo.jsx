import { useEffect, useState } from "react";
import countriesService from "../services/countries";

const WeatherInfo = ({ capitalName, capitalLat, capitalLng }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    countriesService.getWeather(capitalLat, capitalLng).then((response) => {
      setWeatherData(response);
    });
  }, []);

  if (weatherData != null) {
    return (
      <>
        <h1>Weather in {capitalName}</h1>
        <div>temperature {Math.round((weatherData.current.temp - 273.15) * 100) / 100}&deg; C</div>
        <img src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`} />
        <div>wind {weatherData.current.wind_speed} m/s</div>
      </>
    );
  }

  return <div>Loading weather data...</div>;
};

export default WeatherInfo;
