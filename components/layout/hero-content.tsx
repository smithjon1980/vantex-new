import { Car } from "lucide-react";

export function HeroContent() {
  return (
    <div className="text-white">
      <div className="flex items-center gap-2 mb-4">
        <Car className="h-8 w-8" />
        <h1 className="text-3xl font-bold tracking-tight">DFW Executive Transport</h1>
      </div>
      <p className="text-5xl font-bold mb-6 tracking-tight">
        Premium Transportation Services
      </p>
      <p className="text-xl text-blue-50">
        Luxury van service for airport transfers, events, and medical transport
      </p>
    </div>
  );
}