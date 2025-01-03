document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initHeader();
    initMobileMenu();
    initChatbot();
    initAnimations();
    initLanguageSelector();
    initScrollEffects();
});

// Header functionality
function initHeader() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');

    mobileMenuBtn?.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        
        link?.addEventListener('click', (e) => {
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
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav?.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
            nav?.classList.remove('active');
            dropdownItems.forEach(item => item.classList.remove('active'));
        }
    });
}

// Chatbot functionality
function initChatbot() {
    const chatbotBtn = document.querySelector('.chatbot-btn');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatInput = document.querySelector('.chatbot-input input');
    const chatSend = document.querySelector('.chatbot-input button');
    const chatMessages = document.querySelector('.chatbot-messages');

    chatbotBtn?.addEventListener('click', () => {
        chatbotContainer?.classList.add('active');
    });

    chatbotClose?.addEventListener('click', () => {
        chatbotContainer?.classList.remove('active');
    });

    function sendMessage() {
        const message = chatInput?.value.trim();
        if (message && chatMessages) {
            addMessage('user', message);
            if (chatInput) chatInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                addMessage('bot', 'Merci pour votre message. Un de nos conseillers vous répondra dans les plus brefs délais.');
            }, 1000);
        }
    }

    function addMessage(type, content) {
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        messageDiv.innerHTML = `
            <div class="message-content">
                ${content}
            </div>
            <div class="message-time">
                ${new Date().toLocaleTimeString()}
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    chatSend?.addEventListener('click', sendMessage);
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add initial bot message
    setTimeout(() => {
        addMessage('bot', 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?');
    }, 1000);
}

// Animation functionality
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .testimonial-card, .stat-item').forEach(el => {
        observer.observe(el);
    });
}

// Language selector functionality
function initLanguageSelector() {
    const languageSelect = document.getElementById('language-select');
    
    languageSelect?.addEventListener('change', (e) => {
        const target = e.target;
        const lang = target.value;
        // Add language change logic here
        console.log(`Changing language to: ${lang}`);
    });
}

// Scroll effects
function initScrollEffects() {
    const homeContent = document.querySelector('.home-content');
    const homeImg = document.querySelector('.home-img');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        if (homeContent && homeImg) {
            homeContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            homeImg.style.transform = `rotate(45deg) translateY(${scrolled * 0.2}px)`;
        }
    });
}

// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            const nav = document.querySelector('.nav');
            nav?.classList.remove('active');
        }
    });
});