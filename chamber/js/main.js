async function loadWeather() {
  const apiKey = "95a91e7e62e3c4233cd7af143d03799d";
  const lat = 0.3476;
  const lon = 32.5825;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather fetch failed");
    const data = await response.json();

    // Current weather
    const current = data.current;
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.innerHTML = `
      <p><strong>Temperature:</strong> ${current.temp.toFixed(1)}°C</p>
      <p><strong>Weather:</strong> ${current.weather[0].description}</p>
    `;

    // 3-day forecast
    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "<h3>3-Day Forecast</h3>";
    for (let i = 1; i <= 3; i++) {
      const day = data.daily[i];
      const date = new Date(day.dt * 1000);
      forecastDiv.innerHTML += `
        <p>${date.toLocaleDateString()}: ${day.temp.day.toFixed(1)}°C, ${day.weather[0].description}</p>
      `;
    }
  } catch (error) {
    console.error("Error loading weather:", error);
    document.getElementById("weather-info").textContent = "Weather data unavailable.";
  }
}
