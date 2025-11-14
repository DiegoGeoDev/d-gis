---
description: "D-GIS - Modern React Map Components Library built with shadcn/ui architecture"
applyTo: "**"
---

# D-GIS Map Components Library Instructions

You are in expert React map components development mode. Your task is to build a modern, reusable map components library following shadcn/ui architecture patterns for the open-source community.

## Project Overview

**D-GIS** is a comprehensive React map components library designed to:

- Centralize high-quality, reusable map components
- Follow shadcn/ui architecture and installation patterns
- Enable component sharing via repository distribution
- Provide exceptional performance and developer experience
- Support modern React patterns with TypeScript

### Core Technology Stack

- **Build Tool**: Vite (modern, fast bundling)
- **UI Framework**: shadcn/ui patterns and components
- **React Version**: React 19+ (latest features and performance)
- **Language**: TypeScript (strict type safety)
- **Styling**: Tailwind CSS (utility-first, customizable)
- **Map Engine**: react-map-gl (high-performance React wrapper)
- **Map Provider**: MapLibre (open-source, vendor-agnostic)
- **Data Visualization**: deck.gl (WebGL-powered data visualization)
- **Additional**: Packages added as needed, focusing on performance and DX

## Architecture Principles

### Component Design Philosophy

Focus on developer experience and API design, emphasizing testing and maintainability. Prioritize robust, real-world usage patterns while building performant, flexible APIs with simplicity and elegance.

### shadcn/ui Architecture Compliance

- **Copy-paste Installation**: Components should be easily installable via CLI
- **Customizable**: Every component should be fully customizable and themeable
- **Accessible**: WCAG 2.1 AA compliance by default
- **Unstyled Core**: Radix-like headless component architecture
- **Tailwind Integration**: Seamless integration with Tailwind design systems
- **TypeScript First**: Comprehensive type definitions and inference

### Map-Specific Patterns

- **Performance First**: Always optimize for 60fps rendering and smooth interactions
- **Data-Driven**: Components should handle large datasets efficiently
- **Responsive**: Mobile-first design with touch interactions
- **Accessible**: Screen reader support and keyboard navigation for maps
- **Composable**: Small, focused components that work together
- **Provider Pattern**: Efficient map context and state management

## Development Standards

### Component Architecture

```typescript
// Follow this component structure pattern
export interface MapComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  viewport?: ViewState;
  onViewportChange?: (viewport: ViewState) => void;
  variant?: "default" | "satellite" | "terrain";
  size?: "sm" | "md" | "lg" | "full";
}

const MapComponent = React.forwardRef<HTMLDivElement, MapComponentProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(mapVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
```

### Performance & TypeScript

- Use React.memo, useMemo, useCallback strategically
- Implement virtualization for large datasets
- Debounce expensive operations (geocoding, search)
- Use strong TypeScript typing for GeoJSON and map data structures
- Leverage deck.gl for data-heavy visualizations

### Styling & Theming

- Use Tailwind CSS with cva (class-variance-authority) patterns
- Support dark mode and multiple map themes
- Mobile-first responsive design
- CSS custom properties for theming

### Essential Features

- **Map Context**: Centralized map state management
- **GeoJSON Support**: Full specification compliance
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **CLI Installation**: `npx d-gis add [component]` command
- **Tree Shaking**: Individual component imports

## Component Categories

### Core Map Components

- **Map**: Base map container with viewport management
- **MapProvider**: Context provider for map state and configuration
- **Layer**: Abstract layer component for data visualization
- **Marker**: Individual point markers with clustering support
- **Popup**: Interactive popups and tooltips
- **Navigation**: Map navigation controls (zoom, compass, etc.)

### Data Visualization Components

- **HeatmapLayer**: WebGL-accelerated heatmaps
- **ClusterLayer**: Marker clustering with customizable appearance
- **PathLayer**: Lines and polylines with animation support
- **PolygonLayer**: Area visualization with fill and stroke options
- **ArcLayer**: Flow visualization between points
- **GridLayer**: Grid-based data aggregation

### Interactive Components

- **DrawingTools**: Drawing and editing geometric shapes
- **MeasurementTool**: Distance and area measurement
- **GeocodeSearch**: Address search and geocoding
- **LayerControl**: Layer visibility and styling controls
- **Legend**: Dynamic legend generation
- **FilterPanel**: Data filtering interface

### UI Components

- **MapCard**: Card wrapper for embedded maps
- **MapDialog**: Modal map interactions
- **MapSheet**: Side panel for map-related content
- **MapTabs**: Tabbed interface for multiple maps
- **MapToolbar**: Customizable toolbar for map actions
- **MapStatus**: Loading, error, and status indicators

## Implementation Guidelines

### Component Creation Process

1. Design TypeScript interface first
2. Implement headless functionality
3. Add Tailwind styling with variants
4. Ensure accessibility compliance
5. Optimize performance

### Documentation & Tests Guidelines

**Important**: Only create documentation or test files if explicitly requested by the user.

- **Documentation**: Generate API docs, usage examples, or guides ONLY when the user specifically asks for documentation
- **Tests**: Create test files ONLY when the user explicitly requests tests
- **Markdown Explanations**: Do NOT auto-generate explanation files or refactoring summaries unless explicitly requested
- **Focus**: Prioritize shipping working code over generating documentation artifacts

### Quality Standards

- ESLint + Prettier for code consistency
- < 50kb gzipped bundle size for core components
- 60fps map interactions
- WCAG 2.1 AA accessibility compliance
- MIT license for maximum adoption
- Only create tests when explicitly requested by the user

Your role is to ensure every component meets these standards, creating a map component library that becomes the go-to choice for React developers building location-based applications.
