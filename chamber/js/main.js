// =========================
// MEMBER SPOTLIGHTS
// =========================
async function loadSpotlights() {
  try {
    // Fetch JSON
    const response = await fetch("js/members.json"); // make sure this is the correct path
    const members = await response.json();

    // Filter Gold/Silver members
    const spotlightMembers = members.filter(m =>
      m.membership === "Gold" || m.membership === "Silver"
    );

    // Randomly pick 2–3 members
    const selected = [];
    while (selected.length < 3 && spotlightMembers.length > 0) {
      const index = Math.floor(Math.random() * spotlightMembers.length);
      selected.push(spotlightMembers.splice(index, 1)[0]);
    }

    const container = document.querySelector(".spotlights"); // matches HTML section
    selected.forEach(m => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");
      card.innerHTML = `
        <img src="${m.logo}" alt="${m.name} logo">
        <h3>${m.name}</h3>
        <p>📞 ${m.phone}</p>
        <p>📍 ${m.address}</p>
        <a href="${m.website}" target="_blank">Visit Website</a>
        <p class="badge">${m.membership} Member</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading member spotlights:", error);
  }
}

// =========================
// WEATHER SECTION
// =========================
async function loadWeather() {
  const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // replace with your API key
  const city = "Kampala,ug"; // your city
  const units = "metric"; // Celsius

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&cnt=24&appid=${apiKey}`
    );
    const data = await response.json();

    // Current weather
    const current = data.list[0];
    const weatherContainer = document.querySelector(".weather");
    weatherContainer.innerHTML = `
      <h2>Weather in ${data.city.name}</h2>
      <p>🌡️ ${current.main.temp}°C | ${current.weather[0].description}</p>
      <div id="forecast" class="forecast"></div>
    `;

    // 3-day forecast (8 readings per day, pick every 8th)
    const forecastContainer = document.getElementById("forecast");
    for (let i = 8; i <= 24; i += 8) {
      const day = data.list[i];
      const forecastCard = document.createElement("div");
      forecastCard.classList.add("forecast-day");
      const date = new Date(day.dt_txt);
      forecastCard.innerHTML = `
        <p>${date.toLocaleDateString("en-US", { weekday: "long" })}</p>
        <p>🌡️ ${day.main.temp}°C</p>
        <p>${day.weather[0].description}</p>
      `;
      forecastContainer.appendChild(forecastCard);
    }
  } catch (error) {
    console.error("Error loading weather:", error);
  }
}

// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", () => {
  loadSpotlights();
  loadWeather();
});
