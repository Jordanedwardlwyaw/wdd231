// Course List
const courses = [
  { code: 'WDD 130', name: 'Web Fundamentals', credits: 2, category: 'wdd', completed: false },
  { code: 'WDD 131', name: 'Dynamic Web Fundamentals', credits: 2, category: 'wdd', completed: true },
  { code: 'WDD 231', name: 'Web Frontend Development I', credits: 3, category: 'wdd', completed: false },
  { code: 'CSE 110', name: 'Introduction to Programming', credits: 2, category: 'cse', completed: false },
  { code: 'CSE 111', name: 'Programming with Functions', credits: 2, category: 'cse', completed: true },
  { code: 'CSE 210', name: 'Programming with Classes', credits: 3, category: 'cse', completed: true },
];

const grid = document.getElementById('courseGrid');
const creditTotal = document.getElementById('creditTotal');
const filters = document.querySelectorAll('.filter');

function render(list) {
  grid.innerHTML = '';
  let total = list.reduce((sum, c) => sum + c.credits, 0);
  creditTotal.textContent = total;

  list.forEach(c => {
    const card = document.createElement('div');
    card.className = 'course' + (c.completed ? ' completed' : '');
    card.innerHTML = `
      <div class="code">${c.code}</div>
      <div class="name">${c.name}</div>
      <div class="meta">${c.category.toUpperCase()} • ${c.credits} credits</div>
      ${c.completed ? '<span class="badge">Completed</span>' : ''}
    `;
    grid.appendChild(card);
  });
}

function applyFilter(type) {
  filters.forEach(b => b.classList.toggle('active', b.dataset.filter === type));
  let list = courses;
  if (type === 'wdd') list = courses.filter(c => c.category === 'wdd');
  if (type === 'cse') list = courses.filter(c => c.category === 'cse');
  render(list);
}

filters.forEach(btn => btn.addEventListener('click', () => applyFilter(btn.dataset.filter)));

// Default load all
applyFilter('all');
