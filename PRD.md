# Product Requirements Document: BookLearn

## Overview
BookLearn is a web application that helps users extract actionable lessons from books and create structured, step-by-step lesson plans. Users can search for books, generate AI-powered lesson plans, track progress, and maintain a personal library of books they're learning from.

## Product Vision
Enable readers to maximize learning from books by transforming content into interactive, trackable lesson modules with persistent progress tracking.

---

## 1. Core Features

### 1.1 Book Discovery & Search
**User Story:** As a user, I want to search for books and see key information so I can decide which book to learn from.

**Requirements:**
- Search box accepting book titles or authors
- Integration with book API (Google Books API or Open Library API)
- Results display:
  - Book cover image
  - Title
  - Author(s)
  - Publication year
  - Summary/description
  - "Build Lesson Plan" CTA button

**Success Criteria:**
- Search results return within 2 seconds
- At least 5 relevant results per search
- High-quality book cover images (90% availability)

### 1.2 Lesson Plan Generation
**User Story:** As a user, I want to generate a structured lesson plan from a book so I can learn systematically.

**Requirements:**
- "Build Lesson Plan" button triggers AI generation
- Uses `/book-lesson-plan` skill to generate content
- Lesson plan structure:
  - Title (auto-generated or editable)
  - Multiple modules (4-10 typically)
  - Each module contains:
    - Module title
    - Learning objectives (2-3 bullets)
    - Key concepts (3-5 bullets)
    - Estimated time to complete
    - Reflection question
- Real-time progress indicator while generating
- Generated plan saves automatically to user session

**Success Criteria:**
- Plan generation completes within 30 seconds
- Minimum 4 modules per lesson plan
- Clear, actionable learning objectives

### 1.3 Progress Tracking
**User Story:** As a learner, I want to track which modules I've completed so I can see my progress.

**Requirements:**
- Toggle buttons on each module:
  - "Mark Complete" / "Mark Incomplete"
- Visual progress indicator:
  - Module completion badge (checkmark)
  - Overall progress bar (X of Y modules completed)
  - Percentage display
- Progress persists on page refresh
- Completion status colors:
  - Incomplete: light gray
  - Complete: green/accent color
  - In-progress: optional mid-state

**Success Criteria:**
- Progress updates instantly
- Visual feedback is clear and intuitive
- 100% persistence across sessions

### 1.4 Saved Books Library
**User Story:** As a user, I want to save multiple books and manage my learning library.

**Requirements:**
- "Save Book" button on each book/lesson plan
- Saved Books section displays:
  - Book cover (thumbnail)
  - Title and author
  - Overall progress (X/Y modules completed)
  - Last accessed date
  - Delete/remove option
- Ability to resume reading/learning from saved list
- View all saved books on dashboard/home page
- Filtering/sorting options:
  - By date added
  - By progress (completed first, in-progress, not started)
  - By title (A-Z)

**Success Criteria:**
- Users can save unlimited books
- Quick access to resume learning
- Clear visual hierarchy of progress

### 1.5 Session Persistence
**User Story:** As a user, I want my progress saved automatically so I can return anytime.

**Requirements:**
- All data persists in browser (localStorage) or database
- Auto-save on every action:
  - Module completion toggle
  - New book saved
  - Settings changed
- Session recovery:
  - Auto-load last viewed lesson plan
  - Maintain scroll position (optional)
  - Show "last accessed" timestamp
- Data backup strategy for database option

**Success Criteria:**
- Zero data loss on page refresh
- Session loads within 1 second
- Graceful handling of corrupted data

---

## 2. User Experience

### 2.1 User Flows

**Flow 1: First-Time User**
1. Land on home page with search prompt
2. Enter book title → see results
3. Click book → view summary
4. Click "Build Lesson Plan" → wait for generation
5. See lesson plan with modules
6. Mark modules complete as they learn
7. Book auto-saves to library

**Flow 2: Returning User**
1. Land on home page
2. See saved books in library
3. Click book → resume where they left off
4. Continue marking modules complete

**Flow 3: Manage Library**
1. Navigate to "My Books" / library
2. View all saved books with progress
3. Sort/filter as needed
4. Click to resume or delete

---

## 3. Design Requirements

