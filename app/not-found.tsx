import Link from "next/link";
import { PongGame } from "@/components/ui/pong-game";
import { Button } from "@/components/ui/button";

export default function NotFound() {
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
          404
        </h1>
        <p className="text-muted-foreground text-2xl md:text-3xl mb-8 max-w-2xl font-medium">
          Not found
        </p>

        <div className="w-full flex items-center justify-center mb-12">
          <PongGame />
        </div>

        <Link href="/">
          <Button variant="outline" size="lg" className="rounded-full">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
