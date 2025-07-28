# Nitesha Parlor - Beauty Salon Management System

A comprehensive web application for managing a beauty salon's online presence, featuring a modern frontend interface and a robust backend API with admin dashboard functionality.

## 🌟 Project Overview

Nitesha Parlor is a full-stack web application designed for beauty salons to showcase their services, manage promotions, display gallery images, handle customer enquiries, and maintain an admin dashboard for content management. The application provides both customer-facing features and administrative tools for salon owners.

## ✨ Features

### Customer-Facing Features
- **Homepage**: Modern, responsive landing page with hero section and service showcase
- **Services**: Dynamic service catalog with categories and pricing
- **Gallery**: Image gallery showcasing salon work and treatments
- **Promotions**: Special deals and promotional offers display
- **Contact**: Customer enquiry form and contact information
- **Reviews**: Customer testimonials and rating system
- **Responsive Design**: Mobile-friendly interface across all devices

### Admin Features
- **Secure Authentication**: Admin login with password hashing
- **Dashboard**: Centralized admin panel for content management
- **Service Management**: CRUD operations for salon services
- **Gallery Management**: Upload and manage gallery images
- **Promotion Management**: Create and manage promotional offers
- **Review Management**: Moderate customer reviews
- **Enquiry Management**: Handle customer enquiries
- **File Upload**: Image upload functionality with Supabase storage

## 🛠️ Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **Supabase**: Database and file storage
- **bcrypt**: Password hashing
- **multer**: File upload handling
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with responsive design
- **JavaScript (ES6+)**: Client-side functionality
- **Remix Icons**: Icon library
- **Google Fonts**: Typography (Montserrat, Great Vibes)

### Database & Storage
- **Supabase**: PostgreSQL database with real-time capabilities
- **Supabase Storage**: File storage for images
- **Row Level Security**: Database security policies

## 📁 Project Structure

```
nitesha-parlor-project/
├── public/                     # Frontend files
│   ├── index.html             # Main homepage
│   ├── service.html           # Services page
│   ├── gallery.html           # Gallery page
│   ├── promo.html             # Promotions page
│   ├── admin/                 # Admin interface
│   │   ├── login.html         # Admin login
│   │   ├── dashboard.html     # Admin dashboard
│   │   ├── scripts/           # Admin JavaScript
│   │   └── styles/            # Admin CSS
│   ├── assets/                # Static assets
│   ├── scripts/               # Frontend JavaScript
│   └── styles/                # Frontend CSS
├── server/                    # Backend files
│   ├── app.js                # Main server file
│   ├── package.json          # Backend dependencies
│   ├── .env                  # Environment variables
│   └── routes/               # API routes
└── README.md                 # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Supabase account and project

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nitesha-parlor-project
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the server directory:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   PORT=5000
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to public directory**
   ```bash
   cd public
   ```

2. **Serve the frontend**
   You can use any static file server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using Live Server (VS Code extension)
   ```

## 📊 Database Schema

### Tables
- **admin_users**: Admin authentication
- **services**: Salon services and pricing
- **gallery**: Image gallery with captions
- **promos**: Promotional offers
- **reviews**: Customer testimonials
- **enquiries**: Customer contact forms

## 🔌 API Endpoints

### Authentication
- `POST /api/admin/register` - Register new admin
- `POST /api/admin/login` - Admin login

### Services
- `GET /services` - Fetch all services
- `POST /services` - Create new service
- `PUT /services/:id` - Update service
- `DELETE /services/:id` - Delete service

### Gallery
- `GET /gallery` - Fetch all gallery images
- `POST /gallery` - Add new gallery image
- `PUT /gallery/:id` - Update gallery image
- `DELETE /gallery/:id` - Delete gallery image

### Promotions
- `GET /promos` - Fetch all promotions
- `POST /promos` - Create new promotion
- `PUT /promos/:id` - Update promotion
- `DELETE /promos/:id` - Delete promotion

### Reviews
- `GET /reviews` - Fetch all reviews
- `POST /reviews` - Create new review
- `PUT /reviews/:id` - Update review
- `DELETE /reviews/:id` - Delete review

### Enquiries
- `GET /enquiries` - Fetch all enquiries
- `POST /enquiries` - Create new enquiry
- `PUT /enquiries/:id` - Update enquiry
- `DELETE /enquiries/:id` - Delete enquiry

### File Upload
- `POST /upload` - Upload file to Supabase storage

## 🔐 Security Features

- **Password Hashing**: bcrypt for secure password storage
- **CORS Protection**: Cross-origin request handling
- **File Validation**: Image file type and size validation
- **Environment Variables**: Secure configuration management
- **Input Validation**: Server-side data validation

## 🎨 Design Features

- **Modern UI**: Clean, professional design
- **Responsive Layout**: Mobile-first approach
- **Smooth Animations**: CSS transitions and animations
- **Typography**: Google Fonts integration
- **Icon System**: Remix Icons for consistent iconography
- **Color Scheme**: Professional beauty industry palette

## 🚀 Deployment

### Backend Deployment
The backend is configured for deployment on platforms like:
- Render
- Heroku
- Railway
- DigitalOcean

### Frontend Deployment
The frontend can be deployed on:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Nitesha** - Initial work

## 🙏 Acknowledgments

- Supabase for database and storage services
- Express.js community for the web framework
- Remix Icons for the icon library
- Google Fonts for typography

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Note**: This project is designed for educational and commercial use. Please ensure you have proper licensing for any third-party assets used in production. 