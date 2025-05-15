import { Calendar, Users, Zap } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

interface TeamCardProps {
  name: string;
  event: string;
  date: string;
  members: number;
  progress: number;
  role: string;
  status: "forming" | "active" | "completed";
  result?: string;
}

export function TeamCard({
  name,
  event,
  date,
  members,
  progress,
  role,
  status,
  result,
}: TeamCardProps) {
  return (
    <Card
      className={
        status === "active"
          ? "bg-gradient-to-r from-[#0B5D0B]/70 to-[#041F04]/70 border border-[#107C10]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] backdrop-blur-md relative overflow-hidden group"
          : "bg-[#1E1E1E]/60 border-[#2D2D2D] shadow-[0_4px_15px_rgba(0,0,0,0.5)] backdrop-blur-md relative overflow-hidden group"
      }
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#107C10]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">{name}</CardTitle>
            <p className="text-gray-400 text-sm">{event}</p>
          </div>
          {status === "forming" && (
            <Badge className="bg-amber-600">En formación</Badge>
          )}
          {status === "active" && (
            <Badge className="bg-[#107C10]">Activo</Badge>
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
            <Users className="h-4 w-4 mr-2 text-[#107C10]" />
            <span>{members} miembros</span>
          </div>
          <div className="flex items-center text-sm">
            <Zap className="h-4 w-4 mr-2 text-[#107C10]" />
            <span>Tu rol: {role}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progreso del equipo</span>
            <span className="text-[#107C10]">{progress}%</span>
          </div>
          <div className="h-2 bg-[#0B5D0B] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#107C10]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex -space-x-2 overflow-hidden">
          <Avatar className="border-2 border-[#1E1E1E]">
            <AvatarFallback className="bg-[#107C10]">JS</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-[#1E1E1E]">
            <AvatarFallback className="bg-[#0B5D0B]">LR</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-[#1E1E1E]">
            <AvatarFallback className="bg-[#107C10]">MM</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-[#1E1E1E]">
            <AvatarFallback className="bg-[#52B043]">CG</AvatarFallback>
          </Avatar>
          {members > 4 && (
            <Avatar className="border-2 border-[#1E1E1E]">
              <AvatarFallback className="bg-[#0B5D0B]">
                +{members - 4}
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-gray-400">
            {status === "forming"
              ? "En búsqueda de miembros"
              : status === "active"
              ? "Evento en progreso"
              : "Evento finalizado"}
          </span>
          <Button
            variant={status === "completed" ? "outline" : "default"}
            className={
              status === "completed"
                ? "border-[#107C10]/30 hover:bg-[#0B5D0B]/40 hover:border-[#107C10]/50 text-[#107C10] hover:text-white"
                : "relative overflow-hidden group bg-[#107C10] hover:bg-[#0B5D0B]"
            }
          >
            {status !== "completed" && (
              <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            )}
            {status === "forming"
              ? "Gestionar equipo"
              : status === "active"
              ? "Ver actividades"
              : "Ver resultados"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
