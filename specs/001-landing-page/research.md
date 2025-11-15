# Research: D-GIS Landing Page Implementation

**Date**: 2025-11-15  
**Phase**: 0 - Research & Technology Decisions

## Component Architecture Decisions

### 1. Command Component for Documentation Search

**Decision**: Use shadcn/ui Command component with local documentation index and client-side filtering

**Rationale**: 
- Meets 1-second response time requirement through client-side filtering
- Provides keyboard shortcuts (⌘K/Ctrl+K) following modern UX patterns
- Built-in accessibility with ARIA support and keyboard navigation
- Consistent with shadcn/ui design system already established in project

**Implementation**: 
```bash
npx shadcn@latest add command
```

**Alternatives considered**: 
- Server-side search API (rejected: latency concerns, additional complexity)
- Custom search implementation (rejected: reinventing wheel, accessibility overhead)

### 2. Sidebar Component for Mobile Navigation

**Decision**: Use shadcn/ui Sidebar component with responsive behavior and overlay mode for mobile

**Rationale**:
- Follows modern mobile-first design patterns
- Auto-collapse behavior on small screens
- Touch gesture support and overlay mode for mobile
- Persistent state management across sessions
- Integrated with existing shadcn/ui ecosystem

**Implementation**:
```bash
npx shadcn@latest add sidebar
```

**Alternatives considered**:
- Custom hamburger menu (rejected: accessibility complexity, reinventing patterns)
- Hide navigation items on mobile (rejected: UX degradation)
- Horizontal scrolling navigation (rejected: poor mobile UX)

### 3. Theme System with Vite Integration

**Decision**: Use shadcn/ui ThemeProvider pattern from https://ui.shadcn.com/docs/dark-mode/vite with localStorage persistence and system preference fallback

**Rationale**:
- Follows established Vite + shadcn/ui patterns exactly as documented
- localStorage persistence meets requirement for cross-session theme memory
- System preference fallback provides good default behavior
- No flash of incorrect theme on page load
- Smooth CSS transitions between theme changes

**Implementation**:
- Custom ThemeProvider implementation following official Vite guide
- ModeToggle component with dropdown for light/dark/system options
- CSS custom properties for theme variables

**Alternatives considered**:
- next-themes package (rejected: Next.js specific, unnecessary dependency)
- Cookie-based persistence (rejected: overcomplicated for client-side need)

### 4. TanStack Router Integration

**Decision**: Integrate TanStack Router for client-side navigation to Docs, Components, and Blocks sections

**Rationale**:
- Already established in project setup
- Type-safe navigation with full TypeScript support
- Code splitting capabilities for performance
- SEO-friendly routing with proper meta tags
- Built-in developer tools for debugging

**Implementation**:
```bash
# Already installed, need route configuration
```

**Alternatives considered**:
- React Router (rejected: less type safety, project already has TanStack)
- Simple hash routing (rejected: poor SEO, limited functionality)

## Performance & Bundle Optimization

### Bundle Size Analysis

**Decision**: Target 200kb gzipped bundle size for landing page (relaxed from standard 50kb for component library entry point)

**Component overhead breakdown**:
- Command component: ~8KB gzipped
- Sidebar component: ~6KB gzipped  
- Theme provider: ~2KB gzipped
- Button enhancements: ~3KB gzipped
- **Total shadcn/ui overhead**: ~19KB gzipped

**Rationale**: 
- Landing page requires more components than typical library components
- Performance still excellent with 200kb target on modern connections
- Trade-off justified for rich user experience and functionality

### Optimization Strategies

**Decision**: Implement selective imports and tree-shaking for optimal performance

**Techniques**:
- Tree-shakable shadcn/ui components by default
- Selective lucide-react icon imports
- Lazy loading for map showcase component
- Tailwind CSS purging of unused styles

## Accessibility Implementation

### WCAG 2.1 AA Compliance Strategy

**Decision**: Implement comprehensive accessibility from component level up

**Key implementations**:
- Semantic HTML structure with proper headings
- ARIA labels and descriptions for all interactive elements
- Keyboard navigation support (Tab, Enter, Space, Escape)
- Screen reader announcements for theme changes
- Color contrast ratios meeting AA standards
- Focus management and visible focus indicators

**Testing approach**:
- Manual testing with screen readers (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation testing
- Automated accessibility scanning (WAVE, Axe tools)

## Technical Integration Points

### Map Showcase Component

**Decision**: Simple interactive map with markers and zoom/pan controls using existing react-map-gl setup

**Rationale**:
- Demonstrates core D-GIS capabilities effectively
- Keeps bundle size manageable within 200kb target
- Graceful fallback placeholder for network failures
- Integrates with theme system for consistent styling

### Local Documentation Index

**Decision**: Static JSON index with client-side fuzzy search using Command component filtering

**Implementation**:
- Build-time generation of documentation index
- Client-side filtering with highlighted matches
- Keyboard shortcuts and navigation
- Empty state handling and result categories

**Rationale**:
- Meets 1-second response time requirement
- No server dependency for search functionality
- Scales well with documentation growth
- Consistent with modern JAMstack patterns

## Development Workflow Priorities

1. **ThemeProvider setup** (foundational dependency)
2. **Sidebar navigation** (core UX requirement)
3. **Command search integration** (key functionality)
4. **Map showcase with fallback** (visual demonstration)
5. **TanStack Router configuration** (navigation structure)
6. **Performance optimization and bundle analysis**

All decisions align with D-GIS constitution requirements for accessibility-first development, clean architecture, simple UX, and minimal dependencies while leveraging the established shadcn/ui ecosystem.