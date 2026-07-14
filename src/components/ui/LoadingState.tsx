// components/ui/LoadingState.tsx
import React from 'react';

export const LoadingState: React.FC<{ message?: string }> = ({ message = "Loading content..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-gray-500 text-sm font-medium">{message}</p>
    </div>
  );
};