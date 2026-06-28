"use client"

import { useEffect } from "react"
import { getCalApi } from "@calcom/embed-react"

interface BookDemoButtonProps {
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  className?: string
  children?: React.ReactNode
}

const sizeClasses = {
  sm: "px-5 py-2.5 text-[14px]",
  md: "px-8 py-4 text-[16px]",
  lg: "px-10 py-5 text-[18px]",
}

export function BookDemoButton({
  variant = "secondary",
  size = "md",
  className = "",
  children = "Book a Demo",
}: BookDemoButtonProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "loopx-demo" })
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#ed0004" },
          dark: { "cal-brand": "#ed0004" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      })
    })()
  }, [])

  const baseClasses =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:opacity-90 shadow-md shadow-primary/20"
      : "bg-secondary border border-border text-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md"

  return (
    <button
      data-cal-namespace="loopx-demo"
      data-cal-link="redstring/loopx-demo"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"auto"}'
      className={`rounded-full font-medium transition-all hover:-translate-y-0.5 duration-300 inline-flex items-center justify-center ${baseClasses} ${sizeClasses[size]} ${className}`}
      style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
    >
      {children}
    </button>
  )
}
