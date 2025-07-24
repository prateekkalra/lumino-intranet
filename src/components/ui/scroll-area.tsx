"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1 scroll-smooth-enhanced widget-scroll-container"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="scroll-area-content">
          {children}
        </div>
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-all duration-300 ease-out hover:bg-muted/20 rounded-full",
        orientation === "vertical" &&
          "h-full w-3 border-l border-l-transparent hover:w-4 p-0.5",
        orientation === "horizontal" &&
          "h-3 flex-col border-t border-t-transparent hover:h-4 p-0.5",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className={cn(
          "relative flex-1 rounded-full transition-all duration-200 ease-out",
          "bg-border/60 hover:bg-border active:bg-border",
          "dark:bg-gray-600/80 dark:hover:bg-gray-500 dark:active:bg-gray-400"
        )}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

// Enhanced ScrollArea component specifically for dashboard widgets
function EnhancedScrollArea({
  className,
  children,
  showScrollIndicator = true,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  showScrollIndicator?: boolean;
}) {
  const [isScrolling, setIsScrolling] = React.useState(false);
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleScroll = React.useCallback(() => {
    setIsScrolling(true);
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  }, []);

  React.useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <ScrollAreaPrimitive.Root
      data-slot="enhanced-scroll-area"
      className={cn("relative overflow-hidden group", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="enhanced-scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-all duration-200 outline-none focus-visible:ring-[3px] focus-visible:outline-1 scroll-smooth-enhanced widget-scroll-container"
        style={{ scrollBehavior: 'smooth' }}
        onScroll={handleScroll}
      >
        <div className="scroll-area-content">
          {children}
        </div>
      </ScrollAreaPrimitive.Viewport>
      
      <ScrollBar 
        className={cn(
          "transition-opacity duration-300",
          isScrolling ? "opacity-100" : "opacity-0 group-hover:opacity-60"
        )} 
      />
      
      {showScrollIndicator && (
        <div 
          className={cn(
            "absolute top-2 right-2 w-1 h-8 bg-gradient-to-b from-primary/20 to-transparent rounded-full transition-opacity duration-300 pointer-events-none",
            isScrolling ? "opacity-100" : "opacity-0"
          )}
        />
      )}
      
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

export { ScrollArea, ScrollBar, EnhancedScrollArea }