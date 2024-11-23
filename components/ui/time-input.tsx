"use client";

import { Input } from "./input";
import { useState } from "react";

interface TimeInputProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function TimeInput({ value, onChange }: TimeInputProps) {
  const [time, setTime] = useState(
    value.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    })
  );

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    
    const [hours, minutes] = newTime.split(':').map(Number);
    if (!isNaN(hours) && !isNaN(minutes)) {
      const newDate = new Date(value);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      onChange(newDate);
    }
  };

  return (
    <Input
      type="time"
      value={time}
      onChange={(e) => handleTimeChange(e.target.value)}
      className="w-full"
    />
  );
}