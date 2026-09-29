// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active style
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--primary) !important;
        border-bottom: 2px solid var(--primary);
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);

// Counter animation (optional enhancement)
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counter.innerText = '0';
        const increment = parseInt(counter.getAttribute('data-target')) / 100;
        const updateCount = () => {
            const count = +counter.innerText;
            if (count < parseInt(counter.getAttribute('data-target'))) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1000 / 100);
            } else {
                counter.innerText = counter.getAttribute('data-target');
            }
        };
        updateCount();
    });
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('1st Central Barbershop website loaded successfully!');
});