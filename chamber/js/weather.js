const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
const city = "Kampala"; // change to your chamber city
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

async function getWeather() {
  const response = await fetch(url);
  const data = await response.json();

  // Current weather
  document.getElementById("current-temp").textContent = 
    `Current Temp: ${data.list[0].main.temp.toFixed(1)} °C`;
  document.getElementById("weather-description").textContent = 
    data.list[0].weather[0].description;

  // 3-day forecast (every 8th index ~ 24 hrs)
  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "<h3>3-Day Forecast:</h3>";
  for (let i = 8; i <= 24; i += 8) {
    const day = data.list[i];
    const date = new Date(day.dt_txt).toDateString();
    forecastDiv.innerHTML += `<p>${date}: ${day.main.temp.toFixed(1)} °C</p>`;
  }
}
getWeather();
