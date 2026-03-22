"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us", subsections: ["About Us", "Features", "Founder", "Location"] },
  { name: "Merchandise", href: "/merchandise" },
  { name: "Contact Us", href: "/contact-us" },
  { name: "Activities", href: "/activities", hasDropdown: true },
  { name: "Gallery", href: "/gallery" },
  { name: "Students Feedback", href: "/students-feedback" },
  { name: "Results", href: "/results" },
  { name: "Admission", href: "/admission" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activitySubsections, setActivitySubsections] = useState<string[]>([]);
  const [mobileActivitiesOpen, setMobileActivitiesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const res = await fetch("/api/activities", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { activities?: { name?: string | null }[] };
        const names = (data.activities || [])
          .map((a) => a.name || "")
          .map((n) => n.trim())
          .filter((n) => n);
        setActivitySubsections(names);
      } catch {
        setActivitySubsections([]);
      }
    };

    void loadActivities();
  }, []);

  const handleSubsectionClick = (section: string, subsection: string) => {
    if (section === "About Us") {
      window.location.href = `/about-us?section=${encodeURIComponent(subsection)}`;
    } else if (section === "Activities") {
      window.location.href = `/activities?activity=${encodeURIComponent(subsection)}`;
    }
    setOpenDropdown(null);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-lg" : "bg-white"
      )}
    >
      <div className="w-full px-4 sm:px-6 lg:px-0">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-1 sm:gap-2 lg:gap-3 lg:ml-8 flex-1 min-w-0 pr-2">
            <img
              src="/content/logo/geniuslogo.png"
              alt="Genius Educational Academy Logo"
              className="h-8 sm:h-12 lg:h-14 w-auto object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] flex-shrink-0"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="block min-w-0">
              <h1 className="text-[0.72rem] sm:text-[clamp(0.72rem,1.35vw,1.15rem)] font-cooper-black font-black text-[#0b5394] leading-tight tracking-normal sm:tracking-wide drop-shadow-[0_2px_8px_rgba(11,83,148,0.3)] uppercase whitespace-nowrap [-webkit-text-stroke:0.75px_#0b5394] [text-shadow:0.6px_0_0_#0b5394,-0.6px_0_0_#0b5394,0_0.6px_0_#0b5394,0_-0.6px_0_#0b5394]">GENIUS EDUCATIONAL ACADEMY</h1>
              <p className="text-[9px] sm:text-xs text-primary leading-tight font-bold whitespace-nowrap">Your dreams does not exist, you must create it.</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 lg:mr-8 flex-shrink-0">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => (item.subsections || item.hasDropdown) && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="px-4 py-2 text-[#0b5394] hover:text-primary font-medium transition-colors flex items-center gap-1 whitespace-nowrap"
                >
                  {item.name}
                  {(item.subsections || item.hasDropdown) && <ChevronDown className="w-4 h-4" />}
                </Link>
                {item.subsections && openDropdown === item.name && (
                  <div className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-lg py-2 animate-fadeInDown">
                    {item.subsections.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => handleSubsectionClick(item.name, sub)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}

                {item.hasDropdown && openDropdown === item.name && (
                  <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 animate-fadeInDown max-h-80 overflow-auto">
                    {(activitySubsections.length ? activitySubsections : []).map(
                      (sub) => (
                        <button
                          key={sub}
                          onClick={() => handleSubsectionClick(item.name, sub)}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {sub}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#0b5394] hover:text-primary"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => setMobileActivitiesOpen(!mobileActivitiesOpen)}
                      className="flex items-center justify-between w-full py-2 text-[#0b5394] hover:text-primary font-medium"
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileActivitiesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {mobileActivitiesOpen && (
                      <div className="pl-4 space-y-1">
                        {activitySubsections.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => {
                              handleSubsectionClick(item.name, sub);
                              setIsOpen(false);
                              setMobileActivitiesOpen(false);
                            }}
                            className="block w-full text-left py-1 text-[#0b5394]/80 hover:text-primary text-sm"
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => !item.subsections && setIsOpen(false)}
                    className="block py-2 text-[#0b5394] hover:text-primary font-medium"
                  >
                    {item.name}
                  </Link>
                )}
                {item.subsections && (
                  <div className="pl-4 space-y-1">
                    {item.subsections.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          handleSubsectionClick(item.name, sub);
                          setIsOpen(false);
                        }}
                        className="block w-full text-left py-1 text-[#0b5394]/80 hover:text-primary text-sm"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
