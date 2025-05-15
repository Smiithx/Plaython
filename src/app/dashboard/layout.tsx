import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import "../globals.css";
import { SidebarDesktop } from "../../../Components/dashboard/sidebar.desktop";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen w-full bg-[#0F0F0F] text-white overflow-hidden">
      <SidebarDesktop />
      {children}
    </main>
  );
}
// <ClerkProvider>
//   <SignedIn>
//     <main className="flex h-screen w-full bg-[#0F0F0F] text-white overflow-hidden">
//       <SidebarDesktop />
//       {children}
//     </main>
//   </SignedIn>
// </ClerkProvider>
