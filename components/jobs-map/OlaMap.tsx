"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { OlaMaps } from 'olamaps-web-sdk';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Briefcase, LocateFixed } from 'lucide-react';

const geojsonData = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', properties: { id: 1, name: "Google", logo: "G", color: "bg-blue-500", industry: "Tech", activeJobs: 24 }, geometry: { type: 'Point', coordinates: [77.6534, 12.9815] } },
    { type: 'Feature', properties: { id: 2, name: "Amazon", logo: "A", color: "bg-amber-500", industry: "Tech", activeJobs: 45 }, geometry: { type: 'Point', coordinates: [77.6596, 12.9901] } },
    { type: 'Feature', properties: { id: 3, name: "Microsoft", logo: "M", color: "bg-blue-600", industry: "Tech", activeJobs: 15 }, geometry: { type: 'Point', coordinates: [77.6598, 12.9069] } },
    { type: 'Feature', properties: { id: 4, name: "Deloitte", logo: "D", color: "bg-emerald-600", industry: "Consulting", activeJobs: 30 }, geometry: { type: 'Point', coordinates: [77.7121, 12.9738] } },
    { type: 'Feature', properties: { id: 5, name: "Infosys", logo: "I", color: "bg-blue-800", industry: "IT Services", activeJobs: 100 }, geometry: { type: 'Point', coordinates: [77.6631, 12.8465] } },
    { type: 'Feature', properties: { id: 6, name: "Google", logo: "G", color: "bg-blue-500", industry: "Tech", activeJobs: 18 }, geometry: { type: 'Point', coordinates: [78.3731, 17.4478] } },
    { type: 'Feature', properties: { id: 7, name: "Amazon", logo: "A", color: "bg-amber-500", industry: "Tech", activeJobs: 60 }, geometry: { type: 'Point', coordinates: [78.3444, 17.4168] } },
    { type: 'Feature', properties: { id: 8, name: "Microsoft", logo: "M", color: "bg-blue-600", industry: "Tech", activeJobs: 22 }, geometry: { type: 'Point', coordinates: [78.3582, 17.4435] } },
    { type: 'Feature', properties: { id: 9, name: "Deloitte", logo: "D", color: "bg-emerald-600", industry: "Consulting", activeJobs: 40 }, geometry: { type: 'Point', coordinates: [78.3745, 17.4452] } },
    { type: 'Feature', properties: { id: 10, name: "Infosys", logo: "I", color: "bg-blue-800", industry: "IT Services", activeJobs: 85 }, geometry: { type: 'Point', coordinates: [78.3842, 17.4357] } },
  ]
};

