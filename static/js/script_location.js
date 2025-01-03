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

    // Gestion des dropdowns sur mobile
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
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // View Toggle (Grid/List)
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    const vehiclesContainer = document.getElementById('vehiclesContainer');

    if (gridViewBtn && listViewBtn && vehiclesContainer) {
        const updateViewMode = (mode) => {
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
        };

        // Load saved view mode
        const savedViewMode = localStorage.getItem('viewMode') || 'grid';
        updateViewMode(savedViewMode);

        gridViewBtn.addEventListener('click', () => updateViewMode('grid'));
        listViewBtn.addEventListener('click', () => updateViewMode('list'));
    }

    // Système de filtrage
    const filters = {
        brand: document.getElementById('brandFilter'),
        type: document.getElementById('typeFilter'),
        transmission: document.getElementById('transmissionFilter'),
        fuel: document.getElementById('fuelFilter'),
        price: document.getElementById('priceFilter')
    };

    function getTextContent(element, selector) {
        const el = element.querySelector(selector);
        return el ? el.textContent.toLowerCase().trim() : '';
    }

    function applyFilters() {
        const selectedFilters = {
            brand: filters.brand?.value.toLowerCase() || 'all',
            type: filters.type?.value.toLowerCase() || 'all',
            transmission: filters.transmission?.value.toLowerCase() || 'all',
            fuel: filters.fuel?.value.toLowerCase() || 'all',
            price: filters.price?.value || 'all'
        };

        const vehicles = document.querySelectorAll('.vehicle-card');
        let visibleCount = 0;

        vehicles.forEach(vehicle => {
            const vehicleData = {
                brand: getTextContent(vehicle, 'h3'),
                type: getTextContent(vehicle, '.specs span:first-child'),
                transmission: getTextContent(vehicle, '.specs span:last-child'),
                fuel: getTextContent(vehicle, '.specs span:nth-child(2)'),
                price: extractPrice(getTextContent(vehicle, '.price span'))
            };

            const matches = {
                brand: selectedFilters.brand === 'all' || vehicleData.brand.includes(selectedFilters.brand),
                type: selectedFilters.type === 'all' || vehicleData.type.includes(selectedFilters.type),
                transmission: selectedFilters.transmission === 'all' || vehicleData.transmission.includes(selectedFilters.transmission),
                fuel: selectedFilters.fuel === 'all' || vehicleData.fuel.includes(selectedFilters.fuel),
                price: selectedFilters.price === 'all' || isPriceInRange(vehicleData.price, selectedFilters.price)
            };

            const shouldShow = Object.values(matches).every(match => match);
            vehicle.style.display = shouldShow ? '' : 'none';
            if (shouldShow) visibleCount++;
        });

        updateNoResults(visibleCount);
        updateFilterCounts(visibleCount, vehicles.length);
        saveFiltersToStorage(selectedFilters);
    }

    function extractPrice(priceText) {
        const match = priceText.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
    }

    function isPriceInRange(price, range) {
        if (range === 'all') return true;
        
        if (range.endsWith('+')) {
            const min = parseInt(range);
            return price >= min;
        }

        const [min, max] = range.split('-').map(num => parseInt(num));
        return price >= min && price <= max;
    }

    function updateNoResults(visibleCount) {
        const existingNoResults = document.querySelector('.no-results');
        if (existingNoResults) existingNoResults.remove();

        if (visibleCount === 0) {
            const noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'no-results';
            noResultsDiv.innerHTML = `
                <div class="no-results-content">
                    <i class='bx bx-search' style="font-size: 48px; color: var(--orange);"></i>
                    <h3>Aucun véhicule trouvé</h3>
                    <p>Essayez de modifier vos critères de recherche</p>
                    <button class="btn btn-outline" onclick="resetFilters()">Réinitialiser les filtres</button>
                </div>
            `;
            vehiclesContainer.appendChild(noResultsDiv);
        }
    }

    function updateFilterCounts(visibleCount, totalCount) {
        const countElement = document.querySelector('.total-count');
        if (countElement) {
            countElement.textContent = `${visibleCount} véhicule${visibleCount > 1 ? 's' : ''} sur ${totalCount}`;
        }
    }

    // Sauvegarde et chargement des filtres
    function saveFiltersToStorage(selectedFilters) {
        localStorage.setItem('vehicleFilters', JSON.stringify(selectedFilters));
    }

    function loadFiltersFromStorage() {
        try {
            const savedFilters = JSON.parse(localStorage.getItem('vehicleFilters'));
            if (savedFilters) {
                Object.entries(savedFilters).forEach(([key, value]) => {
                    if (filters[key]) {
                        filters[key].value = value;
                    }
                });
                applyFilters();
            }
        } catch (error) {
            console.error('Erreur lors du chargement des filtres:', error);
        }
    }

    // Reset Filters
    window.resetFilters = function() {
        Object.values(filters).forEach(filter => {
            if (filter) filter.value = 'all';
        });
        localStorage.removeItem('vehicleFilters');
        applyFilters();
    };

    // Event listeners pour les filtres
    Object.values(filters).forEach(filter => {
        if (filter) {
            filter.addEventListener('change', applyFilters);
        }
    });

    document.querySelectorAll('.vehicle-card').forEach((card) => {
        card.style.opacity = '1';
        card.style.transform = 'none';
    });

    // Gestionnaire de langue
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            const newLang = e.target.value;
            localStorage.setItem('selectedLanguage', newLang);
            // Ici, vous pouvez ajouter la logique de changement de langue
            console.log(`Langue changée pour : ${newLang}`);
        });

        // Charger la langue sauvegardée
        const savedLang = localStorage.getItem('selectedLanguage');
        if (savedLang) {
            languageSelect.value = savedLang;
        }
    }

    // Initialisation
    loadFiltersFromStorage();
    applyFilters();
});