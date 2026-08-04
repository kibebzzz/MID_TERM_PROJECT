# Palette Project Logbook

**Project:** Palette – Empowering Artists. Connecting Collectors.

**Project Type:** Full-Stack Web Application

**Institution:** United States International University – Africa (USIU-Africa)

**Project Owners:**  
Keith Chege
Claire Nyuguto
Brandon Waiyaki


**Development Start Date:** July 2026

---

# Purpose

The Project Logbook records the chronological development of Palette from conception through implementation, testing, deployment, and future enhancements.

Unlike the CHANGELOG, which focuses on software releases and technical changes, this logbook captures the project's progress, milestones, challenges, decisions, and lessons learned throughout development.

---

# Development Methodology

Palette follows an iterative and incremental development approach inspired by Agile Software Development.

Each sprint consists of:

1. Planning
2. Design
3. Development
4. Testing
5. Documentation
6. Review

Each completed sprint concludes with a documented milestone before progressing to the next feature.

---

# Sprint 0 — Project Planning

**Status:** ✅ Completed

## Objectives

- Define the project idea.
- Identify the problem to solve.
- Select an appropriate technology stack.
- Plan the overall system architecture.

## Activities Completed

- Brainstormed marketplace concepts.
- Selected "Palette" as the project name.
- Defined target users.
- Designed the project vision.
- Planned frontend and backend architecture.
- Established project workflow.
- Created GitHub repository.
- Created documentation roadmap.

## Key Decisions

- React selected for frontend development.
- Express.js selected for backend development.
- PostgreSQL selected as the relational database.
- Prisma selected as the ORM.
- JWT selected for authentication.
- Tailwind CSS selected for UI development.

## Outcome

Project planning completed successfully.

---

# Sprint 1 — Frontend Foundation

**Status:** ✅ Completed

## Objectives

Develop the application's user interface.

## Activities Completed

- Created React application.
- Configured routing.
- Configured Tailwind CSS.
- Created responsive layouts.
- Built reusable components.
- Implemented page transitions.
- Developed responsive navigation.

## Pages Completed

- Home
- Marketplace
- Artists
- Artist Profile
- Product Details
- Wishlist
- Cart
- Login
- Register
- Forgot Password
- About
- Contact
- Custom 404 Page

## Components Completed

- Navbar
- Footer
- Product Card
- Search Bar
- Featured Artists
- Category Filter
- Sort Dropdown
- CTA Section
- Testimonials
- Statistics Section

## Challenges Encountered

### Marketplace sorting caused a blank page.

**Resolution**

Implemented sorting on a copied array instead of mutating filtered results.

---

### Artist navigation inconsistency.

**Resolution**

Linked Featured Artists directly to Artist Profile pages.

---

### Navbar responsiveness.

**Resolution**

Developed a mobile slide-out navigation drawer.

## Outcome

Frontend foundation successfully completed.

---

# Sprint 2 — Backend Foundation

**Status:** ✅ Completed

## Objectives

Develop the server-side architecture.

## Activities Completed

- Initialized Express server.
- Created modular backend architecture.
- Configured environment variables.
- Installed required dependencies.
- Configured Prisma ORM.
- Connected PostgreSQL database.

## Backend Structure

- Routes
- Controllers
- Services
- Middleware
- Config
- Utilities

## Challenges Encountered

### Prisma configuration changes.

**Resolution**

Downgraded to Prisma 6 for a more stable and familiar workflow.

---

### PostgreSQL authentication issues.

**Resolution**

Resolved connection string encoding and password configuration.

## Outcome

Backend infrastructure completed successfully.

---

# Sprint 3 — Authentication

**Status:** ✅ Backend Completed

## Objectives

Develop a secure authentication system.

## Features Completed

- User Registration API
- User Login API
- Password hashing
- JWT authentication
- Protected middleware
- Protected profile route

## Testing

Authentication endpoints verified using Thunder Client.

User records successfully persisted in PostgreSQL.

JWT tokens generated successfully.

