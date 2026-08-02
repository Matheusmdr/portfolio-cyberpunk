"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, Weight } from "lucide-react";

export default function CyberNavbar() {
  const pathname = usePathname();

  const links = [
    { to: "/", label: "HOME" },
    { to: "/about", label: "SOBRE" },
    { to: "/projects", label: "PROJETOS" },
    { to: "/contact", label: "CONTATO" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#070a13]/60 backdrop-blur-md border-b-2 border-[var(--cp-red-dark)] py-2">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4">
        
        {/* Left Side: Stats */}
        <div className="hidden md:flex items-center gap-4 font-display text-lg uppercase tracking-wider">
          <div className="flex items-baseline gap-1">
            <span className="text-[var(--cp-cyan)] text-xl">27</span>
            <span className="text-[var(--cp-red)]">LEVEL</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[var(--cp-cyan)] text-xl">31</span>
            <span className="text-[var(--cp-red)]">STREET CRED</span>
          </div>
        </div>

        {/* Center: Tabs */}
        <div className="flex items-center gap-2 md:gap-6 w-full justify-center md:w-auto">
          {links.map((link, index) => {
            const isActive = pathname === link.to;
            return (
              <Link
                key={link.to}
                href={link.to as any}
                className="flex items-center gap-1 md:gap-2 group relative"
              >
                {isActive && <ChevronLeft size={16} className="text-[var(--cp-cyan)]" />}
                
                <span className={`font-display text-sm md:text-xl font-bold uppercase tracking-widest px-1 md:px-2 pb-1 border-b-2 transition-colors
                  ${isActive ? 'text-[var(--cp-cyan)] border-[var(--cp-cyan)]' : 'text-[var(--cp-red)] border-transparent group-hover:text-[var(--cp-cyan)]'}`}
                >
                  {link.label}
                </span>

                {isActive && <ChevronRight size={16} className="text-[var(--cp-cyan)]" />}
                
                {/* Number indicator for inactive tabs like the game */}
                {!isActive && (
                  <span className="absolute -left-5 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[var(--cp-red)] border border-[var(--cp-red)] px-1 hidden md:block">
                    {index + 1}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Side: Inventory/Money */}
        <div className="hidden md:flex items-center gap-6 font-display text-lg uppercase tracking-wider">
          <div className="flex items-center gap-2 text-[var(--cp-red)]">
            <Weight size={16} />
            <span>159/268</span>
          </div>
          <div className="text-[var(--cp-yellow)] font-bold text-xl flex items-center gap-1">
            E$ 290000
          </div>
        </div>
        
      </div>
      
      {/* Heavy red line under the whole header */}
      <div className="w-full h-[2px] bg-[var(--cp-red)] mt-2 shadow-[0_0_10px_rgba(255,42,75,0.8)]" />
    </nav>
  );
}
