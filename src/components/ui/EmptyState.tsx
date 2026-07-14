// components/ui/EmptyState.tsx
import React from 'react';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title = "No Matches Found", 
  message = "Try modifying your inputs or resetting the selected filters." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/50 my-6">
      <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <h3 className="text-sm font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-500 text-xs max-w-xs leading-relaxed">{message}</p>
    </div>
  );
};