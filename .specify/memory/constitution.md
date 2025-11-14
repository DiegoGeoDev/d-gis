<!--
Sync Impact Report:
Version change: 0.1.0 → 1.0.0
Modified principles: Initial constitution creation
Added sections: All sections (initial creation)
Removed sections: None (initial creation)
Templates requiring updates: ✅ All templates reviewed and aligned
Follow-up TODOs: None
-->

# D-GIS Constitution

## Core Principles

### I. Accessibility First (NON-NEGOTIABLE)

Accessibility MUST be the primary consideration in all development decisions. Every component, feature, and interaction MUST comply with WCAG 2.1 AA standards as the baseline. Screen reader support, keyboard navigation, proper ARIA labels, semantic HTML, and color contrast requirements are mandatory. Components MUST be tested with assistive technologies before release. When accessibility conflicts with other design goals, accessibility MUST take precedence.

**Rationale**: Inclusive design ensures D-GIS serves all users regardless of abilities, making it a truly universal map component library.

### II. Clean Code & Simple Architecture

Code MUST be clean, readable, and maintainable. Follow established patterns: single responsibility principle, clear naming conventions, minimal cognitive complexity. Functions MUST have a clear purpose and limited scope. No clever tricks or overly abstracted solutions. TypeScript interfaces MUST be explicit and comprehensive. Code MUST be self-documenting through clear structure and naming.

**Rationale**: Clean code reduces maintenance burden and enables rapid development of new map components while ensuring long-term project sustainability.

### III. Simple & Clear UX (NON-NEGOTIABLE)

User experience MUST always be clean, simple, and clear. Interfaces MUST be intuitive without extensive documentation. Progressive disclosure for advanced features. Consistent interaction patterns across all components. No unnecessary animations or visual clutter. Performance MUST feel instant (60fps interactions). Mobile-first responsive design with touch-friendly interactions.

**Rationale**: Simple UX ensures developers can quickly integrate D-GIS components without extensive learning curves, promoting adoption and reducing support overhead.

### IV. Minimal Dependencies & Performance

Dependency additions MUST be justified with clear benefit analysis. Prefer standard web APIs over third-party solutions when practical. Bundle size MUST remain under 50kb gzipped for core components. Tree-shaking MUST be supported for individual component imports. No testing frameworks or testing-related dependencies are permitted unless explicitly requested.

**Rationale**: Minimal dependencies reduce security risks, maintenance burden, and bundle size while improving installation speed and compatibility.

### V. Zero Testing Mandate (NON-NEGOTIABLE)

NO testing frameworks, unit tests, integration tests, or end-to-end tests are permitted unless explicitly requested by the project maintainer. Focus MUST be on shipping working code and real-world usage validation. Manual testing and user feedback are the primary quality assurance methods. This principle supersedes any other testing guidance.

**Rationale**: Testing overhead can impede rapid prototyping and iteration. Real-world usage provides more valuable feedback than synthetic tests for UI components.

## Technology Stack Requirements

### Core Framework Stack

- **Build Tool**: Vite (modern, fast bundling and development)
- **Frontend Framework**: React 19+ (latest features and performance optimizations)
- **Language**: TypeScript (strict type safety, comprehensive type definitions)
- **Styling**: Tailwind CSS (utility-first, customizable design system)
- **Component Architecture**: shadcn/ui patterns and installation methodology

### Map & Visualization Stack

- **Map Engine**: react-map-gl (React wrapper for high-performance map rendering)
- **Map Provider**: MapLibre GL JS (open-source, vendor-agnostic map rendering)
- **Data Visualization**: deck.gl (WebGL-powered, high-performance data visualization)
- **Geospatial Math**: @math.gl/core (3D and geospatial mathematical operations)
- **Navigation**: TanStack Router (type-safe routing for component registry and documentation)

### Component Distribution

- **Registry Pattern**: Follow shadcn/ui component registry architecture
- **Installation**: `npx d-gis add [component]` command-line interface
- **Customization**: Copy-paste installation with full customization capability
- **Theming**: CSS custom properties and Tailwind integration for theming support

## Development Workflow & Standards

### Component Development Process

1. **Design TypeScript interface first** - Complete type definitions before implementation
2. **Implement headless functionality** - Core logic separated from presentation
3. **Add Tailwind styling with variants** - Use class-variance-authority (cva) patterns
4. **Ensure accessibility compliance** - Test with screen readers and keyboard navigation
5. **Optimize for performance** - Target 60fps interactions and smooth animations

### Code Quality Gates

- **TypeScript strict mode**: No any types, comprehensive type coverage
- **ESLint compliance**: Code consistency and best practices enforcement
- **Performance standards**: 60fps map interactions, smooth animations, responsive UI
- **Bundle size limits**: Core components under 50kb gzipped
- **Browser compatibility**: Modern browsers with ES2022+ support

### Component Categories & Architecture

- **Core Map Components**: Map, MapProvider, Layer, Marker, Popup, Navigation
- **Data Visualization**: HeatmapLayer, ClusterLayer, PathLayer, PolygonLayer, ArcLayer, GridLayer
- **Interactive Tools**: DrawingTools, MeasurementTool, GeocodeSearch, LayerControl
- **UI Components**: MapCard, MapDialog, MapSheet, MapTabs, MapToolbar, MapStatus

## Governance

This constitution supersedes all other development practices and guidelines. All component development, code reviews, and architectural decisions MUST verify compliance with these principles. When conflicts arise between principles, accessibility takes highest priority, followed by UX simplicity, then performance considerations.

Component proposals MUST demonstrate alignment with shadcn/ui patterns and include accessibility considerations. Breaking changes require semantic versioning and migration guides. The zero-testing mandate overrides any external testing recommendations or best practices.

TanStack Router integration enables the component registry to provide type-safe navigation between component documentation, examples, and installation instructions, following the established shadcn/ui community patterns.

**Version**: 1.0.0 | **Ratified**: 2025-11-13 | **Last Amended**: 2025-11-13
