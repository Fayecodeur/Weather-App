import { useEffect, useState } from "react";
import WeatherForm from "./WeatherForm.jsx";
import WeatherInfos from "./WeatherInfos.jsx";
import Loader from "./loader.jsx";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeatherData = async (city = "dakar") => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const apiUrl = import.meta.env.VITE_WEATHER_API_URL;

    if (!apiKey || !apiUrl) {
      setError("Clé API ou URL manquante. Veuillez vérifier la configuration.");
      return false;
    }

    try {
      const response = await fetch(`${apiUrl}?key=${apiKey}&q=${city}&lang=fr`);
      if (!response.ok) {
        throw new Error("Ville introuvable.");
      }

      const data = await response.json();

      // Vérifie si l'API a renvoyé une erreur dans les données
      if (data.error) {
        setError("Ville introuvable.");
        return false;
      }

      setTimeout(() => {
        setWeather(data);
        setError("");
      }, 500);

      return true;
    } catch (error) {
      console.error(error);
      setError("Impossible de récupérer les données météo.");
      return false;
    }
  };

  useEffect(() => {
    fetchWeatherData("dakar");
  }, []);

  useEffect(() => {
    document.title = `Météo | ${weather?.location.name ?? ""}`;
  }, [weather]);

  const handleSearchCity = async (city) => {
    setWeather(null);
    return await fetchWeatherData(city);
  };

  return (
    <div className="container">
      <WeatherForm handleSearchCity={handleSearchCity} />
      {error && (
        <p
          style={{
            color: "red",
            backgroundColor: "#ffe6e6",
            padding: "1rem",
            borderRadius: "8px",
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          {error}
        </p>
      )}
      {weather ? <WeatherInfos weather={weather} /> : !error && <Loader />}
    </div>
  );
}
