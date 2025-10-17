// Responsive navigation
const menuBtn = document.getElementById('menu');
const nav = document.getElementById('primary-nav');

menuBtn?.addEventListener('click', () => {
  nav.classList.toggle('open');
  const expanded = nav.classList.contains('open');
  menuBtn.setAttribute('aria-expanded', expanded);
});
