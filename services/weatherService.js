import axios from "axios";

export const fetchWeatherFromAPI = async (city) => {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${process.env.WEATHER_API_KEY}&unitGroup=metric`;
  const res = await axios.get(url);
  return res.data;
};
