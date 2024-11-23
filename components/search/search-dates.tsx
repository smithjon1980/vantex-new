"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SearchDatesProps {
  value: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onChange: (dates: { from: Date | undefined; to: Date | undefined }) => void;
}

export function SearchDates({ value, onChange }: SearchDatesProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Check-in & Check-out</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value.from ? (
              value.to ? (
                <>
                  {format(value.from, "MMM d")} - {format(value.to, "MMM d")}
                </>
              ) : (
                format(value.from, "MMM d")
              )
            ) : (
              "Select dates"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value.from}
            selected={{
              from: value.from,
              to: value.to,
            }}
            onSelect={(range) =>
              onChange({
                from: range?.from,
                to: range?.to,
              })
            }
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}