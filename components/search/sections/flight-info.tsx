"use client";

import { useEffect, useState, useRef } from "react";
import { Plane, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { useFlightValidation } from "@/lib/hooks/use-flight-validation";

interface FlightInfoProps {
  value: {
    type: string;
    flightNumber: string;
  };
  onChange: (value: { type: string; flightNumber: string }) => void;
}

export function FlightInfo({ value, onChange }: FlightInfoProps) {
  const mountedRef = useRef(true);
  const [localFlightNumber, setLocalFlightNumber] = useState(value.flightNumber);
  const [isTyping, setIsTyping] = useState(false);
  const { validateFlight, validationResult, isLoading } = useFlightValidation();

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (mountedRef.current) {
      setLocalFlightNumber(value.flightNumber);
    }
  }, [value.flightNumber]);

  useEffect(() => {
    if (value.type === "commercial" && localFlightNumber.length >= 6 && !isTyping && mountedRef.current) {
      validateFlight(localFlightNumber);
    }
  }, [value.type, localFlightNumber, isTyping, validateFlight]);

  const handleFlightNumberChange = (newValue: string) => {
    const formattedValue = newValue.toUpperCase().replace(/\s+/g, '');
    if (/^[A-Z0-9]*$/.test(formattedValue) && formattedValue.length <= 6 && mountedRef.current) {
      setIsTyping(true);
      setLocalFlightNumber(formattedValue);
      onChange({ ...value, flightNumber: formattedValue });
      
      if (formattedValue.length >= 6) {
        const timer = setTimeout(() => {
          if (mountedRef.current) {
            setIsTyping(false);
          }
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2">
        <Plane className="h-5 w-5 text-primary" />
        <h3 className="font-medium">Flight Information</h3>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Flight Type</label>
        <Select 
          value={value.type}
          onValueChange={(newType) => {
            if (mountedRef.current) {
              onChange({
                type: newType,
                flightNumber: "",
              });
              setLocalFlightNumber("");
            }
          }}
        >
          <SelectTrigger className="input-apple">
            <SelectValue placeholder="Select flight type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="commercial">Commercial Flight</SelectItem>
            <SelectItem value="private">Private Flight</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {value.type && (
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {value.type === "commercial" ? "Flight Number" : "Flight Identifier"}
          </label>
          <div className="relative">
            <Input
              value={localFlightNumber}
              onChange={(e) => handleFlightNumberChange(e.target.value)}
              placeholder={value.type === "commercial" ? "Enter flight number (e.g., AA1234)" : "Enter flight identifier"}
              className="input-apple"
              required
            />
            <AnimatePresence>
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-3 top-2.5"
                >
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {localFlightNumber && !validationResult.isValid && !isLoading && !isTyping && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Alert variant="destructive" className="mt-2">
                  <AlertDescription>{validationResult.message}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            {validationResult.flightData && !isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <Card className="card-apple">
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Airline:</span> {validationResult.flightData.airline}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Flight:</span> {validationResult.flightData.flightNumber}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">From:</span> {validationResult.flightData.departure}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">To:</span> {validationResult.flightData.arrival}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Status:</span>{" "}
                      <span className={`font-medium ${
                        validationResult.flightData.status === "active" ? "text-green-600" :
                        validationResult.flightData.status === "scheduled" ? "text-blue-600" :
                        "text-yellow-600"
                      }`}>
                        {validationResult.flightData.status.charAt(0).toUpperCase() + 
                         validationResult.flightData.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}