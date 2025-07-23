import { Header } from "@/components/layout/Header"
import { RightSidebar } from "@/components/layout/RightSidebar"
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext"

function AppContent() {
  const { isOpen: isSidebarOpen } = useSidebar()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <RightSidebar />
      
      {/* Main app content */}
      <main 
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'lg:pr-[380px]' : ''
        }`}
      >
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary via-blue-600 to-orange-600 mb-4">
                <span className="text-2xl font-bold text-white">L</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-blue-600 to-orange-600 bg-clip-text text-transparent mb-6">
              Welcome to Lumino
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Your modern digital workspace is ready! Explore the activity panel on the right to stay connected with your team and access your most important tools.
            </p>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
                <p className="text-sm text-muted-foreground">Stay connected with real-time updates and team activity</p>
              </div>
              
              <div className="p-6 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Quick Access</h3>
                <p className="text-sm text-muted-foreground">One-click access to all your essential work tools</p>
              </div>
              
              <div className="p-6 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 5H4l5-5v5zm0 0v6l7-7h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Smart Notifications</h3>
                <p className="text-sm text-muted-foreground">Priority-based alerts and system updates</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <SidebarProvider>
      <AppContent />
    </SidebarProvider>
  )
}

export default App