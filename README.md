Markdown# CityFix - Public Infrastructure Issue Reporting System

**A modern, responsive full-stack platform that empowers citizens to report public infrastructure issues (potholes, broken streetlights, garbage overflow, water leakage, damaged footpaths, etc.) and enables efficient management by municipal staff and admins.**

**Live Site URL:**  https://city-fix-b6595.web.app  
**Backend API:** https://city-fix-server-green.vercel.app 

**Admin Credentials** (for demo/evaluation):

- Email: `asifs@gmail.com`
- Password: `000000`

## Key Features (10+ Highlights)

- **Citizen Issue Reporting**: Submit detailed reports with title, description, category, location, and multiple photo uploads. Free users limited to 3 issues; premium users unlimited.
- **Community Upvote System**: Logged-in users can upvote issues (once per issue, not own issues) to highlight urgency. Upvote counts displayed on cards and details pages with instant UI/DB updates.
- **Issue Priority Boost**: Pay ৳100 via SSLCommerz to boost an issue to High priority – boosted issues appear at the top with timeline entry.
- **Premium Subscription**: Pay ৳1000 for unlimited issue submissions, priority support, and premium badge.
- **Role-Based Dashboards**:
  - Citizen: Stats/charts, my issues (edit/delete if pending), report new issue, profile with subscription.
  - Staff: View/update only assigned issues, change status with automatic timeline updates.
  - Admin: Manage all issues (assign staff, reject), manage users/staff (block/unblock, CRUD staff), view payments.
- **Issue Timeline Tracking**: Read-only vertical timeline on details page showing full lifecycle (reported, assigned, status changes, boosted, etc.) with timestamps, actor, and colored badges.
- **All Issues Page**: Card view with search, server-side filters (category, status, priority), pagination, and upvote functionality.
- **Authentication & Security**: Email/password + Google Sign-In, photo upload on registration, persistent login on refresh, role-based private routes with JWT verification, blocked user restrictions.
- **Notifications & UX**: SweetAlert2/toasts for all actions (CRUD, login, payments), fully responsive design (mobile/tablet/desktop) with Tailwind CSS + DaisyUI.
- **Payments & Invoices**: SSLCommerz integration for boosts/subscriptions, downloadable PDF invoices (React-PDF) in profile and admin payments page.
- **Additional Enhancements**: Beautiful banner/slider, latest resolved issues section, "How It Works" guide, features section, custom 404 page, stats/charts in dashboards.

## Tech Stack

- **Frontend**: React.js, TanStack Query (for all data fetching/caching), Tailwind CSS, DaisyUI, SweetAlert2, React-PDF, Axios
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Authentication**: Firebase Authentication (Email/Password + Google)
- **Payments**: SSLCommerz
- **Deployment**: Client - Vercel/Netlify/Firebase Hosting | Server - Vercel
- **Other**: Environment variables for secrets, server-side search/filter/pagination, role middleware

## Installation (Local Development)

```bash
git clone https://github.com/yourusername/cityfix-client.git
cd cityfix-client
npm install
npm run dev
```
