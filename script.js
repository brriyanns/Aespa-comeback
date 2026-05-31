const pages = Array.from(document.querySelectorAll('.page'));
const dotsWrap = document.querySelector('.dots');
const nextButtons = Array.from(document.querySelectorAll('[data-next]'));
const prevButton = document.querySelector('[data-prev]');
let currentPage = 0;

function renderDots() {
  dotsWrap.innerHTML = '';
  pages.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = `dot${index === currentPage ? ' is-active' : ''}`;
    dot.setAttribute('aria-label', `Open page ${index + 1}`);
    dot.addEventListener('click', () => showPage(index));
    dotsWrap.appendChild(dot);
  });
}

function showPage(index) {
  currentPage = (index + pages.length) % pages.length;
  pages.forEach((page, pageIndex) => {
    page.classList.toggle('is-active', pageIndex === currentPage);
  });
  renderDots();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

nextButtons.forEach((button) => {
  button.addEventListener('click', () => showPage(currentPage + 1));
});

prevButton.addEventListener('click', () => showPage(currentPage - 1));

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') showPage(currentPage + 1);
  if (event.key === 'ArrowLeft') showPage(currentPage - 1);
});

let touchStartX = null;

document.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (event) => {
  if (touchStartX === null) return;
  const touchEndX = event.changedTouches[0].screenX;
  const distance = touchStartX - touchEndX;
  if (Math.abs(distance) > 52) {
    showPage(currentPage + (distance > 0 ? 1 : -1));
  }
  touchStartX = null;
}, { passive: true });

renderDots();
