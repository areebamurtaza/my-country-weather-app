// app/countries/CountriesContent.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { CountryData, WorldBankCountryResponse } from '../../types/index';
import { Input } from '@/components/ui/Input';
import { SelectFilter } from '@/components/ui/SelectFilter';
import { CountryCard } from '@/components/Country/CountryCard';
import { CountryGrid } from '@/components/Country/CountryGrid';
import { LoadingState } from '@/components/ui/LoadingState';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';

// Pre-defined static regions and income levels based on World Bank data standard groupings
const REGION_OPTIONS = [
  { value: '', label: 'All Regions' },
  { value: 'East Asia & Pacific', label: 'East Asia & Pacific' },
  { value: 'Europe & Central Asia', label: 'Europe & Central Asia' },
  { value: 'Latin America & Caribbean', label: 'Latin America & Caribbean' },
  { value: 'Middle East & North Africa', label: 'Middle East & North Africa' },
  { value: 'North America', label: 'North America' },
  { value: 'South Asia', label: 'South Asia' },
  { value: 'Sub-Saharan Africa', label: 'Sub-Saharan Africa' },
];

const INCOME_OPTIONS = [
  { value: '', label: 'All Income Levels' },
  { value: 'High income', label: 'High Income' },
  { value: 'Upper middle income', label: 'Upper Middle Income' },
  { value: 'Lower middle income', label: 'Lower Middle Income' },
  { value: 'Low income', label: 'Low Income' },
];

export default function CountriesContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [countries, setCountries] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all countries in page load with high item limit (300) to support local filtering
  const fetchCountriesData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.worldbank.org/v2/country?format=json&per_page=300`);
      if (!res.ok) throw new Error("Could not download World Bank country profiles.");
      const data: WorldBankCountryResponse = await res.json();
      
      // Filter out raw system-defined regional headers and empty code data blocks from World Bank list
      const cleanCountries = (data[1] || []).filter(
        (country) => country.capitalCity && country.latitude && country.longitude
      );
      setCountries(cleanCountries);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Network error encountered.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountriesData();
  }, []);

  // Retrieve Search parameters
  const currentSearch = searchParams.get('search') || '';
  const currentRegion = searchParams.get('region') || '';
  const currentIncome = searchParams.get('income') || '';

  // Synchronized URL Search Param modifiers preserving historical structures
  const handleQueryUpdate = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  // Run filtering on current list of countries
  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.toLowerCase().includes(currentSearch.toLowerCase());
    const matchesRegion = currentRegion === '' || country.region.value === currentRegion;
    const matchesIncome = currentIncome === '' || country.incomeLevel.value === currentIncome;
    return matchesSearch && matchesRegion && matchesIncome;
  });

  return (
    <div className="space-y-6">
      <header className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-black tracking-tight text-white-900">Explore Countries</h1>
        <p className="text-gray-450 text-xs mt-1">Browse and query indicators sourced directly from the World Bank API.</p>
      </header>

      {/* Filter Toolbar Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 text-black-900 rounded-xl border border-gray-200">
        <Input className="text-black-900"
          label="Country Name Search"
          placeholder="e.g. Pakistan, Germany..."
          value={currentSearch}
          onChange={(e) => handleQueryUpdate('search', e.target.value)}
        />
        <SelectFilter 
          label="Region Filter"
          value={currentRegion}
          onChange={(e) => handleQueryUpdate('region', e.target.value)}
          options={REGION_OPTIONS}
        />
        <SelectFilter 
          label="Income Classification"
          value={currentIncome}
          onChange={(e) => handleQueryUpdate('income', e.target.value)}
          options={INCOME_OPTIONS}
        />
      </div>

      {/* Conditional Rendering Blocks */}
      {loading && <LoadingState message="Connecting to World Bank endpoints..." />}
      
      {error && <ErrorState message={error} onRetry={fetchCountriesData} />}

      {!loading && !error && filteredCountries.length === 0 && (
        <EmptyState 
          title="No countries matched filters" 
          message="Adjust search keywords or change region selections."
        />
      )}

      {!loading && !error && filteredCountries.length > 0 && (
        <CountryGrid>
          {filteredCountries.map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </CountryGrid>
      )}
    </div>
  );
}