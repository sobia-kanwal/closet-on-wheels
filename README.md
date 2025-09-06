# Closet on Wheels

An e-commerce rental marketplace for Pakistan where users can browse, wishlist, and rent products across categories like Fashion, Home Items, and Events. Lenders can list items for rent, and admins can review products.

## Features
- **Browse & Search**: Category pages and product detail pages.
- **Wishlist & Cart**: Persistent wishlist and cart with counts in header.
- **Rentals & Checkout**: Stripe-powered checkout and order confirmation.
- **User Accounts**: Sign up/login, profile, and order history.
- **Lender Tools**: Apply to become a lender and manage listings.
- **Admin Review**: Admin-only product review dashboard.
- **Responsive UI**: Tailwind CSS with clean, mobile-first design.

## Tech Stack
- **Frontend**: Next.js 13, React 18, Tailwind CSS
- **Auth**: next-auth / custom auth
- **Payments**: Stripe
- **Database**: MongoDB with Mongoose
- **State**: React Context (AuthContext, CartContext)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env.local` file with the required variables (examples below).
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000

## Environment Variables (.env.local)
Set the following keys as applicable:

- MongoDB
  - MONGODB_URI=mongodb+srv://...
- Auth/JWT
  - JWT_SECRET=your_jwt_secret
- NextAuth (if used)
  - NEXTAUTH_URL=http://localhost:3000
  - NEXTAUTH_SECRET=your_nextauth_secret
- Stripe
  - STRIPE_PUBLIC_KEY=pk_test_...
  - STRIPE_SECRET_KEY=sk_test_...
  - STRIPE_WEBHOOK_SECRET=whsec_...

Note: Keep secrets out of version control.

## Scripts
- `npm run dev` — start development server
- `npm run build` — build for production
- `npm run start` — start production server
- `npm run lint` — lint code

## Project Structure (high level)
- `/pages` — Next.js pages (routes, API endpoints)
- `/components` — UI components (Header, ProductGrid, etc.)
- `/context` — React Context (Auth, Cart)
- `/models` — Mongoose models (User, Product, Order)
- `/lib` — DB helpers (Mongo connection)
- `/utils` — Utilities (encryption, database helpers)
- `/styles` — Global CSS and Tailwind config
- `/public` — Static assets

## Development Notes
- Ensure MongoDB is reachable and env vars are set before running.
- Update Tailwind styles in `tailwind.config.js` and `styles/globals.css`.
- Stripe requires valid keys; use test mode for local dev.

## License
Proprietary. All rights reserved.
