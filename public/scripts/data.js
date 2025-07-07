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

  const serviceData = [
    {
      id: 1,
      services: [
        { name: 'Haircuts', price: 30, description: 'Get your hair cut by professionals.' },
        { name: 'Hair Color', price: 50, description: 'Red and black coloring available.' }
      ]
    },
    {
      id: 2,
      services: [
        { name: 'Eyebrow', price: 30, description: 'Perfectly shaped eyebrows.' },
        { name: 'Waxing', price: 50, description: 'Smooth and gentle waxing.' }
      ]
    },
    {
      id: 3,
      services: [
        { name: 'Bridal Makeup', price: 150, description: 'Stunning bridal looks for your big day.' },
        { name: 'Mehendi', price: 80, description: 'Beautiful mehendi designs for brides.' }
      ]
    }
  ];
  

  export {images, services, testimonialData, serviceData};