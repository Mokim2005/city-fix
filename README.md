# CityFix - Public Infrastructure Issue Reporting System

![Banner Image Placeholder](https://via.placeholder.com/1200x400?text=CityFix+-+Report+and+Resolve+Public+Issues)  
_A modern, responsive platform for citizens to report public infrastructure issues like potholes, broken streetlights, garbage overflow, and more. Empowering efficient municipal service delivery._

**Live Site URL:** [https://your-live-site-url.com](https://your-live-site-url.com) _(Replace with your actual deployed URL)_

**Admin Credentials**

- Email: `admin@cityfix.com`
- Password: `admin123` _(Replace with your actual admin password)_

## Key Features

- **Citizen Reporting**: Users can easily submit issues with title, description, category, location, and photos. Free users limited to 3 issues; premium users have unlimited submissions.
- **Upvote System**: Logged-in users can upvote issues once to highlight importance (cannot upvote own issues). Upvote count displayed on cards and details page.
- **Issue Boosting**: Pay 100৳ to boost an issue to High priority (via payment gateway). Boosted issues appear at the top.
- **Premium Subscription**: Citizens can subscribe for 1000৳ to become premium and remove issue submission limits.
- **Role-Based Dashboards**:
  - **Citizen Dashboard**: View my issues, report new ones, track stats, subscribe, and update profile.
  - **Staff Dashboard**: View and update only assigned issues, change status with automatic timeline updates.
  - **Admin Dashboard**: Manage all issues, assign staff, reject issues, manage users (block/unblock), add/update/delete staff, view all payments.
- **Issue Timeline**: Detailed read-only tracking of every action (reported, assigned, status changes, boosted, etc.) with timestamps and actor.
- **Responsive Design**: Fully mobile, tablet, and desktop friendly UI built with Tailwind CSS/DaisyUI.
- **Authentication**: Email/password login, Google Sign-in, and registration with photo upload (powered by Firebase Auth).
- **Data Management**: All data fetching with TanStack Query for optimal performance and caching. SweetAlert2/Toast notifications for all actions.
- **Search, Filter & Pagination**: Server-side search, filters (category, status, priority), and pagination on All Issues page.
- **Payment Integration**: SSLCommerz/Stripe for boosting issues and premium subscriptions.
- **Invoice Generation**: Downloadable PDF invoices for payments (via React-PDF).
- **Private Routes & Persistence**: Login persists on refresh; role-based access control with token verification.
- **Additional Enhancements**: Beautiful banner/slider, latest resolved issues section, how-it-works guide, 404 page, and more.

## Tech Stack

- **Frontend**: React.js, TanStack Query, Tailwind CSS, DaisyUI, SweetAlert2, React-PDF
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: Firebase Authentication
- **Deployment**: Client - [Firebase Hosting/Netlify/Vercel], Server - [Render/Vercel/Heroku]
- **Other**: Environment variables for secrets, Axios for API calls

## Installation & Setup (Local Development)

### Client

```bash
git clone https://github.com/yourusername/cityfix-client.git
cd cityfix-client
npm install
npm start
```
