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
- **Add/Remove Items** – Users can now manage their cart contents  
- **Dynamic Cart UI** – The cart icon only appears in the navbar when it contains items
- **Cart and Checkout** - Fully functional
- **Cart syncs with backend** when user logs in  

### **Payments**

- **Stripe is fully integrated and working**
- **Both digital and physical products are supported**
- **Secure checkout & transaction handling**
- **Order status updates in the admin panel after payment**  

### **Order Management**

- Django Admin now tracks all orders with Pending, Paid, and Failed statuses.
- Users can see their order history (future feature).
- The system prevents duplicate unpaid orders from being created.

### **Digital vs Physical Products**

- Digital products require login (for security & access).
- Physical products can be purchased without an account.
- Digital purchases are available for re-download in the user’s account.

### **Future Plans**

- Automated Email Receipts (Post-payment confirmation)
- Product Reviews & Ratings (Let customers leave feedback)

---

## 🚀 **Latest Features & Enhancements**

- ✔ **Keyboard Navigation in Lightbox** – Use **Arrow Left/Right** to navigate images, **Esc** to close  
- ✔ **Swipe Gestures for Mobile** – Swipe left/right to navigate, swipe down to close the lightbox  
- ✔ **Lazy Loading for Images** – Improves performance by loading images only when they come into view  
- ✔ **Smooth Tag Filtering Animation** – Images now fade in/out smoothly when changing categories  
- ✔ **Improved Lightbox UI** – Button styling refined for consistency & better visibility  
- ✔ **Loading Spinner** – Displays a spinner while images are being fetched  
- ✔ **Store Models Implemented** – Django models for **products, categories, and images** have been created  
- ✔ **Admin Panel for Store** – Products and categories can now be managed from Django admin  
- ✔ **Multiple Image Support for Products** – Products can now have multiple images stored  
- ✔ **Cart Functionality (Backend)** – Users can add/remove items from their cart  
- ✔ **Cart Persistence** – The cart is stored per user, ensuring items are retained  
- ✔ **Cart API Endpoints** – Fully functional API for managing the cart (add, remove, list)
- ✔ **Cart System Added** – Users can add/remove items, and cart persists after refresh  
- ✔ **Cart Page UI Enhancements** – Improve the design and user experience
- ✔ **Stripe Integratio** – Secure checkout for digital & physical products
- ✔ **Order System** – Orders are created, tracked, and marked as paid
- ✔ **Cart Icon Sync** – Cart count updates dynamically after checkout
- ✔ **Admin Order Management** – Orders can be viewed and managed via Django Admin
- ✔ **Success Page with Auto-Redirect** – After payment, users are redirected and the cart is cleared
- ✔ **Clear Cart After Payment** – Cart is cleared on success (both frontend & backend)
- ✔ **Checkout & Payments** – Integrate **Stripe** for handling transactions
- ✔ **User Order History Embedded on Dashboard Page** - Show past purchases
- ✔ **Stripe Webhooks** - Ensure payment verification

---

## 🧪 **Testing: Store & Cart API**

To ensure everything functions as expected, automated tests have been added:

### Category & Product Retrieval Tests

- Tests ensure that categories and products are correctly retrieved via API  

#### Cart Functionality Tests

- Adding a product to the cart  
- Removing a product from the cart  
- Updating cart item quantity  

#### Order Processing Tests (Manual tests)

- Creating an order
- Updating order status after payment
- Clearing cart after successful payment

Tests can be run with:

```bash
python manage.py test store
```

---

## 🔐 Authentication (JWT)

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

## **Next Steps**

- **Image Details Page** – A dedicated page for each image with purchase options  
- **Dashboard Enhancements** – Improve user experience and content management  
- **The Blog** – Add a blog with easy markdown updates

---

## Final Notes

This project is a work in progress, and I'm excited to develop it further. If you're interested in photography, coding, or digital products, stay tuned for upcoming updates!
