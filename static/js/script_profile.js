document.addEventListener('DOMContentLoaded', () => {
    // Navigation entre les sections
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.profile-section');
    
    function showSection(sectionId) {
        sections.forEach(section => section.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');

        navItems.forEach(item => item.classList.remove('active'));
        document.querySelector(`[href="#${sectionId}"]`).classList.add('active');
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.getAttribute('href').slice(1);
            showSection(sectionId);
        });
    });

    // Gestion de la photo de profil
    const changeAvatarBtn = document.querySelector('.change-avatar');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    changeAvatarBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const avatarContainer = document.querySelector('.profile-avatar');
                // Remplacer le SVG par une image
                avatarContainer.innerHTML = `
                    <img src="${e.target.result}" alt="Photo de profil">
                    <button class="change-avatar">
                        <i class='bx bx-camera'></i>
                    </button>
                `;
                // Réattacher l'événement au nouveau bouton
                document.querySelector('.change-avatar').addEventListener('click', () => fileInput.click());
            };
            reader.readAsDataURL(file);
        }
    });

    // Gestion du formulaire de profil
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = profileForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Animation de sauvegarde
            submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sauvegarde...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="bx bx-check"></i> Sauvegardé!';
                submitBtn.style.background = 'var(--success)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // Gestion de la zone de dépôt des documents
    const uploadZone = document.querySelector('.upload-zone');
    if (uploadZone) {
        uploadZone.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.pdf,.doc,.docx,image/*';
            input.click();
            
            input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    // Ici vous pouvez ajouter la logique pour gérer le fichier
                    console.log('Fichier sélectionné:', file.name);
                }
            });
        });
    }

    // Gestion de la déconnexion
    const logoutBtn = document.querySelector('.logout-btn');
    logoutBtn.addEventListener('click', () => {
        if(confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
            window.location.href = 'login.html';
        }
    });
});