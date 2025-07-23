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

## 🏗 Application Structure

### Main Layout Components
- **Header**: Company logo, global search, notifications, user profile, theme toggle
- **Main Dashboard**: 12-column responsive grid with drag-and-drop widgets
- **Right Sidebar**: Collapsible panel for notifications and quick updates
- **Floating Action Button**: Quick access to common actions

### Core Dashboard Widgets
1. **Welcome Widget** - Personalized greeting, date/time, weather, schedule summary
2. **Quick Actions** - Grid of action buttons for common tasks
3. **Company News Feed** - Post cards with like/comment features and category filters
4. **My Tasks** - Kanban board (To Do, In Progress, Done) with drag functionality
5. **Team Members** - Avatar grid with online status indicators
6. **Analytics** - Toggle between different chart types (revenue, productivity, projects)
7. **Calendar** - Month view with event indicators and today's events list
8. **Recognition Wall** - Recent achievements and kudos with recognition features

### Modal/Overlay Features
- **Employee Directory** - Search/filter employees with profile cards and org chart
- **Resource Booking** - Meeting rooms and equipment with calendar integration
- **Knowledge Base** - Categories, article search, and FAQ sections
- **Command Palette** - Universal search with quick actions (Cmd+K)

## 🚀 Additional Sections

### Team Collaboration
- **Team Spaces** - Department landing pages with shared resources
- **Project Tracking** - Project lists with Gantt views and assignments

### Employee Experience
- **Wellness Hub** - Challenges dashboard and mental health resources
- **Employee Recognition** - Achievement tracking and peer recognition

### Advanced Features
- **AI-Powered Search** - Intelligent content discovery
- **Real-time Notifications** - Smart notification system
- **Mobile-First PWA** - Progressive web app capabilities

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

### Core Features to Implement
- Drag-and-drop widget system with grid snapping
- Local storage for user preferences and widget layouts
- Real-time search across all content
- Modal system for overlay features
- Toast notifications for user feedback
- Loading states and error handling
- Fully responsive design across all breakpoints

### Technical Implementation
1. **Widget System**: Implement drag-and-drop with react-beautiful-dnd or @dnd-kit
2. **Animations**: Use framer-motion for spring animations and micro-interactions
3. **Charts**: Integrate recharts or chart.js for analytics widgets
4. **Search**: Implement with fuse.js for fuzzy search capabilities
5. **Notifications**: Use react-hot-toast for user feedback
6. **Forms**: Use react-hook-form with zod validation
7. **Icons**: Lucide React for consistent iconography
8. **Data Fetching**: TanStack Query for server state management

### Build Priority Order
1. **Foundation** - Header, dashboard grid, widget containers
2. **Core Widgets** - Welcome, quick actions, news feed, calendar
3. **Interactive Features** - Task board, team members, analytics, recognition
4. **Advanced Features** - Employee directory, command palette, booking system
5. **Polish** - Animations, dark mode, mobile optimization

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