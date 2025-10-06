// Load gallery items from items.json
async function loadGallery() {
  try {
    const response = await fetch('data/items.json'); // Adjust path if needed
    const items = await response.json();
    const gallery = document.querySelector('.gallery');

    items.slice(0, 15).forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Water:</strong> ${item.water}</p>
        <button class="open-modal" data-id="${item.id}">Details</button>
        <button class="favorite-btn" data-id="${item.id}">❤️ Save</button>
      `;
      gallery.appendChild(card);
    });

    setupModal(items);
    setupFavorites(items);
  } catch (error) {
    console.error('Failed to load gallery:', error);
  }
}

// Modal functionality
function setupModal(items) {
  const modal = document.getElementById('modal');
  if (!modal) return; // Prevent errors if modal is missing

  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalCategory = document.getElementById('modal-category');
  const modalWater = document.getElementById('modal-water');
  const closeBtn = document.querySelector('.close-btn');

  document.querySelectorAll('.open-modal').forEach(button => {
    button.addEventListener('click', () => {
      const id = parseInt(button.dataset.id);
      const item = items.find(i => i.id === id);
      modalImg.src = item.image;
      modalTitle.textContent = item.title;
      modalDesc.textContent = item.description;
      modalCategory.textContent = item.category;
      modalWater.textContent = item.water;
      modal.style.display = 'block';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
  }

  window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });
}

// LocalStorage Favorites
function setupFavorites(items) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  document.querySelectorAll('.favorite-btn').forEach(button => {
    const id = parseInt(button.dataset.id);
    if (favorites.includes(id)) button.textContent = '❤️ Saved';

    button.addEventListener('click', () => {
      if (!favorites.includes(id)) {
        favorites.push(id);
        button.textContent = '❤️ Saved';
      } else {
        const index = favorites.indexOf(id);
        favorites.splice(index, 1);
        button.textContent = '❤️ Save';
      }
      localStorage.setItem('favorites', JSON.stringify(favorites));
    });
  });
}

// Initialize gallery on page load
loadGallery();
