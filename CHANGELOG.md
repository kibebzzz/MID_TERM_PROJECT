# Changelog

All notable changes to the Palette project will be documented in this file.

This project follows a milestone-based versioning approach during development.

---

# Version 0.1.0 – Project Initialization

**Status:** Completed

## Added

- Initialized React application
- Configured project structure
- Installed project dependencies
- Configured React Router
- Configured Tailwind CSS
- Created reusable UI component structure

---

# Version 0.2.0 – Frontend Foundation

**Status:** Completed

## Added

### Pages

- Home
- Marketplace
- Artists
- Artist Profile
- Product Details
- Wishlist
- Shopping Cart
- About
- Contact
- Login
- Register
- Forgot Password

### Components

- Responsive Navbar
- Footer
- Search Bar
- Product Card
- Category Filter
- Sort Dropdown
- Featured Artists
- CTA Section
- Testimonials
- Statistics Section
- Page Wrapper Animations
- Custom 404 Page

### Features

- Marketplace search
- Category filtering
- Price sorting
- Rating sorting
- Wishlist functionality
- Toast notifications
- Responsive mobile navigation
- Artist profile navigation

---

# Version 0.3.0 – Backend Foundation

**Status:** Completed

## Added

### Backend Infrastructure

- Express.js server
- Environment configuration
- Modular folder structure
- API routing
- Controllers
- Services
- Middleware

### Database

- PostgreSQL integration
- Prisma ORM configuration
- Initial database migration
- User model
- ArtistProfile model

### Authentication

- User registration endpoint
- User login endpoint
- JWT authentication
- Password hashing using bcrypt
- Protected routes

### Testing

- Thunder Client API testing
- PostgreSQL verification

---

# Version 0.4.0 – Authentication Integration

**Status:** In Progress

## Current Work

- Frontend Register integration
- Frontend Login integration
- JWT storage
- Route protection
- Role-based redirects

---

# Upcoming Versions

## Version 0.5.0

- Product CRUD
- Artist dashboard
- Image uploads

---

## Version 0.6.0

- Shopping cart backend
- Orders
- Checkout workflow

---

## Version 0.7.0

- Reviews
- Ratings
- Artist verification

---

## Version 0.8.0

- Admin dashboard
- Analytics
- User management

---

## Version 1.0.0

Initial Production Release

# CHANGELOG

All notable changes to the Palette project are documented in this file.

This project follows Semantic Versioning.

---

# [1.1.0] - July 2026

## 🚀 Major Release

This release transforms Palette from a frontend prototype into a fully functional full-stack marketplace.

---

# Added

## Authentication

- User registration
- User login
- JWT authentication
- Password hashing using bcrypt
- Authentication middleware
- Persistent login using localStorage
- React Auth Context
- Role-based authentication
- Protected dashboard routing

Supported Roles

- Buyer
- Artist
- Admin

---

## Database

Introduced PostgreSQL database using Prisma ORM.

Added database models:

- User
- ArtistProfile
- Product

Configured:

- Prisma Client
- Database migrations
- Relationships
- Cascade deletes

---

## Artist Dashboard

Created a dedicated dashboard for artists.

Added:

- Welcome screen
- Dashboard statistics
- Total products
- Featured products
- Inventory value

---

## Product Management

Implemented product CRUD foundation.

Artists can:

- Upload products
- View their own products
- Delete products

Backend endpoints added:

GET

```
/api/products
```

POST

```
/api/products
```

DELETE

```
/api/products/:id
```

Artist specific endpoints

```
GET /api/products/artist/:artistId

GET /api/products/artist/:artistId/stats
```

---

## Marketplace

Marketplace now loads products dynamically.

Removed dependence on static product data for marketplace rendering.

Added:

- Search
- Category filtering
- Product sorting
- Dynamic loading
- Backend integration

---

## Cloudinary Integration

Implemented cloud image hosting.

Added

- Cloudinary configuration
- Multer middleware
- Upload endpoint
- Image preview
- Frontend upload service

Upload Flow

```
Choose Image

↓

Upload to Cloudinary

↓

Receive Secure URL

↓

Store URL in PostgreSQL

↓

Display Product
```

---

## Frontend Improvements

Created dedicated layouts.

Added

- Public Layout
- Artist Layout
- Buyer Layout
- Admin Layout

Improved navigation structure.

---

## Services Layer

Created reusable frontend service architecture.

Added

Auth Service

Product Service

Upload Service

Dashboard Service

API Configuration

---

## Backend Architecture

Refactored backend into a layered architecture.

Current structure

```
Routes

↓

Middleware

↓

Controllers

↓

Services

↓

Prisma

↓

PostgreSQL
```

---

## User Experience

Added

Toast notifications

Image previews

Loading states

Role-based redirects

Persistent sessions

Responsive dashboard

---

# Changed

Marketplace now retrieves products from PostgreSQL.

Authentication is now fully backend-driven.

Product uploads now store real data.

Static product workflow replaced with API-driven workflow.

Improved overall folder architecture.

Separated frontend layouts.

Improved code organization.

---

# Fixed

Resolved login authentication issues.

Resolved dashboard routing.

Resolved marketplace product loading.

Resolved Prisma relationship errors.

Resolved middleware import issues.

Resolved Cloudinary configuration.

Resolved product upload workflow.

Resolved artist dashboard rendering.

Resolved route ordering conflicts.

Improved error handling across backend services.

---

# Security

Implemented password hashing.

Added JWT authentication.

Protected dashboard access.

Added role-based authorization foundation.

Secured environment variables.

---

# Performance

Reduced frontend duplication through reusable services.

Optimized product queries.

Improved React rendering.

Separated API logic from components.

---

# Developer Experience

Improved project structure.

Added reusable service layer.

Added reusable layouts.

Improved maintainability.

Introduced cleaner backend architecture.

---

# Documentation

Updated project documentation.

Expanded README.

Improved setup instructions.

Documented backend architecture.

Documented API endpoints.

Documented authentication flow.

---

# Known Limitations

Shopping cart currently stores data locally.

Orders are not yet implemented.

Payments are not integrated.

Reviews are not yet available.

Admin dashboard is under development.

Buyer dashboard is under development.

Messaging system not implemented.

Notifications not implemented.

---

# Next Release (v2.0.0)

Planned features

Buyer Dashboard

Backend Shopping Cart

Persistent Wishlist

Checkout

Orders

Order History

Product Editing

Multiple Product Images

Product Availability Controls

Admin Dashboard

Artist Verification

Reviews

Ratings

Notifications

Analytics

Recommendations

Pagination

Deployment

---



# Version History

| Version | Date | Description |
|----------|------------|------------------------------|
| 0.1.0 | Initial Release | Frontend Prototype |
| 1.1.0 | July 2026 | Full Stack Marketplace Foundation |