# 🚌 Sahyadri Royal Travels (सह्याद्री रॉयल ट्रॅव्हल्स)
### Modern Luxury Bus Booking Platform for Maharashtra, India (Demo Web Application)

> **⚠️ DEMO DISCLAIMER:** This web application is an interactive prototype developed for demonstration and testing purposes. All bus schedules, seat bookings, PNRs, and payments are mock simulations. No real financial credentials are requested, no payment cards or bank accounts are debited, and no real transport tickets are issued.

---

## 🌟 Overview & Brand Identity

**Sahyadri Royal Travels** is a premier private bus travel operator headquartered in Pune, Maharashtra. This demo web platform delivers a responsive travel-booking experience tailored for commuters, families, and pilgrims traveling across key Maharashtra corridors such as **Pune ↔ Pandharpur (श्री विठ्ठल दर्शन)**, **Mumbai ↔ Pune Expressway**, **Pune ↔ Kolhapur**, and **Pune ↔ Shirdi**.

---

## 🚀 Key Features

### 1. Customer Booking Flow
1. **Home / Search Engine**:
   - Origin & Destination city selectors with 1-click swap (Pune, Pandharpur, Mumbai, Kolhapur, Shirdi, Mahabaleshwar, Solapur, Nashik, Sambhajinagar).
   - Date picker with quick shortcut chips: *Today*, *Tomorrow*, and *Day After*.
   - Passenger count selector (1 to 6).
   - 1-Click shortcuts for popular Maharashtra routes (e.g. *Pune → Pandharpur*, *Pandharpur → Pune*, *Mumbai → Pune*).
2. **Route & Bus Schedules**:
   - Realistic departure times, arrival times, duration, and fare per passenger in **INR (₹)**.
   - Live available seat count (out of 40 seats).
   - Bus types: *AC 2+2 Semi-Sleeper*, *BharatBenz Luxury Air-Suspension*, *Volvo Multi-Axle Luxury Coach*.
   - Filter by Bus Type & Time of Day (Morning, Night).
   - Sort by Departure Time (Early first), Price (Lowest/Highest), and Available Seats.
3. **40-Seat Visual Top-Down Bus Layout (1 to 40)**:
   - High-fidelity visual coach layout with **exactly 40 numbered passenger seats (1–40)**.
   - Realistic **2+2 layout** with central walkway aisle:
     - **Front Cabin**: Driver area on the right (Indian Right Hand Drive - RHD) with steering wheel and dashboard, passenger entry door on the left.
     - **Rows 1 to 9 (36 seats)**: Left Window, Left Aisle | Central Aisle | Right Aisle, Right Window.
     - **Row 10 (4 seats)**: Continuous rear bench across full width (Seats 37, 38, 39, 40).
   - Multi-state accessible indicators (colors + icons + text):
     - **Available**: White with slate border and position indicator (`W` = Window, `A` = Aisle, `C` = Center).
     - **Selected**: Saffron orange background with checkmark icon (`✓`).
     - **Booked**: Disabled slate background with lock icon.
   - Quick preference filters: *All (40)*, *Window (W)*, *Aisle (A)* to highlight preferred seats.
   - Live fare calculation: Base Fare × Seats + 5% GST = Total Payable.
4. **Passenger Details Form**:
   - Collects full passenger name, gender, age, 10-digit Indian mobile number (`^[6-9]\d{9}$`), and optional email.
   - Boarding and dropping point selectors with authentic landmarks (e.g., Swargate Gate 2, Dadar TT Circle, Pandharpur New Stand).
   - Demo promo codes with instant discounts (`MAHA50`, `SHIVNERI10`, `FIRSTTRIP`).
   - Summary of journey details and cancellation policy rules.
5. **Simulated Payment Gateway**:
   - Visual mock checkout supporting **UPI (Google Pay, PhonePe, Paytm, BHIM)** with QR code preview, **RuPay / Visa test cards**, and **Net Banking**.
   - Explicit action buttons:
     - **"Simulate Successful Payment"**: Triggers confetti, generates unique demo PNR, reserves seats in inventory, and opens E-Ticket.
     - **"Simulate Failed Payment"**: Displays realistic bank decline error and allows retry without losing selected seats or passenger data.
6. **Official E-Ticket / Boarding Pass**:
   - Unique demo PNR (`SRT-MH-XXXXX`).
   - Prominent watermark: `DEMO TICKET — NOT VALID FOR ACTUAL TRAVEL / प्रवासासाठी वैध नाही`.
   - Complete journey overview, bus number, conductor contact, assigned seats, and conductor QR code.
   - **Print / Save as PDF** via `window.print()` with dedicated `@media print` clean styling.
   - Copy ticket summary to clipboard and direct link to *My Bookings*.
