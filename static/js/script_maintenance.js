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
    console.log(`Changing language to: ${lang}`);
});

// Form submission
const bookingForm = document.querySelector('.booking-form');
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Votre demande de réservation a été envoyée avec succès !');
});

// Chatbot toggle
const chatbotBtn = document.querySelector('.chatbot-btn');
chatbotBtn.addEventListener('click', () => {
    alert('Chatbot en développement');
});