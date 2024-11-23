"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { DateSelector } from "../sections/date-selector";
import { PassengerInfo } from "../sections/passenger-info";
import { LocationInfo } from "../sections/location-info";
import { FlightInfo } from "../sections/flight-info";

interface AirportTransferState {
  flightInfo: {
    type: string;
    flightNumber: string;
  };
  date: Date | undefined;
  passengers: {
    count: number;
    names: Array<{
      name: string;
      type: string;
      requirements: string;
    }>;
  };
  locations: {
    pickup: string;
    dropoff: string;
    stops: string[];
  };
}

export default function AirportTransfer() {
  const [formState, setFormState] = useState<AirportTransferState>({
    flightInfo: {
      type: "commercial",
      flightNumber: "",
    },
    date: undefined,
    passengers: {
      count: 1,
      names: [{ name: "", type: "adult", requirements: "" }],
    },
    locations: {
      pickup: "",
      dropoff: "",
      stops: [],
    },
  });

  const handleSearch = () => {
    if (!formState.date) {
      console.error("Please select a date");
      return;
    }

    if (!formState.locations.pickup || !formState.locations.dropoff) {
      console.error("Please enter pickup and dropoff locations");
      return;
    }

    console.log("Airport transfer booking:", formState);
  };

  return (
    <div className="space-y-6">
      <FlightInfo
        value={formState.flightInfo}
        onChange={(flightInfo) => setFormState({ ...formState, flightInfo })}
      />
      
      <DateSelector
        label="Pickup Date & Time"
        value={formState.date}
        onChange={(date) => setFormState({ ...formState, date })}
      />

      <LocationInfo
        value={formState.locations}
        onChange={(locations) => setFormState({ ...formState, locations })}
        showStops={true}
      />

      <PassengerInfo
        value={formState.passengers}
        onChange={(passengers) => setFormState({ ...formState, passengers })}
      />

      <Button
        size="lg"
        className="w-full bg-blue-600 hover:bg-blue-700 shadow-md"
        onClick={handleSearch}
      >
        <Search className="mr-2 h-4 w-4" />
        Book Airport Transfer
      </Button>
    </div>
  );
}