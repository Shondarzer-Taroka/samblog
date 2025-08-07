export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen font-noto">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">লোড হচ্ছে...</p>
      </div>
    </div>
  );
}