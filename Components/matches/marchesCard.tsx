import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface MatchCardProps {
  name: string;
  role: string;
  skills: string[];
  compatibility: number;
  initials: string;
  color: string;
  icon: React.ReactNode;
}

export function MatchCard({
  name,
  role,
  skills,
  compatibility,
  initials,
  color,
  icon,
}: MatchCardProps) {
  return (
    <Card className="bg-[#041F04]/70 border-[#107C10]/30 shadow-[0_4px_15px_rgba(0,0,0,0.3)] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#107C10]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar>
            <AvatarFallback className={color}>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-xs text-gray-400 flex items-center">
              {icon}
              {role}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Compatibilidad</span>
            <span className="text-[#107C10]">{compatibility}%</span>
          </div>
          <div className="h-2 bg-[#0B5D0B] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#107C10]"
              style={{ width: `${compatibility}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-xs text-gray-400 mb-2">Habilidades clave:</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-full text-xs bg-[#0B5D0B]/70 border border-[#107C10]/30"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-[#107C10]/30 hover:bg-[#0B5D0B]/40 hover:border-[#107C10]/50 text-[#107C10] hover:text-white"
          >
            Ver Perfil
          </Button>
          <Button
            size="sm"
            className="text-xs relative overflow-hidden group bg-[#107C10] hover:bg-[#0B5D0B]"
          >
            <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            Invitar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
