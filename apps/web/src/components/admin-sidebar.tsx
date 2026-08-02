"use client";

import { Home, LayoutDashboard, MessageSquare, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import UserMenu from "./user-menu";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { to: "/dashboard", label: "Overview", icon: Home, exact: true },
    { to: "/dashboard/projects", label: "Projetos", icon: LayoutDashboard },
    { to: "/dashboard/messages", label: "Mensagens", icon: MessageSquare },
    { to: "/dashboard/settings", label: "Configurações", icon: Settings },
  ];

  return (
    <aside className="hidden h-[calc(100vh-65px)] w-64 flex-col border-r bg-card md:flex">
      <div className="flex-grow space-y-2 p-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = link.exact
            ? pathname === link.to
            : pathname.startsWith(link.to) &&
              (link.to !== "/dashboard" || pathname === "/dashboard");

          return (
            <Link
              key={link.to}
              href={link.to as any}
              className={`flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${
                isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </div>
      <div className="border-t p-4">
        <UserMenu />
      </div>
    </aside>
  );
}
