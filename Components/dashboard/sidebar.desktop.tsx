"use client";
import { Calendar, BarChart3, Gamepad2, Code } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { UserSidebar } from "./component/user.sidebar";
import { motion } from "motion/react";

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
];

export function SidebarDesktop() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:block w-64 bg-[#0F0F0F] border-r border-[#2D2D2D] h-screen">
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-center gap-2">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="bg-purple-600 rounded-lg p-2"
          >
            <Code className="h-5 w-5 text-white" />
          </motion.div>
          <span className="items-center font-bold self-center place-self-center text-xl bg-gradient-to-r from-[#FF9A8B] via-[#5865F2] to-[#9146FF] text-transparent bg-clip-text">
            <Link href="/"> Plaython</Link>
          </span>
        </div>

        <div className="flex-1 px-2 py-4 space-y-6">
          <div className="space-y-1">
            <div className="px-3 py-2">
              <h3 className="text-xs font-semibold tracking-wider text-[#9146FF] uppercase">
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
                        ? "bg-[#9146FF] text-white shadow-[0_0_15px_rgba(16,124,16,0.5)]"
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
