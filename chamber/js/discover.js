// Load JSON data and create cards
fetch('data/items.json')
  .then(response => {
    if (!response.ok) throw new Error("Failed to load JSON");
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('cards-container');
    data.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.gridArea = `card${index + 1}`;

      // Fallback image if missing
      const imageSrc = item.image ? item.image : 'images/placeholder.png';

      card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
          <img src="${imageSrc}" alt="${item.name}" onerror="this.src='images/placeholder.png'; console.warn('Missing image:', '${imageSrc}')">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => console.error('Error loading JSON:', err));


// LocalStorage visit message
const visitMessage = document.getElementById('visit-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
  visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  visitMessage.textContent = daysSince < 1
    ? "Back so soon! Awesome!"
    : `You last visited ${daysSince} day${daysSince > 1 ? 's' : ''} ago.`;
}

localStorage.setItem('lastVisit', now);