## Current Status

Backend complete.

Frontend integration in progress.

---

# Sprint 4 — Frontend Authentication Integration

**Status:** 🔄 In Progress

## Planned Activities

- Connect Register page to backend.
- Connect Login page to backend.
- Store JWT.
- Protect frontend routes.
- Redirect users according to roles.

---

---

# Sprint 5 — Product Management & Marketplace Integration

**Status:** ✅ Completed

## Objectives

Develop a complete product management system for artists and integrate the marketplace with the backend.

## Activities Completed

- Designed Product database model.
- Added ProductCategory enum.
- Implemented Product CRUD APIs.
- Developed product service layer.
- Implemented product controller.
- Created product routes.
- Connected frontend to backend.
- Replaced static marketplace data with PostgreSQL data.
- Implemented artist-specific product retrieval.
- Added dashboard product statistics.

## Features Completed

- Upload Product
- View Products
- Delete Product
- Dynamic Marketplace
- Search
- Category Filtering
- Product Sorting

## Challenges Encountered

### Static marketplace data became difficult to maintain.

**Resolution**

Migrated marketplace data from local JSON files to PostgreSQL using Prisma ORM.

---

### Product statistics required multiple database queries.

**Resolution**

Created dedicated statistics endpoint that aggregates artist products efficiently.

## Outcome

Artists can now upload products which immediately appear inside the marketplace.

---

# Sprint 6 — Artist Dashboard

**Status:** ✅ Completed

## Objectives

Develop a dedicated dashboard for artists.

## Activities Completed

- Designed Artist Layout.
- Implemented protected dashboard routing.
- Created dashboard navigation.
- Developed dashboard overview.
- Added statistics cards.
- Connected dashboard with backend APIs.

## Features Completed

- Dashboard Home
- Product Statistics
- Upload Product
- Manage Products

## Challenges Encountered

### Dashboard layouts conflicted with the public website navigation.

**Resolution**

Separated the application into dedicated layouts:

- Public Layout
- Artist Layout
- Buyer Layout
- Admin Layout

## Outcome

Artists now have an independent workspace separate from the public marketplace.

---

# Sprint 7 — Cloudinary Image Upload Integration

**Status:** ✅ Completed

## Objectives

Replace manual image URLs with a professional image upload workflow.

## Activities Completed

- Configured Cloudinary.
- Configured Multer middleware.
- Created Upload API.
- Built frontend upload service.
- Connected React frontend to upload endpoint.
- Added image preview functionality.

## Features Completed

- Image Selection
- Image Preview
- Cloudinary Upload
- Secure Image URLs
- Automatic Product Image Storage

## Upload Workflow

Choose Image

↓

Preview Image

↓

Upload to Cloudinary

↓

Receive Secure URL

↓

Save Product

↓

Display Product in Marketplace

## Challenges Encountered

### Thunder Client free version does not support file uploads.

**Resolution**

Integrated the upload workflow directly into the frontend for real-world testing.

## Outcome

Artists can now upload images directly from the application without manually entering image URLs.

---

---

# Sprint 8 — Artist Experience & Profile Management

**Status:** ✅ Completed

## Objectives

Complete the artist workspace and provide a professional profile management experience.

## Activities Completed

- Developed Artist Settings page.
- Implemented dynamic artist profile retrieval.
- Connected public artist pages to PostgreSQL.
- Added profile image uploads.
- Added cover image uploads.
- Integrated Cloudinary uploads into profile management.
- Developed artist verification centre.
- Added verification document uploads.
- Added verification status tracking.
- Improved navigation for authenticated users.
- Restricted buyer-only functionality from artist accounts.

## Features Completed

- Public Artist Profiles
- Artist Settings
- Profile Picture Upload
- Cover Image Upload
- Verification Centre
- Dynamic Portfolio
- Role-aware Navigation
- Dashboard Logout

## Challenges Encountered

### Static artist data conflicted with database-driven content.

**Resolution**

