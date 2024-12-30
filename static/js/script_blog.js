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

    // Recherche
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            filterArticles(searchTerm);
        });
    }

    // Filtrage par catégorie
    const categoryTags = document.querySelectorAll('.category-tag');
    categoryTags.forEach(tag => {
        tag.addEventListener('click', () => {
            categoryTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            const category = tag.dataset.category;
            filterByCategory(category);
        });
    });

    // Newsletter Popup
    const popup = document.getElementById('newsletterPopup');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('popupClose');

    if (popup && overlay && closeBtn) {
        setTimeout(() => {
            popup.style.display = 'block';
            overlay.style.display = 'block';
        }, 5000);

        closeBtn.addEventListener('click', closePopup);
        overlay.addEventListener('click', closePopup);
    }

    // Gestion des formulaires newsletter
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', handleNewsletterSubmit);
    });
});

// Fonction pour fermer le popup
function closePopup() {
    const popup = document.getElementById('newsletterPopup');
    const overlay = document.getElementById('overlay');
    if (popup && overlay) {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }
}

// Fonction pour gérer la soumission newsletter
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    alert('Merci de votre inscription ! Vous recevrez bientôt nos actualités.');
    e.target.reset();
    closePopup();
}

// Fonction pour filtrer les articles par recherche
function filterArticles(searchTerm) {
    const articles = document.querySelectorAll('.blog-card');
    articles.forEach(article => {
        const title = article.querySelector('.blog-title').textContent.toLowerCase();
        const excerpt = article.querySelector('.blog-excerpt').textContent.toLowerCase();
        if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}

// Fonction pour filtrer par catégorie
function filterByCategory(category) {
    const articles = document.querySelectorAll('.blog-card');
    articles.forEach(article => {
        const articleCategory = article.querySelector('.blog-category').textContent.toLowerCase();
        if (category === 'all' || articleCategory.includes(category.toLowerCase())) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}


// Fonction pour charger les articles
function loadArticles() {
    const featuredGrid = document.getElementById('featuredPosts');
    if (featuredGrid) {
        featuredArticles.forEach(article => {
            const articleHTML = `
                <article class="blog-card">
                    <div class="blog-content">
                        <span class="blog-category">${article.category}</span>
                        <h3 class="blog-title">${article.title}</h3>
                        <p class="blog-excerpt">${article.excerpt}</p>
                        <div class="blog-meta">
                            <div class="blog-author">
                                <span>Par ${article.author.name}</span>
                            </div>
                            <span>${article.date}</span>
                        </div>
                    </div>
                </article>
            `;
            featuredGrid.insertAdjacentHTML('beforeend', articleHTML);
        });
    }
}

// Charger les articles au chargement de la page
loadArticles();