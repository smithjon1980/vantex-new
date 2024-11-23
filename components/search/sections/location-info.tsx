"use client";

import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { LocationInput } from "./location-input";

interface LocationInfoProps {
  value: {
    pickup: string;
    dropoff: string;
    stops: string[];
  };
  onChange: (value: { pickup: string; dropoff: string; stops: string[] }) => void;
  showStops?: boolean;
}

export function LocationInfo({ value, onChange, showStops = false }: LocationInfoProps) {
  const addStop = () => {
    onChange({
      ...value,
      stops: [...value.stops, ""],
    });
  };

  const removeStop = (index: number) => {
    onChange({
      ...value,
      stops: value.stops.filter((_, i) => i !== index),
    });
  };

  const updateStop = (index: number, location: string) => {
    const newStops = [...value.stops];
    newStops[index] = location;
    onChange({
      ...value,
      stops: newStops,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Location Information</h3>
      <div className="grid gap-4">
        <LocationInput
          label="Pickup Location"
          value={value.pickup}
          onChange={(address) => onChange({ ...value, pickup: address })}
          placeholder="Enter pickup location"
        />
        
        {showStops && value.stops.map((stop, index) => (
          <div key={index} className="flex gap-2">
            <div className="flex-1">
              <LocationInput
                label={`Stop ${index + 1}`}
                value={stop}
                onChange={(address) => updateStop(index, address)}
                placeholder="Enter stop location"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="mt-8"
              onClick={() => removeStop(index)}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {showStops && (
          <Button
            type="button"
            variant="outline"
            onClick={addStop}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Stop
          </Button>
        )}

        <LocationInput
          label="Dropoff Location"
          value={value.dropoff}
          onChange={(address) => onChange({ ...value, dropoff: address })}
          placeholder="Enter dropoff location"
        />
      </div>
    </div>
  );
}