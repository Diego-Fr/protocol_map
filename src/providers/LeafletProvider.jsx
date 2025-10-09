"use client";

import { useEffect, useState, createContext, useContext } from "react";

const LeafletContext = createContext(null);

export function LeafletProvider({ children }) {
  const [L, setL] = useState(null);

  useEffect(() => {
    (async () => {
      const leaflet = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      await import("leaflet-control-geocoder");
      await import("leaflet-control-geocoder/dist/Control.Geocoder.css");

      setL(leaflet);
      // window.L = leaflet; // opcional, para plugins externos
    })();
  }, []);

  return (
    <LeafletContext.Provider value={L}>{children}</LeafletContext.Provider>
  );
}

export const useLeaflet = () => useContext(LeafletContext);