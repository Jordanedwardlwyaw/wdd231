async function loadSpotlights() {
  const response = await fetch("data/members.json"); // your JSON file
  const members = await response.json();

  // Filter gold/silver members
  const spotlightMembers = members.filter(m =>
    m.membership === "Gold" || m.membership === "Silver"
  );

  // Randomly pick 2–3
  const selected = [];
  while (selected.length < 3 && spotlightMembers.length > 0) {
    const index = Math.floor(Math.random() * spotlightMembers.length);
    selected.push(spotlightMembers.splice(index, 1)[0]);
  }

  const container = document.querySelector(".spotlight-container");
  selected.forEach(m => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");
    card.innerHTML = `
      <img src="${m.logo}" alt="${m.name} logo">
      <h3>${m.name}</h3>
      <p>${m.phone}</p>
      <p>${m.address}</p>
      <a href="${m.website}" target="_blank">Visit Website</a>
      <p class="level">${m.membership} Member</p>
    `;
    container.appendChild(card);
  });
}
loadSpotlights();
