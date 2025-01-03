// Mobile Menu Functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');
const dropdownItems = document.querySelectorAll('.nav-item.dropdown');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Dropdowns on mobile
dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    if (link) {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('active');
                
                dropdownItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            }
        });
    }
});

// FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Category switching
    const categoryCards = document.querySelectorAll('.category-card');
    const faqGroups = document.querySelectorAll('.faq-group');

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards and groups
            categoryCards.forEach(c => c.classList.remove('active'));
            faqGroups.forEach(g => g.classList.remove('active'));

            // Add active class to clicked card and corresponding group
            card.classList.add('active');
            const groupId = card.dataset.category;
            document.getElementById(groupId).classList.add('active');
        });
    });

    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Search functionality
    const searchInput = document.getElementById('faq-search');
    const allQuestions = document.querySelectorAll('.faq-question h3');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        allQuestions.forEach(question => {
            const faqItem = question.closest('.faq-item');
            const text = question.textContent.toLowerCase();
            
            if (text.includes(searchTerm)) {
                faqItem.style.display = 'block';
            } else {
                faqItem.style.display = 'none';
            }
        });

        // Show all categories if searching
        if (searchTerm) {
            faqGroups.forEach(group => group.classList.add('active'));
            categoryCards.forEach(card => card.classList.add('active'));
        } else {
            // Reset to default state
            faqGroups.forEach(group => group.classList.remove('active'));
            categoryCards.forEach(card => card.classList.remove('active'));
            document.querySelector('.category-card[data-category="achat"]').classList.add('active');
            document.getElementById('achat').classList.add('active');
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});