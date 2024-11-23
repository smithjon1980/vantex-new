"use client";

import { Button } from "@/components/ui/button";
import { SearchLocation } from "./search-location";
import { SearchDates } from "./search-dates";
import { SearchGuests } from "./search-guests";
import { Search } from "lucide-react";
import { SearchFormState } from "@/types/search";

export function SearchFormContent({
  location,
  setLocation,
  dates,
  setDates,
  guests,
  setGuests,
  handleSearch,
}: SearchFormState) {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr,1fr,1fr,auto]">
      <SearchLocation value={location} onChange={setLocation} />
      <SearchDates value={dates} onChange={setDates} />
      <SearchGuests value={guests} onChange={setGuests} />
      <Button
        size="lg"
        className="h-full bg-blue-600 hover:bg-blue-700 shadow-md"
        onClick={handleSearch}
      >
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </div>
  );
}