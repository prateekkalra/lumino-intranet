import { Header } from "@/components/layout/Header"
import { RightSidebar } from "@/components/layout/RightSidebar"
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext"
import { DialogProvider } from "@/contexts/DialogContext"
import { Toaster } from "@/components/ui/toaster"
import { DashboardGrid } from "@/components/dashboard/DashboardGrid"

// Import all dialog components
import { AlertsDialog } from "@/components/dialogs/AlertsDialog"
import { CalendarDialog } from "@/components/dialogs/CalendarDialog"
import { EmployeePortalDialog } from "@/components/dialogs/EmployeePortalDialog"
import { DirectoryDialog } from "@/components/dialogs/DirectoryDialog"
import { TeamFeedDialog } from "@/components/dialogs/TeamFeedDialog"
import { ServiceDeskDialog } from "@/components/dialogs/ServiceDeskDialog"
import { ProjectManagementDialog } from "@/components/dialogs/ProjectManagementDialog"
import { KnowledgeBaseDialog } from "@/components/dialogs/KnowledgeBaseDialog"
import { TimeTrackingDialog } from "@/components/dialogs/TimeTrackingDialog"

function AppContent() {
  const { isOpen: isSidebarOpen } = useSidebar()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <RightSidebar />
      
      {/* Dialog Components */}
      <AlertsDialog />
      <CalendarDialog />
      <EmployeePortalDialog />
      <DirectoryDialog />
      <TeamFeedDialog />
      <ServiceDeskDialog />
      <ProjectManagementDialog />
      <KnowledgeBaseDialog />
      <TimeTrackingDialog />
      
      {/* Main app content */}
      <main 
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'lg:pr-[380px]' : ''
        }`}
      >
        <DashboardGrid />
      </main>
    </div>
  )
}

function App() {
  return (
    <SidebarProvider>
      <DialogProvider>
        <AppContent />
        <Toaster />
      </DialogProvider>
    </SidebarProvider>
  )
}

export default App