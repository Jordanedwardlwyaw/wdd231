async function loadAllMembers() {
  try {
    const response = await fetch("js/members.json"); // adjust path if needed
    const members = await response.json();
    displayAllMembers(members);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

function displayAllMembers(members) {
  const directory = document.getElementById("directory");
  directory.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${member.logo}" alt="${member.name} logo">
      <h2>${member.name}</h2>
      <p>📍 ${member.address}</p>
      <p>📞 ${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p class="badge">${member.membership} Member</p>
    `;

    directory.appendChild(card);
  });
}

// Grid/List toggle
document.getElementById("gridBtn").addEventListener("click", () => {
  document.getElementById("directory").className = "grid";
});

document.getElementById("listBtn").addEventListener("click", () => {
  document.getElementById("directory").className = "list";
});

// Footer
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

loadAllMembers();
