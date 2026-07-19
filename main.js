document.getElementById('year').textContent = new Date().getFullYear();

const header = document.getElementById('site-header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20));

const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const note = document.getElementById('form-note');
  note.textContent = 'Gracias, hemos recibido tu mensaje. Te contactaremos pronto.';
  this.reset();
});
