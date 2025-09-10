async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

function displayMembers(members) {
  const directory = document.getElementById("directory");
  directory.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo">
      <h2>${member.name}</h2>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p><strong>Membership:</strong> ${member.membership}</p>
    `;
    directory.appendChild(card);
  });
}

// Toggle Grid/List Views
document.getElementById("gridBtn").addEventListener("click", () => {
  document.getElementById("directory").className = "grid";
});

document.getElementById("listBtn").addEventListener("click", () => {
  document.getElementById("directory").className = "list";
});

// Footer Info
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

loadMembers();
