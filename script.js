
window.addEventListener('load', () => {
  setTimeout(() => document.querySelector('.loader').classList.add('hide'), 650);
});

const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const slides = [...document.querySelectorAll('.hero-slide')];
const counter = document.getElementById('currentSlide');
let slideIndex = 0;
setInterval(() => {
  slides[slideIndex].classList.remove('active');
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add('active');
  counter.textContent = String(slideIndex + 1).padStart(2, '0');
}, 4800);

const form = document.getElementById('dealerForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const text = [
    'Merhaba, OSOTTO bayilik başvurusu yapmak istiyorum.',
    '',
    `Ad Soyad: ${data.get('name') || '-'}`,
    `Firma: ${data.get('company') || '-'}`,
    `Şehir: ${data.get('city') || '-'}`,
    `Telefon: ${data.get('phone') || '-'}`,
    `E-posta: ${data.get('email') || '-'}`
  ].join('\n');
  window.open(`https://wa.me/905431945858?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

const modal = document.getElementById('productModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalWhatsapp = document.getElementById('modalWhatsapp');

document.querySelectorAll('.product-card').forEach(card => {
  card.querySelector('.detail-btn').addEventListener('click', () => {
    const name = card.dataset.name;
    const img = card.querySelector('img');
    modalTitle.textContent = name;
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalWhatsapp.href = `https://wa.me/905431945858?text=${encodeURIComponent(`Merhaba, OSOTTO ${name} modeli hakkında bilgi almak istiyorum.`)}`;
    modal.showModal();
  });
});
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', (e) => {
  const box = modal.getBoundingClientRect();
  const outside = e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom;
  if (outside) modal.close();
});
