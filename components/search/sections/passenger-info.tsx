"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Minus, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface Passenger {
  name: string;
  type: string;
  requirements: string;
}

interface PassengerInfoProps {
  value: {
    count: number;
    names: Passenger[];
  };
  onChange: (value: { count: number; names: Passenger[] }) => void;
}

export function PassengerInfo({ value, onChange }: PassengerInfoProps) {
  const addPassenger = () => {
    onChange({
      count: value.count + 1,
      names: [...value.names, { name: "", type: "adult", requirements: "" }],
    });
  };

  const removePassenger = (index: number) => {
    if (value.count > 1) {
      onChange({
        count: value.count - 1,
        names: value.names.filter((_, i) => i !== index),
      });
    }
  };

  const updatePassenger = (index: number, updates: Partial<Passenger>) => {
    const newPassengers = [...value.names];
    newPassengers[index] = { ...newPassengers[index], ...updates };
    onChange({
      ...value,
      names: newPassengers,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-blue-600" />
        <h3 className="font-medium">Passenger Information</h3>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Total Passengers: {value.count}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addPassenger}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Passenger
        </Button>
      </div>

      <div className="space-y-4">
        {value.names.map((passenger, index) => (
          <Card key={index} className="p-4 bg-slate-50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Passenger {index + 1}</h4>
              {value.count > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removePassenger(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  value={passenger.name}
                  onChange={(e) =>
                    updatePassenger(index, { name: e.target.value })
                  }
                  placeholder="Enter passenger name"
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Passenger Type</label>
                <Select
                  value={passenger.type}
                  onValueChange={(type) => updatePassenger(index, { type })}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adult">Adult</SelectItem>
                    <SelectItem value="child">Child (2-12 years)</SelectItem>
                    <SelectItem value="infant">Infant (under 2 years)</SelectItem>
                    <SelectItem value="senior">Senior (65+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">
                  Special Requirements
                  <span className="text-muted-foreground ml-2 text-sm font-normal">
                    (Optional)
                  </span>
                </label>
                <Textarea
                  value={passenger.requirements}
                  onChange={(e) =>
                    updatePassenger(index, { requirements: e.target.value })
                  }
                  placeholder="Enter any special requirements (e.g., wheelchair access, medical equipment)"
                  className="bg-white min-h-[80px]"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}