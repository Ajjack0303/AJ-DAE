# InkConnect Master Checklist

This checklist tracks all tasks for the InkConnect project, including frontend (NextJS 1), backend (Node/Express), and PostgreSQL 1.

---

## 1. Frontend (NextJS 1)

### Project Initialization
- [x] Run `npx create-next-app@latest inkconnect-frontend`
- [x] Verify default folder structure (`app`, `pages`, `public`, `styles`)
- [x] Start dev server: `npm run dev`

### Pages
- [x] Home page (`/`) with welcome text
- [x] About page (`/about`) with reusable component (`Card`)
- [x] Dynamic user page (`/users/[id]`) using `useParams`  
      - [x] Add `"use client";` at top
- [x] Static Site Generation (SSG) page (`/ssg`) using `dynamic = "force-static"`

### Components
- [x] Create `components/Card.tsx` reusable component
- [x] Integrate Card in About page

### API Integration
- [x] Create `/api-test` page that fetches from backend
- [x] Verify backend API connection

### Styling
- [x] Apply Tailwind CSS classes
- [x] Ensure text and backgrounds are readable (e.g., API test box)

---

## 2. Backend (Node/Express)

### Server Setup
- [x] Create `backend/server.js`
- [x] Configure Express server
- [x] Load `.env` variables
- [x] Define root route `/` returning `"InkConnect API running"`

### Middleware
- [x] Add CORS support
- [x] Add JSON body parsing

### Routes
- [x] Test `/` root route
- [ ] Add `/clients` CRUD routes
- [ ] Add `/bookings` CRUD routes
- [ ] Add `/users` CRUD routes

---

## 3. PostgreSQL 1

### Database
- [x] Create PostgreSQL database
- [x] Connect backend to PostgreSQL

### Schema Design
- [ ] Define tables with columns, data types, primary keys
- [ ] Define relationships between tables

### Data Operations
- [ ] Insert sample data
- [ ] Retrieve data using SELECT queries

### Query Features
- [ ] Filter/sort data
- [ ] Execute JOIN queries

---

## 4. Integration

- [x] Ensure backend running at `http://localhost:5000`
- [x] Set `NEXT_PUBLIC_API_URL` in `.env.local`
- [x] Verify `/api-test` fetches data successfully
- [ ] Link frontend dynamic pages to real backend data
- [ ] Link SSG pages to pre-fetched backend data
