# Tasks: D-GIS Landing Page

**Input**: Design documents from `/specs/001-landing-page/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Testing**: This project follows a zero-testing mandate. NO automated tests should be included unless explicitly requested. Focus on manual validation and user feedback.

**Organization**: Tasks are grouped by user story to enable independent implementation and manual validation of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **D-GIS Component Library**: `src/` at repository root (React components)
  - `src/components/` - Component categories (ui/, landing/, theme/)
  - `src/lib/` - Utilities and shared code
  - `src/hooks/` - Custom React hooks
  - `src/styles/` - Tailwind customizations
- **Registry**: Component registry with shadcn/ui installation patterns

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install required shadcn/ui components and setup theme system foundation

- [ ] T001 Install required shadcn/ui components: command, sidebar, button, dropdown-menu, card, input, label, separator
- [ ] T002 [P] Verify existing Tailwind CSS and shadcn/ui base configuration
- [ ] T003 [P] Create TypeScript interfaces for landing page components in src/lib/types.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core theme system and base components that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Create ThemeProvider component in src/components/theme-provider.tsx with localStorage persistence and system preference fallback
- [ ] T005 [P] Create ModeToggle component in src/components/mode-toggle.tsx with dropdown for light/dark/system options
- [ ] T006 [P] Create base Footer component in src/components/footer.tsx with GitHub attribution links
- [ ] T007 Update main.tsx to wrap App with ThemeProvider using d-gis-theme storage key
- [ ] T008 [P] Setup documentation search data structure in src/lib/search-data.ts

**Checkpoint**: Theme system and base components ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Core Landing Page Experience (Priority: P1) 🎯 MVP

**Goal**: Primary landing page with responsive design, header navigation, hero section, and map showcase

**Independent Test**: Navigate to homepage and verify all essential elements render with responsive design across devices

### Implementation for User Story 1

- [ ] T009 [P] [US1] Create LandingPage main component in src/components/landing-page.tsx with layout structure
- [ ] T010 [P] [US1] Create HeroSection component in src/components/hero-section.tsx with compelling title and CTAs
- [ ] T011 [P] [US1] Create HeaderNavigation component in src/components/header-navigation.tsx with responsive design
- [ ] T012 [US1] Create MapShowcase component in src/components/map-showcase.tsx with loading and error states
- [ ] T013 [US1] Implement responsive navigation with desktop menu in HeaderNavigation component
- [ ] T014 [US1] Add graceful map fallback placeholder with retry functionality in MapShowcase component
- [ ] T015 [US1] Update App.tsx to render LandingPage as default route
- [ ] T016 [US1] Verify WCAG 2.1 AA accessibility compliance with semantic HTML and ARIA labels

**Checkpoint**: Core landing page should load within 3 seconds with all essential elements visible

---

## Phase 4: User Story 2 - Search & Discovery (Priority: P2)

**Goal**: Documentation search functionality using Command component with keyboard shortcuts

**Independent Test**: Use search input and ⌘K shortcut to find documentation with 1-second response time

### Implementation for User Story 2

- [ ] T017 [P] [US2] Create SearchInterface component in src/components/search-interface.tsx using Command component
- [ ] T018 [P] [US2] Implement keyboard shortcut handling (⌘K/Ctrl+K) in SearchInterface component
- [ ] T019 [US2] Add client-side search filtering with documentation index in SearchInterface component
- [ ] T020 [US2] Integrate SearchInterface into HeaderNavigation with search button trigger
- [ ] T021 [US2] Implement search result categories and keyboard navigation in SearchInterface component
- [ ] T022 [US2] Add search result selection and navigation functionality in SearchInterface component
- [ ] T023 [US2] Verify search accessibility with screen reader announcements and keyboard-only navigation

**Checkpoint**: Search functionality should open with keyboard shortcut and return results within 1 second

---

## Phase 5: User Story 3 - Theme Customization & Accessibility (Priority: P3)

**Goal**: Theme switching with persistence and comprehensive accessibility features

**Independent Test**: Toggle themes and verify persistence across sessions with full accessibility in both modes

### Implementation for User Story 3

- [ ] T024 [P] [US3] Create SidebarNavigation component in src/components/sidebar-navigation.tsx for mobile
- [ ] T025 [P] [US3] Implement responsive sidebar with auto-collapse behavior in SidebarNavigation component
- [ ] T026 [US3] Add mobile hamburger menu trigger to HeaderNavigation component
- [ ] T027 [US3] Integrate ModeToggle into HeaderNavigation with proper theme state management
- [ ] T028 [US3] Implement theme persistence testing across browser sessions
- [ ] T029 [US3] Add system preference detection and respect user's default theme
- [ ] T030 [US3] Verify theme accessibility with high contrast mode and screen reader compatibility

**Checkpoint**: Theme system should work seamlessly with mobile navigation and maintain accessibility

---

## Phase 6: Integration & Polish

**Purpose**: Cross-cutting concerns, performance optimization, and final polish

- [ ] T031 [P] Add GitHub repository link to HeaderNavigation component
- [ ] T032 [P] Implement proper error boundaries for map loading failures
- [ ] T033 Add proper loading states and transitions throughout landing page
- [ ] T034 Optimize component bundle sizes and verify 200kb target
- [ ] T035 [P] Add proper meta tags and SEO optimization
- [ ] T036 Conduct final accessibility audit with WAVE and keyboard-only testing
- [ ] T037 Verify 60fps performance during theme transitions and map interactions
- [ ] T038 Test responsive design across all breakpoints (320px to 4K)

---

## Dependencies & Execution Strategy

### User Story Dependencies
- **US1 (Core Experience)**: Independent - can start after foundational phase
- **US2 (Search)**: Depends on US1 HeaderNavigation component
- **US3 (Themes)**: Depends on US1 HeaderNavigation, uses foundational theme system

### Parallel Execution Opportunities

**Within Each User Story:**
- US1: T009, T010, T011 can run in parallel (different files)
- US2: T017, T018 can run in parallel (different components)
- US3: T024, T025 can run in parallel (different files)

**Cross-Story Parallelization:**
- US2 and US3 can start simultaneously after US1 T011 (HeaderNavigation) is complete

### MVP Strategy
- **Phase 1-2**: Setup and foundation (required for all)
- **Phase 3 (US1)**: Minimum viable landing page
- **Phase 4-5**: Enhanced functionality (can be added incrementally)
- **Phase 6**: Polish and optimization

## Manual Testing Checklist

### User Story 1 - Core Experience
- [ ] Landing page loads within 3 seconds on 4G
- [ ] Responsive design works on mobile (320px) to desktop (4K)
- [ ] Hero section displays compelling title and clear CTAs
- [ ] Map showcase shows loading state and handles errors gracefully
- [ ] Navigation is accessible with keyboard and screen readers

### User Story 2 - Search
- [ ] Search opens with ⌘K/Ctrl+K keyboard shortcut
- [ ] Search returns results within 1 second of typing
- [ ] Keyboard navigation works in search results
- [ ] Search integrates properly with header navigation
- [ ] Screen readers announce search state changes

### User Story 3 - Themes
- [ ] Theme toggle works and persists across sessions
- [ ] System preference is respected on first visit
- [ ] Mobile sidebar auto-collapses on small screens
- [ ] All elements remain accessible in both themes
- [ ] Touch gestures work for sidebar on mobile

### Performance & Accessibility
- [ ] Bundle size under 200kb gzipped
- [ ] 60fps performance during all interactions
- [ ] WCAG 2.1 AA compliance verified
- [ ] Works with JavaScript disabled (progressive enhancement)
- [ ] Color contrast meets accessibility standards