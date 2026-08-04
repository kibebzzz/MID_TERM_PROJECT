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

---

# [1.2.0] - August 2026

## 🚀 Major Feature Update

This release significantly expands Palette by introducing a complete Artist Module, dynamic profile management, and enhanced marketplace functionality.

---

## Added

### Artist Profile Management

Artists can now:

- Create and update public profiles
- Upload profile pictures
- Upload cover images
- Manage biography
- Update specialty
- Update location
- Add website links
- Add Instagram links
- Add Facebook links

Profile and cover images are uploaded directly to Cloudinary.

---

### Artist Verification

Implemented the complete artist verification workflow.

Artists can:

- Submit portfolio URLs
- Upload government identification
- Upload business registration certificates
- Track verification status
- View administrator feedback
- Resubmit verification after rejection

Verification statuses:

- Pending
- Verified
- Rejected

---

### Dynamic Artist Profiles

Removed dependence on local artist data.

Artist profile pages now retrieve information directly from PostgreSQL including:

- Artist information
- Portfolio
- Social links
- Verification status
- Uploaded creative works

---

### Marketplace Improvements

Implemented:

- Dynamic Product Details page
- Database-driven artist navigation
- Dynamic Featured Artists
- Dynamic Trending Artwork

Marketplace now retrieves all content from PostgreSQL.

---

### Navigation Improvements

Implemented role-aware navigation.

Guests can:

- Browse marketplace
- View artists
- Register
- Login

Buyers can:

- Access wishlist
- Access cart
- Access buyer dashboard

Artists can:

- Return to artist dashboard
- Browse marketplace
- Manage products
- Access profile settings

Wishlist and cart interactions are disabled for artists.

---

### Cloudinary Improvements

Generalized upload architecture.

Uploads now support dedicated folders:

- palette/products
- palette/artists/profile-images
- palette/artists/cover-images
- palette/verification/government-id
- palette/verification/business-certificate

---

## Changed

- Artist profiles now retrieve live database data.
- Settings page supports image uploads.
- Verification now supports document uploads.
- Marketplace is fully database-driven.
- Improved dashboard navigation.

---

## Fixed

- Product details routing.
- Artist profile rendering.
- Navigation inconsistencies.
- Role-based navbar behaviour.
- Artist dashboard access.
- Logout workflow.
- Cloudinary upload organization.

---

## Known Limitations

The following modules remain under development:

- Buyer Orders
- Checkout
- Reviews
- Ratings
- Notifications
- Admin Dashboard
- Payment Integration


---

# [1.3.0] - August 2026

## 🚀 Major Feature Update

This release completes the Artist Management Module and introduces a comprehensive Administration Module for platform management.

---

## Added

### Complete Administration Module

Implemented a dedicated administrator workspace.

Administrators can now:

- Access a protected admin dashboard
- View platform statistics
- Review artist verification requests
- Approve verification requests
- Reject verification requests
- Provide verification feedback
- View all registered users
- Promote buyers to artists
- Demote artists to buyers
- Suspend user accounts
- Reactivate suspended accounts
- View platform analytics
- Manage marketplace products

---

### Product Moderation

Implemented product moderation tools.

Administrators can now:

- View all uploaded products
- Feature products
- Remove products from the marketplace using soft deletion
- Restore removed products

Soft deletion preserves historical order information while hiding products from public listings.

---

### User Management

Implemented a complete user management system.

Added:

- User search
- Role filtering
- Role promotion and demotion
- Account suspension
- Active/Suspended status tracking
- Modern action menu interface

Suspended users are prevented from authenticating.

---

### Platform Analytics

Introduced a platform-wide analytics dashboard.

Metrics include:

- Total users
- Total artists
- Total buyers
- Total products
- Available products
- Removed products
- Featured products
- Verified artists
- Pending verification requests

---

### Marketplace Improvements

Implemented several marketplace enhancements.

Added:

- Homepage category navigation
- URL-based category filtering
- Improved category synchronization
- Dynamic category routing
- Soft-delete aware marketplace queries

---

## Changed

- Product deletion now performs a soft delete.
- Marketplace hides unavailable products.
- Artist profiles no longer display removed products.
- Category filtering now matches Prisma enum values.
- Homepage category cards navigate directly to filtered marketplace results.
- Verification workflow now supports repeated submissions after rejection.

---

## Fixed

- Artist profile rendering issues.
- Marketplace category filtering.
- Homepage category rendering.
- Duplicate React key warnings.
- Logout functionality for artist dashboard.
- Verification resubmission workflow.
- Product visibility inconsistencies.
- Admin moderation edge cases.

---

## Security

Enhanced administrative security.

Added:

- User suspension
- Role management
- Protected admin endpoints
- Administrative moderation controls

---

## Known Limitations

The following modules remain under development:

- Checkout
- Payment Integration
- Buyer Order History
- Artist Sales History
- Notifications
- Reviews
- Ratings

# [1.4.0] - August 2026

## 🚀 Major Feature Update

This release introduces the complete Buyer Commerce Module, including shopping cart integration, order management, checkout workflow, inventory validation, and automatic marketplace cleanup.

---

## Added

### Buyer Commerce Module

Implemented a complete buyer purchasing workflow.

Buyers can now:

- Add products to cart
- Update cart quantities
- Remove cart items
- Create pending orders
- View order history
- Complete checkout
- Submit shipping information
- Delete pending orders before payment

---

### Checkout System

Implemented a dedicated checkout experience.

Added:

- Shipping information form
- Order summary
- Payment simulation workflow
- Order confirmation

---

### Order Management

Implemented a complete order lifecycle.

Order statuses now include:

- Pending
- Paid
- Cancelled
- Delivered

Orders are created before payment, allowing buyers to review or cancel purchases prior to checkout.

---

### Inventory Management

Implemented real-time inventory validation.

Features include:

- Stock validation during checkout
- Automatic quantity reduction after payment
- Automatic availability updates
- Prevention of overselling
- Live inventory synchronization

---

### Marketplace Cleanup

Implemented automatic cleanup for unavailable products.

When stock reaches zero:

- Products become unavailable
- Products disappear from the marketplace
- Products disappear from artist profiles
- Products are removed from buyer carts
- Pending orders containing unavailable products are cancelled automatically

---

## Changed

- Shopping cart now persists until successful payment.
- Checkout now completes existing pending orders.
- Product deletion continues using soft deletion.
- Inventory updates are transaction-safe.
- Commerce workflow now follows a production-style order lifecycle.

---

## Fixed

- Checkout transaction timeout.
- Product deletion conflicts with order history.
- Inventory synchronization issues.
- Marketplace consistency after stock depletion.
- Cart cleanup after completed purchases.
- Pending order edge cases.

---

## Security

- Added transactional inventory validation.
- Prevented duplicate pending orders.
- Protected payment workflow against race conditions.

---

## Performance

- Optimized checkout transaction flow.
- Reduced unnecessary database operations.
- Improved inventory update efficiency.

---

## Known Limitations

The following modules remain under development:

- Database-backed Wishlist
- Reviews
- Ratings
- Notifications
- Payment Gateway Integration