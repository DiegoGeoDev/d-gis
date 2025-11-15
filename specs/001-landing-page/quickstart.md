# Quick Start: D-GIS Landing Page Implementation

**Date**: 2025-11-15  
**Phase**: 1 - Implementation Quick Start Guide

## Prerequisites

- ✅ React 19+ with TypeScript 5.9+ (existing project setup)
- ✅ Vite build system configured
- ✅ Tailwind CSS installed and configured
- ✅ shadcn/ui base setup complete

## Installation Steps

### 1. Install Required shadcn/ui Components

```bash
# Core navigation and interaction components
npx shadcn@latest add command
npx shadcn@latest add sidebar
npx shadcn@latest add button
npx shadcn@latest add dropdown-menu

# Additional UI components for layout
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add separator
```

### 2. Install TanStack Router (if not already installed)

```bash
npm install @tanstack/react-router
npm install -D @tanstack/router-devtools @tanstack/router-cli
```

### 3. Set Up Theme System

Create the theme provider following shadcn/ui Vite patterns:

```typescript
// src/components/theme-provider.tsx
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

const ThemeProviderContext = createContext<
  | {
      theme: Theme;
      setTheme: (theme: Theme) => void;
    }
  | undefined
>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "d-gis-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
```

### 4. Create Mode Toggle Component

```typescript
// src/components/mode-toggle.tsx
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### 5. Update Main Entry Point

```typescript
// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="d-gis-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
);
```

## Core Component Structure

### 1. Landing Page Layout

```typescript
// src/components/landing-page.tsx
import { HeaderNavigation } from "./header-navigation";
import { HeroSection } from "./hero-section";
import { MapShowcase } from "./map-showcase";
import { Footer } from "./footer";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation />
      <main>
        <HeroSection />
        <MapShowcase />
      </main>
      <Footer />
    </div>
  );
}
```

### 2. Header Navigation with Sidebar

```typescript
// src/components/header-navigation.tsx
import { useState } from "react";
import { Menu, Search, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { SearchInterface } from "./search-interface";
import { SidebarNavigation } from "./sidebar-navigation";

export function HeaderNavigation() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo and desktop navigation */}
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold">D-GIS</h1>
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="/docs"
                className="text-sm font-medium hover:text-primary"
              >
                Docs
              </a>
              <a
                href="/components"
                className="text-sm font-medium hover:text-primary"
              >
                Components
              </a>
              <a
                href="/blocks"
                className="text-sm font-medium hover:text-primary"
              >
                Blocks
              </a>
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search documentation</span>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/DiegoGeoDev/d-gis" target="_blank">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub repository</span>
              </a>
            </Button>
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </header>

      <SearchInterface open={searchOpen} onOpenChange={setSearchOpen} />
      <SidebarNavigation open={sidebarOpen} onOpenChange={setSidebarOpen} />
    </>
  );
}
```

### 3. Search Interface with Command

```typescript
// src/components/search-interface.tsx
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface SearchItem {
  id: string;
  title: string;
  category: string;
  href: string;
}

