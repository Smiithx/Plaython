import { Filter } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import { Button } from "../../../../components/ui/button";
import { SearchInput } from "../../../../components/ui/input";
import { TeamCard } from "../../../../components/teams/teamCard";
import { TeamInvitationCard } from "../../../../components/teams/teamInvitationCard";

export default function PageTeams() {
  return (
    <div className="flex-1 h-screen flex flex-col relative z-10">
      <div className="px-4 py-3 sticky top-0 z-10 bg-[#121212] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            <span className="text-[#107C10]">Equipos</span>
          </h1>
          <p className="text-gray-400">
            Gestiona tus equipos y coordina actividades para los eventos.
          </p>
        </div>
        <Button className="relative overflow-hidden group bg-[#107C10] hover:bg-[#0B5D0B] shadow-[0_0_15px_rgba(16,124,16,0.3)]">
          <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          Crear Nuevo Equipo
        </Button>
      </div>

      <main className="flex-1 overflow-auto py-6 px-4 md:px-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <SearchInput placeholder="Buscar equipos..." />
          <Button
            variant="outline"
            className="border-[#2D2D2D] hover:bg-[#0B5D0B]/30 hover:border-[#107C10]/50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="bg-[#1E1E1E]/60 border border-[#2D2D2D] grid grid-cols-3 w-full max-w-md">
            <TabsTrigger
              value="current"
              className="data-[state=active]:bg-[#107C10] data-[state=active]:text-white hover:bg-[#0B5D0B]/30"
            >
              Actuales
            </TabsTrigger>
            <TabsTrigger
              value="invitations"
              className="data-[state=active]:bg-[#107C10] data-[state=active]:text-white hover:bg-[#0B5D0B]/30"
            >
              Invitaciones
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="data-[state=active]:bg-[#107C10] data-[state=active]:text-white hover:bg-[#0B5D0B]/30"
            >
              Anteriores
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TeamCard
                name="DataMinds"
                event="AI & Machine Learning Hackathon"
                date="15-17 Junio, 2023"
                members={5}
                progress={65}
                role="UX/UI Designer"
                status="active"
              />
              <TeamCard
                name="BlockChaingers"
                event="Blockchain Revolution"
                date="8-10 Julio, 2023"
                members={4}
                progress={25}
                role="UX/UI Designer"
                status="forming"
              />
            </div>
          </TabsContent>

          <TabsContent value="invitations" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TeamInvitationCard
                name="Web3Pioneers"
                event="DeFi Innovation Challenge"
                date="20-22 Julio, 2023"
                members={3}
                role="UX/UI Designer"
                sender="Carlos Gómez"
                compatibility={87}
                timeLeft="2 días"
              />
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TeamCard
                name="FullStackers"
                event="Full-Stack Development Hackathon"
                date="5-7 Mayo, 2023"
                members={4}
                progress={100}
                role="UX/UI Designer"
                status="completed"
                result="2nd Place"
              />
              <TeamCard
                name="AppInnovators"
                event="Mobile App Innovation"
                date="15-17 Abril, 2023"
                members={5}
                progress={100}
                role="UX/UI Designer"
                status="completed"
                result="Participated"
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