Migrated artist profile pages to retrieve data directly from PostgreSQL.

---

### Multiple image upload destinations required better organization.

**Resolution**

Generalized the Cloudinary upload workflow using configurable upload folders.

---

### Artist and buyer navigation required different experiences.

**Resolution**

Implemented role-aware navigation and restricted buyer-specific interactions for artists.

## Outcome

The Artist Module is now functionally complete and fully integrated with the backend.

---

# Sprint 9 — Administration Module

**Status:** ✅ Completed

## Objectives

Develop a complete administration workspace for managing users, products, verification requests, and platform activity.

## Activities Completed

- Designed Admin Layout.
- Implemented protected admin routing.
- Developed administrator dashboard.
- Built product moderation tools.
- Created verification review workflow.
- Implemented user management.
- Developed platform analytics dashboard.
- Added account suspension.
- Added role promotion and demotion.
- Implemented soft product deletion.

## Features Completed

- Admin Dashboard
- Product Management
- Verification Review
- User Management
- Platform Analytics
- Product Featuring
- Soft Delete Products
- User Suspension
- User Reactivation
- Buyer ↔ Artist Role Management

## Challenges Encountered

### Product deletion conflicted with existing order records.

**Resolution**

Replaced permanent deletion with soft deletion using an availability flag.

---

### Artist verification required repeated submissions.

**Resolution**

Updated the verification workflow to support resubmission while preserving administrator feedback.

---

### Marketplace category filtering conflicted with Prisma enums.

**Resolution**

Mapped frontend display labels to backend enum values and synchronized homepage navigation with marketplace filters.

## Outcome

Palette now includes a fully functional administration module capable of managing users, products, verification requests, and platform activity.


# Sprint 10 — Buyer Commerce Module

**Status:** ✅ Completed

## Objectives

Develop a complete buyer purchasing workflow from cart creation to successful order completion.

## Activities Completed

- Connected shopping cart to backend.
- Implemented order creation.
- Developed checkout page.
- Added shipping information capture.
- Implemented order payment simulation.
- Added pending order management.
- Implemented inventory validation.
- Added automatic stock reduction.
- Developed marketplace cleanup service.
- Removed unavailable products from public listings.
- Cancelled conflicting pending orders automatically.

## Features Completed

- Shopping Cart
- Order Creation
- Checkout
- Shipping Information
- Pending Orders
- Delete Pending Orders
- Inventory Validation
- Automatic Stock Updates
- Marketplace Cleanup

## Challenges Encountered

### Product deletion conflicted with completed orders.

**Resolution**

Replaced permanent deletion with soft deletion and inventory-aware cleanup.

---

### Checkout transactions exceeded Prisma timeout.

**Resolution**

Refactored the checkout workflow into a single transactional process using shared transaction contexts.

---

### Preventing overselling while allowing multiple pending orders.

**Resolution**

Implemented inventory validation during payment rather than order creation, ensuring accurate stock management.

## Outcome

Palette now supports a complete commerce workflow with transactional inventory management and automatic marketplace synchronization.

## Sprint 11

Deployment

- Production Build
- Hosting
- Security Hardening
- Monitoring

---

# Lessons Learned

Throughout development, several principles have guided the project:

- Build reusable components.
- Prioritize clean architecture.
- Separate frontend and backend responsibilities.
- Document continuously.
- Test every completed feature.
- Avoid temporary implementations where possible.
- Keep the codebase maintainable and scalable.

These principles will continue guiding future development.

---

# Current Project Status

|

---

# Version History

| Version | Description |
|----------|-------------|
| 0.1 | Project Planning |
| 0.2 | Frontend Foundation |
| 0.3 | Backend Foundation |
| 0.4 | Authentication Backend |
| 0.5 | Frontend Authentication |
| 0.6 | Product Management |
| 0.7 | Artist Dashboard |
| 0.8 | Marketplace Integration |
| 0.9 | Cloudinary Image Uploads |
| 1.0 | Current Development Milestone |

---



**Document Version:** 1.0