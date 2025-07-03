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

const collage = document.getElementById('collage');
if (collage) {
  images.forEach(img => {
    const image = document.createElement('img');
    image.src = img.src;
    image.alt = img.alt;
    image.className = img.class;
    collage.appendChild(image);
  });
} 