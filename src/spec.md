# Specification

## Summary
**Goal:** Build a trust-focused, mobile-first KR Staffing job portal with public job browsing and an admin interface to manage jobs and view contact inquiries.

**Planned changes:**
- Apply a consistent mobile-first theme (white background, red primary accent, neutral grays, modern typography, accessible contrast) across all pages/components.
- Add a responsive header/navigation with logo and links: Home, Jobs, Categories, About Us, Contact Us, Apply Now, plus optional Login/Register entry points.
- Build the homepage sections: Hero (keyword + city search → Jobs), Popular Job Searches, Popular Job Categories, Featured Jobs (cards + Load More), Why Choose KR Staffing, Testimonials, Contact (WhatsApp button + contact form), and Footer (About, links, Privacy Policy, Terms, copyright).
- Implement Jobs listing with keyword/city/category filtering, job cards (title, location, company, Apply Now), and Load More pagination with loading/empty/error states.
- Implement Categories page with the provided categories and navigation to Jobs filtered by selected category.
- Add About Us, Contact Us, Privacy Policy, and Terms & Conditions pages with simple, trust-building English copy.
- Implement Apply Now to open a configurable Google Form URL in a new tab (optionally with prefilled job title/city when supported).
- Add configurable WhatsApp click-to-chat and configurable Instagram/WhatsApp channel links (single frontend config location); include prominent WhatsApp support button (and optionally a floating button).
- Create backend job data model + APIs for create/update/list/search (pagination; filter by keyword, city, category) and seed with example jobs.
- Add admin job management UI gated by Internet Identity with backend allowlist of admin principals (admin can add/edit jobs).
- Implement contact form submission to backend storage and provide an admin read-only inquiries list.
- Add static asset handling for generated logo + favicon and reference them from `frontend/public/assets/generated`.

**User-visible outcome:** Visitors can browse and filter KR Staffing jobs on mobile/desktop, load more results, and apply via a Google Form link; users can contact support via WhatsApp or a contact form; admins can log in to add/edit jobs and review submitted inquiries.
