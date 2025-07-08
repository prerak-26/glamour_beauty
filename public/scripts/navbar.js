// public/scripts/navbar.js

export function initResponsiveNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const hamburgerIcon = hamburger ? hamburger.querySelector('.hamburger-icon') : null;
  const navLinks = document.querySelectorAll('.nav-links a');

  function closeNav() {
    if (navbar && navbar.classList.contains('nav-open')) {
      navbar.classList.remove('nav-open');
      if (hamburgerIcon) {
        hamburgerIcon.classList.remove('ri-close-line');
        hamburgerIcon.classList.add('ri-function-line');
      }
    }
  }

  if (navbar && hamburger && hamburgerIcon) {
    hamburger.addEventListener('click', function() {
      navbar.classList.toggle('nav-open');
      if (navbar.classList.contains('nav-open')) {
        hamburgerIcon.classList.remove('ri-function-line');
        hamburgerIcon.classList.add('ri-close-line');
      } else {
        hamburgerIcon.classList.remove('ri-close-line');
        hamburgerIcon.classList.add('ri-function-line');
      }
    });
  }

  // Close nav on scroll
  window.addEventListener('scroll', closeNav);

  // Close nav on link click
  navLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });
} 