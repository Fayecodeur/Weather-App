import { useEffect, useState } from "react";
import WeatherForm from "./WeatherForm.jsx";
import WeatherInfos from "./WeatherInfos.jsx";
import Loader from "./Loader.jsx";
export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const fetchWeatherData = async (city = "dakar") => {
    // Variable API
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const apiUrl = import.meta.env.VITE_WEATHER_API_URL;

    try {
      const response = await fetch(`${apiUrl}?key=${apiKey}&q=${city}`);
      if (!response.ok) {
        throw new Error(
          "Une erreur s'est produite lors de récupération des données"
        );
      }
      const data = await response.json();
      setTimeout(() => {
        setWeather(data);
      }, 1000);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeatherData("dakar");
  }, []);

  useEffect(() => {
    document.title = `Méteo | ${weather?.location.name ?? ""} `;
  }, [weather]);

  const handleSearchCity = (city) => {
    setWeather(null);
    fetchWeatherData(city);
  };

  return (
    <div className="container">
      <WeatherForm handleSearchCity={handleSearchCity} />
      {weather ? <WeatherInfos weather={weather} /> : <Loader />}
    </div>
  );
}
