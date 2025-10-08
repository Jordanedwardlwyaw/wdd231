// LocalStorage: Last Visit
const visitMsg = document.getElementById("visit-message");
const lastVisit = localStorage.getItem("lastVisit");

if (lastVisit) {
  const prev = new Date(parseInt(lastVisit));
  const days = Math.floor((Date.now() - prev) / (1000 * 60 * 60 * 24));
  visitMsg.textContent = days === 0
    ? "Welcome back! You visited earlier today."
    : `Welcome back! It's been ${days} day(s) since your last visit.`;
} else {
  visitMsg.textContent = "Welcome! This is your first visit to the Discover Page.";
}
localStorage.setItem("lastVisit", Date.now());

// Load Cards from JSON
async function loadCards() {
  try {
    const response = await fetch("data/discover.json");
    if (!response.ok) throw new Error("Could not load JSON");

    const data = await response.json();
    const container = document.getElementById("cards-container");
    container.innerHTML = ""; // Clear previous cards

    data.forEach((item, i) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.style.gridArea = `card${i + 1}`;

      // Build card HTML
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p><strong>Address:</strong> ${item.address}</p>
        <a href="${item.website || '#'}" target="_blank" class="learn-more">Learn More</a>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading cards:", error);
  }
}

// Initialize
loadCards();
