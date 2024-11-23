"use client";

import { useState } from 'react';
import { useDebounce } from 'use-debounce';

interface FlightData {
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  status: string;
}

interface ValidationResult {
  isValid: boolean;
  message: string;
  flightData?: FlightData;
}

export function useFlightValidation() {
  const [result, setResult] = useState<ValidationResult>({ 
    isValid: true, 
    message: '' 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedValidate] = useDebounce(validateFlight, 800);

  async function validateFlight(flightNumber: string) {
    if (!flightNumber) {
      setResult({ isValid: false, message: 'Flight number is required' });
      return;
    }

    // Flight number format validation (example: AA1234)
    const flightNumberRegex = /^[A-Z]{2}\d{1,4}$/;
    if (!flightNumberRegex.test(flightNumber)) {
      setResult({
        isValid: false,
        message: 'Invalid flight number format (e.g., AA1234)',
      });
      return;
    }

    setIsLoading(true);

    try {
      // In a real application, you would make an API call here
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate API response
      if (flightNumber === 'AA1234') {
        setResult({
          isValid: true,
          message: 'Flight found',
          flightData: {
            airline: 'American Airlines',
            flightNumber: 'AA1234',
            departure: 'DFW International Airport (DFW)',
            arrival: 'Los Angeles International Airport (LAX)',
            status: 'scheduled',
          },
        });
      } else {
        setResult({
          isValid: false,
          message: 'Flight not found. Please check the flight number.',
        });
      }
    } catch (error) {
      console.error('Flight validation error:', error);
      setResult({
        isValid: false,
        message: 'Unable to validate flight. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    validateFlight: debouncedValidate,
    validationResult: result,
    isLoading,
  };
}