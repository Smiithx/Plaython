"use client";
import { Users, Calendar, Zap, BarChart3, Gamepad2 } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { UserSidebar } from "./component/user.sidebar";

const navItems = [
  {
    id: "id-panel",
    title: "Panel",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    id: "id-events",
    title: "Eventos",
    href: "/dashboard/events",
    icon: Calendar,
  },
  {
    id: "id-match",
    title: "Matchmaking",
    href: "/dashboard/matches",
    icon: Zap,
  },
  { id: "id-teams", title: "Equipos", href: "/dashboard/teams", icon: Users },
];

export function SidebarDesktop() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:block w-64 bg-[#0F0F0F] border-r border-[#2D2D2D] h-screen">
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#107C10] flex items-center justify-center">
            <Gamepad2 className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl text-white">Plaython</span>
        </div>

        <div className="flex-1 px-2 py-4 space-y-6">
          <div className="space-y-1">
            <div className="px-3 py-2">
              <h3 className="text-xs font-semibold tracking-wider text-[#107C10] uppercase">
                Principal
              </h3>
            </div>
            <nav>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-[#107C10] text-white shadow-[0_0_15px_rgba(16,124,16,0.5)]"
                        : "text-gray-300 hover:bg-[#1E1E1E]/30 hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
        <UserSidebar />
      </div>
    </aside>
  );
}
