"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map as MapIcon, Heart, Share2, Award } from "lucide-react";
import { motion } from "framer-motion";
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { LocalMemory } from "./memory-browser";

interface MemoryMapProps {
  memories: LocalMemory[];
  center: { lat: number; lng: number };
  zoom: number;
  onMemorySelect: (memory: LocalMemory) => void;
}

const mapStyles = [
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6c6c6c" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [{ color: "#ffffff" }, { lightness: 17 }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }]
  }
];

export default function MemoryMap({ memories, center, zoom, onMemorySelect }: MemoryMapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [selectedMemory, setSelectedMemory] = useState<LocalMemory | null>(null);

  const markers = useMemo(() => {
    return memories.filter(memory => memory.coordinates).map(memory => ({
      id: memory.id,
      position: memory.coordinates!,
      memory
    }));
  }, [memories]);

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      styles: mapStyles
    }),
    []
  );

  if (!isLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <MapIcon className="h-12 w-12 text-amber-500/50" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      <GoogleMap
        zoom={zoom}
        center={center}
        mapContainerClassName="w-full h-[calc(100vh-20rem)]"
        options={mapOptions}
        onClick={() => setSelectedMemory(null)}
      >
        {markers.map(({ id, position, memory }) => (
          <MarkerF
            key={id}
            position={position}
            onClick={() => setSelectedMemory(memory)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: memory.verificationStatus === "featured" ? "#f59e0b" : "#10b981",
              fillOpacity: 0.9,
              strokeWeight: 2,
              strokeColor: "#ffffff"
            }}
          />
        ))}

        {selectedMemory && selectedMemory.coordinates && (
          <InfoWindowF
            position={selectedMemory.coordinates}
            onCloseClick={() => setSelectedMemory(null)}
          >
            <Card className="w-72 p-3 border-none shadow-none">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-amber-500 text-white border-none">
                    {selectedMemory.category}
                  </Badge>
                  {selectedMemory.verificationStatus === "verified" && (
                    <Badge className="bg-emerald-500 text-white border-none">
                      <Award className="h-3 w-3 mr-1" /> Verified
                    </Badge>
                  )}
                </div>
                
                <h3 className="font-semibold">{selectedMemory.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {selectedMemory.description}
                </p>

                <div className="flex items-center justify-between text-sm pt-2 border-t">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" /> {selectedMemory.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="h-3 w-3" /> {selectedMemory.shares}
                    </span>
                  </div>
                  <button
                    className="text-amber-600 hover:text-amber-700 font-medium text-sm"
                    onClick={() => onMemorySelect(selectedMemory)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </Card>
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  );
}
