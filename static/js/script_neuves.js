document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const nav = document.querySelector('.nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    const vehiclesContainer = document.getElementById('vehiclesContainer');
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    const filterSelects = document.querySelectorAll('.filter-select');
    const totalCountElement = document.querySelector('.total-count');

    // State management
    let activeFilters = {
        brand: '',
        type: '',
        transmission: '',
        energy: '',
        price: ''
    };

    // Mobile menu handling
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', 
                nav.classList.contains('active'));
        });
    }

    // Dropdown handling for mobile
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        if (link) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const wasActive = item.classList.contains('active');
                    
                    // Close all dropdowns
                    dropdownItems.forEach(dropdown => {
                        dropdown.classList.remove('active');
                        const dropdownLink = dropdown.querySelector('.nav-link');
                        dropdownLink.setAttribute('aria-expanded', 'false');
                    });

                    // Toggle clicked dropdown
                    if (!wasActive) {
                        item.classList.add('active');
                        link.setAttribute('aria-expanded', 'true');
                    }
                }
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.nav') && !e.target.closest('.mobile-menu-btn')) {
                nav.classList.remove('active');
                dropdownItems.forEach(item => {
                    item.classList.remove('active');
                    const link = item.querySelector('.nav-link');
                    if (link) link.setAttribute('aria-expanded', 'false');
                });
            }
        }
    });

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // View switching (grid/list)
    function updateViewMode(mode) {
        if (!vehiclesContainer) return;

        if (mode === 'grid') {
            vehiclesContainer.classList.remove('vehicles-list');
            vehiclesContainer.classList.add('vehicles-grid');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            localStorage.setItem('viewMode', 'grid');
        } else {
            vehiclesContainer.classList.remove('vehicles-grid');
            vehiclesContainer.classList.add('vehicles-list');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            localStorage.setItem('viewMode', 'list');
        }
    }

    if (gridViewBtn && listViewBtn) {
        gridViewBtn.addEventListener('click', () => updateViewMode('grid'));
        listViewBtn.addEventListener('click', () => updateViewMode('list'));

        // Load saved view mode
        const savedViewMode = localStorage.getItem('viewMode') || 'grid';
        updateViewMode(savedViewMode);
    }

    // Filtering system
    function getCardData(card) {
        return {
            brand: card.dataset.brand?.toLowerCase() || '',
            type: card.dataset.type?.toLowerCase() || '',
            transmission: card.dataset.transmission?.toLowerCase() || '',
            energy: card.dataset.energy?.toLowerCase() || '',
            price: parseInt(card.dataset.price) || 0
        };
    }

    function checkPriceRange(cardPrice, filterValue) {
        if (!filterValue) return true;
        
        if (filterValue.endsWith('+')) {
            const minPrice = parseInt(filterValue);
            return cardPrice >= minPrice;
        }

        const [min, max] = filterValue.split('-').map(num => parseInt(num));
        return cardPrice >= min && cardPrice <= max;
    }

    function updateCardVisibility() {
        const cards = document.querySelectorAll('.vehicle-card');
        let visibleCount = 0;

        cards.forEach(card => {
            const cardData = getCardData(card);
            const isVisible = Object.entries(activeFilters).every(([key, value]) => {
                if (!value) return true;
                
                if (key === 'price') {
                    return checkPriceRange(cardData.price, value);
                }
                
                return cardData[key].includes(value.toLowerCase());
            });

            card.style.display = isVisible ? '' : 'none';
            if (isVisible) visibleCount++;
        });

        updateTotalCount(visibleCount, cards.length);
        handleNoResults(visibleCount);
    }

    function updateTotalCount(visibleCount, totalCount) {
        if (totalCountElement) {
            totalCountElement.textContent = `${visibleCount} véhicule${visibleCount > 1 ? 's' : ''} sur ${totalCount}`;
        }
    }

    function handleNoResults(visibleCount) {
        const existingNoResults = document.querySelector('.no-results');
        if (existingNoResults) {
            existingNoResults.remove();
        }

        if (visibleCount === 0) {
            const noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'no-results';
            noResultsDiv.innerHTML = `
                <div class="no-results-content">
                    <i class='bx bx-search'></i>
                    <h3>Aucun véhicule trouvé</h3>
                    <p>Essayez de modifier vos critères de recherche</p>
                    <button class="btn btn-outline" onclick="resetFilters()">Réinitialiser les filtres</button>
                </div>
            `;
            vehiclesContainer.appendChild(noResultsDiv);
        }
    }

    // Filter event listeners
    filterSelects.forEach(select => {
        select.addEventListener('change', (e) => {
            const filterType = e.target.dataset.filter;
            activeFilters[filterType] = e.target.value;
            updateCardVisibility();
            saveFilters();
        });
    });

    // Reset filters
    window.resetFilters = function() {
        filterSelects.forEach(select => {
            select.value = '';
        });
        
        activeFilters = Object.fromEntries(
            Object.keys(activeFilters).map(key => [key, ''])
        );
        
        updateCardVisibility();
        saveFilters();
    };

    // Save and load filters
    function saveFilters() {
        localStorage.setItem('carFilters', JSON.stringify(activeFilters));
    }

    function loadSavedFilters() {
        const savedFilters = localStorage.getItem('carFilters');
        if (savedFilters) {
            activeFilters = JSON.parse(savedFilters);
            
            // Update select elements
            filterSelects.forEach(select => {
                const filterType = select.dataset.filter;
                if (activeFilters[filterType]) {
                    select.value = activeFilters[filterType];
                }
            });
            
            updateCardVisibility();
        }
    }

    // Card animation on scroll
    function handleCardAnimation() {
        const cards = document.querySelectorAll('.vehicle-card:not(.visible)');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        cards.forEach(card => observer.observe(card));
    }

    // Language handling
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            const newLang = e.target.value;
            localStorage.setItem('selectedLanguage', newLang);
            // Here you would typically handle language change
            // For now, we'll just reload the page
            window.location.reload();
        });

        // Load saved language
        const savedLang = localStorage.getItem('selectedLanguage');
        if (savedLang) {
            languageSelect.value = savedLang;
        }
    }

    // Detail button handling
    function setupDetailButtons() {
        const detailButtons = document.querySelectorAll('.btn-outline[data-vehicle]');
        detailButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const vehicleId = e.target.dataset.vehicle;
                // Here you would typically handle showing vehicle details
                // For example, opening a modal or navigating to a detail page
                window.location.href = `detail.html?id=${vehicleId}`;
            });
        });
    }

    // Initialize everything
    function init() {
        loadSavedFilters();
        handleCardAnimation();
        setupDetailButtons();
    }

    init();
});

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

