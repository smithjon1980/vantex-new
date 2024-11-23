"use client";

import { useEffect, useState } from "react";

export function useGoogleMaps() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      setReady(true);
    } else {
      const checkGoogleMaps = setInterval(() => {
        if (window.google) {
          setReady(true);
          clearInterval(checkGoogleMaps);
        }
      }, 100);

      return () => clearInterval(checkGoogleMaps);
    }
  }, []);

  return { ready };
}