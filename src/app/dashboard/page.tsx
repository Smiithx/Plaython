"use client";

import { DashHeader } from "../../../Components/dashboard/header";
import { PlusCircle, Trophy } from "lucide-react";
import { Button } from "../../../Components/ui/button";
import { UserContent } from "../../../Components/dashboard/component/user.sidebar";
import { CustomStats } from "../../../Components/dashboard/component/stats";
import { Card, CardHeader, CardTitle } from "../../../Components/ui/card";
import { HSkills } from "../../../Components/dashboard/component/skills";

export default function DashboardPage() {
  // const { isLoaded, isSignedIn, user } = useUser();
  // console.log(" user", user);
  // if (!isLoaded) return <Loading />;

  return (
    <div className="flex flex-col flex-1 h-screen overflow-hidden relative z-10">
      <DashHeader />
      <main className="flex-1 overflow-auto py-6 px-4 md:px-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <UserContent />
          <Button className="relative overflow-hidden group bg-[#107C10] hover:bg-[#0B5D0B] shadow-[0_0_15px_rgba(16,124,16,0.3)]">
            <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <PlusCircle className="mr-2 h-4 w-4" />
            Buscar Eventos
          </Button>
        </div>
        <CustomStats point={8} title="Participaciones en Eventos" icon="" />

        {/* <Card className="bg-[#1E1E1E]/60 border-[#2D2D2D] shadow-[0_4px_15px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <CardHeader>
            <CardTitle className="font-bold flex items-center">
              <Trophy className="text-[#107C10] mr-2 h-5 w-5" />
              Mis Habilidades
            </CardTitle>
            <HSkills
              skills={[
                { name: "UX/UI Design", level: "Avanzado", percentage: 85 },
                {
                  name: "Frontend (React)",
                  level: "Intermedio",
                  percentage: 65,
                },
                {
                  name: "Figma & Prototipos",
                  level: "Experto",
                  percentage: 95,
                },
                { name: "Design Systems", level: "Avanzado", percentage: 80 },
              ]}
            />
          </CardHeader>
        </Card> */}
      </main>
    </div>
  );
}
