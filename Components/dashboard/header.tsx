"use client";

import { Bell, Menu } from "lucide-react";
import { DropdownMenu } from "../ui/dropdown-menu";
import { SearchInput } from "../ui/input";
import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";

export function DashHeader() {
  return (
    <header className="border-b border-[#2D2D2D] bg-[#141414]/80 backdrop-blur-md px-4 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 w-lg">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-[#107C10]"
          // onClick={onMenuClick}
        >
          <Menu />
          <span className="sr-only">Menu</span>
        </Button>

        <SearchInput placeholder="Buscar eventos, equipos..." />
      </div>

      <div className="flex items-center gap-4">
        {/* <span className="hidden md:block text-sm text-gray-400">
          Desafío activo:{" "}
          <span className="text-[#107C10] font-medium">AI Hackathon</span>
        </span>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#107C10] rounded-full"></span>
          <span className="sr-only">Notificaciones</span>
        </Button> */}

        <DropdownMenu>
          <UserButton />
        </DropdownMenu>
      </div>
    </header>
  );
}