### 3.1 Visual Design
- **Background:** White/off-white (#FFFFFF or #F9F9F9)
- **Aesthetic:** Sleek, modern, minimal
- **Color Palette:**
  - Primary: Blue or teal accent
  - Success: Green (for completion)
  - Text: Dark gray (#333 or #444)
  - Borders: Light gray (#E0E0E0)
- **Typography:**
  - Clean sans-serif (system font or Inter/Poppins)
  - Clear hierarchy (H1, H2, body text, small labels)
- **Spacing:** Generous whitespace, 16px baseline grid
- **Components:**
  - Rounded cards (4-8px border-radius)
  - Subtle shadows for depth
  - Smooth transitions and animations

### 3.2 Layout
- **Desktop First Responsive Design**
- **Header:** Logo/title, search bar (on search page), user menu
- **Main Content Area:** Book results or lesson plan
- **Sidebar:** Saved books list (collapsible on mobile)
- **Mobile Optimization:** Stack layout, full-width cards, touch-friendly buttons

---

## 4. Technical Specifications

### 4.1 Technology Stack
- **Frontend:** React, Next.js (or similar)
- **Styling:** Tailwind CSS, shadcn/ui components
- **Data Persistence:** Browser localStorage (MVP) or PostgreSQL + API (scalable)
- **Book API:** Google Books API or Open Library API (free)
- **AI Lesson Plan:** Custom `/book-lesson-plan` skill integration
- **Deployment:** Vercel, Netlify, or similar

### 4.2 Data Models

**User Session**
```
{
  userId: string (generated or via auth)
  savedBooks: Book[]
  lastAccessedBook: string (bookId)
  createdAt: timestamp
  updatedAt: timestamp
}
```

**Book**
```
{
  id: string (ISBN or API ID)
  title: string
  author: string
  coverImage: string (URL)
  summary: string
  addedAt: timestamp
  lessonPlan: LessonPlan (optional)
}
```

**LessonPlan**
```
{
  id: string
  bookId: string
  title: string
  generatedAt: timestamp
  modules: Module[]
}
```

**Module**
```
{
  id: string
  title: string
  objectives: string[]
  keyConcepts: string[]
  estimatedTime: number (minutes)
  reflectionQuestion: string
  isCompleted: boolean
  completedAt: timestamp (optional)
}
```

---

## 5. Success Metrics

| Metric | Target | Timeline |
|--------|--------|----------|
| User session persistence | 100% | Day 1 |
| Lesson plan generation success | 95% | Week 1 |
| Search result quality | 4.5/5 avg relevance | Week 1 |
| Mobile responsiveness | All breakpoints work | Week 1 |
| Page load time | <2s | Week 1 |
| Users can save 5+ books | ✓ | MVP |
| Zero progress data loss | 100% | MVP |

---

## 6. MVP Scope

**In-Scope (Phase 1):**
- Book search with basic results
- Single lesson plan generation
- Module completion tracking
- Save 1-5 books
- localStorage persistence
- Responsive design
- Deployment

**Out-of-Scope (Future):**
- User authentication/multi-user
- Advanced filtering/search
- Export lesson plans (PDF/email)
- Social sharing
- Annotations/notes on modules
- Real-time collaboration
- Mobile app
- Dark mode

---

## 7. Project Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| Design & Setup | 1 day | Wireframes, component library |
| Frontend Build | 3-4 days | Search, lesson plan UI, styling |
| Integration | 1-2 days | Book API, lesson plan skill |
| Testing & Polish | 1 day | Cross-browser, mobile, edge cases |
| **Total** | **~1 week** | Deployed MVP |

---

## 8. Dependencies & Assumptions

**Dependencies:**
- Google Books API or Open Library API availability
- `/book-lesson-plan` skill functionality and prompt quality
- Browser localStorage support (all modern browsers)

**Assumptions:**
- Users have stable internet connection
- Book search API provides consistent results
- Lesson plan generation is deterministic enough for MVP
- No authentication needed for MVP (session-based only)

---

## 9. Open Questions

1. **Authentication:** Do you want user accounts, or is session-based OK for MVP?
2. **Data Persistence:** localStorage only, or should we add a backend database?
3. **Lesson Plan Format:** Any specific structure you prefer from the skill?
4. **Lesson Plan Customization:** Can users edit/modify generated plans?
5. **Sharing:** Should users be able to share lesson plans?
