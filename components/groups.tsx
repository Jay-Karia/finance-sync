import { FaFolderPlus } from "react-icons/fa6";

export default function Groups() {
  const groups = [];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-12">
      <div className="flex flex-col items-center">
        {groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full p-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/30">
            <div className="flex flex-col items-center text-center max-w-md">
              <div className="w-16 h-16 mb-4 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <FaFolderPlus className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No groups yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Create your first group to start tracking shared expenses and
                settling up with friends.
              </p>
            </div>
          </div>
        ) : (
          // This would be your groups chips
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"></div>
        )}
      </div>
    </div>
  );
}
