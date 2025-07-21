export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
            Modern Office Intranet
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Welcome to the Digital Workspace of Tomorrow. A beautiful, modern intranet experience built with React, Next.js, and cutting-edge design.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="glass p-6 rounded-2xl gradient-border hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg mb-4 mx-auto"></div>
              <h3 className="text-xl font-semibold mb-2">Smart Dashboard</h3>
              <p className="text-gray-600">Personalized widgets with drag & drop functionality</p>
            </div>
            
            <div className="glass p-6 rounded-2xl gradient-border hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-lg mb-4 mx-auto"></div>
              <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
              <p className="text-gray-600">Connect and collaborate with your team seamlessly</p>
            </div>
            
            <div className="glass p-6 rounded-2xl gradient-border hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-lg mb-4 mx-auto"></div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-600">Intelligent search and personalized experiences</p>
            </div>
          </div>

          <div className="mt-16">
            <a 
              href="/dashboard"
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:-translate-y-1 transition-all inline-block"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}