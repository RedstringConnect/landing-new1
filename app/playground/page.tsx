"use client";
import React, { useState, useRef, useEffect, MouseEvent } from "react";
import { TestimonialCard, testimonials } from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { DotLoader } from "@/components/ui/dot-loader";

const COMPONENT_REGISTRY = [
  {
    name: "TestimonialCard",
    render: () => (
      <div className="w-[320px]">
        <TestimonialCard testimonial={testimonials[0]} />
      </div>
    ),
  },
  {
    name: "Button",
    render: () => (
      <div className="flex gap-4 p-8 bg-card rounded-xl border border-border">
        <Button>Default Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </div>
    ),
  },
  {
    name: "DotLoader",
    render: () => (
      <div className="p-12 bg-card rounded-xl border border-border flex items-center justify-center">
        <DotLoader />
      </div>
    )
  }
];

export default function PlaygroundPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const dragStart = useRef({ x: 0, y: 0 });

  const activeComponent = COMPONENT_REGISTRY[activeIndex];

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.25));
  const handleZoomReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "=" || e.key === "+") {
          e.preventDefault();
          setZoom((z) => Math.min(z + 0.25, 3));
        } else if (e.key === "-") {
          e.preventDefault();
          setZoom((z) => Math.max(z - 0.25, 0.25));
        } else if (e.key === "0") {
          e.preventDefault();
          setZoom(1);
          setPan({ x: 0, y: 0 });
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown, { passive: false });

    const canvas = document.getElementById("canvas-workspace");
    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault(); // Stop browser scrolling/zooming
      // Zoom in/out with normal scroll or ctrl+scroll
      const zoomDelta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom((z) => Math.max(0.25, Math.min(z + zoomDelta, 3)));
    };
    canvas?.addEventListener("wheel", handleNativeWheel, { passive: false });

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("keydown", handleKeyDown);
      canvas?.removeEventListener("wheel", handleNativeWheel);
    };
  }, []);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-card flex flex-col h-full shrink-0 z-20">
        <div className="p-4 border-b border-border">
          <h1 className="font-bold text-lg">Playground</h1>
          <p className="text-xs text-muted-foreground mt-1">Component Library</p>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {COMPONENT_REGISTRY.map((comp, idx) => (
            <button
              key={comp.name}
              onClick={() => {
                setActiveIndex(idx);
                handleZoomReset();
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                activeIndex === idx 
                  ? "bg-primary text-primary-foreground font-medium" 
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {comp.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] dark:bg-[#09090b]">
        
        {/* Toolbar */}
        <div className="h-14 border-b border-border bg-card/80 backdrop-blur-md flex items-center justify-between px-4 shrink-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{activeComponent.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={handleZoomOut}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title="Zoom Out"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
              </button>
              <button 
                onClick={handleZoomReset}
                className="w-12 text-center text-xs font-medium hover:text-primary transition-colors cursor-pointer select-none"
                title="Reset Zoom & Pan"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button 
                onClick={handleZoomIn}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title="Zoom In"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Canvas Workspace */}
        <div 
          id="canvas-workspace"
          className={`flex-1 overflow-hidden relative select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Panning Container */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px)`,
            }}
          >
            {/* Zooming Container */}
            <div 
              className="origin-center relative transition-transform duration-100"
              style={{ 
                transform: `scale(${zoom})`,
              }}
            >
              {/* Checkerboard Background */}
              <div className="absolute inset-[-200px] -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSIvPgo8cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9InJnYmEoMTI4LDEyOCwxMjgsMC4wNSkiLz4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9InJnYmEoMTI4LDEyOCwxMjgsMC4wNSkiLz4KPC9zdmc+')] rounded-[32px] pointer-events-none" />
              
              {/* Component Wrapper */}
              <div className="bg-transparent pointer-events-auto" onMouseDown={(e) => e.stopPropagation()}>
                {activeComponent.render()}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
