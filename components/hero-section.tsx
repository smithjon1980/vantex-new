import { Compass } from "lucide-react";

export function HeroSection() {
  return (
    <div 
      className="relative h-[400px] bg-gradient-to-r from-blue-600 to-blue-700 overflow-hidden"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1920&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/70" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-white">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="h-8 w-8" />
            <h1 className="text-3xl font-bold tracking-tight">TravelEase</h1>
          </div>
          <p className="text-5xl font-bold mb-6 tracking-tight">
            Find and book your perfect stay
          </p>
          <p className="text-xl text-blue-50">
            Search deals on hotels, homes, and much more...
          </p>
        </div>
      </div>
    </div>
  );
}