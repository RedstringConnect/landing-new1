import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Jobs Map | Redstring",
  description: "See hiring hotspots in real-time with Redstring's interactive jobs map — powered by Google Maps.",
};
import { OlaMap } from "@/components/jobs-map/OlaMap";
import { MapPin } from "lucide-react";

export default function JobsMapPage() {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block relative w-full h-screen overflow-hidden">
        {/* Navbar in Map Layout mode (includes Logo, Hamburger, and descriptive text) */}
        <Navbar mapLayout={true} />

        {/* Full Screen Map */}
        <div className="absolute inset-0 z-0">
          <OlaMap />
        </div>
      </div>

      {/* Mobile Fallback */}
      <div className="md:hidden flex flex-col items-center justify-center min-h-screen p-6 text-center bg-background">
        <MapPin className="w-12 h-12 text-primary mb-4" />
        <h2 className="text-2xl font-denton mb-3" style={{ fontVariationSettings: "'wdth' 100" }}>
          Desktop Experience Only
        </h2>
        <p className="text-muted-foreground">
          The Redstring Live Jobs Map is optimized for desktop viewing to provide the best interactive map experience. Please open this page on a larger screen!
        </p>
      </div>
    </>
  );
}
