"use client";

import {useState} from "react";
import {Filter} from "lucide-react";
import {SearchInput} from "@/ui/input";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/ui/tabs";
import {Button} from "@/ui/button";
import {EventCard, EventCardData} from "@/events/eventCard";
import {EventHeader} from "@/events/event.header";
import {Challenge} from "@/types";
import {Loader2} from "lucide-react";

// Conversión de Challenge → EventCardData
function toEventCardData(ch: Challenge): EventCardData {
    // Formatea rango de fechas
    const start = new Date(ch.startDate).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
    const date = ch.endDate
        ? `${start} – ${new Date(ch.endDate).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })}`
        : start;

    return {
        id: ch.id,
        title: ch.title,
        organizer: ch.organizer,
        date,
        location: ch.location ?? "Remoto",
        participants: ch.teamSize,
        prize: "$10,000", // ch.prize
        tags: ch.tags,
        featured: ch.status == "ongoing",
        status: ch.status,    // "ongoing"|"next"|"finished"
        result: "",
    };
}

interface Props {
    current: Challenge[];
    upcoming: Challenge[];
    past: Challenge[];
}

export default function EventsPageClient({
                                             current,
                                             upcoming,
                                             past,
                                         }: Props) {
    const [filter, setFilter] = useState("all");

    return (
        <div className="flex-1 h-screen flex flex-col relative z-10">
            {/* Header */}
            <div
                className="px-4 py-3 sticky top-0 z-10 bg-[#121212] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <EventHeader/>
                <Button className="…">Ver Todos los Eventos</Button>
            </div>

            <main className="flex-1 overflow-auto py-6 px-4 md:px-6 space-y-6">
                {/* Búsqueda y filtros */}
                <div className="flex flex-col md:flex-row gap-4">
                    <SearchInput placeholder="Buscar eventos..."/>
                    <Button variant="outline" className="…">
                        <Filter className="h-4 w-4 mr-2"/>
                        Filtros
                    </Button>
                </div>

                {/* Pestañas */}
                <Tabs defaultValue="current" className="w-full p-2">
                    <TabsList className="grid grid-cols-3 …">
                        <TabsTrigger value="current">Registrados</TabsTrigger>
                        <TabsTrigger value="upcoming">Próximos</TabsTrigger>
                        <TabsTrigger value="past">Pasados</TabsTrigger>
                    </TabsList>

                    {/** En curso */}
                    <TabsContent value="current" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {current.map((c) => (
                                <EventCard
                                    key={c.id}
                                    event={toEventCardData(c)}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    {/** Próximos */}
                    <TabsContent value="upcoming" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {upcoming.map((c) => (
                                <EventCard
                                    key={c.id}
                                    event={toEventCardData(c)}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    {/** Pasados */}
                    <TabsContent value="past" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {past.map((c) => (
                                <EventCard
                                    key={c.id}
                                    event={toEventCardData(c)}
                                />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
