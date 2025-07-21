# Modern Office Intranet - Project Context

## 🎯 Project Overview
This is a modern office intranet application built with React, Next.js, shadcn/ui, and Skiper UI. The application follows a "Digital Workspace of Tomorrow" design philosophy combining neo-brutalism with corporate elegance.

## 🛠 Tech Stack
- **Framework**: Next.js 14+ with App Router
- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **UI Library**: shadcn/ui + Skiper UI
- **State Management**: Zustand (recommended for widget state)
- **Database**: To be determined (PostgreSQL recommended)
- **Auth**: NextAuth.js (recommended)
- **Deployment**: Vercel (recommended)

## 🎨 Design System

### Color Palette
- Primary: Deep purple (`#6B46C1`) - Innovation and creativity
- Secondary: Electric blue (`#3B82F6`) - Trust and stability  
- Accent: Vibrant orange (`#F97316`) - Energy and CTAs
- Success: Emerald green (`#10B981`)
- Warning: Amber (`#F59E0B`)
- Error: Rose red (`#F43F5E`)
- Neutrals: Sophisticated grays (`#111827` to `#F9FAFB`)

### Typography
- Headers: Inter or Geist with variable weight
- Body: Clean sans-serif for screen rendering
- Display: Bold geometric fonts for impact
- Monospace: For code and technical content

### Spacing & Layout
- 8px grid system for consistent spacing
- Generous white space
- Z-axis layering with subtle shadows (0-5 levels)
- Rounded corners: 8px (small), 16px (medium), 24px (large)

### Motion Design
- Spring animations for natural movement
- 200-300ms transitions
- Parallax scrolling for depth
- Micro-interactions on all interactive elements
- Loading states with skeleton screens

## 📱 Responsive Breakpoints
- Mobile: 320px - 768px (single column, bottom nav)
- Tablet: 768px - 1024px (two columns, side drawer)
- Desktop: 1024px - 1440px (multi-column, persistent sidebar)
- Large: 1440px+ (ultra-wide, multiple panels)

## 🏗 Core Features (Tier 1)

### 1. Smart Dashboard with Widgets
- 12-column responsive grid (24px gutters)
- Glass-morphic widget cards with gradient borders
- Drag & drop functionality with snap-to-grid
- Widget types:
  - Welcome Widget (8x4) - Personalized greeting with dynamic backgrounds
  - Quick Actions (4x4) - Hexagonal button grid
  - My Tasks (6x4) - Kanban-style mini board
  - Team Pulse (4x3) - Team status and activity
  - Analytics (6x3) - Real-time animated charts

### 2. Company News Feed
- Central column (max-width 800px)
- Post types: Announcements, Achievements, Events, Media
- Smart sorting algorithm with ML personalization
- Infinite scroll with pull-to-refresh
- Rich interactions: reactions, comments, sharing

### 3. Employee Directory & Profiles
- Advanced search with fuzzy matching and voice input
- 3D flip cards with hover animations
- Interactive org chart with zoom/pan
- Comprehensive profile pages with tabs
- Skills visualization and availability indicators

### 4. Events Calendar
- Multiple views: Month, Week, Day, Agenda
- Smart event creation with natural language input
- Room finder integration
- RSVP system with conflict detection
- Category color coding

### 5. Quick Access Toolbar
- Floating glass-morphic toolbar (bottom-right)
- Expandable with magnetic dock behavior
- Customizable quick actions
- Circular buttons with pulse notifications

## 🚀 High-Impact Features (Tier 2)
- Team Collaboration Spaces
- Knowledge Base/Wiki
- Employee Recognition Wall
- Task & Project Tracking
- Resource Booking System

## ✨ Differentiator Features (Tier 3)
- AI-Powered Search
- Interactive Data Dashboards
- Wellness & Culture Hub
- Smart Notifications
- Mobile-First PWA

## 📦 Component Architecture

### Core Components
- `DashboardGrid` - Main dashboard layout manager
- `WidgetContainer` - Draggable widget wrapper
- `NewsCard` - News feed post component
- `EmployeeCard` - Directory search result
- `CalendarView` - Calendar display component
- `QuickToolbar` - Floating action toolbar

### Widget Components
- `WelcomeWidget` - Hero dashboard widget
- `QuickActionsWidget` - Action buttons grid
- `TasksWidget` - Mini kanban board
- `TeamPulseWidget` - Team status display
- `AnalyticsWidget` - Chart visualizations

### Layout Components
- `AppLayout` - Main application wrapper
- `Sidebar` - Navigation sidebar
- `Header` - Top navigation bar
- `MobileNav` - Bottom mobile navigation

## 🔧 Development Guidelines

### File Structure
```
src/
  app/                 # Next.js app directory
  components/          # Reusable components
    ui/               # shadcn/ui components
    widgets/          # Dashboard widgets
    layout/           # Layout components
  lib/                # Utilities and configs
  hooks/              # Custom React hooks
  store/              # State management
  types/              # TypeScript definitions
  styles/             # Global styles
```

### Code Standards
- TypeScript strict mode
- ESLint + Prettier configuration
- Conventional commits
- Component-first architecture
- Accessibility (WCAG 2.1 AA)
- Performance optimization (Core Web Vitals)

## 🎯 Key Implementation Notes

1. **Widget System**: Implement drag-and-drop with react-beautiful-dnd or @dnd-kit
2. **Animations**: Use framer-motion for spring animations and micro-interactions
3. **Charts**: Integrate recharts or chart.js for analytics widgets
4. **Search**: Implement with fuse.js for fuzzy search capabilities
5. **Notifications**: Use react-hot-toast for user feedback
6. **Forms**: Use react-hook-form with zod validation
7. **Icons**: Lucide React for consistent iconography
8. **Data Fetching**: TanStack Query for server state management

## 📋 Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm test` - Run test suite

## 🔐 Security Considerations
- Authentication with role-based access control
- Input validation and sanitization
- CSRF protection
- Secure API endpoints
- Environment variable management
- Regular dependency updates

This project aims to create a modern, engaging, and highly functional intranet that improves employee experience and organizational efficiency.