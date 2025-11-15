# Component Contracts: D-GIS Landing Page

**Date**: 2025-11-15  
**Phase**: 1 - Component Interface Contracts

## React Component Interfaces

### LandingPage Component

```typescript
/**
 * Main landing page component for D-GIS library
 * Orchestrates all landing page functionality with responsive design
 */
export interface LandingPageProps {
  /** Optional CSS class for styling customization */
  className?: string;
}

export declare const LandingPage: React.FC<LandingPageProps>;
```

### HeaderNavigation Component

```typescript
/**
 * Top navigation bar with responsive sidebar for mobile
 * Includes search, theme toggle, and navigation links
 */
export interface HeaderNavigationProps {
  /** Optional CSS class for styling customization */
  className?: string;
  /** Callback when search is opened */
  onSearchOpen?: () => void;
}

export interface NavigationItem {
  /** Unique identifier for the navigation item */
  id: string;
  /** Display label for the navigation item */
  label: string;
  /** URL or route path */
  href: string;
  /** Optional icon component */
  icon?: React.ComponentType<{ className?: string }>;
  /** Whether the link is external */
  external?: boolean;
}

export declare const HeaderNavigation: React.FC<HeaderNavigationProps>;
```

### SearchInterface Component

```typescript
/**
 * Documentation search using Command component
 * Supports keyboard shortcuts and client-side filtering
 */
export interface SearchInterfaceProps {
  /** Whether the search dialog is open */
  open: boolean;
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void;
}

export interface SearchItem {
  /** Unique identifier */
  id: string;
  /** Display title */
  title: string;
  /** Optional description */
  description?: string;
  /** Category for grouping results */
  category: 'Components' | 'Documentation' | 'Examples' | 'API';
  /** Target URL */
  href: string;
  /** Keywords for search matching */
  keywords: string[];
  /** Priority for result ranking (higher = more important) */
  priority?: number;
}

export declare const SearchInterface: React.FC<SearchInterfaceProps>;
```

### ThemeProvider Component

```typescript
/**
 * Theme context provider with localStorage persistence
 * Supports light/dark/system themes with graceful fallbacks
 */
export interface ThemeProviderProps {
  /** Child components */
  children: React.ReactNode;
  /** Default theme selection */
  defaultTheme?: 'light' | 'dark' | 'system';
  /** localStorage key for persistence */
  storageKey?: string;
}

export interface ThemeContextValue {
  /** Current theme setting */
  theme: 'light' | 'dark' | 'system';
  /** Function to update theme */
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  /** Resolved theme (light or dark) */
  actualTheme: 'light' | 'dark';
}

export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export declare const useTheme: () => ThemeContextValue;
```

### ModeToggle Component

```typescript
/**
 * Theme toggle button with dropdown for light/dark/system options
 * Integrates with ThemeProvider for state management
 */
export interface ModeToggleProps {
  /** Optional CSS class for styling customization */
  className?: string;
}

export declare const ModeToggle: React.FC<ModeToggleProps>;
```

### MapShowcase Component

```typescript
/**
 * Interactive map showcase demonstrating D-GIS capabilities
 * Features markers, zoom/pan controls, and graceful error handling
 */
export interface MapShowcaseProps {
  /** Optional CSS class for styling customization */
  className?: string;
  /** Custom fallback component for errors */
  fallbackComponent?: React.ComponentType<{ onRetry?: () => void }>;
}

export interface MapViewport {
  /** Longitude coordinate */
  longitude: number;
  /** Latitude coordinate */
  latitude: number;
  /** Zoom level */
  zoom: number;
}

export interface MarkerData {
  /** Unique identifier */
  id: string;
  /** Longitude coordinate */
  longitude: number;
  /** Latitude coordinate */
  latitude: number;
  /** Optional display label */
  label?: string;
  /** Optional marker color */
  color?: string;
}

export declare const MapShowcase: React.FC<MapShowcaseProps>;
```

### SidebarNavigation Component

```typescript
/**
 * Mobile-responsive sidebar navigation using shadcn/ui Sidebar
 * Auto-collapses on mobile with touch gesture support
 */
export interface SidebarNavigationProps {
  /** Navigation items to display */
  items: NavigationItem[];
  /** Optional CSS class for styling customization */
  className?: string;
}

export declare const SidebarNavigation: React.FC<SidebarNavigationProps>;
```

## Hook Interfaces

### useSearch Hook

```typescript
/**
 * Custom hook for managing documentation search functionality
 * Provides debounced search with client-side filtering
 */
export interface UseSearchOptions {
  /** Search debounce delay in milliseconds */
  debounceMs?: number;
  /** Maximum number of results to return */
  maxResults?: number;
}

export interface UseSearchReturn {
  /** Current search query */
  query: string;
  /** Set search query */
  setQuery: (query: string) => void;
  /** Search results */
  results: SearchItem[];
  /** Whether search is loading */
  loading: boolean;
  /** Clear search and results */
  clear: () => void;
}

export declare function useSearch(
  items: SearchItem[],
  options?: UseSearchOptions
): UseSearchReturn;
```

### useResponsiveSidebar Hook

