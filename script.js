document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll('main section[id], header[id]');

const setActiveLink = () => {
  let currentId = '#home';

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 150) currentId = '#' + section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === currentId);
  });
};

window.addEventListener('scroll', setActiveLink);
setActiveLink();

const serviceButtons = document.querySelectorAll('.service-btn');
const selectedList = document.getElementById('selectedServices');
const totalPriceEl = document.getElementById('totalPrice');
const selectedItems = new Map();

const updateCalculator = () => {
  selectedList.innerHTML = '';

  if (selectedItems.size === 0) {
    selectedList.innerHTML = '<li>Brak wybranych usług</li>';
    totalPriceEl.textContent = '0 PLN';
    return;
  }

  let total = 0;
  selectedItems.forEach((item) => {
    total += item.price;
    const li = document.createElement('li');
    li.textContent = `${item.name} — ${item.price} PLN`;
    selectedList.appendChild(li);
  });

  totalPriceEl.textContent = `${total} PLN`;
};

serviceButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.service-card');
    const name = card.querySelector('h3').textContent.trim();
    const price = Number(card.dataset.price);

    if (selectedItems.has(name)) {
      selectedItems.delete(name);
      button.textContent = 'Dodaj';
    } else {
      selectedItems.set(name, { name, price });
      button.textContent = 'Usunięto';
    }

    updateCalculator();
  });
});