7. **My Bookings & Cancellation Simulator**:
   - Search demo bookings by PNR or mobile number.
   - Filter by *All*, *Confirmed*, and *Cancelled*.
   - **Demo Cancellation Action**:
     - Calculates fee deductions (10% fee if >24 hrs prior to departure).
     - Simulates refund amount.
     - Confirmation step that **releases booked seats back to the bus schedule inventory** so they become immediately bookable again!

---

### 2. Admin Operations Dashboard
- **Demo Role Switcher**: Quick 1-click access to the admin dashboard (no misleading claims of production authentication).
- **Summary Metrics Cards**:
  - Total Demo Bookings & Confirmed Bookings count.
  - Total Seats Booked across the fleet.
  - Overall Fleet Occupancy Percentage (%).
  - Total Demo Gross Revenue in ₹.
- **Customer Bookings Manifest**:
  - Search by PNR, passenger name, route, or mobile.
  - Filter by booking status and travel date.
  - Live status updater (e.g. switch status between *CONFIRMED*, *COMPLETED*, *CANCELLED*).
  - Detailed passenger & payment inspection modal.
  - **Export to CSV**: Working download button that exports `sahyadri_bookings_export.csv`.
- **Bus Fleet & Schedule Manager**:
  - View all buses, departures, base fares, and seat occupancy.
  - **Add New Bus Schedule**: Modal form to add a new coach to the fleet.
  - **Quick Edit Schedule**: Modify base fare, departure time, and arrival time live.
- **Reset Demo Data**: 1-click restore to sample default schedules and bookings.

---

### 3. Extra Features & Brand Polish
- **Popular Maharashtra Corridors Section** with direct *Book Now* shortcuts.
- **Company Story & Milestones** (Operating since 2012, 45+ BharatBenz and Volvo buses, 98.4% on-time record).
- **Customer Reviews & Ratings** from verified travelers.
- **Interactive FAQ Accordion** covering luggage limits, child tickets, and boarding requirements.
- **Interactive WhatsApp Support Widget** with simulated live chat window.
- **Policies Modal**: Terms of carriage, cancellation slabs, and privacy disclosure.
- **Toast Notifications** for clear user feedback on all actions.

---

## 💻 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations / Delights**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Persistence**: Browser `localStorage` (schedules, seat occupancy, and demo bookings)

---

## 🛠️ How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended; tested on Node v24)
- npm (v9 or higher; tested on npm v11)

### Steps

1. **Clone or Navigate to the Project Directory**:
   ```bash
   cd e:\Startup_Based_Project\Bus_Ticket_Booking
   ```

2. **Install Dependencies** (if not already installed):
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 📱 Mobile-First Responsive Design

The interface is optimized for common Indian mobile screen resolutions (360px, 375px, 390px, 412px), tablets (768px), and desktops (1024px+):
- **Search bar** gracefully stacks vertically on smaller screens with full-width primary CTA.
- **40-Seat Bus Seating Map** is designed with compact padding and minimum 48px touch targets, fitting cleanly inside screens down to 360px with **zero horizontal page overflow**.
- **Admin tables** feature horizontal smooth scrolling with stacked mobile information cards.
- **Floating widgets** (WhatsApp and Toasts) stay neatly positioned without obscuring booking controls.

---

## 🔒 Demo Limitations & Future Production Integrations

This codebase is architected cleanly with modular contexts and handlers ready for enterprise backend integration:

| Component | Current Demo Implementation | Future Production Implementation |
|---|---|---|
| **Data Storage** | `localStorage` + React Context | PostgreSQL / MongoDB + Prisma ORM / Node.js Express API |
| **Authentication** | Demo role switch toggle | JWT / OAuth 2.0 / Clerk / NextAuth |
| **Payment Gateway** | Simulated UPI & Card sandbox modal | Razorpay / Cashfree / Stripe India Integration |
| **SMS & WhatsApp** | Local alert simulation | Twilio / Gupshup WhatsApp Business API |
| **Seat Locking** | Synchronous state lock | Redis distributed lock with 10-minute expiry |
| **PDF Generation** | Native `window.print()` with print CSS | Puppeteer / `@react-pdf/renderer` server generation |

---

*Sahyadri Royal Travels (सह्याद्री रॉयल ट्रॅव्हल्स) — Maharashtra Luxury & Pilgrim Bus Booking Demo*
#   B u s _ T i c k e t _ B o o k i n g - D E M O  
 