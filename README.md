# SK Pro Beauty Hub & Makeover Studio

Full-stack beauty parlour website with React + Express + MongoDB + JWT auth.

## Run Locally

### Backend

1. Open `server/.env` and keep/update values.
2. Start backend:

```bash
cd server
npm install
npm run dev
```

### Frontend

1. Create `client/.env` from `client/.env.example`.
2. Start frontend:

```bash
cd client
npm install
npm run dev
```

## Features

- Premium black + gold responsive UI with Framer Motion animations
- SEO-focused pages and keyword routes:
  - `/beauty-parlour-shoolagiri`
  - `/bridal-makeup-shoolagiri`
  - `/hair-styling-shoolagiri`
- Booking form with validation, loading spinner, toast messages
- Duplicate slot prevention (same date + time blocked)
- Admin login with JWT and protected dashboard
- Admin bookings table with date sorting and delete action
- WhatsApp floating button, schema markup, robots and sitemap

## API Endpoints

- `POST /api/auth/login` - Admin login
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Admin only
- `DELETE /api/bookings/:id` - Admin only

## Deployment

### Frontend (Vercel)

- Import `client` folder in Vercel
- Add env: `VITE_API_URL=https://your-backend-domain/api`
- Keep `vercel.json` rewrite for SPA routes

### Backend (Render/Railway)

- Import `server` folder
- Build command: `npm install`
- Start command: `npm start`
- Add environment variables from `server/.env.example`

