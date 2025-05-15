import { Calendar, User, Zap } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

interface TeamInvitationCardProps {
  name: string;
  event: string;
  date: string;
  members: number;
  role: string;
  sender: string;
  compatibility: number;
  timeLeft: string;
}

export function TeamInvitationCard({
  name,
  event,
  date,
  members,
  role,
  sender,
  compatibility,
  timeLeft,
}: TeamInvitationCardProps) {
  return (
    <Card className="bg-[#1E1E1E]/60 border-[#2D2D2D] shadow-[0_4px_15px_rgba(0,0,0,0.5)] backdrop-blur-md relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#107C10]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">{name}</CardTitle>
            <p className="text-gray-400 text-sm">{event}</p>
          </div>
          <Badge className="bg-[#107C10]">Invitación</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-[#107C10]" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-sm">
            <User className="h-4 w-4 mr-2 text-[#107C10]" />
            <span>{members} miembros actualmente</span>
          </div>
          <div className="flex items-center text-sm">
            <Zap className="h-4 w-4 mr-2 text-[#107C10]" />
            <span>Rol propuesto: {role}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-[#041F04]/70 rounded-lg border border-[#107C10]/30">
          <Avatar>
            <AvatarFallback className="bg-[#52B043]">CG</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm">
              <span className="font-medium">{sender}</span> te ha invitado a
              unirte
            </p>
            <div className="flex items-center mt-1">
              <span className="text-xs text-[#107C10] mr-2">
                Compatibilidad {compatibility}%
              </span>
              <div className="h-1 w-20 bg-[#0B5D0B] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#107C10]"
                  style={{ width: `${compatibility}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-gray-400">Expira en: {timeLeft}</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-[#107C10]/30 hover:bg-[#0B5D0B]/40 hover:border-[#107C10]/50 text-[#107C10] hover:text-white"
            >
              Rechazar
            </Button>
            <Button className="relative overflow-hidden group bg-[#107C10] hover:bg-[#0B5D0B]">
              <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              Aceptar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
