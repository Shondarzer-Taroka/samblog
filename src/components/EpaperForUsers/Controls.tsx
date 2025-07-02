import Link from 'next/link';

export default function Controls({
  currentPage,
  totalPages,
  totalItems,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="text-sm text-gray-600">
        Showing page {currentPage} of {totalPages} ({totalItems} total items)
      </div>
      
      <div className="flex gap-2">
        <Link
          href={`?page=${Math.max(1, currentPage - 1)}`}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? 'bg-gray-200 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
          aria-disabled={currentPage === 1}
        >
          Previous
        </Link>
        
        <Link
          href={`?page=${Math.min(totalPages, currentPage + 1)}`}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? 'bg-gray-200 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
          aria-disabled={currentPage === totalPages}
        >
          Next
        </Link>
      </div>
    </div>
  );
}