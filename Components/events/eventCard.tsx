import { Award, Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

interface EventCardProps {
  title: string;
  organizer: string;
  date: string;
  location: string;
  participants: number;
  prize: string;
  tags: string[];
  featured?: boolean;
  status?: "upcoming" | "registered" | "completed";
  result?: string;
}

export function EventCard({
  title,
  organizer,
  date,
  location,
  participants,
  prize,
  tags,
  featured = false,
  status = "upcoming",
  result,
}: EventCardProps) {
  return (
    <Card
      className={
        featured
          ? "bg-gradient-to-r from-[#0B5D0B]/70 to-[#041F04]/70 border border-[#107C10]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] backdrop-blur-md relative overflow-hidden group"
          : "bg-[#1E1E1E]/60 border-[#2D2D2D] shadow-[0_4px_15px_rgba(0,0,0,0.5)] backdrop-blur-md relative overflow-hidden group"
      }
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#107C10]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">{title}</CardTitle>
            <p className="text-gray-400 text-sm">{organizer}</p>
          </div>
          {status === "registered" && (
            <Badge className="bg-[#107C10]">Registrado</Badge>
          )}
          {status === "completed" && result && (
            <Badge
              className={
                result.includes("Place") ? "bg-amber-600" : "bg-[#0B5D0B]"
              }
            >
              {result}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-[#107C10]" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-[#107C10]" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-[#107C10]" />
            <span>{participants} participantes</span>
          </div>
          <div className="flex items-center text-sm">
            <Award className="h-4 w-4 mr-2 text-[#107C10]" />
            <span>Premio: {prize}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 rounded-full text-xs bg-[#0B5D0B]/70 border border-[#107C10]/30"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-gray-400">
            {status === "upcoming"
              ? "Inscripciones abiertas"
              : status === "registered"
              ? "Prepárate para participar"
              : "Evento finalizado"}
          </span>
          <Button
            variant={status === "completed" ? "outline" : "default"}
            className={
              status === "completed"
                ? "border-[#107C10]/30 hover:bg-[#0B5D0B]/30 hover:border-[#107C10]/50 text-[#107C10] hover:text-white"
                : "relative overflow-hidden group bg-[#107C10] hover:bg-[#0B5D0B] shadow-[0_0_15px_rgba(16,124,16,0.3)]"
            }
          >
            {status !== "completed" && (
              <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            )}
            {status === "upcoming"
              ? "Inscribirme"
              : status === "registered"
              ? "Ver detalles"
              : "Ver resultados"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
