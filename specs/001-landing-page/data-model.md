# Data Model: D-GIS Landing Page

**Date**: 2025-11-15  
**Phase**: 1 - Design & Data Modeling

## Core Entities

### LandingPage

**Purpose**: Main homepage component orchestrating all landing page functionality

**Properties**:

```typescript
interface LandingPageProps {
  className?: string;
}

interface LandingPageState {
  isLoading: boolean;
  mapError: boolean;
  searchOpen: boolean;
}
```

**Relationships**:

- Contains HeaderNavigation
- Contains HeroSection
- Contains MapShowcase
- Contains Footer

**Validation Rules**:

- Must render within 3 seconds on 4G connections
- Must maintain 60fps during interactions
- Must pass WCAG 2.1 AA accessibility checks

### HeaderNavigation

**Purpose**: Top navigation bar with responsive menu, search, and theme controls

**Properties**:

```typescript
interface HeaderNavigationProps {
  className?: string;
  onSearchOpen?: () => void;
}

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  external?: boolean;
}

interface HeaderNavigationState {
  sidebarOpen: boolean;
  currentTheme: "light" | "dark" | "system";
}
```

**Relationships**:

- Contains SearchInterface
- Contains ThemeToggle
- Contains SidebarNavigation (mobile)
- Integrates with TanStack Router

**Validation Rules**:

- Navigation items must be keyboard accessible
- Sidebar must auto-collapse on screens < 768px
- Theme toggle must persist selection in localStorage

### SearchInterface

**Purpose**: Documentation search functionality using Command component

**Properties**:

```typescript
interface SearchInterfaceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SearchItem {
  id: string;
  title: string;
  description?: string;
  category: "Components" | "Documentation" | "Examples" | "API";
  href: string;
  keywords: string[];
}

interface SearchState {
  query: string;
  results: SearchItem[];
  selectedIndex: number;
  loading: boolean;
}
```

**Relationships**:

- Triggered by HeaderNavigation
- Uses DocumentationIndex data
- Integrates with keyboard shortcuts (⌘K/Ctrl+K)

**State Transitions**:

- Closed → Open (via keyboard shortcut or click)
- Open → Closed (via Escape or outside click)
- Empty → Results (via typing in search)
- Results → Navigation (via Enter or click)

**Validation Rules**:

- Must return results within 1 second of typing
- Must support keyboard navigation (arrows, enter, escape)
- Must announce results to screen readers

### ThemeSystem

**Purpose**: Light/dark mode toggle with persistence and system preference fallback

**Properties**:

```typescript
interface ThemeContextProps {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
  actualTheme: "light" | "dark"; // resolved theme
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: "light" | "dark" | "system";
  storageKey?: string;
}
```

**State Transitions**:

- System → Light/Dark (based on user preference or system change)
- Manual → Stored (theme selection persisted to localStorage)
- Page Load → Resolved (theme applied without flash)

**Validation Rules**:

- Must persist theme selection across browser sessions
- Must respect system preference when theme is 'system'
- Must provide smooth transitions between themes
- Must maintain accessibility in both themes

### MapShowcase

**Purpose**: Interactive map example demonstrating D-GIS capabilities

**Properties**:

```typescript
interface MapShowcaseProps {
  className?: string;
  fallbackComponent?: React.ComponentType;
}

interface MapState {
  viewport: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  markers: MarkerData[];
  loading: boolean;
  error: boolean;
}

interface MarkerData {
  id: string;
  longitude: number;
  latitude: number;
  label?: string;
  color?: string;
}
```

**Relationships**:

- Uses react-map-gl and MapLibre
- Integrates with ThemeSystem for styling
- Contains zoom and pan controls

**State Transitions**:

- Loading → Loaded (successful map initialization)
- Loading → Error (network failure or map load failure)
- Error → Retry (user clicks retry button)
- Loaded → Interactive (user can zoom/pan/click markers)

**Validation Rules**:

- Must display graceful fallback on network errors
- Must demonstrate markers, zoom, and pan interactions
- Must be responsive across all device sizes
- Must maintain 60fps during interactions

### DocumentationIndex

**Purpose**: Static search index for client-side documentation filtering

**Properties**:

```typescript
interface DocumentationIndex {
  version: string;
  lastUpdated: string;
  items: SearchItem[];
  categories: {
    [key: string]: {
      label: string;
      count: number;
    };
  };
}

interface SearchItem {
  id: string;
  title: string;
  description: string;
  content: string; // for full-text search
  category: string;
  href: string;
  keywords: string[];
  priority: number; // for search result ranking
}
```

**Relationships**:

- Consumed by SearchInterface
- Generated at build time from documentation
- Cached in browser for performance

**Validation Rules**:

- Must be generated at build time from current documentation
- Must support fuzzy text matching
- Must include priority-based result ranking
- Must be optimized for < 50kb compressed size

## Entity Relationships Diagram

```
LandingPage
├── HeaderNavigation
│   ├── SearchInterface → DocumentationIndex
│   ├── ThemeToggle → ThemeSystem
│   └── SidebarNavigation (mobile)
├── HeroSection
│   └── CallToActionButtons → TanStack Router
├── MapShowcase → react-map-gl/MapLibre
└── Footer
    └── AttributionLinks
```

## Data Flow Patterns

### Theme Management Flow

1. User clicks theme toggle
2. ThemeSystem updates context and localStorage
3. All components re-render with new theme
4. CSS classes applied to document root
5. Smooth transition animations applied

### Search Flow

1. User presses ⌘K or clicks search
2. SearchInterface opens with focus on input
3. User types query → client-side filtering of DocumentationIndex
4. Results displayed with keyboard navigation
5. User selects result → navigation via TanStack Router

### Error Handling Flow

1. MapShowcase detects network error
2. Component state transitions to error state
3. Graceful fallback placeholder displayed with retry option
4. User clicks retry → component re-initializes
5. Loading state displayed during retry

## Performance Considerations

### State Management

- Use React Context for theme state (global)
- Use local component state for UI interactions (search, sidebar)
- Minimize re-renders through proper dependency arrays
- Implement debouncing for search input (300ms)

### Memory Management

- Clean up event listeners in useEffect cleanup
- Memoize expensive computations (search results, theme calculations)
- Use React.memo for static components
- Implement proper cleanup for map resources

### Bundle Optimization

- Code split heavy components (MapShowcase)
- Tree-shake unused shadcn/ui components
- Optimize documentation index size
- Use dynamic imports for non-critical functionality
