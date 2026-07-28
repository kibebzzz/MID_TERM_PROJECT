# Contributing to Palette

Thank you for contributing to Palette.

This document outlines the project's development standards and workflow.

---

# Development Workflow

Every feature follows the same lifecycle:

1. Plan
2. Develop
3. Test
4. Document
5. Commit
6. Push

A feature is **not considered complete** until all six stages have been completed.

---

# Branch Naming Convention

Use descriptive branch names.

Examples:

feature/authentication

feature/products

feature/orders

feature/payments

feature/artist-dashboard

fix/navbar

fix/search

docs/readme

refactor/auth-service

---

# Commit Message Convention

Use conventional commit messages.

Examples:

feat: implement JWT authentication

feat: add artist profile page

fix: resolve marketplace sorting bug

refactor: simplify authentication service

docs: update API documentation

style: improve responsive navbar

test: add authentication endpoint tests

---

# Coding Standards

## General

- Write readable code.
- Keep functions focused.
- Avoid duplicate logic.
- Use descriptive variable names.
- Prefer reusable components.

---

## Frontend

- Functional React components
- Hooks over class components
- Tailwind CSS for styling
- Keep components modular

---

## Backend

- RESTful API design
- Separate routes, controllers and services
- Validate requests
- Handle errors consistently

---

## Database

- Prisma migrations only
- No manual schema modifications
- Maintain referential integrity

---

# Documentation

Every completed feature must include:

- Code
- Testing
- Documentation updates
- Changelog entry

---

# Pull Request Checklist

Before merging:

- Code compiles
- Tests pass
- Documentation updated
- No console errors
- No unused code
- Feature verified