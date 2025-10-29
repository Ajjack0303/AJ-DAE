# learning/PLAN.md

> This is my one-page learning plan for the month. I will complete and commit this file during the 15-minute selection clinic. It records the technology I chose to learn, why I chose it for my capstone, the three focused tasks I will complete, and the proof I will capture to show I did the work.

---

## Student commitment

-   **Name: Altolane Jackson**
-   **Date created:** 2025-10-27

I commit to treat this plan as my personal roadmap: I will keep dates realistic, finish each small task, capture evidence of success, and update this file if anything changes.

---

## Chosen technology

-   **Technology name: Next.js API Routes + Prisma + Stripe Connect**
-   **Technology version (if applicable): Next.js 14, Prisma 5.6, Stripe API 2024-06-20**

### Why I chose this technology

I chose this technology to implement a fully functional backend for InkConnect. It will allow me to build database-backed API endpoints for artist bookings, payments, messages, and analytics, and integrate Stripe Connect for real payment flows.

---

## First-day actions (complete in the 15-minute selection clinic)

1. Finalize the **Chosen technology** and **Why I chose this technology** fields above.
2. Draft three small integration tasks below with realistic start and target completion dates.
3. Commit this file to the repository at `learning/PLAN.md` before the end of the 15-minute clinic.
4. Record where I will start Task 1 (for example: local branch name or workspace folder) under Task 1.
5. If a task feels too large, I will make it smaller and update the dates here.

---

## My three integration tasks (small, testable, dated)

**Task 1 — Title: Create Bookings API Endpoint**

-   **Description:** Implement GET /api/bookings and POST /api/bookings using Prisma models and Next.js API routes.
-   **Start date:** 2025-10-27
-   **Target completion date:** 2025-10-29
-   **Success criterion (explicit):** Endpoint successfully retrieves and creates bookings in the database; verified using Postman or curl.
-   **Proof method (what I will capture to show success):** Screenshot of successful GET and POST responses; curl commands and returned JSON logged in `learning/README.md`.
-   **Where I will start Task 1:** local branch `feature/bookings-api`

**Task 2 — Title: Stripe Connect Integration**

-   **Description:** Add POST /api/payments/connect and webhook endpoint to enable artist onboarding and test payments via Stripe Connect.
-   **Start date:** 2025-10-30
-   **Target completion date:** 2025-11-03
-   **Success criterion (explicit):** Stripe Connect accounts are successfully created in test mode; webhook triggers update a Payment record in DB.
-   **Proof method (what I will capture to show success):** Screenshot of Stripe test account creation and database update; terminal log of webhook receipt saved in `learning/README.md`.
-   **Where I will start Task 2:** local branch `feature/stripe-connect`

**Task 3 — Title: Messages & Analytics API**

-   **Description:** Implement GET /api/messages and add simple analytics endpoint counting bookings per artist.
-   **Start date:** 2025-11-04
-   **Target completion date:** 2025-11-08
-   **Success criterion (explicit):** API returns message list per artist and aggregated booking counts; verified via Postman/curl.
-   **Proof method (what I will capture to show success):** Screenshot of responses; short code snippet and output logged in `learning/README.md`.
-   **Where I will start Task 3:** local branch `feature/messages-analytics`

---

## Risks, assumptions, and blockers (one-line each)

-   Requires PostgreSQL database access locally or remotely.
-   Needs Stripe test account for Connect integration.
-   Depends on Prisma schema and models being up-to-date with current backend.

---

## My weekly timeline (one-line plan)

-   **Week 1:** Commit this PLAN and start Task 1.
-   **Week 2:** Continue Task 1; produce a draft PR or demo; start Task 2.
-   **Week 3:** Continue Task 2; add tests/logging and peer review; start Task 3.
-   **Week 4:** Finalize PR(s) or demo(s); draft `learning/README.md` and `learning/REFLECTION.md`.

I will replace the above with exact dates in the tasks section once I finalize them.

---
