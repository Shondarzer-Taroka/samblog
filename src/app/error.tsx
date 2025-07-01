'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md md:max-w-lg lg:max-w-2xl bg-white rounded-2xl shadow-xl p-8 md:p-12 transition-all hover:shadow-2xl">
        <div className="text-9xl mb-6 animate-bounce">🚨</div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Something went wrong!
        </h1>
        
        <p className="text-lg text-gray-600 mb-6">
          We encountered an unexpected error. Please try again later.
        </p>

        {error.digest && (
          <p className="text-sm text-gray-500 mb-8">
            Error reference: {error.digest}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
          >
            Try Again
          </button>
          
          <Link 
            href="/"
            className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors text-center"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}