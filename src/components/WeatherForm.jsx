import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function WeatherForm({ handleSearchCity }) {
  const [city, setCity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!city.trim()) {
      toast.error("Veuillez entrer un nom de ville.");
      return;
    }

    const success = await handleSearchCity(city.trim());
    if (!success) {
      toast.error("Ville introuvable.");
    } else {
      setCity("");
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Entrez une ville"
        />
        <button type="submit">Rechercher</button>
      </form>
    </>
  );
}