export function OlaMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstance = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedCompany, setSelectedCompany] = useState<any | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const locateUser = useCallback(() => {
    const map = mapInstance.current;
    if (!map) return;
    const apiKey = process.env.NEXT_PUBLIC_OLA_MAPS_API_KEY || 'PLACEHOLDER_KEY';

    if (navigator.geolocation && apiKey !== 'PLACEHOLDER_KEY') {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { longitude, latitude } = position.coords;
          try {
            // Fetch Ola Maps Reverse Geocoding
            const revRes = await fetch(`https://api.olamaps.io/places/v1/reverse-geocode?latlng=${latitude},${longitude}&api_key=${apiKey}`);
            const revData = await revRes.json();
            
            let snappedLng = longitude;
            let snappedLat = latitude;
            
            if (revData.status === "ok" && revData.results && revData.results.length > 0) {
               const components = revData.results[0].address_components;
               let city = "";
               if (components) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const cityComp = components.find((c: any) => c.types.includes('locality') || c.types.includes('administrative_area_level_2'));
                  if (cityComp) city = cityComp.long_name;
               }
               
               if (city) {
                  // Forward Geocode City
                  const fwdRes = await fetch(`https://api.olamaps.io/places/v1/geocode?address=${city}&api_key=${apiKey}`);
                  const fwdData = await fwdRes.json();
                  if (fwdData.status === "ok" && fwdData.geocodingResults && fwdData.geocodingResults.length > 0) {
                     const location = fwdData.geocodingResults[0].geometry.location;
                     snappedLng = location.lng;
                     snappedLat = location.lat;
                  }
               }
            } else {
               // Fallback: round coordinates to 1 decimal place to approximate city level (privacy)
               snappedLng = Math.round(longitude * 10) / 10;
               snappedLat = Math.round(latitude * 10) / 10;
            }

            if (map.flyTo) {
              map.flyTo({ center: [snappedLng, snappedLat], zoom: 10 });
            }
          } catch (err) {
            console.error("Geocoding failed", err);
          } finally {
            setIsLocating(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocating(false);
        }
      );
    }
  }, []);

  useEffect(() => {
    let map: any = null;
    let isMounted = true;

    async function initializeMap() {
      if (!mapRef.current) return;

      const apiKey = process.env.NEXT_PUBLIC_OLA_MAPS_API_KEY || 'PLACEHOLDER_KEY';
      
      try {
        const olaMaps = new OlaMaps({ apiKey });
        
        map = await olaMaps.init({
          style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
          container: mapRef.current,
          center: [77.5946, 12.9716],
          zoom: 6
        });
        
        if (!isMounted) return;
        mapInstance.current = map;

        map.on('load', () => {
          if (!map.getSource('companies')) {
            map.addSource('companies', {
              type: 'geojson',
              data: geojsonData,
              cluster: true,
              clusterMaxZoom: 14,
              clusterRadius: 50
            });

            map.addLayer({
              id: 'clusters',
              type: 'circle',
              source: 'companies',
              filter: ['has', 'point_count'],
              paint: {
                'circle-color': ['step', ['get', 'point_count'], '#ed0004', 5, '#c70003', 10, '#9e0002'],
                'circle-radius': ['step', ['get', 'point_count'], 20, 5, 25, 10, 30],
                'circle-stroke-width': 3,
                'circle-stroke-color': '#ffffff'
              }
            });

            map.addLayer({
              id: 'cluster-count',
              type: 'symbol',
              source: 'companies',
              filter: ['has', 'point_count'],
              layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['Open Sans Regular'],
                'text-size': 14,
              },
              paint: {
                'text-color': '#ffffff'
              }
            });

            map.addLayer({
              id: 'unclustered-point',
              type: 'circle',
              source: 'companies',
              filter: ['!', ['has', 'point_count']],
              paint: {
                'circle-color': '#000000',
                'circle-radius': 18,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff'
              }
            });

            map.addLayer({
              id: 'unclustered-point-label',
              type: 'symbol',
              source: 'companies',
              filter: ['!', ['has', 'point_count']],
              layout: {
                'text-field': ['get', 'logo'],
                'text-font': ['Open Sans Regular'],
                'text-size': 16,
              },
              paint: {
                'text-color': '#ffffff'
              }
            });

            // Interactivity
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            map.on('click', 'clusters', (e: any) => {
              const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
              if (!features.length) return;
              const clusterId = features[0].properties.cluster_id;
              const source = map.getSource('companies');
              
              if (source.getClusterExpansionZoom) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                source.getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
                  if (err) return;
                  map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                  });
                });
              } else {
                 map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: map.getZoom() + 2
                 });
              }
            });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            map.on('click', 'unclustered-point', (e: any) => {
              if (!e.features.length) return;
              const feature = e.features[0];
              setSelectedCompany({
                 name: feature.properties.name,
                 logo: feature.properties.logo,
                 color: feature.properties.color,
                 industry: feature.properties.industry,
                 activeJobs: feature.properties.activeJobs
              });
              map.easeTo({
                 center: feature.geometry.coordinates,
                 zoom: 14
              });
            });

            map.on('mouseenter', 'clusters', () => { map.getCanvas().style.cursor = 'pointer'; });
            map.on('mouseleave', 'clusters', () => { map.getCanvas().style.cursor = ''; });
            map.on('mouseenter', 'unclustered-point', () => { map.getCanvas().style.cursor = 'pointer'; });
            map.on('mouseleave', 'unclustered-point', () => { map.getCanvas().style.cursor = ''; });
          }
        });

        // Trigger initial geolocate
        setTimeout(() => {
          locateUser();
        }, 500);

      } catch (e) {
        console.error("Ola Maps SDK error:", e);
      }
    }

    initializeMap();

    return () => {
      isMounted = false;
      if (mapInstance.current) {
        // mapInstance.current.remove();
      }
    };
  }, [locateUser]);

  return (
    <div className="relative w-full h-full bg-secondary flex">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Locate Me Button */}
      <button 
        onClick={locateUser}
        disabled={isLocating}
        className="absolute bottom-6 left-6 md:left-8 z-20 w-12 h-12 bg-background/90 backdrop-blur-xl border border-border rounded-2xl shadow-lg flex items-center justify-center text-foreground hover:bg-secondary transition-colors disabled:opacity-50"
        aria-label="Find My City"
        title="Go to my city"
      >
        <LocateFixed className={`w-5 h-5 ${isLocating ? 'animate-pulse text-primary' : ''}`} />
      </button>

      {!process.env.NEXT_PUBLIC_OLA_MAPS_API_KEY && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-6 text-center pointer-events-none">
          <MapPin className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-medium mb-2">Map Configuration Required</h3>
          <p className="text-muted-foreground max-w-md">
            Please add NEXT_PUBLIC_OLA_MAPS_API_KEY to your environment variables to render the live map and data.
          </p>
        </div>
      )}

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
    </div>
  );
}
