import { Car } from "lucide-react";

export function HeroSection() {
  return (
    <div 
      className="relative h-[400px] overflow-hidden"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1920&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-800/90" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
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
      </div>
    </div>
  );
}