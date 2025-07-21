// Custom Skiper UI-like components since the package doesn't exist
// This creates similar functionality to what Skiper UI would provide

import { motion } from "framer-motion"
import React from "react"
import { cn } from "./utils"

export const SkiperCard = motion.div
export const SkiperButton = motion.button
export const SkiperContainer = motion.div

// Animation presets
export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  },
  slideIn: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.3, ease: "easeOut" as const }
  },
  spring: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 }
  },
  hover: {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 }
  },
  float: {
    animate: { y: [-5, 5, -5] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const }
  }
}

// Utility classes for Skiper-like styling
export const skiperStyles = {
  glass: "backdrop-blur-md bg-white/10 border border-white/20 shadow-lg",
  glassDark: "backdrop-blur-md bg-black/10 border border-white/10 shadow-lg",
  gradientBorder: "bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-[1px] rounded-lg",
  glow: "shadow-lg shadow-primary/25",
  hover: "hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
}

// Component factory functions
export function createSkiperComponent(
  element: string,
  baseClasses: string = ""
) {
  const MotionComponent = (motion as any)[element]
  
  return React.forwardRef<any, any>((props, ref) => {
    const { className, children, ...otherProps } = props
    return React.createElement(
      MotionComponent,
      {
        ref,
        className: cn(baseClasses, className),
        ...animations.spring,
        ...otherProps
      },
      children
    )
  })
}