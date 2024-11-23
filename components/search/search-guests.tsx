"use client";

import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GuestCounter } from "./guest-counter";

interface SearchGuestsProps {
  value: {
    adults: number;
    children: number;
    rooms: number;
  };
  onChange: (guests: {
    adults: number;
    children: number;
    rooms: number;
  }) => void;
}

export function SearchGuests({ value, onChange }: SearchGuestsProps) {
  const totalGuests = value.adults + value.children;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Guests & Rooms</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            {totalGuests} {totalGuests === 1 ? "guest" : "guests"},{" "}
            {value.rooms} {value.rooms === 1 ? "room" : "rooms"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <GuestCounter
              label="Adults"
              value={value.adults}
              onChange={(adults) => onChange({ ...value, adults })}
              min={1}
            />
            <GuestCounter
              label="Children"
              description="Ages 0-17"
              value={value.children}
              onChange={(children) => onChange({ ...value, children })}
            />
            <GuestCounter
              label="Rooms"
              value={value.rooms}
              onChange={(rooms) => onChange({ ...value, rooms })}
              min={1}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}