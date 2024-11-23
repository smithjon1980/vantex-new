"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function TimePicker({ value, onChange }: TimePickerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeHand, setActiveHand] = useState<'hour' | 'minute'>('hour');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw clock face
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#f8fafc';
    ctx.fill();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw hour markers
    for (let i = 1; i <= 12; i++) {
      const angle = (i * Math.PI) / 6 - Math.PI / 2;
      const x = centerX + (radius - 25) * Math.cos(angle);
      const y = centerY + (radius - 25) * Math.sin(angle);
      
      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#475569';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(i.toString(), x, y);
    }

    // Draw minute markers
    for (let i = 0; i < 60; i++) {
      if (i % 5 !== 0) {
        const angle = (i * Math.PI) / 30 - Math.PI / 2;
        const x1 = centerX + (radius - 2) * Math.cos(angle);
        const y1 = centerY + (radius - 2) * Math.sin(angle);
        const x2 = centerX + radius * Math.cos(angle);
        const y2 = centerY + radius * Math.sin(angle);
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Draw hands
    const hours = value.getHours() % 12;
    const minutes = value.getMinutes();
    
    // Hour hand
    const hourAngle = ((hours + minutes / 60) * Math.PI) / 6 - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + radius * 0.5 * Math.cos(hourAngle),
      centerY + radius * 0.5 * Math.sin(hourAngle)
    );
    ctx.strokeStyle = activeHand === 'hour' ? '#2563eb' : '#64748b';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Minute hand
    const minuteAngle = (minutes * Math.PI) / 30 - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + radius * 0.8 * Math.cos(minuteAngle),
      centerY + radius * 0.8 * Math.sin(minuteAngle)
    );
    ctx.strokeStyle = activeHand === 'minute' ? '#2563eb' : '#64748b';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#2563eb';
    ctx.fill();
  }, [value, activeHand]);

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    const angle = Math.atan2(y - centerY, x - centerX);
    let newDate = new Date(value);

    if (activeHand === 'hour') {
      let hours = Math.round(((angle + Math.PI / 2) * 6) / Math.PI) % 12;
      if (hours === 0) hours = 12;
      newDate.setHours(hours);
    } else {
      let minutes = Math.round(((angle + Math.PI / 2) * 30) / Math.PI) % 60;
      if (minutes < 0) minutes += 60;
      newDate.setMinutes(minutes);
    }

    onChange(newDate);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button
          className={cn(
            "px-3 py-1 rounded-md text-sm",
            activeHand === 'hour'
              ? "bg-blue-100 text-blue-700"
              : "hover:bg-gray-100"
          )}
          onClick={() => setActiveHand('hour')}
        >
          Hours
        </button>
        <button
          className={cn(
            "px-3 py-1 rounded-md text-sm",
            activeHand === 'minute'
              ? "bg-blue-100 text-blue-700"
              : "hover:bg-gray-100"
          )}
          onClick={() => setActiveHand('minute')}
        >
          Minutes
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={240}
        height={240}
        className="cursor-pointer touch-none"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseMove={(e) => isDragging && handleInteraction(e)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={(e) => isDragging && handleInteraction(e)}
      />
    </div>
  );
}