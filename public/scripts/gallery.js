// public/scripts/gallery.js

const galleryImages = [
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

function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = galleryImages.map(src => `
    <div class="gallery-img-wrapper">
      <img src="${src}" alt="Gallery Image" class="gallery-img" />
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderGallery();

  // Only apply horizontal scroll on desktop
  if (window.innerWidth > 900) {
    const gallerySection = document.querySelector('.gallery-section');
    const galleryGrid = document.getElementById('gallery-grid');
    const horizontalWrapper = document.querySelector('.gallery-horizontal-wrapper');

    // Wait for images to load for accurate width
    const images = galleryGrid.querySelectorAll('img');
    let imagesLoaded = 0;
    images.forEach(img => {
      img.onload = img.onerror = () => {
        imagesLoaded++;
        if (imagesLoaded === images.length) setupHorizontalScroll();
      };
    });
    if (images.length === 0) setupHorizontalScroll();

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
        wrapperGap = parseInt(gridStyle.gap || wrapperStyle.marginRight || 0) || 0;
      }
      // Adjust scrollLength so last image is fully visible
      const scrollLength = gridWidth - viewportWidth + wrapperWidth + wrapperGap;

      if (scrollLength <= 0) {
        console.log('[Gallery] No horizontal scroll needed.');
        return;
      }

      // Set the section height to scrollLength + horizontalWrapper.offsetTop + horizontalWrapper.offsetHeight
      // This ensures the gallery ends right above the footer, even with large images
      gallerySection.style.height = (scrollLength + horizontalWrapper.offsetTop + horizontalWrapper.offsetHeight) + 'px';
      console.log('[Gallery] Section height set to:', gallerySection.style.height, 'scrollLength:', scrollLength);

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
          onUpdate: self => {
            console.log('[Gallery] Scroll progress:', self.progress.toFixed(2));
            if (self.progress === 1) {
              console.log('[Gallery] Reached end of gallery scroll. window.scrollY:', window.scrollY, 'Section height:', gallerySection.style.height);
            }
          }
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

      // Only reload on width change
      let lastWidth = window.innerWidth;
      window.addEventListener('resize', () => {
        if (window.innerWidth !== lastWidth) {
          location.reload();
          lastWidth = window.innerWidth;
        }
      });
      console.log('[Gallery] Horizontal scroll setup complete. gridWidth:', gridWidth, 'scrollLength:', scrollLength);
    }
  }
}); 