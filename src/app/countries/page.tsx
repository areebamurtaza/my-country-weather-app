// app/countries/page.tsx
"use client";

import { Suspense } from "react";
import CountriesContent from "./CountriesContent";

export default function CountriesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-medium text-gray-400">Resolving World Bank database...</div>}>
      <CountriesContent />
    </Suspense>
  );
}