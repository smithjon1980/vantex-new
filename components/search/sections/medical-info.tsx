"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface MedicalInfoProps {
  value: {
    appointmentType: string;
    facility: string;
    requirements: string;
  };
  onChange: (value: {
    appointmentType: string;
    facility: string;
    requirements: string;
  }) => void;
}

export function MedicalInfo({ value, onChange }: MedicalInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Medical Appointment Information</h3>
      <div className="grid gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Appointment Type</label>
          <Select
            value={value.appointmentType}
            onValueChange={(appointmentType) =>
              onChange({ ...value, appointmentType })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select appointment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="routine">Routine Checkup</SelectItem>
              <SelectItem value="specialist">Specialist Visit</SelectItem>
              <SelectItem value="procedure">Medical Procedure</SelectItem>
              <SelectItem value="therapy">Physical Therapy</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Medical Facility</label>
          <Input
            value={value.facility}
            onChange={(e) => onChange({ ...value, facility: e.target.value })}
            placeholder="Enter medical facility name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Special Requirements</label>
          <Textarea
            value={value.requirements}
            onChange={(e) => onChange({ ...value, requirements: e.target.value })}
            placeholder="Enter any special requirements or medical equipment needs"
            className="min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
}