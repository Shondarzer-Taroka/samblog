/* eslint-disable @next/next/no-img-element */
// app/epapers/dummy/page.tsx
import Link from 'next/link';

// Mock data for dummy e-paper
const dummyEPapers = [
  {
    id: '1',
    title: 'Daily News - June 2024',
    description: 'The latest news and updates from around the world',
    pdfUrl: 'https://example.com/sample.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c7e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    date: '2024-06-15T00:00:00Z',
    isActive: true
  },
  {
    id: '2',
    title: 'Business Times - May 2024',
    description: 'Financial markets and business insights',
    pdfUrl: 'https://example.com/sample.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    date: '2024-05-28T00:00:00Z',
    isActive: true
  },
  {
    id: '3',
    title: 'Sports Weekly - June 2024',
    description: 'All the latest sports news and highlights',
    pdfUrl: 'https://example.com/sample.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    date: '2024-06-10T00:00:00Z',
    isActive: true
  }
];

export default function DummyEPaperPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Digital E-Paper Archive</h1>
          <p className="text-lg text-gray-600">Browse our collection of digital newspapers</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyEPapers.map((epaper) => (
            <div key={epaper.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src={epaper.thumbnailUrl}
                  alt={epaper.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-800">{epaper.title}</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {new Date(epaper.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{epaper.description}</p>
                <div className="flex space-x-3">
                  <Link
                    href={`/epapers/viewer?url=${encodeURIComponent(epaper.pdfUrl)}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg transition"
                  >
                    Read Online
                  </Link>
                  <a
                    href={epaper.pdfUrl}
                    download
                    className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 text-center py-2 px-4 rounded-lg transition"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sample PDF Viewer Page Link */}
        <div className="mt-16 bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Try Our PDF Viewer</h2>
          <p className="text-gray-600 mb-6">
            Experience our interactive PDF viewer with these sample pages.
          </p>
          <Link
            href="/epapers/viewer?url=https://example.com/sample.pdf"
            className="inline-block bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg text-lg font-medium transition"
          >
            Open Sample PDF Viewer
          </Link>
        </div>
      </div>
    </div>
  );
}