interface SearchInterfaceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchInterface({ open, onOpenChange }: SearchInterfaceProps) {
  const [searchItems] = useState<SearchItem[]>([
    {
      id: "1",
      title: "Getting Started",
      category: "Documentation",
      href: "/docs",
    },
    {
      id: "2",
      title: "Basic Map",
      category: "Components",
      href: "/components/map",
    },
    {
      id: "3",
      title: "Interactive Map",
      category: "Components",
      href: "/components/interactive-map",
    },
    {
      id: "4",
      title: "Markers",
      category: "Components",
      href: "/components/markers",
    },
    {
      id: "5",
      title: "Layer Controls",
      category: "Components",
      href: "/components/layer-controls",
    },
  ]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const groupedItems = searchItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchItem[]>);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search documentation..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {Object.entries(groupedItems).map(([category, items]) => (
          <CommandGroup key={category} heading={category}>
            {items.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => {
                  // Navigate to item.href
                  window.location.href = item.href;
                  onOpenChange(false);
                }}
              >
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
```

### 4. Hero Section

```typescript
// src/components/hero-section.tsx
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="container py-24 lg:py-32">
      <div className="text-center space-y-6">
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
          Beautiful map components
          <br />
          for modern web apps
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Build interactive maps with shadcn/ui design patterns. Copy-paste
          components, full TypeScript support, and accessible by default.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <a href="/docs">Get Started</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="/components">View Components</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
```

### 5. Map Showcase with Error Handling

```typescript
// src/components/map-showcase.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, RotateCcw } from "lucide-react";

export function MapShowcase() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  const handleRetry = () => {
    setMapError(false);
    setMapLoaded(false);
    // Simulate map loading
    setTimeout(() => {
      // Simulate occasional failures for demo
      if (Math.random() > 0.8) {
        setMapError(true);
      } else {
        setMapLoaded(true);
      }
    }, 1000);
  };

  useEffect(() => {
    handleRetry();
  }, []);

  if (mapError) {
    return (
      <section className="container py-16">
        <Card className="p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Map failed to load</h3>
          <p className="text-muted-foreground mb-4">
            Unable to connect to map services. Please check your connection.
          </p>
          <Button onClick={handleRetry} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </Card>
      </section>
    );
  }

  return (
    <section className="container py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">See it in action</h2>
        <p className="text-muted-foreground">
          Interactive map showcase with markers, zoom controls, and pan
          interactions
        </p>
      </div>

      {mapLoaded ? (
        <Card className="p-4">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl mb-2">🗺️</div>
              <p className="text-sm text-muted-foreground">
                Interactive map with markers and zoom/pan controls
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-4">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        </Card>
      )}
    </section>
  );
}
```

## Implementation Priorities

### Phase 1: Foundation (Day 1)

1. ✅ Set up ThemeProvider and ModeToggle
2. ✅ Create basic HeaderNavigation structure
3. ✅ Implement HeroSection with call-to-action buttons
4. ✅ Add Footer with attribution

### Phase 2: Interactive Features (Day 2)

1. ✅ Implement SearchInterface with Command component
2. ✅ Add SidebarNavigation for mobile
3. ✅ Create MapShowcase with error handling
4. ✅ Integrate keyboard shortcuts (⌘K for search)

### Phase 3: Integration & Polish (Day 3)

1. ✅ Connect TanStack Router for navigation
2. ✅ Implement documentation index generation
3. ✅ Add proper TypeScript interfaces
4. ✅ Performance optimization and bundle analysis

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Lint code
npm run lint
```

## Testing Checklist

### Manual Testing Requirements

- [ ] Landing page loads within 3 seconds on 4G
- [ ] Theme toggle works and persists across sessions
- [ ] Search opens with ⌘K/Ctrl+K keyboard shortcut
- [ ] Sidebar auto-collapses on mobile screens
- [ ] Map showcase displays graceful error handling
- [ ] All interactions maintain 60fps performance
- [ ] Keyboard navigation works throughout
- [ ] Screen reader accessibility verified

### Responsive Testing

- [ ] Mobile (320px - 768px): Sidebar navigation
- [ ] Tablet (768px - 1024px): Hybrid layout
- [ ] Desktop (1024px+): Full navigation bar
- [ ] High resolution (4K): Proper scaling

### Accessibility Testing

- [ ] WAVE accessibility scan passes
- [ ] Keyboard-only navigation works
- [ ] Screen reader announcements correct
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators clearly visible

## Next Steps

After completing the quick start implementation:

1. **Performance Optimization**: Bundle analysis and code splitting
2. **Real Map Integration**: Replace placeholder with actual react-map-gl
3. **Documentation Index**: Build-time documentation generation
4. **Advanced Features**: Additional shadcn/ui components as needed
5. **Production Deployment**: Vite build optimization and hosting setup
