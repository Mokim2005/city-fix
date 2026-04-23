# City Fix Project - Complete Technical Documentation

## Project Overview
City Fix is a civic issue reporting and management platform where users can report city problems (roads, electricity, water, garbage, sanitation), upvote issues, and track progress. The system has three user roles: User, Staff, and Admin.

---

## Technology Stack

### Frontend
- **React** - UI Framework
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animations and transitions
- **GSAP (GreenSock)** - Advanced animations with ScrollTrigger
- **React Hook Form** - Form handling
- **TanStack Query (React Query)** - Server state management
- **Axios** - HTTP client
- **SweetAlert2** - Beautiful alerts/modals
- **Firebase** - Authentication (Google, Email/Password)
- **React Icons** - Icon library

### Backend (city-fix-server)
- **Express.js** - Node.js framework
- **MongoDB** - Database
- **Stripe** - Payment processing
- **Firebase Admin SDK** - Server-side authentication

---

## Route Structure

### Public Routes

#### 1. `/` - Home Page
- **Location**: `src/Pages/Home.jsx`
- **Purpose**: Landing page displaying city-related content
- **Components Used**:
  - BannerSlider
  - Banner
  - ExploreBanner
  - BannerReport
  - LatestResolvedIssues
- **Animations**: GSAP and Framer Motion for background effects
- **Access**: Public, no authentication required

#### 2. `/login` - Login Page
- **Location**: `src/Pages/Auth/Login.jsx`
- **Purpose**: User authentication with email/password
- **Features**:
  - Email/password login
  - Password visibility toggle
  - Social login options (Google)
  - Redirect to previous page after login
- **Form Validation**: React Hook Form
- **Access**: Public (redirects to home if already logged in)

#### 3. `/register` - Registration Page
- **Location**: `src/Pages/Auth/Register.jsx`
- **Purpose**: New user registration
- **Features**:
  - Name input
  - Photo upload (stored in ImgBB)
  - Email/password registration
  - Password validation (uppercase, lowercase, number, special character)
  - Auto-creates user record in database
- **Form Validation**: React Hook Form with strong password requirements
- **Access**: Public

### Protected Routes (Requires Login)

#### 4. `/all-issus` - All Issues Page
- **Location**: `src/Pages/AllIssus.jsx`
- **Purpose**: Display all reported issues with filtering and search
- **Features**:
  - Search by issue title
  - Filter by category (Road, Electricity, Water, Garbage, Sanitation, Other)
  - Filter by status (Pending, In Progress, Resolved)
  - Filter by priority (High, Normal)
  - Pagination (9 items per page)
  - Upvote system (users can upvote issues, cannot upvote own issues)
  - GSAP scroll-triggered animations for cards
  - Framer Motion for page transitions
- **Data Fetching**: TanStack Query (React Query)
- **Access**: Requires authentication

#### 5. `/issus-form` - Report Issue Form
- **Location**: `src/Pages/IssusFrom.jsx`
- **Purpose**: Submit new city issues
- **Features**:
  - Issue title input
  - Category selection (Road, Electricity, Water, Garbage, Sanitation, Other)
  - Location input
  - Description textarea
  - Image upload (stored in ImgBB)
  - Framer Motion animations for background orbs
  - Success confirmation with navigation
- **Form Handling**: React Hook Form
- **Image Hosting**: ImgBB API
- **Access**: Requires authentication

#### 6. `/Issus-details/:id` - Issue Details Page
- **Location**: `src/Pages/IssusDetails.jsx`
- **Purpose**: Display single issue full details
- **Features**:
  - Issue image display
  - Full description
  - Category, location, status, priority, upvotes info
  - Timeline of updates
  - Edit issue (if owner and pending)
  - Delete issue (if owner)
  - Boost priority (100 BDT payment) - only for Normal priority
- **Animations**: Framer Motion for smooth transitions
- **Payment Integration**: Stripe for priority boost
- **Access**: Requires authentication

### Dashboard Routes (`/dashboard/*`)

#### 7. `/dashboard` - Dashboard Home (Role-based)
- **Location**: `src/Pages/Dashboard/DashboardHome/DashboardHome.jsx`
- **Purpose**: Redirects to role-specific dashboard
- **Logic**:
  - Checks user role using `UseRole` hook
  - Admin → AdminDashboardHome
  - Staff → StafDashboardHome
  - User → UserDashboardHome
- **Access**: Requires authentication

---

## Dashboard: User Role Pages

