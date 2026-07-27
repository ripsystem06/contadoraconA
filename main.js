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

document.getElementById('contact-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const note = document.getElementById('form-note');
  const btn = this.querySelector('.form-submit');

  note.textContent = '';
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  const data = {
    nombre: this.nombre.value.trim(),
    correo: this.correo.value.trim(),
    mensaje: this.mensaje.value.trim(),
  };

  try {
    const res = await fetch('https://submit-form.com/3V7JLtE8k', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      note.textContent = 'Gracias, hemos recibido tu mensaje. Te contactaremos pronto.';
      note.style.color = 'var(--gold-400)';
      this.reset();
    } else {
      throw new Error('Error en el envío');
    }
  } catch {
    note.textContent = 'Hubo un error. Intenta de nuevo o escríbenos directamente a contacto@contadoracona.com.';
    note.style.color = '#C97B84';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Enviar solicitud';
  }
});
