'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { animations } from '@/lib/skiper-ui'

export default function WelcomeWidget() {
  const [isClient, setIsClient] = useState(false)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [quote, setQuote] = useState("")
  const [animationSeeds, setAnimationSeeds] = useState<number[]>([])

  useEffect(() => {
    setIsClient(true)
    setCurrentTime(new Date())
    
    const quotes = [
      "Every day is a new opportunity to grow",
      "Your potential is limitless",
      "Success is built one day at a time",
      "Today's efforts become tomorrow's achievements",
      "Innovation starts with curiosity"
    ]
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
    
    // Generate stable random seeds for animations
    setAnimationSeeds(Array.from({ length: 10 }, () => Math.random()))
  }, [])

  if (!isClient || !currentTime) {
    return (
      <div className="col-span-8 row-span-4">
        <Card className="h-full glass gradient-border bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
          <CardContent className="p-8 h-full flex items-center justify-center">
            <div className="text-white text-xl">Loading...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentHour = currentTime.getHours()
  const timeOfDay = 
    currentHour < 12 ? 'morning' : 
    currentHour < 17 ? 'afternoon' : 
    currentHour < 21 ? 'evening' : 'night'

  const getTimeBasedGradient = () => {
    switch (timeOfDay) {
      case 'morning':
        return 'from-yellow-400 via-orange-300 to-pink-300'
      case 'afternoon':
        return 'from-blue-400 via-cyan-300 to-blue-300'
      case 'evening':
        return 'from-purple-400 via-pink-300 to-red-300'
      case 'night':
        return 'from-indigo-900 via-purple-700 to-blue-800'
      default:
        return 'from-blue-400 via-purple-400 to-pink-400'
    }
  }

  const getGreeting = () => {
    return `Good ${timeOfDay}, John`
  }

  return (
    <motion.div
      {...animations.spring}
      className="col-span-8 row-span-4"
    >
      <Card className={`h-full glass gradient-border overflow-hidden relative bg-gradient-to-br ${getTimeBasedGradient()}`}>
        <CardContent className="p-8 h-full flex flex-col justify-between relative z-10">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {timeOfDay === 'morning' && (
              <>
                <motion.div
                  className="absolute top-6 right-8 w-16 h-16 bg-yellow-300 rounded-full opacity-60"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bg-white/20 rounded-full"
                    style={{
                      width: (animationSeeds[i] || 0.5) * 60 + 20,
                      height: (animationSeeds[i] || 0.5) * 30 + 10,
                      top: `${(animationSeeds[i] || 0.5) * 40 + 10}%`,
                      left: `${(animationSeeds[i] || 0.5) * 80 + 10}%`
                    }}
                    animate={{
                      x: [0, (animationSeeds[i] || 0.5) * 100 - 50],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: (animationSeeds[i] || 0.5) * 10 + 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </>
            )}
            
            {timeOfDay === 'night' && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    style={{
                      top: `${(animationSeeds[i] || 0.5) * 60 + 10}%`,
                      left: `${(animationSeeds[i] || 0.5) * 80 + 10}%`
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: (animationSeeds[i] || 0.5) * 3 + 2,
                      repeat: Infinity,
                      delay: (animationSeeds[i] || 0.5) * 2
                    }}
                  />
                ))}
              </>
            )}
          </div>

          {/* Header */}
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white text-shadow"
            >
              {getGreeting()}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/90"
            >
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </motion.p>
          </div>

          {/* Center content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.p
                key={quote}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-medium text-white/95 italic"
              >
                "{quote}"
              </motion.p>
            </div>
          </motion.div>

          {/* Footer stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-4 text-center"
          >
            <div className="glass p-3 rounded-lg">
              <div className="text-2xl font-bold text-white">12°C</div>
              <div className="text-xs text-white/80">Weather</div>
            </div>
            <div className="glass p-3 rounded-lg">
              <div className="text-2xl font-bold text-white">5</div>
              <div className="text-xs text-white/80">Tasks Today</div>
            </div>
            <div className="glass p-3 rounded-lg">
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-xs text-white/80">Meetings</div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}