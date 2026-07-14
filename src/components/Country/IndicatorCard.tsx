// components/Country/IndicatorCard.tsx
import React from 'react';

interface IndicatorCardProps {
  title: string;
  value: string | number | null;
  unit?: string;
  icon?: React.ReactNode;
}

export const IndicatorCard: React.FC<IndicatorCardProps> = ({ title, value, unit = "", icon }) => {
  const formattedValue = typeof value === 'number' ? value.toLocaleString() : (value || "Unavailable");

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200/80 flex items-center gap-4">
      {icon && <div className="p-3 bg-blue-50/50 rounded-xl text-blue-600 shrink-0">{icon}</div>}
      <div className="overflow-hidden">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider truncate">{title}</p>
        <p className="text-xl font-extrabold text-gray-800 mt-0.5 truncate">
          {formattedValue} <span className="text-xs font-medium text-gray-400">{unit}</span>
        </p>
      </div>
    </div>
  );
};