import { images, testimonialData } from "./data.js";
import { initResponsiveNavbar } from './navbar.js';
initResponsiveNavbar();


function createGridLayout(images) {
    let layoutHtml = '';
    images.forEach(img => {
        layoutHtml += `<img src="${img.src}" alt="${img.alt}" class="${img.class}">`;
    });
    return layoutHtml;
}

// Create hero collage immediately
document.querySelector('#collage').innerHTML = createGridLayout(images);

async function createServiceCards() {
    // Always show all three categories
    const categories = {
        1: { name: 'Salon', image: 'assets/service-hair.jpg' },
        2: { name: 'Beauty', image: 'assets/service-beauty.jpg' },
        3: { name: 'Bridal', image: 'assets/service-bridal.jpg' }
    };
    let services = [];
    try {
        // Fetch services from API
        const response = await fetch(`${API_BASE}/services`);
        services = await response.json();
    } catch (error) {
        console.error('Error fetching services:', error);
    }
    let layoutHtml = '';
    Object.entries(categories).forEach(([categoryId, category]) => {
        layoutHtml += `<div class="service-block">
          <div class="service-img-wrapper">
            <img src="${category.image}" alt="${category.name}" class="service-img" />
            <span class="service-name">${category.name}</span>
          </div>
        </div>`;
    });
    document.querySelector('.new-service-cards').innerHTML = layoutHtml;
    // Make service cards clickable
    const serviceBlocks = document.querySelectorAll('.service-block');
    const categoryIds = [1, 2, 3]; // 1: Salon, 2: Beauty, 3: Bridal
    serviceBlocks.forEach((block, idx) => {
        if (categoryIds[idx]) {
            block.style.cursor = 'pointer';
            block.addEventListener('click', function() {
                window.location.href = `service.html?category=${categoryIds[idx]}`;
            });
        }
    });
}

// Initialize service cards
createServiceCards();

// --- Testimonial Modal Logic ---

// Dynamically render testimonial cards
const testimonialCollage = document.getElementById('testimonialCollage');
testimonialCollage.innerHTML = testimonialData.map((data, idx) => {
  return `<div class="testimonial-card card${idx+1}" data-user="user${idx+1}">
    <img src="${data.img}" alt="${data.name}" />
  </div>`;
}).join('');

const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialModal = document.getElementById('testimonialModal');
const testimonialModalImg = document.getElementById('testimonialModalImg');
const testimonialModalUser = document.getElementById('testimonialModalUser');
const testimonialModalReview = document.getElementById('testimonialModalReview');
const testimonialModalClose = document.getElementById('testimonialModalClose');
const testimonialSection = document.querySelector('.testimonial-section');

// Open modal on card click
testimonialCards.forEach((card, idx) => {
  card.addEventListener('click', function() {
    const data = testimonialData[idx];
    testimonialModalImg.src = data.img;
    testimonialModalUser.textContent = data.name;
    testimonialModalReview.textContent = data.review;
    testimonialModal.style.display = 'flex';
    testimonialSection.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
  });
});

// Close modal
function closeTestimonialModal() {
  testimonialModal.style.display = 'none';
  testimonialSection.classList.remove('modal-open');
  document.body.style.overflow = '';
}
testimonialModalClose.addEventListener('click', closeTestimonialModal);
testimonialModal.addEventListener('click', function(e) {
  if (e.target === testimonialModal) closeTestimonialModal();
});
  

// Scroll header function
function scrollHeader() {
    const navbar = document.querySelector('.navbar');
    if (this.scrollY >= 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', scrollHeader);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
  

// --- EmailJS Contact Form Functionality ---

// Initialize EmailJS with your Public ID
(function() {
    emailjs.init('OCdc7bWSseTVrZaXx'); // Public ID
})();

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('prerak-contact-form');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const submitText = contactForm.querySelector('.submit-text');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        submitText.textContent = '';
        
        // Get form data and map to template variables
        const formData = {
            name: contactForm.querySelector('input[name="fullname"]').value,
            email: contactForm.querySelector('input[name="email"]').value,
            title: contactForm.querySelector('input[name="subject"]').value,
            message: contactForm.querySelector('textarea[name="message"]').value
        };
        // Prepare data for backend
        const backendData = new URLSearchParams({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            date: new Date().toISOString().split('T')[0]
        });
        // Send both EmailJS and backend request in parallel
        Promise.all([
            emailjs.send('service_t9yzygj', 'template_0rs3l8w', formData),
            fetch(`${API_BASE}/enquiries`, {
                method: 'POST',
                body: backendData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => res.json())
        ])
        .then(([emailResult, dbResult]) => {
            // Success
            submitButton.textContent = 'Message Sent!';
            submitText.textContent = ' Your message has been sent and stored successfully.';
            submitText.style.color = '#28a745';
            // Reset form
            contactForm.reset();
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
                submitText.textContent = '';
            }, 3000);
        })
        .catch(function(error) {
            // Error
            submitButton.textContent = 'Send Message';
            submitText.textContent = 'Sorry, there was an error. Please try again.';
            submitText.style.color = '#dc3545';
            submitButton.disabled = false;
            console.error('Contact form error:', error);
        });
    });
});
  
