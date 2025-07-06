// Hero images setup
const images = [
    { src: 'assets/bg-1.jpg', alt: 'Salon 1', class: 'collage-img img1' },
    { src: 'assets/bg-2.jpg', alt: 'Salon 2', class: 'collage-img img2' },
    { src: 'assets/bg-3.jpg', alt: 'Salon 3', class: 'collage-img img3' },
    { src: 'assets/bg-4.jpg', alt: 'Salon 4', class: 'collage-img img4' },
    { src: 'assets/bg-5.jpg', alt: 'Salon 5', class: 'collage-img img5' },
    { src: 'assets/bg-6.jpg', alt: 'Salon 6', class: 'collage-img img6' },
    { src: 'assets/bg-7.jpg', alt: 'Salon 7', class: 'collage-img img7' },
    { src: 'assets/bg-8.jpg', alt: 'Salon 8', class: 'collage-img img8' },
    { src: 'assets/bg-9.jpg', alt: 'Salon 9', class: 'collage-img img9' },
];

const services = [{
    name: 'Salon',
    image: 'assets/service-hair.jpg'
},
{
    name: 'Beauty',
    image: 'assets/service-beauty.jpg'
},
{
    name: 'Bridal',
    image: 'assets/service-bridal.jpg'
},
];

function createGridLayout(images) {
    let layoutHtml = '';
    images.forEach(img => {
        layoutHtml += `<img src="${img.src}" alt="${img.alt}" class="${img.class}">`;
    });
    return layoutHtml;
}

// Create hero collage immediately
document.querySelector('#collage').innerHTML = createGridLayout(images);

function createServiceCards(services) {
    let layoutHtml = '';
    services.forEach(service => {
        layoutHtml += `<div class="service-block">
          <div class="service-img-wrapper">
            <img src="${service.image}" alt="${service.name}" class="service-img" />
            <span class="service-name">${service.name}</span>
          </div>
        </div>`;
    });
    return layoutHtml;
}

document.querySelector('.new-service-cards').innerHTML = createServiceCards(services);

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

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

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

// Add intersection observer for animations (excluding hero images)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation (excluding hero images)
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .review-card, .gallery-images img');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});
  
// --- Testimonial Modal Logic ---
const testimonialData = [
  {
    img: 'assets/bg-1.jpg',
    name: 'Priya Sharma',
    review: 'Absolutely loved my experience! The staff is so friendly and professional.'
  },
  {
    img: 'assets/bg-2.jpg',
    name: 'Ayesha Khan',
    review: 'The best salon in town. My go-to place for all beauty needs.'
  },
  {
    img: 'assets/bg-3.jpg',
    name: 'Simran Patel',
    review: 'Clean, modern, and relaxing. Highly recommend their facial treatments!'
  },
  {
    img: 'assets/bg-4.jpg',
    name: 'Neha Gupta',
    review: 'The bridal package was perfect. Thank you for making my day special!'
  },
  {
    img: 'assets/bg-5.jpg',
    name: 'Riya Mehta',
    review: 'Amazing hair stylists. I always leave feeling fabulous.'
  },
  {
    img: 'assets/bg-6.jpg',
    name: 'Sana Ali',
    review: 'Superb service and attention to detail. Will visit again!'
  },
  {
    img: 'assets/bg-7.jpg',
    name: 'Anjali Desai',
    review: 'Love the ambiance and the staff. My nails have never looked better.'
  },
  {
    img: 'assets/bg-8.jpg',
    name: 'Meera Joshi',
    review: 'The makeup artists are true professionals. Highly recommended.'
  },
  {
    img: 'assets/bg-9.jpg',
    name: 'Pooja Singh',
    review: 'A hidden gem! The spa services are so relaxing.'
  },
  {
    img: 'assets/service-beauty.jpg',
    name: 'Nisha Verma',
    review: 'I always get compliments after my visits here. Thank you!'
  },
  {
    img: 'assets/service-bridal.jpg',
    name: 'Zara Sheikh',
    review: 'The bridal team is outstanding. My wedding look was flawless.'
  },
  // Additional demo testimonials
];

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
  