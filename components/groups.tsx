import { GroupInfo } from "@/types/group";
import Link from "next/link";
import { FaFolderPlus } from "react-icons/fa6";

export default function Groups() {
  const groups: GroupInfo[] = [
    {
      id: 1,
      name: "Roommates",
      people: ["me", "I"],
    },
    {
      id: 2,
      name: "Trip to Japan",
      people: ["me", "I"],
    },
    {
      id: 3,
      name: "Family Budget",
      people: ["me", "I"],
    },
  ];

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
          <div className="flex flex-wrap gap-2 w-full justify-center">
            {groups.map((group) => (
              <Link href={`/groups/${group.id}`} key={group.name}>
                <div className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {group.name}
                  </span>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                    {group.people.length} members
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
