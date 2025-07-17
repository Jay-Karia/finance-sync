import { Group } from "@/types/group";
import { Button } from "../ui/button";
import { FaX } from "react-icons/fa6";
import { useSetAtom } from "jotai";
import { groupsAtom } from "@/atoms";
import { toast } from "sonner";

interface GroupHeaderProps {
  group: Group;
}

export default function GroupHeader({ group }: GroupHeaderProps) {
  const setGroups = useSetAtom(groupsAtom);

  function handleRemoveMember(index: number) {
    try {
      group.members.splice(index, 1);

      // Update the state
      setGroups((prevGroups) =>
        prevGroups.map((g) =>
          g.id === group.id ? { ...g, members: [...group.members] } : g
        )
      );

      toast.success("Member removed successfully");
    } catch (error) {
      console.error("Error removing member:", error);
      toast.error("Failed to remove member");
    }
  }

  function handleAddMember(member: string) {
    if (!member.trim()) {
      toast.error("Member name cannot be empty");
      return;
    }
    if (group.members.includes(member)) {
      toast.error("Member already exists in the group");
      return;
    }
    group.members.push(member.trim());
    setGroups((prevGroups) =>
      prevGroups.map((g) =>
        g.id === group.id ? { ...g, members: [...group.members] } : g
      )
    );
    toast.success("Member added successfully");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const inputField = e.currentTarget;
      const member = inputField.value.trim();
      handleAddMember(member);
      inputField.value = ""; // Clear the input field after adding
    }
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
              {group.name}
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Created by{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {group.createdBy}
              </span>{" "}
              on <time dateTime={group.date}>{group.date}</time>
            </p>
          </div>
          <Button onClick={() => {}} className="mt-4 sm:mt-0">
            Add Expense
          </Button>
        </div>

        {/* Members */}
        <div className="mt-6 flex flex-wrap gap-2">
          {group.members.length === 0 ? (
            <>
              <span className="text-gray-500 dark:text-gray-400">
                No members added yet.
              </span>
            </>
          ) : (
            <>
              {group.members.map((member, index) => (
                <span
                  key={member}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm"
                >
                  {member}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveMember(index);
                      e.preventDefault();
                    }}
                    className="text-yellow-700 hover:text-yellow-900 dark:text-yellow-300 dark:hover:text-yellow-100 flex-shrink-0 ml-1"
                  >
                    <FaX size={12} />
                  </button>
                </span>
              ))}
            </>
          )}
        </div>

        {/* Add Members */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Add a member ..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </div>
      </div>
    </>
  );
}
