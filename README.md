## 🔑 Configuration de l'API météo

1. Crée un fichier `.env` à la racine du projet.
2. Va sur le site [WeatherAPI](https://www.weatherapi.com/) pour créer un compte et obtenir une **clé API gratuite**.
3. Dans le fichier `.env`, ajoute les lignes suivantes :

   ```env
   VITE_WEATHER_API_KEY=your_weatherapi_key_here
   VITE_WEATHER_API_URL=https://api.weatherapi.com/v1/current.json
   ```
