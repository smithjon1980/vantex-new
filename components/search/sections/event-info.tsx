"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EventInfoProps {
  value: {
    type: string;
    name: string;
    duration: string;
  };
  onChange: (value: { type: string; name: string; duration: string }) => void;
}

export function EventInfo({ value, onChange }: EventInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Event Information</h3>
      <div className="grid gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Event Type</label>
          <Select
            value={value.type}
            onValueChange={(type) => onChange({ ...value, type })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wedding">Wedding</SelectItem>
              <SelectItem value="corporate">Corporate Event</SelectItem>
              <SelectItem value="concert">Concert</SelectItem>
              <SelectItem value="sports">Sports Event</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Event Name</label>
          <Input
            value={value.name}
            onChange={(e) => onChange({ ...value, name: e.target.value })}
            placeholder="Enter event name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Duration (hours)</label>
          <Input
            type="number"
            value={value.duration}
            onChange={(e) => onChange({ ...value, duration: e.target.value })}
            placeholder="Enter estimated duration"
          />
        </div>
      </div>
    </div>
  );
}