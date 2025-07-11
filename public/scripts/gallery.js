// public/scripts/gallery.js

import { initResponsiveNavbar } from './navbar.js';
initResponsiveNavbar();

async function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  try {
    const API_BASE = window.API_BASE || 'http://localhost:5000';
    // Fetch gallery images from API
    const response = await fetch(`${API_BASE}/gallery`);
    const galleryData = await response.json();

    if (galleryData.length === 0) {
      grid.innerHTML = '<p style="color:#fff;text-align:center;">No gallery images available.</p>';
      return;
    }

    grid.innerHTML = galleryData.map(item => `
      <div class="gallery-img-wrapper">
        <img src="${item.image_url}" alt="${item.caption || 'Gallery Image'}" class="gallery-img" />
      </div>
    `).join('');

    // Wait for all images to load before setting up animation
    const images = Array.from(grid.querySelectorAll('img'));
    await Promise.all(images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => img.onload = img.onerror = resolve);
    }));

  } catch (error) {
    console.error('Error fetching gallery:', error);
    // Fallback to static images if API fails
    const fallbackImages = [
      'assets/bg-1.jpg',
      'assets/bg-2.jpg',
      'assets/bg-3.jpg',
      'assets/bg-4.jpg',
      'assets/bg-5.jpg',
      'assets/bg-6.jpg',
      'assets/bg-7.jpg',
      'assets/bg-8.jpg',
      'assets/bg-9.jpg',
      'assets/service-beauty.jpg',
      'assets/service-bridal.jpg',
      'assets/service-hair.jpg'
    ];
    grid.innerHTML = fallbackImages.map(src => `
      <div class="gallery-img-wrapper">
        <img src="${src}" alt="Gallery Image" class="gallery-img" />
      </div>
    `).join('');
    // Wait for fallback images to load
    const images = Array.from(grid.querySelectorAll('img'));
    await Promise.all(images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => img.onload = img.onerror = resolve);
    }));
  }
}

function setupHorizontalScroll() {
  const gallerySection = document.querySelector('.gallery-section');
  const galleryGrid = document.getElementById('gallery-grid');
  const horizontalWrapper = document.querySelector('.gallery-horizontal-wrapper');
  const gridWidth = galleryGrid.scrollWidth;
  const viewportWidth = window.innerWidth;
  const wrapperHeight = horizontalWrapper.offsetHeight;
  // Get width of one image wrapper and gap
  const firstImgWrapper = galleryGrid.querySelector('.gallery-img-wrapper');
  let wrapperWidth = 0;
  let wrapperGap = 0;
  if (firstImgWrapper) {
    const wrapperStyle = window.getComputedStyle(firstImgWrapper);
    wrapperWidth = firstImgWrapper.offsetWidth;
    // Try to get gap from flex or margin-right
    const gridStyle = window.getComputedStyle(galleryGrid);
    wrapperGap = parseInt(gridStyle.gap || wrapperStyle.marginRight || 24) || 24;
  }
  // Adjust scrollLength so last image is fully visible
  const scrollLength = gridWidth - viewportWidth + wrapperGap;

  // Set the section height to scrollLength + horizontalWrapper.offsetTop + horizontalWrapper.offsetHeight
  // This ensures the gallery ends right above the footer, even with large images
  gallerySection.style.height = (scrollLength + horizontalWrapper.offsetTop + horizontalWrapper.offsetHeight + 40) + 'px';

  gsap.registerPlugin(ScrollTrigger);

  gsap.to(galleryGrid, {
    x: () => `-${scrollLength}px`,
    ease: "none",
    scrollTrigger: {
      trigger: gallerySection,
      pin: horizontalWrapper, // Pin only the image grid wrapper
      start: "top top",
      end: () => `+=${scrollLength}`,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    }
  });

  // Lenis smooth scroll
  const lenis = new window.Lenis({
    lerp: 0.07,
    wheelMultiplier: 1,
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on('scroll', ScrollTrigger.update);
}

function setupVerticalStaggeredAnimation() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.gallery-img-wrapper').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 0.7,
      delay: i * 0.1,
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });
  });
  // Optional: Lenis smooth scroll for mobile/tablet
  if (window.Lenis) {
    const lenis = new window.Lenis({
      lerp: 0.07,
      wheelMultiplier: 1,
      smooth: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

function getDeviceType() {
  return window.innerWidth <= 576 ? 'phone' : 'horizontal';
}

let lastDeviceType = getDeviceType();

function setupGalleryAnimation() {
  const deviceType = getDeviceType();
  if (deviceType === 'horizontal') {
    setupHorizontalScroll();
  } else {
    setupVerticalStaggeredAnimation();
  }
}

function handleResize() {
  const currentType = getDeviceType();
  if (currentType !== lastDeviceType) {
    location.reload();
  }
}

window.addEventListener('resize', handleResize);

document.addEventListener('DOMContentLoaded', async () => {
  await renderGallery();
  setupGalleryAnimation();
}); 