// components/ui/ErrorState.tsx
import React from 'react';
import { Button } from './Button';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message = "An expected boundary crash occurred.", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border border-red-100 bg-red-50/50 rounded-2xl max-w-md mx-auto my-6">
      <div className="text-red-500 mb-4 bg-red-100/50 p-3 rounded-full">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-base font-bold text-red-800 mb-1">Failed to fetch</h3>
      <p className="text-red-600 mb-5 text-xs max-w-xs">{message}</p>
      {onRetry && <Button variant="primary" onClick={onRetry}>Try Again</Button>}
    </div>
  );
};