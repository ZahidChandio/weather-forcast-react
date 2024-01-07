import { FETCH_WEATHER_REQUEST } from "./types";

export const fetchWeather = (query) => {
  return { type: FETCH_WEATHER_REQUEST, query };
};
