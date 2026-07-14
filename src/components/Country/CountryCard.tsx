// components/Country/CountryCard.tsx
import React from 'react';
import Link from 'next/link';
import { CountryData } from '../../types/index';

interface CountryCardProps {
  country: CountryData;
}

export const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200/80 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50/40 transition-all overflow-hidden flex flex-col justify-between h-full">
      <div className="p-5">
        <div className="flex justify-between items-start gap-2 mb-3">
          <h3 className="font-bold text-gray-800 line-clamp-1 text-base">{country.name}</h3>
          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded uppercase shrink-0">
            {country.iso2Code || country.id}
          </span>
        </div>
        
        <div className="space-y-1.5 text-xs text-gray-500">
          <p><strong className="text-gray-700 font-semibold">Region:</strong> {country.region.value || "N/A"}</p>
          <p><strong className="text-gray-700 font-semibold">Income:</strong> {country.incomeLevel.value || "N/A"}</p>
          <p><strong className="text-gray-700 font-semibold">Capital:</strong> {country.capitalCity || "N/A"}</p>
        </div>
      </div>
      
      <div className="bg-gray-50/50 px-5 py-3 border-t border-gray-100">
        <Link 
          href={`/countries/${country.id}`}
          className="text-blue-600 hover:text-blue-800 font-semibold text-xs flex items-center gap-1 group w-full"
        >
          View Details 
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
};