#### 8. `/dashboard/my-issus` - My Issues
- **Location**: `src/Pages/Dashboard/MyIssus.jsx`
- **Purpose**: View and manage user's own reported issues
- **Features**:
  - List all issues reported by logged-in user
  - Filter by status (All, Pending, In Progress, Resolved)
  - Edit issue (title, description, location, category) - only for pending issues
  - Delete issue
  - View issue details
  - Framer Motion table animations
  - Modal-based inline editing
- **Data Fetching**: TanStack Query with user email filter
- **Access**: User role only

#### 9. `/dashboard/my-profile` - My Profile
- **Location**: `src/Pages/Dashboard/MyProfile.jsx`
- **Purpose**: Display and manage user profile
- **Access**: User role only

#### 10. `/dashboard/payment` - Premium Subscription
- **Location**: `src/Pages/Dashboard/Payment.jsx`
- **Purpose**: Subscribe to premium plan (1000 BDT one-time)
- **Features**:
  - Check if user is already premium
  - Stripe checkout integration
  - Loading state during payment processing
- **Payment Amount**: 1000 BDT
- **Access**: User role only

#### 11. `/dashboard/payment-success` - Payment Success
- **Location**: `src/Pages/Dashboard/PaymentSuccess.jsx`
- **Purpose**: Confirmation page after successful payment

#### 12. `/dashboard/payment-cancelled` - Payment Cancelled
- **Location**: `src/Pages/Dashboard/PaymentCanceld.jsx`
- **Purpose**: Page shown when payment is cancelled

---

## Dashboard: Admin Role Pages

#### 13. `/dashboard/user-management` - User Management
- **Location**: `src/Pages/Dashboard/Admin/UserManagement.jsx`
- **Purpose**: Manage user roles (make admin/remove admin)
- **Features**:
  - List all users with search
  - Pagination (10 per page)
  - Make user admin button
  - Remove admin role button
  - Framer Motion row animations
- **Access**: Admin role only

#### 14. `/dashboard/all-issus-table` - All Issues Table (Admin)
- **Location**: `src/Pages/Dashboard/Admin/AllIssusTable.jsx`
- **Purpose**: Admin view of all issues with management options
- **Features**:
  - Table view of all issues
  - Sort by priority (High first) and date (newest first)
  - Pagination (10 per page)
  - Assign staff to issues
  - Reject pending issues
  - Modal for staff assignment
- **Mutations**: TanStack Query mutations for assign/reject
- **Access**: Admin role only

#### 15. `/dashboard/user-block-manage` - User Block Management
- **Location**: `src/Pages/Dashboard/Admin/UserBlockManage.jsx`
- **Purpose**: Block/unblock users
- **Features**:
  - List all users
  - Show subscription status (Premium/Free)
  - Show block status (Active/Blocked)
  - Block/unblock buttons
  - Pagination (10 per page)
- **Access**: Admin role only

#### 16. `/dashboard/manage-staff` - Manage Staff
- **Location**: `src/Pages/Dashboard/Admin/ManageStaff.jsx`
- **Purpose**: Add, update, delete staff members
- **Features**:
  - List all staff members
  - Add new staff modal
  - Update staff modal
  - Delete staff
  - Framer Motion animations
- **Access**: Admin role only

#### 17. `/dashboard/view-payments` - View Payments
- **Location**: `src/Pages/Dashboard/Admin/ViewPayment.jsx`
- **Purpose**: View all payment transactions
- **Features**:
  - Total revenue display
  - Filter by payment type (Subscription/Boost)
  - Filter by month
  - Desktop table view
  - Mobile card view
  - PDF receipt download (jsPDF + html2canvas)
  - Inline-styled receipt template for PDF generation
- **Libraries**: jsPDF, html2canvas, date-fns
- **Access**: Admin role only

---

## Dashboard: Staff Role Pages

#### 18. `/dashboard/assigned-issues` - Assigned Issues (Staff)
- **Location**: `src/Pages/Dashboard/Staff/AssignedIssues.jsx`
- **Purpose**: Staff views and updates assigned issues
- **Features**:
  - List issues assigned to logged-in staff
  - Filter by status
  - Filter by priority
  - Sort by priority (High first) and date
  - Update issue status through dropdown
  - Status flow: Pending/Assigned → In Progress → Working → Resolved → Closed
- **Access**: Staff role only

---

## Layout Structure

### RootLayout
- **Location**: `src/Layout/RootLayout.jsx`
- **Purpose**: Main public layout with navigation
- **Components**: Navbar, Footer, Outlet

### AuthLayout
- **Location**: `src/Layout/AuthLayout.jsx`
- **Purpose**: Authentication pages layout (login/register)
- **Components**: Outlet only

