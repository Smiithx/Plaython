import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent } from "../ui/sheet";

export function SidebarMovil() {
  return (
    <Sheet>
      <SheetContent
        side="left"
        className="p-0 bg-[#0F0F0F] border-r border-[#2D2D2D] w-[280px]"
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
          // onClick={() => setOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
        {/* <SidebarContent /> */}
      </SheetContent>
    </Sheet>
  );
}
