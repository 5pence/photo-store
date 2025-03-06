# Spencer's Studio

This is a **monorepo** project combining a **Django DRF backend** with a **React frontend**. The primary goal is to **showcase my coding skills for potential clients**, allow me to **sell photography and digital products**, and feature a **blog for updates on my work, projects, and experiences**.

---

## 🌐 Domain & Branding

The site is hosted on **spencers.studio**, reflecting my **photography, coding, and digital content** work.

### **Sections of the Site**

- **Home** – Introduction to the site and its purpose  
- **Photography** – Portfolio showcase & potential sale of prints  
- **About** – Highlights of my coding experience, tech stack, photogrpahy and services  
- **Blog** – Casual updates, tutorials, and insights into my work  
- **Store** – Digital & physical products (filters, presets, prints, coding tools)  
- **Account** – User profile & order management panel  
- **Contact** – Inquiry form for potential clients or collaborations  
- **Cart & Checkout** – Full e-commerce system with Stripe integration  

---

## 🎨 Design & UI Improvements

This project follows a **modern, professional aesthetic** while keeping usability in mind.

### **Latest UI Enhancements**

- **Revamped Home Page**
  - Slow fade-in tagline  
  - Typing effect for `spencers.studio`  
  - Pulsating animation for branding  
  - Animated gradient background with smooth transitions  

- **About Page**
  - Cartoon images made for services
  - Tech stack with years experience added
  - Testimonials of past mentees and clients

- **Typography**
  - **Proxima-nova** - For headings, clear and friendly
  - **Montserrat** – Primary font for clarity and a sleek, modern look  
  - **Adjustments to Font Weight & Spacing** – Improved readability and flow  

- **Color Palette**
  - **Rust Red** (`#d64933`) – Primary accent (buttons, headers, calls to action)  
  - **Slate Gray** (`#7e7f9a`) – Secondary color for contrast  
  - **Warm White** (`#f8f6f2`) – Background & text contrast  
  - **Neutral Gray** (`#e5e5e5`) – Form backgrounds, muted sections  
  - **Dark Gray** (`#1c1c1c`) – Footer & darker UI elements  

---

## 📦 Tech Stack

### Backend (Django DRF)

- Django & Django REST Framework  
- JWT Authentication (`djangorestframework-simplejwt`)  
- PostgreSQL (Planned)  
- CORS handling (`django-cors-headers`)  
- Environment variables (`django-environ`)  
- Media storage handling (Cloudinary/S3 planned)  

### Frontend (React + Vite)

- **React + Vite** for fast development  
- **Framer Motion** for animations & smooth transitions  
- **React Router** for multi-page navigation  
- **Tailwind CSS + DaisyUI** for styling  
- **JWT Authentication** for secure user sessions  

---

## 🛒 Store, Cart & Payments

### **Implemented Features**

- **Cart Context & `useCart` Hook** – Global cart state management  
- **Persistent Cart (localStorage)** – Items remain after page refresh  
- **Cart Syncs with Backend** – When logged in, cart is stored per user  
- **Full Checkout & Payment Flow** – Secure Stripe integration  
- **Order Status Updates** – Dashboard allows users to track purchases  

### **Checkout Process**

1. **User adds items to cart** (persistent via localStorage)
2. **Proceed to Checkout** → Creates an order in Django backend (`pending`)
3. **Redirect to Stripe Payment Page**
4. **Successful Payment** → Order updates to `paid`, cart clears, and redirects to **Dashboard**
5. **Cancelled Payment** → Redirects to `/checkout/cancel/`, keeping order `pending` for later payment

### **Handling Digital vs Physical Products**

- **Digital and Physical product purchases require login** (prevents unauthorized access)  
- **Pending orders can be completed later** via **Account**  

---

## 🚀 Latest Features & Enhancements

- ✔ **Change password request** - To help people who forget their password.  
- ✔ **Proper Invoice Generation** – Automatically create downloadable invoices.  
- ✔ **Better Dashboard Order UI** – Improve visibility & management of past orders. 
- ✔ **Dynamic Home Page Animations** – Tagline fades in, brand name types out, and background subtly shifts.  
- ✔ **Store & Cart System Overhaul** – Now fully synced with backend for persistent shopping.  
- ✔ **Stripe Checkout Implemented** – Secure payment processing.  
- ✔ **Order History in Dashboard** – Users can track past purchases.  
- ✔ **"Pay Now" for Pending Orders** – Users can complete unfinished payments.  
- ✔ **Cart Clears After Payment or Cancellation** – Prevents stacking duplicate orders.  
- ✔ **Shipping Details Now Integrated** – Required for physical orders.  
- ✔ **Improved UI for Order Management** – Cleaner layout and smoother interactions.  
- ✔ **Error Messaging for Checkout** – Better feedback for missing fields.  

---

## 🔐 Authentication (JWT)

### Why JWT?

- Works well with React (`localStorage` for tokens)  
- Scalable for API use (mobile apps, third-party clients)  
- No reliance on Django’s built-in session handling  
- Refresh tokens allow extended sessions without frequent re-login  

### Authentication Flow

- User logs in → Receives access token + refresh token  
- Access token stored in **localStorage**, used for API authentication  
- If expired, the frontend requests a new one using the refresh token  
- Protected routes (e.g., Dashboard) require authentication  

---

## 🧪 Testing & Deployment

### **Planned Enhancements**

- **Unit Tests (Jest + React Testing Library)** for frontend.  
- **End-to-End Testing (Cypress)** for checkout flow.  
- **Docker Support** for easier development & production deployment.  
- **PostgreSQL Migration** (Replacing SQLite for production).  
- **Vercel / Netlify Deployment** (Frontend hosting).  
- **Render / Railway for Backend** (Fast & scalable Django API hosting).  

---

## 🚀 Next Steps & Planned Features

### **Short-Term Goals**

- **Blog Detail Pages** – Individual blog post pages with SEO-friendly URLs.  
- **Image Details Page** – Dedicated page for each photo with purchase options.
- **Product Reviews & Ratings** – Customers can leave feedback.  
- **Discount Codes & Promotions** – Future marketing features.  

### **Long-Term Goals**

- **Email Notifications** – Order confirmations, abandoned cart reminders.  
- **Membership Plans** – Premium content for subscribed users.  
- **Multilingual Support** – Expand reach with multiple languages.  

---

## 📜 License

© 2025 Spencer Barriball. All rights reserved.

This software, including its code, design, and content, is the intellectual property of Spencer Barriball and **may not** be copied, modified, distributed, or used in any way without explicit written permission.

Unauthorized use, reproduction, or distribution of this software is strictly prohibited.

---

🚀 **Built with passion for Photography, Creativity, and Coding.**
