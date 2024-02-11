
export const APIKEY = '85f4845355e243b54db84cc8f4600eb7';
export const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
export const API_BASE_URL_FORCAST = 'https://api.openweathermap.org/data/2.5/forecast';
export const getWeatherAPI = (cityName) => {
    return `${API_BASE_URL}?q=${cityName}&units=metric&appid=${APIKEY}`;
  };
  export const getForecastAPI = (cityName) => {
    return `${API_BASE_URL_FORCAST}?q=${cityName}&units=metric&appid=${APIKEY}`;
  };