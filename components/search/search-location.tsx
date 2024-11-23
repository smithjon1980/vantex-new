"use client";

import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchLocationProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchLocation({ value, onChange }: SearchLocationProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Where are you going?</label>
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-9"
          placeholder="Enter destination"
        />
      </div>
    </div>
  );
}