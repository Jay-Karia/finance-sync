"use client";

import { useState, useRef, useEffect } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import Link from "next/link";

interface DropdownProps {
  label: string;
  items: { name: string; link: string }[];
  isMobile?: boolean;
}

export function NavbarDropdown({ label, items, isMobile = false }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isMobile) {
    // Mobile dropdown implementation
    return (
      <div className="w-full">
        <button
          className="flex items-center justify-between w-full text-neutral-600 dark:text-neutral-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{label}</span>
          <IoChevronDownOutline className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
        {isOpen && (
          <div className="mt-2 pl-4 flex flex-col space-y-2">
            {items.map((item, idx) => (
              <Link
                key={`dropdown-item-mobile-${idx}`}
                href={item.link}
                className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop dropdown implementation
  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="flex items-center gap-1 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <IoChevronDownOutline className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-md shadow-lg py-1 z-10">
          {items.map((item, idx) => (
            <Link
              key={`dropdown-item-desktop-${idx}`}
              href={item.link}
              className="block px-4 py-2 text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
