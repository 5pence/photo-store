# Spencer's Studio

This is a monorepo project that combines a **Django DRF backend** with a **React frontend**. The primary goal is to **showcase my coding skills for potential employment and contract work** while also allowing me to **sell photography and digital products**. Additionally, the site features a blog for casual updates on my work, projects, and experiences.

---

## 🌐 **Domain & Branding**

The site is hosted on **spencers.studio**, chosen to reflect my diverse creative work across **photography, coding, and digital content**.

### **Sections of the Site**

- **Home** – Introduction to the site and its purpose  
- **Photography** – Portfolio showcase & potential sale of prints  
- **Coding** – Highlights of my coding experience, projects, and services  
- **Blog** – Casual updates, tutorials, and insights into my work  
- **Store** – Digital & physical products (filters, presets, prints, coding tools)  
- **Dashboard** – User profile & management panel for logged-in users  
- **Contact** – A way for visitors to reach out for inquiries or services  
- **Cart** – Users can now add products to their cart and manage their orders  
- **Checkout** – Fully integrated Stripe payment system  

---

## 🎨 **Design & UI**

This project follows a **modern, professional aesthetic** while keeping usability in mind.

- **Frameworks**: Tailwind CSS + DaisyUI for streamlined styling  
- **Typography**:  
  - **Montserrat** – Used across the site for clarity and a clean, modern look  
- **Color Palette**:
  - **Rust Red** (`#d64933`) – Primary accent (buttons, headers, calls to action)  
  - **Slate Gray** (`#7e7f9a`) – Secondary color for contrast  
  - **Warm White** (`#f8f6f2`) – Background & text contrast  
  - **Neutral Gray** (`#e5e5e5`) – Form backgrounds, muted sections  
  - **Dark Gray** (`#1c1c1c`) – Footer & darker UI elements  

These choices ensure **strong readability, high contrast, and an inviting feel** for users.

---

## 📦 **Tech Stack**

### **Backend (Django DRF)**

- Django & Django REST Framework  
- JWT Authentication (`djangorestframework-simplejwt`)  
- PostgreSQL (Planned)  
- CORS handling (`django-cors-headers`)  
- Environment variables (`django-environ`)  

### **Frontend (React)**

- React with Vite for fast development  
- **Tailwind CSS + DaisyUI** for styling  
- JWT Authentication (handled via `localStorage`)  
- API calls to Django backend  

### **Media & File Handling**

- Django serves images via **media storage** (now correctly configured)  
- Future integration with **Cloudinary or S3** for production-ready media handling  

### **🛒 Store & Cart System**

- **Cart Context & `useCart` Hook** – Provides global cart state management  
- **Persistent Cart (localStorage)** – Items remain in the cart after page refresh  
- **Cart Syncs with Backend** – When logged in, the cart is stored per user  
- **Full Checkout & Payment Flow** – Secure Stripe integration  

### **Payments & Order Flow**

#### **Checkout Process**

1. **User adds items to cart** (persistent via localStorage)
2. **Proceed to Checkout** → Creates an order in Django backend (status: `pending`)
3. **Redirect to Stripe Payment Page**
4. **Successful Payment** → Redirects to `/checkout/success/` and:
   - Confirms the order as `paid`
   - Clears the user's cart (both frontend & backend)
   - Redirects to **Dashboard** after 5 seconds
5. **Cancelled Payment** → Redirects to `/checkout/cancel/` and:
   - Clears the user's cart (both frontend & backend)
   - Redirects back to **Cart** page

#### **Handling Digital vs Physical Products**

- **Digital products require login** (to prevent unauthorized access)
- **Physical products can be bought without an account**
- **User Dashboard displays past orders**
- **Cart is fully synced across devices when logged in**

---

## 🚀 **Latest Features & Enhancements**

- ✔ **Stripe Checkout Fully Implemented** – Secure payments for digital & physical products  
- ✔ **Order System Overhauled** – Pending orders now clear on failed payments  
- ✔ **Cart Clears After Payment or Cancellation** – Prevents duplicate stacking  
- ✔ **Backend Cart API Extended** – Added `/cart/clear/` endpoint for syncing cart  
- ✔ **Order History Now Visible on Dashboard** – Users can track purchases  
- ✔ **AuthContext Fixes** – Improved login state management & session persistence  
- ✔ **Cart & Checkout State Fully Synced** – Ensures a seamless buying experience  

---

## 🔐 **Authentication (JWT)**

### Why JWT?

- Works well with React (tokens stored in localStorage)
- Scalable for API use (mobile apps, third-party clients)
- No reliance on Django’s built-in session handling
- Refresh tokens allow extended sessions without re-login

### How It Works

- User logs in → Receives access token + refresh token
- Access token is stored in localStorage and used for authentication
- If the token expires, the frontend requests a new one using the refresh token
- Protected routes (e.g., Dashboard) require authentication

---

## 🛠 **Next Steps & Planned Features**

- **Address Collection** – Shipping details need to be collected at checkout.
- **Process Payment Button** – If an order is pending, users should have an option to complete payment from their dashboard.
- **Proper Invoice Generation** – Automatically generate invoices for completed purchases.
- **Order History UI** – A better dashboard experience for managing past orders.
- **Image Details Page** – A dedicated page for each image with purchase options  
- **Email Notifications** – Order confirmations & payment receipts  
- **Product Reviews & Ratings** – Customers that have purchased can leave feedback  
- **Discount Codes & Promotions** – Future marketing features

---

## 🧪 **Testing: Store & Cart API**

### **Automated Tests Added:**

- ✅ **Cart Functionality Tests** – Add, remove, and update cart items  
- ✅ **Order Processing Tests** – Verify order status changes and Stripe payments  
- ✅ **JWT Auth Tests** – Ensure users remain logged in across sessions  

Tests can be run with:

```bash
python manage.py test store
```

---

## **Final Notes**

This project is a work in progress, and I'm excited to develop it further. If you're interested in photography, coding, or digital products, stay tuned for upcoming updates!
