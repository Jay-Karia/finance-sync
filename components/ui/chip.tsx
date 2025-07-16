import { useRef, useState } from "react";
import { FaX } from "react-icons/fa6";

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
      className="flex flex-wrap gap-2 p-2 border border-input rounded-md bg-background focus-within:ring-1 focus-within:ring-ring"
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((member, index) => (
        <div
          key={index}
          className="flex items-center bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 px-2 py-1 rounded-md"
        >
          <span className="mr-1 text-sm">{member}</span>
          <button
            type="button"
            onClick={() => removeMember(member)}
            className="text-yellow-700 hover:text-yellow-900 dark:text-yellow-300 dark:hover:text-yellow-100"
          >
            <FaX size={14} />
          </button>
        </div>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="flex-grow outline-none border-none bg-transparent focus:ring-0 p-0.5 text-sm"
        placeholder={value.length ? "" : placeholder}
      />
    </div>
  );
};
