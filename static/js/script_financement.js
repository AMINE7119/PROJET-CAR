
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');
const dropdownItems = document.querySelectorAll('.nav-item.dropdown');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Dropdowns sur mobile
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

// Simulateur de crédit
const creditSimulator = {
    initialize() {
        this.amountInput = document.getElementById('amount');
        this.durationSelect = document.getElementById('duration');
        this.monthlyPaymentDisplay = document.getElementById('monthlyPayment');

        if (this.amountInput && this.durationSelect) {
            this.setupEventListeners();
            this.calculateLoan();
        }
    },

    setupEventListeners() {
        this.amountInput.addEventListener('input', () => this.calculateLoan());
        this.durationSelect.addEventListener('change', () => this.calculateLoan());
    },

    calculateLoan() {
        const amount = parseFloat(this.amountInput.value);
        const duration = parseFloat(this.durationSelect.value);
        const annualRate = 0.045; // 4.5%
        const monthlyRate = annualRate / 12;

        const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, duration)) / 
                             (Math.pow(1 + monthlyRate, duration) - 1);

        this.monthlyPaymentDisplay.textContent = 
            Math.round(monthlyPayment).toLocaleString('fr-FR') + ' MAD';
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    creditSimulator.initialize();
});
