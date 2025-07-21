'use client'

import { motion } from 'framer-motion'
import AppLayout from '@/components/layout/AppLayout'
import WelcomeWidget from '@/components/widgets/WelcomeWidget'

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome to your personalized workspace</p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-12 gap-6 auto-rows-[100px]">
          <WelcomeWidget />
          
          {/* Placeholder for other widgets */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="col-span-4 row-span-4 glass rounded-lg border border-white/20 p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {['New Task', 'Book Room', 'Time Off', 'Expense'].map((action, i) => (
                <button
                  key={action}
                  className="glass hover:bg-white/20 p-4 rounded-lg text-sm font-medium transition-all hover:scale-105"
                >
                  {action}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="col-span-6 row-span-4 glass rounded-lg border border-white/20 p-6"
          >
            <h3 className="text-lg font-semibold mb-4">My Tasks</h3>
            <div className="space-y-3">
              {['Review Q1 Reports', 'Team Meeting Prep', 'Update Documentation'].map((task, i) => (
                <div key={task} className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="flex-1 text-sm">{task}</span>
                  <span className="text-xs text-gray-500">Due today</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="col-span-4 row-span-3 glass rounded-lg border border-white/20 p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Team Pulse</h3>
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full border-2 border-white"
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-3">5 team members online</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="col-span-6 row-span-3 glass rounded-lg border border-white/20 p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Analytics</h3>
            <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Chart placeholder</span>
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  )
}