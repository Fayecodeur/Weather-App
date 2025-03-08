import { useState } from "react";

export default function WeatherForm({ handleSearchCity }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchCity(city);
    setCity("");
  };

  const handleChangeInput = (e) => {
    const value = e.target.value;
    setCity(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={city} onChange={handleChangeInput} />
      <button onClick={handleSubmit} type="submit">
        Rechercher
      </button>
    </form>
  );
}
