System Architecture & Technical Specification: SovraEquitara
1. Platform Overview

Core Function: Civic tech platform for reporting infrastructure issues (e.g., broken roads, broken streetlights).

Key Feature: Gamification & Leaderboard system to incentivize active citizens.

Tech Stack:

Frontend: Astro + React (Island Architecture), Tailwind CSS (Clean Glassmorphism).

Backend: Golang (Gin/Fiber framework) for high-performance API.

Database: PostgreSQL (with PostGIS for mapping).

AI Integration: Hybrid (Local Ollama for privacy/cost-saving + External API if needed).

2. User Flow & Gamification Logic (State Machine)

Step 1 (Input): User submits a report via the Astro frontend containing: Details, optional phone number, and Map Location (Lat/Lng). Default status: PENDING.

Step 2 (Validation & Point Tier 1): Admin reviews in the dashboard. Admin clicks "Setujui/Valid". Status changes to VALID. Backend (Golang) automatically awards Base Points (e.g., +10 points) to the user.

Step 3 (Resolution & Point Tier 2): Issue is fixed in the real world. Admin clicks "Selesai/Resolved". Status changes to RESOLVED. Backend awards Bonus Points (e.g., +50 points) to the user for a highly impactful report.

Leaderboard: Frontend fetches top users based on accumulated points to display a public ranking.

3. AI Features (Admin Dashboard Focused)

The AI operates strictly in the Admin Dashboard to reduce cognitive load.

Auto-Summarization: AI reads long, messy user reports and provides a 1-sentence TL;DR for the admin.

Duplicate Detection: AI checks if a new report matches the location and description of an existing PENDING or VALID report.

Priority Suggestion: AI suggests an urgency level based on the report text (e.g., "lubang besar di tengah jalan raya" = High Priority).

4. UI/UX Design Guidelines (For AI Designer/Coder)

Mobile-First Approach: The public reporting page must be hyper-optimized for mobile (Astro static generation for speed), using a clean Bento Grid layout.

Admin Dashboard: Desktop-optimized, data-dense but clean. Needs clear action buttons for "Verify" and "Mark Resolved".

Component Integration:

Map selection UI (React-Leaflet/Mapbox).

AI Suggestion Card (Floating or highlighted box next to the report details).

Leaderboard Component (Top 10 users with gamified UI like badges/medals).