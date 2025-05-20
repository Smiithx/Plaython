// Components/events/eventCard.tsx
import Link from "next/link";
import { Award, Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "@/ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";

// Shape que espera el EventCard:
export interface EventCardData {
  id: string;                 // ahora incluimos id
  title: string;
  organizer?: string;
  date: string;
  location: string;
  participants: number;
  prize: string;
  tags: string[];
  featured?: boolean;
  status?: string;
  result?: string;
}

export function EventCard({ event }: { event: EventCardData }) {
  const {
    id,
    title,
    organizer,
    date,
    location,
    participants,
    prize,
    tags,
    featured = false,
    status = "ongoing",
    result,
  } = event;

  // Texto del pie según status
  const footerText =
      status === "ongoing"
          ? "Prepárate para participar"
          : status === "next"
              ? "Evento por iniciar"
              : "Evento finalizado";

  // Label del botón
  const buttonLabel =
      status === "finished" ? "Ver resultados" : "Ver detalles";

  // Badge según status
  const badge =
      status === "ongoing" ? (
          <Badge className="bg-[#ff00ff]">Registrado</Badge>
      ) : status === "next" ? (
          <Badge className="bg-yellow-600">Próximo</Badge>
      ) : result ? (
          <Badge className={result.includes("Place") ? "bg-amber-600" : "bg-[#0B5D0B]"}>
            {result}
          </Badge>
      ) : null;

  return (
      <Card
          className={
            featured
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 border border-indigo-600 shadow-[0_4px_15px_rgba(0,0,0,0.5)] backdrop-blur-md relative overflow-hidden group"
                : "bg-gradient-to-r from-blue-700 to-indigo-500 border-indigo-500 shadow-[0_4px_15px_rgba(0,0,0,0.5)] backdrop-blur-md relative overflow-hidden group"
          }
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#9458ec]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-bold">{title}</CardTitle>
              <p className="text-gray-300 text-sm">{organizer}</p>
            </div>
            {badge}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 text-gray-100">
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-white/50" />
              <span>{date}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-white/50" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-sm">
              <Users className="h-4 w-4 mr-2 text-white/50" />
              <span>{participants} participantes</span>
            </div>
            <div className="flex items-center text-sm">
              <Award className="h-4 w-4 mr-2 text-white/50" />
              <span>Premio: {prize}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
                <span
                    key={i}
                    className="text-black px-2 py-1 z-10 rounded-full text-xs bg-white border border-[#ffffff]"
                >
              {tag}
            </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-white font-medium">{footerText}</span>

            <Link href={`/challenges/${id}`} passHref>
              <Button
                  className={
                    status === "finished"
                        ? "bg-white text-purple-600 border-[#9146fe]/30 hover:bg-[#9458ec]/30 hover:border-[#9146fe]/50 hover:text-white"
                        : "relative overflow-hidden group bg-black text-white hover:bg-[#9458ec] shadow-[0_0_15px_rgba(16,124,16,0.3)]"
                  }
              >
                {buttonLabel}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
  );
}
