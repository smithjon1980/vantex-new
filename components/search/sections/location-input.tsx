"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlaces } from "@/lib/hooks/use-places-autocomplete";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  error?: string;
}

export function LocationInput({
  value,
  onChange,
  label,
  placeholder = "Search for location...",
  error,
}: LocationInputProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const mountedRef = useRef(true);

  const handleLocationSelect = useCallback((address: string) => {
    if (mountedRef.current) {
      onChange(address);
      setInputValue(address);
      setOpen(false);
    }
  }, [onChange]);

  const {
    ready,
    suggestions,
    setValue: setPlacesValue,
    handleSelect,
  } = usePlaces({
    onSelect: handleLocationSelect,
  });

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (mountedRef.current) {
      setInputValue(value);
    }
  }, [value]);

  const handleInputChange = useCallback((newValue: string) => {
    if (mountedRef.current) {
      setInputValue(newValue);
      setPlacesValue(newValue);
      onChange(newValue);
      setOpen(!!newValue);
    }
  }, [onChange, setPlacesValue]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Popover open={open && ready} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => inputValue && setOpen(true)}
              placeholder={placeholder}
              className={cn(
                "input-apple pl-10",
                error && "border-red-500 focus:border-red-500"
              )}
            />
            <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
        </PopoverTrigger>
        {suggestions.length > 0 && (
          <PopoverContent className="p-0 w-[400px]" align="start">
            <Command>
              <CommandList>
                <CommandGroup>
                  {suggestions.map((suggestion) => (
                    <CommandItem
                      key={suggestion.place_id}
                      onSelect={() => handleSelect(suggestion.description)}
                      className="flex items-center gap-2 px-4 py-2"
                    >
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{suggestion.description}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        )}
      </Popover>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}