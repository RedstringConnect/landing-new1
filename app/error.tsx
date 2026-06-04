"use client";

import { useEffect } from "react";
import { PongGame } from "@/components/ui/pong-game";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background">
      {/* Website Aesthetics Background (Matches Playground/General Theme) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 dark:opacity-20 pointer-events-none" />
      <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSIvPgo8cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9InJnYmEoMTI4LDEyOCwxMjgsMC4wNSkiLz4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9InJnYmEoMTI4LDEyOCwxMjgsMC4wNSkiLz4KPC9zdmc+')] pointer-events-none opacity-50 dark:opacity-30" />
      
      {/* Global Platform Vertical Grid Lines */}
      <div className="pointer-events-none absolute inset-y-0 left-4 w-px bg-border md:left-16 z-0" />
      <div className="pointer-events-none absolute inset-y-0 right-4 w-px bg-border md:right-16 z-0" />

      <div className="z-10 flex flex-col items-center justify-center text-center px-4 w-full h-full my-auto flex-1">
        <h1 className="text-8xl md:text-9xl font-bold tracking-tight mb-2 text-foreground">
          500
        </h1>
        <p className="text-muted-foreground text-2xl md:text-3xl mb-8 max-w-2xl font-medium">
          Server Error
        </p>

        <div className="w-full flex items-center justify-center mb-12">
          <PongGame />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={() => reset()} size="lg" className="rounded-full">
            Try Again
          </Button>
          <Button onClick={() => window.location.href = "/"} variant="outline" size="lg" className="rounded-full">
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
