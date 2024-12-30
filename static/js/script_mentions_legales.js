
        // Script pour la gestion du menu mobile et autres fonctionnalités
        document.addEventListener('DOMContentLoaded', () => {
            // Mobile menu functionality
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const nav = document.querySelector('.nav');
            
            if (mobileMenuBtn) {
                mobileMenuBtn.addEventListener('click', () => {
                    nav.classList.toggle('active');
                });
            }

            // Header scroll effect
            window.addEventListener('scroll', () => {
                const header = document.querySelector('.header');
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        });
