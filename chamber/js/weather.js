async function loadWeather() {
  const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your own key
  const city = "Kampala,UG";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();

    // Current weather
    const current = data.list[0];
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.innerHTML = `
      <p><strong>Temperature:</strong> ${current.main.temp.toFixed(1)}°C</p>
      <p><strong>Weather:</strong> ${current.weather[0].description}</p>
    `;

    // 3-day forecast
    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "<h3>3-Day Forecast</h3>";

    // Forecast every 24 hours (~8 intervals per day)
    for (let i = 1; i <= 3; i++) {
      const f = data.list[i * 8];
      forecastDiv.innerHTML += `
        <p>${new Date(f.dt_txt).toLocaleDateString()}: ${f.main.temp.toFixed(1)}°C, ${f.weather[0].description}</p>
      `;
    }
  } catch (error) {
    console.error("Error loading weather:", error);
    document.getElementById("weather-info").textContent = "Weather data unavailable.";
  }
}

// Initialize
loadWeather();
