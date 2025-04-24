// src/app/components/ui/Card.tsx
import * as React from "react"

import { cn } from "@/lib/utils" // Adjust path if needed

// --- Card ---
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm", // Base card styles
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

// --- CardHeader ---
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)} // Header padding and layout
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

// --- CardTitle ---
const CardTitle = React.forwardRef<
  HTMLParagraphElement, // Often rendered as a heading, but p is safe ref type
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3 // Render as h3 by default
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight", // Title styling
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

// --- CardDescription ---
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)} // Description styling
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

// --- CardContent ---
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} /> // Content padding (no top padding if header exists)
))
CardContent.displayName = "CardContent"

// --- CardFooter ---
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)} // Footer padding and layout
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }