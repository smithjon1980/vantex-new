"use client";

import { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';

export function useDebouncedState<T>(initialValue: T, delay: number = 500) {
  const [value, setValue] = useState<T>(initialValue);
  const mountedRef = useRef(false);
  const [debouncedValue] = useDebounce(value, delay);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const setValueSafely = (newValue: T) => {
    if (mountedRef.current) {
      setValue(newValue);
    }
  };

  return [value, debouncedValue, setValueSafely] as const;
}