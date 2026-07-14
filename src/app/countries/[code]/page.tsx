// app/countries/[code]/page.tsx
import Link from 'next/link';
import { CountryData } from '../../../types/index';
import { IndicatorCard } from '@/components/Country/IndicatorCard';
import { WeatherCard } from '@/components/Country/WeatherCard';

interface PageProps {
  params: Promise<{ code: string }> | { code: string };
}

export default async function CountryDetailPage({ params }: PageProps) {
  // Await params in next.js dynamic server components to comply with Next standards
  const resolvedParams = await params;
  const { code } = resolvedParams;

  // 1. Resolve basic country info profile
  let country: CountryData | null = null;
  let countryError = false;

  try {
    const res = await fetch(`https://api.worldbank.org/v2/country/${code}?format=json`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    country = data[1]?.[0] || null;
  } catch (err) {
    countryError = true;
  }

  if (countryError || !country) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <h2 className="text-lg font-black text-red-600">Failed to load country</h2>
        <p className="text-xs text-gray-500">The country profile could not be resolved. Please verify the code or network connection.</p>
        <Link href="/countries" className="inline-block bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg">
          Back to Countries
        </Link>
      </div>
    );
  }

  const { latitude, longitude, capitalCity } = country;

  // 2. Perform parallel requests for economic and weather indicators using settled promise boundaries
  const [popResult, gdpResult, weatherResult] = await Promise.allSettled([
    fetch(`https://api.worldbank.org/v2/country/${code}/indicator/SP.POP.TOTL?format=json&mrnev=1`).then(res => res.json()),
    fetch(`https://api.worldbank.org/v2/country/${code}/indicator/NY.GDP.MKTP.CD?format=json&mrnev=1`).then(res => res.json()),
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,weather_code,wind_speed_10m`).then(res => res.json())
  ]);

  const population = popResult.status === 'fulfilled' ? popResult.value[1]?.[0]?.value : null;
  const gdp = gdpResult.status === 'fulfilled' ? gdpResult.value[1]?.[0]?.value : null;
  
  const weather = weatherResult.status === 'fulfilled' ? weatherResult.value?.current : null;

  return (
    <div className="space-y-6">
      <div>
        <Link href="/countries" className="text-xs font-bold text-gray-500 hover:text-blue-600 flex items-center gap-1">
          ← Back to Countries
        </Link>
        <div className="flex items-center gap-3 mt-4">
          <h1 className="text-3xl font-black text-white-900 tracking-tight">{country.name}</h1>
          <span className="bg-gray-100 text-gray-700 text-xs font-bold uppercase rounded px-2.5 py-0.5 border border-gray-200">
            {country.iso2Code}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Core Profile Card */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 md:col-span-2 space-y-4">
          <h3 className="font-bold text-sm text-gray-800 uppercase tracking-wider border-b pb-2">Geography & Demographics</h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-gray-400 font-semibold uppercase">Region</p>
              <p className="font-bold text-gray-800 mt-0.5 text-sm">{country.region.value || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-400 font-semibold uppercase">Income Category</p>
              <p className="font-bold text-gray-800 mt-0.5 text-sm">{country.incomeLevel.value || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-400 font-semibold uppercase">Capital City</p>
              <p className="font-bold text-gray-800 mt-0.5 text-sm">{capitalCity || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-400 font-semibold uppercase">Coordinates (Lat / Lon)</p>
              <p className="font-bold text-gray-800 mt-0.5 text-sm">
                {latitude ? parseFloat(latitude).toFixed(4) : 'N/A'}, {longitude ? parseFloat(longitude).toFixed(4) : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Weather Card */}
        <div>
          <WeatherCard 
            temp={weather ? weather.temperature_2m : null}
            windSpeed={weather ? weather.wind_speed_10m : null}
            isDay={weather ? weather.is_day : null}
            weatherCode={weather ? weather.weather_code : null}
            capital={capitalCity || 'Capital'}
          />
        </div>

      </div>

      {/* Economic Development Indexes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <IndicatorCard 
          title="Total Population" 
          value={population} 
          unit="People"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
        <IndicatorCard 
          title="Gross Domestic Product (GDP)" 
          value={gdp} 
          unit="USD"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>
    </div>
  );
}