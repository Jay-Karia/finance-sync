"use client";

import { useState } from "react";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
  NavBody,
  NavItems,
  ResizableNavbar,
} from "./ui/resizable-navbar";
import { GoHeartFill } from "react-icons/go";
import { IoChevronDownOutline } from "react-icons/io5";
import { NAVBAR_ITEMS } from "@/constants";
import Logo from "./logo";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<number | null>(
    null
  );

  const toggleMobileDropdown = (idx: number) => {
    setOpenMobileDropdown(openMobileDropdown === idx ? null : idx);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4">
      <ResizableNavbar className="border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
        {/* Desktop Navigation */}
        <NavBody>
          <Link href="/" className="z-10">
            <Logo />
          </Link>
          <NavItems items={NAVBAR_ITEMS} />

          <div className="flex items-center gap-2 ml-auto">
            <NavbarButton className="bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-800/20 dark:hover:bg-yellow-600/20 text-yellow-800 dark:text-yellow-200 shadow-sm hover:shadow-md transition-all duration-200 border border-yellow-300 dark:border-yellow-700">
              <GoHeartFill className="inline mr-1" />
              Sponsor
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <Logo />
            <div className="flex flex-row justify-center gap-4 items-center">
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {NAVBAR_ITEMS.map((item, idx) =>
              item.dropdown ? (
                <div key={`mobile-dropdown-${idx}`} className="w-full py-2">
                  <button
                    onClick={() => toggleMobileDropdown(idx)}
                    className="flex items-center justify-between w-full text-neutral-600 dark:text-neutral-300 py-2"
                  >
                    <span>{item.name}</span>
                    <IoChevronDownOutline
                      className={`transition-transform ${
                        openMobileDropdown === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openMobileDropdown === idx && (
                    <div className="pl-4 flex flex-col space-y-2 mt-2">
                      {item.dropdown && item.dropdown.length > 0 ? (
                        item.dropdown.map((dropdownItem, dropIdx) => (
                          <a
                            key={`mobile-dropdown-item-${dropIdx}`}
                            href={dropdownItem.link}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 py-1.5"
                          >
                            {dropdownItem.name}
                          </a>
                        ))
                      ) : (
                        <div className="text-sm text-neutral-500 dark:text-neutral-400 py-1.5">
                          <p>No groups found</p>
                          <Link
                            href="/groups/new"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-blue-500 hover:text-blue-600 mt-1 block"
                          >
                            Create your first group
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300 py-2 block w-full"
                >
                  <span>{item.name}</span>
                </a>
              )
            )}

            <div className="flex w-full flex-col gap-4 mt-4">
              <NavbarButton className="bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-800/20 dark:hover:bg-yellow-600/20 text-yellow-800 dark:text-yellow-200 shadow-sm hover:shadow-md transition-all duration-200 border border-yellow-300 dark:border-yellow-700">
                <GoHeartFill className="inline mr-1" />
                Sponsor
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </div>
  );
}
