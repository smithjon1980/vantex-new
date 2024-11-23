"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface RoundClockProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function RoundClock({ value, onChange }: RoundClockProps) {
  const clockRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeHand, setActiveHand] = useState<"hour" | "minute" | null>(null);

  const getAngleFromCenter = (e: MouseEvent | TouchEvent) => {
    if (!clockRef.current) return 0;

    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    return (angle + 360) % 360;
  };

  const updateTime = (angle: number) => {
    const newDate = new Date(value);

    if (activeHand === "hour") {
      const hours = Math.round((angle / 360) * 12);
      newDate.setHours(hours);
    } else if (activeHand === "minute") {
      const minutes = Math.round((angle / 360) * 60);
      newDate.setMinutes(minutes);
    }

    onChange(newDate);
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent, hand: "hour" | "minute") => {
    setIsDragging(true);
    setActiveHand(hand);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (isDragging) {
      const angle = getAngleFromCenter(e);
      updateTime(angle);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveHand(null);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchmove', handleMouseMove);
    document.removeEventListener('touchend', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  const hourAngle = (value.getHours() % 12) * 30 + value.getMinutes() * 0.5;
  const minuteAngle = value.getMinutes() * 6;

  return (
    <div 
      ref={clockRef}
      className="relative w-[280px] h-[280px] rounded-full border border-gray-200 bg-white shadow-sm"
    >
      {/* Clock Face */}
      <div className="absolute inset-0 rounded-full">
        {/* Hour Markers */}
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              transform: `rotate(${i * 30}deg)`,
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-gray-300" />
          </div>
        ))}

        {/* Hour Numbers */}
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-120px) rotate(-${i * 30}deg)`,
              left: '50%',
              top: '50%',
            }}
          >
            <span className="text-sm font-medium text-gray-600">
              {i === 0 ? '12' : i}
            </span>
          </div>
        ))}

        {/* Minute Markers */}
        {Array.from({ length: 60 }, (_, i) => (
          i % 5 !== 0 && (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                transform: `rotate(${i * 6}deg)`,
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-gray-200" />
            </div>
          )
        ))}

        {/* Hour Hand */}
        <div
          className={cn(
            "absolute top-1/2 left-1/2 w-[80px] h-1.5 bg-gray-800 rounded-full origin-left cursor-pointer transition-transform",
            activeHand === "hour" && "bg-blue-600"
          )}
          style={{
            transform: `rotate(${hourAngle}deg)`,
          }}
          onMouseDown={(e) => handleMouseDown(e, "hour")}
          onTouchStart={(e) => handleMouseDown(e, "hour")}
        />

        {/* Minute Hand */}
        <div
          className={cn(
            "absolute top-1/2 left-1/2 w-[100px] h-1 bg-gray-600 rounded-full origin-left cursor-pointer transition-transform",
            activeHand === "minute" && "bg-blue-600"
          )}
          style={{
            transform: `rotate(${minuteAngle}deg)`,
          }}
          onMouseDown={(e) => handleMouseDown(e, "minute")}
          onTouchStart={(e) => handleMouseDown(e, "minute")}
        />

        {/* Center Dot */}
        <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full shadow-sm" />
      </div>
    </div>
  );
}