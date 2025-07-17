import { useRef, useState } from "react";
import { FaX } from "react-icons/fa6";
import {toast} from "sonner";

export const MemberChipInput = ({
  value,
  onChange,
  placeholder = "Add members...",
}: {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addMember = (member: string) => {
    const trimmedMember = member.trim();
    if (trimmedMember && !value.includes(trimmedMember)) {
      onChange([...value, trimmedMember]);
    }

    // Show a toast if the member already exists
    if (value.includes(trimmedMember)) {
      toast.error("Member already exists in the list", {
        style: {
          background: "#f8d7da",
          color: "#721c24",
        },
      });
    }

    // Show a success toast when a member is added
    if (!value.includes(trimmedMember)) {
      toast.success("Member added successfully", {
        style: {
          background: "#d4edda",
          color: "#155724",
        },
      });
    }
  };

  const removeMember = (memberToRemove: string) => {
    onChange(value.filter((member) => member !== memberToRemove));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // If the user types a comma, add the member
    if (newValue.includes(",")) {
      const memberToAdd = newValue.split(",")[0];
      addMember(memberToAdd);
      setInputValue("");
    } else {
      setInputValue(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      addMember(inputValue);
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      // Remove the last member when backspace is pressed in an empty input
      removeMember(value[value.length - 1]);
    }
  };

  return (
    <div
      className="relative w-full border border-input rounded-md bg-background focus-within:ring-1 focus-within:ring-ring focus-within:border-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:focus-within:ring-gray-500 transition-all duration-200"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex flex-wrap gap-2 p-2 min-h-[40px] w-full">
        {value.map((member, index) => (
          <div
            key={index}
            className="inline-flex items-center bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 px-2 py-1 rounded-md"
          >
            <span className="mr-1 text-sm truncate max-w-[200px]">{member}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeMember(member);
              }}
              className="text-yellow-700 hover:text-yellow-900 dark:text-yellow-300 dark:hover:text-yellow-100 flex-shrink-0"
            >
              <FaX size={12} />
            </button>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="inline-flex flex-1 min-w-[120px] outline-none border-none bg-transparent focus:ring-0 p-0.5 text-sm"
          placeholder={value.length ? "" : placeholder}
        />
      </div>
    </div>
  );
};
