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

    // ✅ Vérifie si la clé ou l'URL est manquante
    if (!apiKey || !apiUrl) {
      setError("Clé API ou URL manquante. Veuillez vérifier la configuration.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}?key=${apiKey}&q=${city}&lang=fr`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données météo.");
      }

      const data = await response.json();
      setTimeout(() => {
        setWeather(data);
        setError("");
      }, 500);
    } catch (error) {
      console.error(error);
      setError(
        "Impossible de récupérer les données météo. Veuillez réessayer."
      );
    }
  };

  useEffect(() => {
    fetchWeatherData("dakar");
  }, []);

  useEffect(() => {
    document.title = `Météo | ${weather?.location.name ?? ""}`;
  }, [weather]);

  const handleSearchCity = (city) => {
    setWeather(null);
    fetchWeatherData(city);
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
