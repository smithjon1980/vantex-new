"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { DateSelector } from "../sections/date-selector";
import { PassengerInfo } from "../sections/passenger-info";
import { LocationInfo } from "../sections/location-info";
import { MedicalInfo } from "../sections/medical-info";

export default function MedicalTransfer() {
  const [medicalInfo, setMedicalInfo] = useState({
    appointmentType: "",
    facility: "",
    requirements: "",
  });
  const [date, setDate] = useState<Date>();
  const [passengers, setPassengers] = useState({
    count: 1,
    names: [{ name: "", type: "adult", requirements: "" }],
  });
  const [locations, setLocations] = useState({
    pickup: "",
    dropoff: "",
    stops: [],
  });

  const handleSearch = () => {
    console.log("Medical transfer:", {
      medicalInfo,
      date,
      passengers,
      locations,
    });
  };

  return (
    <div className="space-y-6">
      <MedicalInfo value={medicalInfo} onChange={setMedicalInfo} />
      
      <DateSelector
        label="Appointment Date"
        value={date}
        onChange={setDate}
      />

      <LocationInfo
        value={locations}
        onChange={setLocations}
        showStops={true}
      />

      <PassengerInfo value={passengers} onChange={setPassengers} />

      <Button
        size="lg"
        className="w-full bg-blue-600 hover:bg-blue-700 shadow-md"
        onClick={handleSearch}
      >
        <Search className="mr-2 h-4 w-4" />
        Book Medical Transport
      </Button>
    </div>
  );
}