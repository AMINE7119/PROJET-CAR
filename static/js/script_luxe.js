
        document.addEventListener('DOMContentLoaded', () => {
            // Mobile Menu
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

            // Fermer le menu mobile en cliquant à l'extérieur
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    if (!e.target.closest('.nav') && !e.target.closest('.mobile-menu-btn')) {
                        nav.classList.remove('active');
                    }
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

            // View Toggle (Grid/List)
            const gridViewBtn = document.getElementById('gridView');
            const listViewBtn = document.getElementById('listView');
            const vehiclesContainer = document.getElementById('vehiclesContainer');

            if (gridViewBtn && listViewBtn && vehiclesContainer) {
                gridViewBtn.addEventListener('click', () => {
                    vehiclesContainer.classList.remove('vehicles-list');
                    vehiclesContainer.classList.add('vehicles-grid');
                    gridViewBtn.classList.add('active');
                    listViewBtn.classList.remove('active');
                });

                listViewBtn.addEventListener('click', () => {
                    vehiclesContainer.classList.remove('vehicles-grid');
                    vehiclesContainer.classList.add('vehicles-list');
                    listViewBtn.classList.add('active');
                    gridViewBtn.classList.remove('active');
                });
            }

            // Filters
            const typeFilter = document.getElementById('typeFilter');
            const brandFilter = document.getElementById('brandFilter');
            const priceFilter = document.getElementById('priceFilter');

            function applyFilters() {
                const selectedType = typeFilter.value;
                const selectedBrand = brandFilter.value;
                const selectedPrice = priceFilter.value;

                const vehicles = document.querySelectorAll('.vehicle-card');

                vehicles.forEach(vehicle => {
                    let shouldShow = true;

                    // Type filter
                    if (selectedType !== 'all') {
                        if (vehicle.dataset.type !== selectedType) {
                            shouldShow = false;
                        }
                    }

                    // Brand filter
                    if (selectedBrand !== 'all') {
                        const vehicleBrand = vehicle.querySelector('.vehicle-details h3').textContent.toLowerCase();
                        if (!vehicleBrand.includes(selectedBrand)) {
                            shouldShow = false;
                        }
                    }

                    // Price filter
                    if (selectedPrice !== 'all') {
                        const priceText = vehicle.querySelector('.price span').textContent;
                        const price = extractPrice(priceText);
                        
                        if (!isPriceInRange(price, selectedPrice)) {
                            shouldShow = false;
                        }
                    }

                    vehicle.style.display = shouldShow ? 'block' : 'none';
                });

                // Adjust grid layout after filtering
                if (vehiclesContainer.classList.contains('vehicles-grid')) {
                    const visibleVehicles = document.querySelectorAll('.vehicle-card[style="display: block"]');
                    if (visibleVehicles.length === 0) {
                        // Show "No results" message
                        if (!document.querySelector('.no-results')) {
                            const noResults = document.createElement('div');
                            noResults.className = 'no-results';
                            noResults.textContent = '';
                            vehiclesContainer.appendChild(noResults);
                        }
                    } else {
                        // Remove "No results" message if it exists
                        const noResults = document.querySelector('.no-results');
                        if (noResults) {
                            noResults.remove();
                        }
                    }
                }
            }

            function extractPrice(priceText) {
                const match = priceText.match(/\d+/);
                return match ? parseInt(match[0]) : 0;
            }

            function isPriceInRange(price, range) {
                switch (range) {
                    case '0-1000':
                        return price <= 1000;
                    case '1000-2000':
                        return price > 1000 && price <= 2000;
                    case '2000+':
                        return price > 2000;
                    default:
                        return true;
                }
            }

            // Add event listeners to filters
            [typeFilter, brandFilter, priceFilter].forEach(filter => {
                if (filter) {
                    filter.addEventListener('change', applyFilters);
                }
            });

            // Animation on scroll for luxury experience section
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        // Optional: Stop observing after animation
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observe all service items
            const serviceItems = document.querySelectorAll('.service-item');
            serviceItems.forEach(item => {
                observer.observe(item);
            });

            // Initialize language selector
            const languageSelect = document.getElementById('language-select');
            if (languageSelect) {
                languageSelect.addEventListener('change', (e) => {
                    // Here you would typically implement language change logic
                    console.log(`Language changed to: ${e.target.value}`);
                });
            }

            // Initialize all buttons with hover effect
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach(button => {
                button.addEventListener('mouseenter', e => {
                    const rect = button.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const circle = document.createElement('div');
                    circle.classList.add('hover-effect');
                    circle.style.left = `${x}px`;
                    circle.style.top = `${y}px`;
                    
                    button.appendChild(circle);
                    
                    setTimeout(() => circle.remove(), 1000);
                });
            });
        });