// Initialisation de la carte
const map = L.map('map').setView([34.0333, -4.9998], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Ajout d'un marqueur à l'adresse spécifiée
L.marker([34.0333, -4.9998]).addTo(map)
    .bindPopup('CAR+')
    .openPopup();


 // FAQ Toggle
 const faqItems = document.querySelectorAll('.faq-item');
 faqItems.forEach(item => {
     const question = item.querySelector('.faq-question');
     question.addEventListener('click', () => {
         item.classList.toggle('active');
     });
 });

 // Form Submission
 const contactForm = document.getElementById('contactForm');
 contactForm.addEventListener('submit', (e) => {
     e.preventDefault();
     // Add your form submission logic here
     alert('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
     contactForm.reset();
 });

 // Social Media Links
 document.querySelectorAll('.social-card').forEach(card => {
     card.addEventListener('click', () => {
         // Add social media redirect logic here
         const platform = card.classList[1];
         console.log(`Redirecting to ${platform}`);
     });
 });