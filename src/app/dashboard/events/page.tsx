"use client";
import { useState } from "react";
import { Filter } from "lucide-react";
import { SearchInput } from "../../../../Components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../Components/ui/tabs";
import { Button } from "../../../../Components/ui/button";
import { EventCard } from "../../../../Components/events/eventCard";
import { EventHeader } from "../../../../Components/events/event.header";
import Link from "next/link";
export default function PageEvents() {
  const [filter, setFilter] = useState("all");
  return (
    <div className="flex-1 h-screen flex flex-col relative z-10">
      {/* header fijo */}
      <div className="px-4 py-3 sticky top-0 z-10 bg-[#121212] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <EventHeader />
        <Link
          href="/challenges"
          className="relative px-3 py-2 rounded overflow-hidden group bg-[#9146FF] hover:bg-[#9146FE] shadow-[0_0_15px_rgba(145,70,254,0.3)]"
        >
          <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          Ver Todos los Eventos
        </Link>
      </div>

      <main className="flex-1 overflow-auto py-6 px-4 md:px-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <SearchInput placeholder="Buscar eventos..." />
          <Button
            variant="outline"
            className="text-black border-[#9146FD] hover:bg-[#9146FE] hover:border-[#9146FE]/50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        <Tabs defaultValue="registered" className="w-full p-2">
          <TabsList className="bg-[#567344]/60 border space-x-2 border-[#2D2D2D] grid grid-cols-2 w-full max-w-md">
            {/* <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-[#107C10] data-[state=active]:text-black hover:bg-[#0B5D0B]/30"
            >
              Próximos
            </TabsTrigger> */}
            <TabsTrigger
              value="registered"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md"
            >
              Registrados
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md"
            >
              Pasados
            </TabsTrigger>
          </TabsList>

          {/* <TabsContent value="upcoming" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EventCard
                title="AI & Machine Learning Hackathon"
                organizer="TechCorp"
                date="15-17 Junio, 2023"
                location="Online"
                participants={123}
                prize="$10,000"
                tags={["Python", "Machine Learning", "TensorFlow"]}
                featured={true}
              />
              <EventCard
                title="Blockchain Revolution"
                organizer="CryptoVentures"
                date="8-10 Julio, 2023"
                location="Madrid, España"
                participants={86}
                prize="$8,000"
                tags={["Blockchain", "Smart Contracts", "Web3"]}
              />
              <EventCard
                title="Frontend Challenge"
                organizer="UXPros"
                date="12 Julio, 2023"
                location="Valencia, España"
                participants={110}
                prize="$5,000"
                tags={["React", "UX/UI", "JavaScript"]}
              />
              <EventCard
                title="HealthTech Solutions"
                organizer="MediTech"
                date="22-24 Julio, 2023"
                location="Barcelona, España"
                participants={72}
                prize="$7,500"
                tags={["Salud", "IoT", "Mobile"]}
              />
            </div>
          </TabsContent> */}

          <TabsContent value="registered">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EventCard
                title="AI & Machine Learning Hackathon"
                organizer="TechCorp"
                date="15-17 Junio, 2023"
                location="Online"
                participants={123}
                prize="$10,000"
                tags={["Python", "Machine Learning", "TensorFlow"]}
                featured={true}
                status="registered"
              />
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EventCard
                title="Full-Stack Development"
                organizer="WebMasters"
                date="5-7 Mayo, 2023"
                location="Online"
                participants={145}
                prize="$6,000"
                tags={["JavaScript", "Node.js", "React"]}
                status="completed"
                result="2nd Place"
              />
              <EventCard
                title="Mobile App Innovation"
                organizer="AppGenius"
                date="15-17 Abril, 2023"
                location="Madrid, España"
                participants={98}
                prize="$5,000"
                tags={["Flutter", "React Native", "Mobile"]}
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
