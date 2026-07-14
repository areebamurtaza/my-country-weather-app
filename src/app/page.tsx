// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto text-center py-16 px-4">
      <span className="text-blue-600 text-xs font-bold tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">
        Welcome to your dashboard
      </span>
      <h1 className="text-4xl sm:text-5xl font-black text-white-900 mt-4 tracking-tight leading-none">
        Discover Geographic Indicators & Real-Time Weather
      </h1>
      <p className="text-grey-500 text-sm mt-4 leading-relaxed max-w-xl mx-auto">
        An interactive development project showcasing Next.js dynamic routing configurations, state management, parallel API fetches, and shared layout systems.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <Link 
          href="/countries" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-lg shadow-sm hover:shadow transition-all"
        >
          Explore Countries →
        </Link>
        <Link 
          href="/playground" 
          className="bg-white hover:bg-gray-50 border border-gray-200 text-slate-700 font-bold text-xs px-6 py-3 rounded-lg transition-all"
        >
          Check React Playground
        </Link>
      </div>
    </div>
  );
}