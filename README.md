# Sarkari Scan – Web Portal

A modern SSR web portal for discovering and browsing Indian government job (Sarkari Naukri) notifications — built with Next.js 15, TypeScript, and Tailwind CSS v4.

## Overview

Sarkari Scan helps millions of job seekers find relevant government job opportunities across India. This web portal serves as the SEO-optimised companion to our Android app, providing:

- **Real-time job listings** via a Node.js backend API
- **SEO-friendly job detail pages** with Google Jobs structured data (JSON-LD)
- **Category-based browsing** — Railway, Bank, SSC, UPSC, Defence, Teaching, Police jobs
- **Fast Server-Side Rendering** for optimal indexing and performance
- **Automatic sitemap & robots.txt** generation

## Architecture

```
[Job Scraper Microservice]
        │ normalises raw job data
        ▼
[Node.js Backend API]  ◄──── [Sarkari Scan Web (this repo)]
        │                              │
        │                             SSR + SEO category pages
        ▼                              │
   MongoDB                       [Android App]
                                  (full eligibility-check features)
```

## Tech Stack

- **Framework**: Next.js 15 (App Router, SSR)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Inter + Poppins (Google Fonts)
- **Deployment**: Any Node.js host (standalone output)

## Getting Started

### Prerequisites

- Node.js 20+
- A running instance of the Sarkari Scan backend API

### Setup

```bash
# Clone and install dependencies
git clone <repo-url>
cd sarkari-scan-prototype
npm install

# Configure environment variables
cp .env.example .env
# Edit .env and set NEXT_PUBLIC_API_URL to your backend URL

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata, Header/Footer
│   ├── page.tsx            # Home page — job listings + search
│   ├── globals.css         # Design tokens, animations, utilities
│   ├── jobs/[slug]/        # Dynamic job detail pages (SSR)
│   ├── sarkari-naukri/     # SEO category pages
│   ├── government-jobs/
│   ├── railway-jobs/
│   ├── bank-jobs/
│   ├── ... (more categories)
│   ├── sitemap.ts          # Auto-generated sitemap.xml
│   └── robots.ts           # robots.txt
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── JobCard.tsx
│   ├── SearchBar.tsx
│   ├── CategoryGrid.tsx
│   └── HomePageClient.tsx  # Client-side search/filter state
└── lib/
    └── api.ts             # API client, TypeScript types, utilities
```

## Android App

The full-featured Android app (on Google Play) includes eligibility checking — enter your age, education & category and instantly see which of 1000+ government jobs you can apply for.

[Download on Google Play →](https://play.google.com/store/apps/details?id=com.sarkariscan)
