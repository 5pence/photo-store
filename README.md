# Spencer's Photo Store

This is a monorepo project that combines a Django DRF backend with a React frontend. The purpose of this project is both to demonstrate tech skills and to create a working photo store where users can browse and purchase images. While the photography aspect is secondary, it provides a real-world use case for integrating user authentication, payments, and file uploads.

## Tech Stack

### Backend (Django DRF)

- Django & Django REST Framework
- JWT Authentication (djangorestframework-simplejwt)
- SQLite (for now, but will be swapped for PostgreSQL later)
- CORS handling (django-cors-headers)
- Environment variables (django-environ)

### Frontend (React)

- React (with Tailwind + DaisyUI for styling)
- JWT handling via localStorage
- API calls to Django

### Payments

- Stripe (to handle transactions for purchasing images)

## Progress So Far

✅ Monorepo structure set up (Backend: Django, Frontend: React)  
✅ Django project initialized with DRF  
✅ JWT Authentication implemented (Login, Register, Refresh Tokens)  
✅ SQLite database configured with environment variables  
✅ CORS set up for React-Django communication  

## 🔐 Authentication (JWT)  

<details>
  <summary>Why JWT for Authentication?</summary>

I chose JWT (JSON Web Tokens) instead of session-based authentication because:

- It works well with a React frontend (tokens are stored in localStorage or cookies).
- It's scalable – allows mobile apps or third-party clients to authenticate easily.
- No reliance on Django's built-in session handling, making it better for APIs.
- Tokens can be refreshed without requiring the user to log in again immediately.

JWT is a widely used method for securing stateless APIs, making it a good fit for this project.

</details>

<details>
  <summary>How Authentication Works in the Frontend</summary>

- When a user logs in, they receive an **access token** and a **refresh token** from Django.
- The **access token** is stored in `localStorage` and used in API requests for authentication.
- If the access token **expires**, the frontend automatically sends the **refresh token** to Django to get a new access token.
- Protected routes (like `/dashboard`) check if a user is authenticated before allowing access.

✅ **Login & Registration:**  
Users enter their credentials → React sends a request to Django → Django returns JWT tokens → Tokens are stored → User is redirected.  

✅ **Token Handling:**  
Access tokens are used for quick authentication, while refresh tokens extend session life without requiring a re-login.

✅ **Protected Routes:**  
Pages like `/dashboard` require authentication and will **redirect to login** if the user is not logged in.

</details>

## 🚀 Next Steps

- 🔜 Connect React frontend to JWT authentication (login/signup pages)
- 🔜 Implement user profiles (fetch user info after login)
- 🔜 Set up photo uploads (Cloudinary or local storage?)
- 🔜 Start Stripe integration for payments

Keep your eyes peeled - more to come!