```typescript
/**
 * Custom hook for managing responsive sidebar state
 * Handles auto-collapse on mobile and persistent state
 */
export interface UseResponsiveSidebarReturn {
  /** Whether sidebar is open */
  isOpen: boolean;
  /** Toggle sidebar open/closed */
  toggle: () => void;
  /** Set sidebar open state */
  setIsOpen: (open: boolean) => void;
  /** Whether currently on mobile viewport */
  isMobile: boolean;
}

export declare function useResponsiveSidebar(): UseResponsiveSidebarReturn;
```

## Data Contracts

### Documentation Index Schema

```typescript
/**
 * Static documentation index for client-side search
 * Generated at build time from documentation sources
 */
export interface DocumentationIndex {
  /** Schema version for compatibility */
  version: string;
  /** Last updated timestamp */
  lastUpdated: string;
  /** Search items */
  items: SearchItem[];
  /** Category metadata */
  categories: Record<string, {
    label: string;
    count: number;
    icon?: string;
  }>;
}
```

### Map Configuration Schema

```typescript
/**
 * Configuration for map showcase component
 */
export interface MapConfig {
  /** Initial viewport settings */
  initialViewport: MapViewport;
  /** Sample markers for demonstration */
  markers: MarkerData[];
  /** Map style URL */
  mapStyle: string;
  /** MapLibre configuration options */
  options: {
    /** Whether to show attribution control */
    attributionControl: boolean;
    /** Whether to show navigation control */
    navigationControl: boolean;
    /** Maximum zoom level */
    maxZoom: number;
    /** Minimum zoom level */
    minZoom: number;
  };
}
```

## Event Contracts

### Theme Change Events

```typescript
/**
 * Events emitted by theme system for component synchronization
 */
export interface ThemeChangeEvent {
  /** Previous theme */
  previousTheme: 'light' | 'dark' | 'system';
  /** New theme */
  newTheme: 'light' | 'dark' | 'system';
  /** Resolved actual theme */
  actualTheme: 'light' | 'dark';
  /** Timestamp of change */
  timestamp: number;
}
```

### Search Events

```typescript
/**
 * Events emitted by search interface for analytics and navigation
 */
export interface SearchEvent {
  /** Type of search event */
  type: 'open' | 'close' | 'query' | 'select' | 'clear';
  /** Search query (for query and select events) */
  query?: string;
  /** Selected item (for select events) */
  selectedItem?: SearchItem;
  /** Timestamp of event */
  timestamp: number;
}
```

### Map Events

```typescript
/**
 * Events emitted by map showcase for interaction tracking
 */
export interface MapEvent {
  /** Type of map event */
  type: 'load' | 'error' | 'retry' | 'marker_click' | 'viewport_change';
  /** Current viewport (for viewport_change events) */
  viewport?: MapViewport;
  /** Clicked marker (for marker_click events) */
  marker?: MarkerData;
  /** Error details (for error events) */
  error?: {
    message: string;
    code?: string;
  };
  /** Timestamp of event */
  timestamp: number;
}
```

## Accessibility Contracts

### ARIA Requirements

```typescript
/**
 * ARIA attributes required for accessibility compliance
 */
export interface AriaProps {
  /** ARIA label for screen readers */
  'aria-label'?: string;
  /** ARIA description reference */
  'aria-describedby'?: string;
  /** ARIA expanded state for collapsible elements */
  'aria-expanded'?: boolean;
  /** ARIA hidden for decorative elements */
  'aria-hidden'?: boolean;
  /** ARIA live region for dynamic content */
  'aria-live'?: 'polite' | 'assertive' | 'off';
  /** ARIA role for semantic meaning */
  role?: string;
}
```

### Keyboard Navigation Contract

```typescript
/**
 * Keyboard event handlers for accessibility
 */
export interface KeyboardHandlers {
  /** Handle Enter key press */
  onEnter?: (event: React.KeyboardEvent) => void;
  /** Handle Escape key press */
  onEscape?: (event: React.KeyboardEvent) => void;
  /** Handle Tab navigation */
  onTab?: (event: React.KeyboardEvent) => void;
  /** Handle Arrow key navigation */
  onArrowKey?: (event: React.KeyboardEvent, direction: 'up' | 'down' | 'left' | 'right') => void;
}
```

## Performance Contracts

### Bundle Size Requirements

```typescript
/**
 * Bundle size targets for performance optimization
 */
export interface BundleTargets {
  /** Landing page total bundle (gzipped) */
  landingPage: '200kb';
  /** Individual component max size (gzipped) */
  maxComponentSize: '10kb';
  /** Initial load time target */
  loadTime: '3s';
  /** Time to interactive target */
  timeToInteractive: '5s';
}
```

### Performance Metrics

```typescript
/**
 * Performance metrics to track for landing page
 */
export interface PerformanceMetrics {
  /** First Contentful Paint */
  fcp: number;
  /** Largest Contentful Paint */
  lcp: number;
  /** First Input Delay */
  fid: number;
  /** Cumulative Layout Shift */
  cls: number;
  /** Time to Interactive */
  tti: number;
}
```