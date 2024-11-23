"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimeSelector } from "./time-selector";

interface DateSelectorProps {
  label: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  includeTime?: boolean;
}

export function DateSelector({ 
  label, 
  value, 
  onChange,
  includeTime = true 
}: DateSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="grid gap-2 md:grid-cols-[1fr,auto]">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal input-apple",
                !value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(value, "PPP") : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={onChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        {includeTime && value && (
          <TimeSelector
            value={value}
            onChange={(newDate) => onChange(newDate)}
          />
        )}
      </div>
    </div>
  );
}