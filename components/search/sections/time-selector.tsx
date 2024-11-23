"use client";

import { format } from "date-fns";
import { Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeSelectorProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function TimeSelector({ value, onChange }: TimeSelectorProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = ["00", "15", "30", "45"];

  const currentHour = value.getHours();
  const currentMinute = Math.floor(value.getMinutes() / 15) * 15;

  const handleTimeChange = (type: "hour" | "minute", newValue: string) => {
    const newDate = new Date(value);
    if (type === "hour") {
      newDate.setHours(parseInt(newValue));
    } else {
      newDate.setMinutes(parseInt(newValue));
    }
    onChange(newDate);
  };

  return (
    <div className="flex items-center gap-2">
      <Clock className="h-4 w-4 text-muted-foreground" />
      <Select
        value={currentHour.toString()}
        onValueChange={(value) => handleTimeChange("hour", value)}
      >
        <SelectTrigger className="w-[70px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {hours.map((hour) => (
            <SelectItem key={hour} value={hour.toString()}>
              {hour.toString().padStart(2, "0")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span>:</span>
      <Select
        value={currentMinute.toString()}
        onValueChange={(value) => handleTimeChange("minute", value)}
      >
        <SelectTrigger className="w-[70px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {minutes.map((minute) => (
            <SelectItem key={minute} value={minute}>
              {minute}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}