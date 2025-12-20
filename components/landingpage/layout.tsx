import React, { useState } from "react";
import { NAV_ITEMS } from "../constants";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#f0f4f2] dark:border-[#1c2e22] bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
              <span className="material-symbols-outlined text-xl font-bold">
                smart_toy
              </span>
            </div>
            <span className="text-lg font-bold tracking-tight text-[#111813] dark:text-white">
              AI Mentor
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(item.href);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="text-sm font-medium text-[#111813] dark:text-gray-300 hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Login
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button className="hidden sm:inline-flex">Book a Session</Button>
            </Link>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="inline-flex sm:hidden"
                >
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-75 sm:w-100">
                <nav className="flex flex-col items-center gap-4 mt-8">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.label}
                      onClick={(e) => {
                        e.preventDefault();
                        const target = document.querySelector(item.href);
                        if (target) {
                          target.scrollIntoView({ behavior: "smooth" });
                        }
                        setIsOpen(false);
                      }}
                      className="text-lg font-medium text-[#111813] dark:text-gray-300 hover:text-primary transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="flex flex-col gap-4 mt- items-center">
                    <Link href="/sign-in">
                      <Button variant="ghost" className="justify-start">
                        Login
                      </Button>
                    </Link>
                    <Link href="/sign-in">
                      <Button>Book a Session</Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-background-dark border-t border-[#f0f4f2] dark:border-gray-800 py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="size-6 text-primary">
            <span className="material-symbols-outlined">smart_toy</span>
          </div>
          <span className="font-bold dark:text-white">AI Mentor</span>
        </div>

        <p className="text-sm text-gray-400">
          © {currentYear} AI Mentorship Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
