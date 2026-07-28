# 🎨 Palette

> **Empowering Artists. Connecting Collectors.**

Palette is a full-stack digital marketplace that connects artists and collectors through a secure, modern, and intuitive platform. The application enables artists to showcase and sell creative works—including paintings, photography, digital art, fashion, and music—while allowing collectors to discover, purchase, and support creative talent.

The project is being developed as a modern web application using React for the frontend, Express.js for the backend, PostgreSQL for data persistence, and Prisma ORM for database management.

---

# Table of Contents

- Project Overview
- Objectives
- Key Features
- Technology Stack
- System Architecture
- Project Structure
- Installation Guide
- Environment Variables
- Database Setup
- Running the Application
- API Overview
- Current Development Status
- Roadmap
- Contributors
- License

---

# Project Overview

The creative industry has grown rapidly, yet many artists still struggle to reach buyers through accessible digital platforms. Existing marketplaces often prioritize large commercial sellers, charge high commissions, or fail to provide tools tailored to independent creators.

Palette addresses this challenge by providing a centralized marketplace where artists can:

- Create professional profiles
- Upload creative works
- Manage their portfolio
- Sell directly to collectors
- Build their reputation

Collectors can:

- Browse artwork
- Search by category
- Save favourites
- Purchase creative works
- Follow artists

The platform emphasizes simplicity, accessibility, and scalability while maintaining secure authentication and modern software engineering practices.

---

# Project Objectives

The primary objectives of Palette are:

- Build a secure online marketplace for creative works.
- Enable artists to manage and showcase their portfolios.
- Allow collectors to browse and purchase artwork seamlessly.
- Provide secure authentication and authorization.
- Maintain a scalable and maintainable system architecture.
- Demonstrate modern full-stack software engineering principles.

---

# Key Features

## Authentication

- User registration
- Secure login
- JWT authentication
- Password hashing using bcrypt
- Role-based access

### User Roles

- Collector (Buyer)
- Artist
- Administrator

---

## Marketplace

- Browse creative works
- Search functionality
- Category filtering
- Price sorting
- Rating sorting
- Product details

---

## Artist Module

- Artist profiles
- Featured artists
- Artist portfolios

---

## Wishlist

- Add/remove favourites
- Live wishlist counter
- Toast notifications

---

## Shopping Cart

- Add items
- Remove items
- Cart summary

*(Checkout functionality is under development.)*

---

## Responsive Design

- Desktop support
- Tablet support
- Mobile navigation drawer

---

# Technology Stack

## Frontend

- React
- React Router
- Tailwind CSS
- Framer Motion
- Lucide React
- React Hot Toast

## Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt
- Zod
- CORS

---

# System Architecture

```
                React Frontend
                       │
                       │ REST API
                       ▼
               Express Backend
                       │
                Prisma ORM
                       │
                 PostgreSQL
```

---

# Project Structure

```
Palette/

├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
├── docs/
├── README.md
└── CHANGELOG.md
```

---

# Installation Guide

## Clone the Repository

```bash
git clone <repository-url>
```

## Install Frontend

```bash
cd frontend
npm install
```

## Install Backend

```bash
cd backend
npm install
```

---

# Environment Variables

Backend `.env`

```env
DATABASE_URL=your_database_url

JWT_SECRET=your_secret_key

PORT=5000
```

---

# Database Setup

Run the initial migration.

```bash
npx prisma migrate dev
```

Generate Prisma Client.

```bash
npx prisma generate
```

---

# Running the Application

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

---

# Current API Endpoints

## Authentication

### Register

```
POST /api/auth/register
```

Creates a new user account.

---

### Login

```
POST /api/auth/login
```

Authenticates a user and returns a JWT.

---

### Profile

```
GET /api/users/profile
```

Returns the authenticated user's profile.

---

# Current Development Status

## Completed

- React application
- Tailwind CSS configuration
- Responsive UI
- Marketplace
- Artist profiles
- Wishlist
- Shopping cart interface
- Authentication UI
- Express backend
- PostgreSQL integration
- Prisma ORM
- User model
- Artist profile model
- Register API
- Login API
- JWT authentication
- Protected routes

---

## In Progress

- Frontend authentication integration
- Product CRUD
- Artist dashboard

---

## Planned

- Orders
- Reviews
- Payments
- Admin dashboard
- Notifications
- Image uploads
- Deployment

---

# Development Roadmap

## Phase 1

- Frontend foundation

✅ Complete

---

## Phase 2

- Backend foundation

✅ Complete

---

## Phase 3

- Authentication integration

🔄 In Progress

---

## Phase 4

Marketplace Management

Pending

---

## Phase 5

Orders & Payments

Pending

---

## Phase 6

Deployment

Pending

---

# Documentation

Project documentation is maintained under the `docs/` directory and includes:

- Software Requirements Specification (SRS)
- Software Design Document (SDD)
- API Documentation
- Database Design
- Developer Guide
- User Manual
- Test Plan
- Test Report
- Deployment Guide
- Maintenance Guide
- Architecture Decision Records
- Project Logbook

---

# Contributors

**Project Owners**

Keith Kibebe
Claire Nyuguto
Brandon Waiyaki



