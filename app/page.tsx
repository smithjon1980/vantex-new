import { SearchForm } from '@/components/search/search-form';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-white">
      <div className="relative h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1920&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-800/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-3xl font-bold tracking-tight mb-4">
              DFW Executive Transport
            </h1>
            <p className="text-5xl font-bold mb-6 tracking-tight">
              Premium Transportation Services
            </p>
            <p className="text-xl text-blue-50">
              Luxury van service for airport transfers, events, and medical transport
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28 relative z-10">
        <SearchForm />
      </div>
    </main>
  );
}