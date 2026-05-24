# Book Lesson Planner - Product Requirements Document

## Overview
A web app that helps users extract lesson plans from books. Users search for books, generate AI-powered lesson plans, track progress through modules, and save multiple books.

## Core Features

### 1. Book Search
- **Search bar** - User enters book title
- **Results display** - Shows book title, cover image, and summary
- **Search source** - Google Books API integration
- **Selection** - Click a book to proceed

### 2. Lesson Plan Generation
- **"Build Lesson Plan" button** - Triggered after book selection
- **Execution** - Uses `/book-lesson-plan` skill to generate step-by-step lesson
- **Format** - Structured into discrete modules (5-10 modules typical)
- **Display** - Shows all modules with content, progress indicators

### 3. Module Progress Tracking
- **Complete/Incomplete toggle** - Each module has a checkbox
- **Visual feedback** - Completed modules show checkmark, grayed out, or highlighted
- **Progress summary** - Show X/Y modules completed

### 4. Session Persistence
- **Automatic save** - Progress saved to browser (localStorage initially)
- **Session recovery** - Return to app, see previous book and progress
- **Multiple books** - Saved books list shows all books the user has started

### 5. Saved Books Library
- **List view** - Shows all books user is learning from
- **Quick access** - Click to resume a book
- **Status** - Show progress per book (e.g., "3/8 modules complete")
- **Remove** - Option to delete from saved list

## Non-Requirements
- User accounts/authentication (use session IDs for now)
- Advanced analytics
- Shareable lesson plans
- Export functionality

## Design
- White background, sleek and modern
- Responsive design (mobile-friendly)
- Clear typography and spacing
- Subtle color accents for progress indicators

## Tech Stack
- Frontend: React + Vite
- API: Google Books API for search
- State: React hooks + localStorage
- Skill integration: Direct fetch to `/book-lesson-plan` endpoint

## Success Criteria
- Book search works and returns results
- Lesson plan generates and displays correctly
- Module progress tracking persists across sessions
- Multiple books can be saved and resumed
- App is responsive and usable on mobile
