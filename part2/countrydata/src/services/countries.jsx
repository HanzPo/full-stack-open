import axios from "axios";

const api_key = import.meta.env.VITE_OPENWEATHER_API_KEY;
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((response) => response.data);
};

const getCountry = (name) => {
  const request = axios.get(`${baseUrl}/name/${name}`);
  return request.then((response) => response.data);
};

const getWeather = (lat, lon) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`
  );
  return request.then((response) => response.data);
};

export default { getAll, getCountry, getWeather };
