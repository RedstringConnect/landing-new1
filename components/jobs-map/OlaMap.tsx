"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Briefcase, LocateFixed } from 'lucide-react';

interface Location {
  id: number;
  name: string;
  logo: string;
  color: string;
  industry: string;
  activeJobs: number;
  position: { lat: number; lng: number };
}

const locations: Location[] = [
  { id: 1, name: "Google", logo: "G", color: "bg-primary", industry: "Tech", activeJobs: 24, position: { lat: 12.9815, lng: 77.6534 } },
  { id: 2, name: "Amazon", logo: "A", color: "bg-primary", industry: "Tech", activeJobs: 45, position: { lat: 12.9901, lng: 77.6596 } },
  { id: 3, name: "Microsoft", logo: "M", color: "bg-primary", industry: "Tech", activeJobs: 15, position: { lat: 12.9069, lng: 77.6598 } },
  { id: 4, name: "Deloitte", logo: "D", color: "bg-primary", industry: "Consulting", activeJobs: 30, position: { lat: 12.9738, lng: 77.7121 } },
  { id: 5, name: "Infosys", logo: "I", color: "bg-primary", industry: "IT Services", activeJobs: 100, position: { lat: 12.8465, lng: 77.6631 } },
  { id: 6, name: "Google", logo: "G", color: "bg-primary", industry: "Tech", activeJobs: 18, position: { lat: 17.4478, lng: 78.3731 } },
  { id: 7, name: "Amazon", logo: "A", color: "bg-primary", industry: "Tech", activeJobs: 60, position: { lat: 17.4168, lng: 78.3444 } },
  { id: 8, name: "Microsoft", logo: "M", color: "bg-primary", industry: "Tech", activeJobs: 22, position: { lat: 17.4435, lng: 78.3582 } },
  { id: 9, name: "Deloitte", logo: "D", color: "bg-primary", industry: "Consulting", activeJobs: 40, position: { lat: 17.4452, lng: 78.3745 } },
  { id: 10, name: "Infosys", logo: "I", color: "bg-primary", industry: "IT Services", activeJobs: 85, position: { lat: 17.4357, lng: 78.3842 } },
];

function createMarkerElement(logo: string): HTMLDivElement {
  const el = document.createElement('div');
  el.className = 'w-9 h-9 rounded-full bg-black border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-md cursor-pointer';
  el.textContent = logo;
  return el;
}

function createClusterElement(count: number): HTMLDivElement {
  const el = document.createElement('div');
  el.innerHTML = `<div style="
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #ed0004;
    border: 3px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    box-shadow: 0 2px 8px rgba(0,0,0,.3);
    cursor: pointer;
  ">${count}</div>`;
  return el;
}

function MapContent() {
  const map = useMap();
  const mapRef = useRef(map);

  const [selectedCompany, setSelectedCompany] = useState<Location | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  mapRef.current = map;

  useEffect(() => {
    if (!map) return;

    google.maps.importLibrary('marker').then(({ AdvancedMarkerElement: AdvancedMarkerElement_ }) => {
      const markers: google.maps.marker.AdvancedMarkerElement[] = locations.map((loc) => {
        const m = new AdvancedMarkerElement_({
          position: loc.position,
          map,
          content: createMarkerElement(loc.logo),
        });
        m.addListener('gmp-click', () => {
          setSelectedCompany(loc);
          map.panTo(loc.position);
          map.setZoom(14);
        });
        return m;
      });

      const clusterer = new MarkerClusterer({
        markers,
        map,
        renderer: {
          render: ({ count, position }) =>
            new AdvancedMarkerElement_({ position, content: createClusterElement(count) }),
        },
      });

      const clickListener = map.addListener('click', () => setSelectedCompany(null));

      if (navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition(
          (pos) => {
            console.log('[Map] Geolocation works:', pos.coords.latitude, pos.coords.longitude);
            navigator.geolocation.clearWatch(watchId);
          },
          (err) => console.warn('[Map] Geolocation failed:', err.code, err.message),
          { enableHighAccuracy: false, timeout: 30000, maximumAge: 300000 }
        );
      }

      return () => {
        google.maps.event.removeListener(clickListener);
        clusterer.clearMarkers();
        markers.forEach((m) => (m.map = null));
      };
    });
  }, [map]);

  const locateUser = useCallback(() => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        navigator.geolocation.clearWatch(watchId);
        const m = mapRef.current;
        if (m) {
          m.panTo({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          m.setZoom(12);
        }
        setIsLocating(false);
      },
      () => {
        navigator.geolocation.clearWatch(watchId);
        setIsLocating(false);
      },
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 300000 }
    );
  }, []);

  return (
    <>
      <button
        onClick={locateUser}
        disabled={isLocating}
        className="absolute bottom-6 left-6 md:left-8 z-20 w-12 h-12 bg-background/90 backdrop-blur-xl border border-border rounded-2xl shadow-lg flex items-center justify-center text-foreground hover:bg-secondary transition-colors disabled:opacity-50"
        aria-label="Find My City"
        title="Go to my city"
      >
        <LocateFixed className={`w-5 h-5 ${isLocating ? 'animate-pulse text-primary' : ''}`} />
      </button>

      <AnimatePresence>
        {isLocating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-30 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center gap-5 pointer-events-auto cursor-wait"
          >
            <div className="relative flex items-center justify-center w-20 h-20">
              <svg className="absolute inset-0 w-20 h-20 animate-spin" viewBox="0 0 80 80" fill="none">
                <circle
                  cx="40" cy="40" r="34"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="50 160"
                  className="text-primary"
                />
              </svg>
              <div className="w-12 h-12 rounded-2xl bg-background border border-border shadow-lg flex items-center justify-center">
                <LocateFixed className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Locating you&hellip;</p>
              <p className="text-xs text-muted-foreground mt-1">Finding your city on the map</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCompany && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="absolute top-6 right-6 bottom-6 z-20 w-[400px] pointer-events-auto"
          >
            <div className="bg-background/90 backdrop-blur-xl border border-border rounded-3xl p-6 shadow-2xl relative h-full flex flex-col overflow-y-auto">
              <button
                onClick={() => setSelectedCompany(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl ${selectedCompany.color || 'bg-primary'}`}>
                  {selectedCompany.logo}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{selectedCompany.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedCompany.industry}</p>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-xl p-3 flex items-center justify-between border border-border/50">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Active Listings</span>
                </div>
                <span className="text-primary font-bold">{selectedCompany.activeJobs}</span>
              </div>

              <button className="w-full mt-4 bg-primary text-foreground font-medium py-2.5 rounded-xl hover:bg-primary/90 transition-colors">
                View Company Profile
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function OlaMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="relative w-full h-full bg-secondary flex">
      {!apiKey && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-6 text-center pointer-events-none">
          <MapPin className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-medium mb-2">Map Configuration Required</h3>
          <p className="text-muted-foreground max-w-md">
            Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables to render the live map and data.
          </p>
        </div>
      )}

      {apiKey && (
        <APIProvider apiKey={apiKey} libraries={['marker']}>
          <Map
            defaultCenter={{ lat: 12.9716, lng: 77.5946 }}
            defaultZoom={6}
            mapId="COMPANIES_MAP"
            streetViewControl={false}
            mapTypeControl={false}
            fullscreenControl={false}
            className="w-full h-full"
          >
            <MapContent />
          </Map>
        </APIProvider>
      )}
    </div>
  );
}
