"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ClockSelectProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function ClockSelect({ value, onChange }: ClockSelectProps) {
  const [activeSection, setActiveSection] = useState<"hours" | "minutes">("hours");
  
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const handleHourClick = (hour: number) => {
    const newDate = new Date(value);
    newDate.setHours(hour);
    onChange(newDate);
    setActiveSection("minutes");
  };

  const handleMinuteClick = (minute: number) => {
    const newDate = new Date(value);
    newDate.setMinutes(minute);
    onChange(newDate);
  };

  return (
    <div className="w-[300px]">
      <div className="flex gap-2 mb-4">
        <Button
          variant={activeSection === "hours" ? "default" : "outline"}
          onClick={() => setActiveSection("hours")}
          className="flex-1"
        >
          Hours
        </Button>
        <Button
          variant={activeSection === "minutes" ? "default" : "outline"}
          onClick={() => setActiveSection("minutes")}
          className="flex-1"
        >
          Minutes
        </Button>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {activeSection === "hours"
          ? hours.map((hour) => (
              <Button
                key={hour}
                variant="outline"
                className={cn(
                  "h-10 p-0",
                  value.getHours() === hour && "bg-blue-100 border-blue-500"
                )}
                onClick={() => handleHourClick(hour)}
              >
                {hour.toString().padStart(2, "0")}
              </Button>
            ))
          : minutes.map((minute) => (
              <Button
                key={minute}
                variant="outline"
                className={cn(
                  "h-10 p-0",
                  value.getMinutes() === minute && "bg-blue-100 border-blue-500"
                )}
                onClick={() => handleMinuteClick(minute)}
              >
                {minute.toString().padStart(2, "0")}
              </Button>
            ))}
      </div>
    </div>
  );
}</boltArtifact>

<boltArtifact id="update-time-selector" title="Update Time Selector Component">
<boltAction type="file" filePath="components/search/sections/time-selector.tsx">"use client";

import { format } from "date-fns";
import { Clock } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ClockSelect } from "@/components/ui/clock-select";

interface TimeSelectorProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function TimeSelector({ value, onChange }: TimeSelectorProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[120px]">
          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
          {format(value, "HH:mm")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4" align="center">
        <div className="flex flex-col items-center space-y-4">
          <ClockSelect value={value} onChange={onChange} />
          <div className="text-2xl font-semibold text-gray-900">
            {format(value, "HH:mm")}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}