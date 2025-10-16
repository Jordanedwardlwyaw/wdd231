async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error("Failed to load JSON");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error fetching members:", error);
  }
}

function displayMembers(members) {
  const directory = document.querySelector("#directory");
  directory.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("article");
    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p><strong>Membership:</strong> ${member.membership}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;
    directory.appendChild(card);
  });
}

// Toggle Grid/List
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");
const directory = document.querySelector("#directory");

gridBtn.addEventListener("click", () => {
  directory.classList.add("grid");
  directory.classList.remove("list");
});

listBtn.addEventListener("click", () => {
  directory.classList.add("list");
  directory.classList.remove("grid");
});

// Responsive Menu
const menuBtn = document.querySelector("#menuBtn");
const mainNav = document.querySelector("#mainNav");

menuBtn.addEventListener("click", () => {
  mainNav.classList.toggle("hide");
});

// Footer Dates
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// Run
getMembers();
