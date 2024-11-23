"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useGoogleMaps } from './use-google-maps';
import { useDebounce } from 'use-debounce';

interface Suggestion {
  place_id: string;
  description: string;
}

interface UsePlacesProps {
  onSelect: (address: string, coordinates?: { lat: number; lng: number }) => void;
}

export function usePlaces({ onSelect }: UsePlacesProps) {
  const { ready: mapsReady } = useGoogleMaps();
  const mountedRef = useRef(true);
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounce(value, 300);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (mapsReady && window.google && !autocompleteServiceRef.current) {
      try {
        autocompleteServiceRef.current = new google.maps.places.AutocompleteService();
        const mapDiv = document.createElement('div');
        placesServiceRef.current = new google.maps.places.PlacesService(mapDiv);
        sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken();
      } catch (error) {
        console.error('Error initializing Places services:', error);
      }
    }
  }, [mapsReady]);

  const fetchSuggestions = useCallback(async () => {
    if (!autocompleteServiceRef.current || !debouncedValue.trim() || !mountedRef.current) {
      setSuggestions([]);
      return;
    }

    try {
      const request: google.maps.places.AutocompletionRequest = {
        input: debouncedValue,
        componentRestrictions: { country: 'us' },
        types: ['geocode', 'establishment'],
        sessionToken: sessionTokenRef.current || undefined,
      };

      const response = await new Promise<google.maps.places.AutocompletePrediction[]>((resolve, reject) => {
        autocompleteServiceRef.current?.getPlacePredictions(
          request,
          (predictions, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
              resolve(predictions);
            } else {
              reject(status);
            }
          }
        );
      });
      
      if (mountedRef.current) {
        setSuggestions(
          response.map(prediction => ({
            place_id: prediction.place_id,
            description: prediction.description
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      if (mountedRef.current) {
        setSuggestions([]);
      }
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (debouncedValue) {
      fetchSuggestions();
    } else if (mountedRef.current) {
      setSuggestions([]);
    }
  }, [debouncedValue, fetchSuggestions]);

  const handleSelect = useCallback(async (address: string) => {
    setValue(address);
    
    if (placesServiceRef.current && mountedRef.current) {
      try {
        const request: google.maps.places.FindPlaceFromQueryRequest = {
          query: address,
          fields: ['formatted_address', 'geometry']
        };
        
        placesServiceRef.current.findPlaceFromQuery(request, (results, status) => {
          if (!mountedRef.current) return;

          if (status === google.maps.places.PlacesServiceStatus.OK && results?.[0]) {
            const place = results[0];
            const location = place.geometry?.location;
            
            onSelect(
              place.formatted_address || address,
              location ? { lat: location.lat(), lng: location.lng() } : undefined
            );

            sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken();
          } else {
            onSelect(address);
          }
        });
      } catch (error) {
        console.error('Error getting place details:', error);
        if (mountedRef.current) {
          onSelect(address);
        }
      }
    } else if (mountedRef.current) {
      onSelect(address);
    }
  }, [onSelect]);

  return {
    ready: mapsReady && !!autocompleteServiceRef.current,
    value,
    setValue,
    suggestions,
    handleSelect,
  };
}