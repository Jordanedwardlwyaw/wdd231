// Display last visit message
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();
let message = "";

if (!lastVisit) {
  message = "Welcome! Let us know if you have any questions.";
} else {
  const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  if (days < 1) message = "Back so soon! Awesome!";
  else message = `You last visited ${days} day${days === 1 ? '' : 's'} ago.`;
}

const visitMessageEl = document.getElementById('visit-message');
visitMessageEl.textContent = message;
localStorage.setItem('lastVisit', now);

// Load JSON data and generate cards
const cardsContainer = document.getElementById('cards-container');

fetch('data/items.json')
  .then(res => res.json())
  .then(data => {
    if (!data || data.length === 0) {
      cardsContainer.textContent = "No items found.";
      return;
    }
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
          <img src="${item.image}" alt="${item.name}">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;
      cardsContainer.appendChild(card);
    });
  })
  .catch(err => {
    console.error('Error loading JSON:', err);
    cardsContainer.textContent = "Error loading items. Check console.";
  });
