// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');
const dropdownItems = document.querySelectorAll('.nav-item.dropdown');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Handle dropdown clicks on mobile
dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            item.classList.toggle('active');
            
            // Close other dropdowns
            dropdownItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        nav.classList.remove('active');
        dropdownItems.forEach(item => item.classList.remove('active'));
    }
});

// Language Selector
const languageSelect = document.getElementById('language-select');
languageSelect.addEventListener('change', (e) => {
    const lang = e.target.value;
    // Ici vous pouvez ajouter la logique pour changer la langue
    console.log(`Changing language to: ${lang}`);
    // Par exemple : window.location.href = `/${lang}${window.location.pathname}`;
});

// Chatbot Button
const chatbotBtn = document.querySelector('.chatbot-btn');
chatbotBtn.addEventListener('click', () => {
    // Ici vous pouvez ajouter la logique pour ouvrir/fermer le chatbot
    console.log('Chatbot clicked');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Animation des boutons au scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.hero-btns .btn').forEach(button => {
    observer.observe(button);
});