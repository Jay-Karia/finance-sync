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
import {ThemeToggle} from "./theme-toggle";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<number | null>(null);

  const toggleMobileDropdown = (idx: number) => {
    setOpenMobileDropdown(openMobileDropdown === idx ? null : idx);
  };

  return (
    <div className="relative w-full">
      <ResizableNavbar>
        {/* Desktop Navigation */}
        <NavBody>
          <Logo />
          <NavItems items={NAVBAR_ITEMS} />

          <div className="flex items-center gap-2 ml-auto">

            {/* <NavbarButton className="flex items-center"> */}
              <ThemeToggle />
            {/* </NavbarButton> */}
            <NavbarButton className="flex items-center">
              <GoHeartFill className="inline mr-1" />
              Donate
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <Logo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {NAVBAR_ITEMS.map((item, idx) => (
              item.dropdown ? (
                <div key={`mobile-dropdown-${idx}`} className="w-full py-2">
                  <button
                    onClick={() => toggleMobileDropdown(idx)}
                    className="flex items-center justify-between w-full text-neutral-600 dark:text-neutral-300 py-2"
                  >
                    <span>{item.name}</span>
                    <IoChevronDownOutline
                      className={`transition-transform ${openMobileDropdown === idx ? "rotate-180" : ""}`}
                    />
                  </button>

                  {openMobileDropdown === idx && (
                    <div className="pl-4 flex flex-col space-y-2 mt-2">
                      {item.dropdown.map((dropdownItem, dropIdx) => (
                        <a
                          key={`mobile-dropdown-item-${dropIdx}`}
                          href={dropdownItem.link}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 py-1.5"
                        >
                          {dropdownItem.name}
                        </a>
                      ))}
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
            ))}

            <div className="flex w-full flex-col gap-4 mt-4">
              <NavbarButton>
                <GoHeartFill className="inline mr-1" />
                Donate
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </div>
  );
}