### DashboardLayout
- **Location**: `src/Layout/DashboardLayout.jsx`
- **Purpose**: Dashboard with sidebar navigation
- **Features**:
  - Role-based sidebar menu
  - GSAP logo animation on load
  - Animated background orbs
  - Mobile-responsive drawer
  - Links: Dashboard Home, All Issues (Admin), Manage Staff (Admin), My Issues (User)
- **Animations**: GSAP for sidebar, Framer Motion for background

---

## Security & Guards

### Private Routes (PrivetRouts.jsx)
- **Location**: `src/Routs/PrivetRouts.jsx`
- **Purpose**: Protect routes requiring authentication
- **Logic**: Checks if user is logged in, otherwise redirects to login

### Admin Routes (AdminRouts.jsx)
- **Location**: `src/Routs/AdminRouts.jsx`
- **Purpose**: Protect admin-only routes
- **Logic**: Checks if user has admin role

### Staff Routes (StaffRouts.jsx)
- **Location**: `src/Routs/StaffRouts.jsx`
- **Purpose**: Protect staff-only routes
- **Logic**: Checks if user has staff role

---

## Custom Hooks

1. **UseAxiosSecure** (`src/Hooks/UseAxiosSecure.jsx`)
   - Pre-configured Axios instance with interceptors
   - Attaches Firebase ID token to requests

2. **UserAuth** (`src/Hooks/UserAuth.jsx`)
   - Provides authentication context (signIn, register, logout, user info)

3. **UseRole** (`src/Hooks/UseRole.jsx`)
   - Fetches and caches user role from database
   - Returns: role, roleLoading

---

## Animation Summary

### Framer Motion Usage:
- Page transitions
- Button hover/tap effects
- Modal animations
- Table row animations
- Background orbs animation

### GSAP Usage:
- ScrollTrigger for scroll-based animations
- Header entrance animations
- Card entrance animations with stagger
- Logo scale/rotate animation in sidebar

---

## Payment Flow

### Subscription (1000 BDT):
1. User visits `/dashboard/payment`
2. Clicks "Pay Now"
3. Backend creates Stripe checkout session
4. User redirected to Stripe
5. On success → `/dashboard/payment-success`
6. On cancel → `/dashboard/payment-cancelled`

### Issue Boost (100 BDT):
1. User views issue details
2. Clicks "Boost Priority" (only for Normal priority)
3. Backend creates Stripe checkout session with issueId
4. User redirected to Stripe
5. On success, issue priority changes to "High"

---

## Summary Table

| Route | Page | Role Required | Key Features |
|-------|------|---------------|--------------|
| `/` | Home | Public | Landing page with components |
| `/login` | Login | Public | Email/Social login |
| `/register` | Register | Public | User registration with photo |
| `/all-issus` | All Issues | User | Search, filter, upvote, pagination |
| `/issus-form` | Issue Form | User | Submit new issue with image |
| `/Issus-details/:id` | Issue Details | User | View, edit, delete, boost |
| `/dashboard` | Dashboard Home | All | Role-based redirect |
| `/dashboard/my-issus` | My Issues | User | Manage own issues |
| `/dashboard/payment` | Payment | User | Subscribe to premium |
| `/dashboard/user-management` | User Management | Admin | Make/remove admin |
| `/dashboard/all-issus-table` | All Issues Table | Admin | Assign staff, reject issues |
| `/dashboard/user-block-manage` | User Block | Admin | Block/unblock users |
| `/dashboard/manage-staff` | Manage Staff | Admin | Add/update/delete staff |
| `/dashboard/view-payments` | View Payments | Admin | View transactions, download PDF |
| `/dashboard/assigned-issues` | Assigned Issues | Staff | Update issue status |

---

## File Structure Summary

```
city-fix/src/
├── Components/          # Reusable UI components
├── Context/            # React Context (Auth)
├── Firebase/           # Firebase initialization
├── Hooks/              # Custom hooks (UseAxiosSecure, UserAuth, UseRole)
├── Layout/             # Layout components (Root, Auth, Dashboard)
├── Pages/              # Page components
│   ├── Auth/           # Login, Register, SocialLogin
│   ├── Dashboard/      # Dashboard pages
│   │   ├── Admin/      # Admin-specific pages
│   │   ├── Staff/      # Staff-specific pages
│   │   └── DashboardHome/  # Role-based home pages
│   └── *.jsx           # Public pages
├── Routs/              # Route guards (Private, Admin, Staff)
├── Router/             # Main router configuration
└── main.jsx            # App entry point
```