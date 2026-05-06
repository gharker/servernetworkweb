"use client";

import { useEffect } from "react";
import { updateLocation } from "@/actions/location";

export default function LocationUpdater() {
  useEffect(() => {
    if (typeof navigator !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateLocation(position.coords.latitude, position.coords.longitude).catch(console.error);
        },
        (error) => {
          console.warn("Geolocation permission denied or error:", error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    }
  }, []);

  return null;
}
