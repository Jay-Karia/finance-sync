export default function ChipsSkeleton() {
  return (
    <div className="flex flex-wrap gap-2 w-full justify-center">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full shadow-sm animate-pulse"
        >
          <span className="text-sm font-medium text-gray-400 dark:text-gray-500">
            Loading...
          </span>
        </div>
      ))}
    </div>
  );
}
