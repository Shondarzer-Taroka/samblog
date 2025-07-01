import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md md:max-w-lg lg:max-w-2xl bg-white rounded-2xl shadow-xl p-8 md:p-12 transition-all hover:shadow-2xl">
        <div className="text-9xl mb-6 animate-bounce">🔍</div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you&#39;re looking for doesn&#39;t exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg text-center"
          >
            Return Home
          </Link>
          
          <Link
            href="/contact"
            className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors text-center"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}