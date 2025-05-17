import {
  Filter,
  User,
  Code,
  Database,
  Sparkles,
  Zap,
  BarChart,
  Shield,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../Components/ui/card";

import { Button } from "../../../../Components/ui/button";
import { SearchInput } from "../../../../Components/ui/input";
import { Badge } from "../../../../Components/ui/badge";
import { MatchCard } from "../../../../Components/matches/marchesCard";

export default function PageMatches() {
  return (
    <div className="flex-1 h-screen flex flex-col relative z-10">
      <div className="px-4 py-3 sticky top-0 z-10 bg-[#121212] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            <span className="text-[#107C10]">Matchmaking</span>
          </h1>
          <p className="text-gray-400">
            Encuentra a los profesionales ideales para formar tu equipo
            perfecto.
          </p>
        </div>
        <Button className="relative overflow-hidden group bg-[#107C10] hover:bg-[#0B5D0B] shadow-[0_0_15px_rgba(16,124,16,0.3)]">
          <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          Iniciar nuevo Matching
        </Button>
      </div>
      <main className="flex-1 overflow-auto py-6 px-4 md:px-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <SearchInput placeholder="Buscar por habilidad o nombre..." />
          <Button
            variant="outline"
            className="border-[#2D2D2D] hover:bg-[#0B5D0B]/30 hover:border-[#107C10]/50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
        <Card className="bg-[#1E1E1E]/60 border-[#2D2D2D] shadow-[0_4px_15px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <CardHeader>
            <CardTitle className="font-bold flex items-center">
              <Sparkles className="text-[#107C10] mr-2 h-5 w-5" />
              Algoritmo de Matchmaking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-[#041F04]/70 border border-[#107C10]/30 rounded-xl p-4">
                <h3 className="font-medium mb-3">
                  Proyecto Seleccionado: AI & Machine Learning Hackathon
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      Análisis de habilidades
                    </span>
                    <span className="text-[#107C10]">Completado</span>
                  </div>
                  <div className="h-2 bg-[#0B5D0B] rounded-full overflow-hidden">
                    <div className="h-full w-full bg-[#107C10]"></div>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      Búsqueda de perfiles compatibles
                    </span>
                    <span className="text-[#107C10]">100%</span>
                  </div>
                  <div className="h-2 bg-[#0B5D0B] rounded-full overflow-hidden">
                    <div className="h-full w-full bg-[#107C10]"></div>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      Evaluación de dinámicas de equipo
                    </span>
                    <span className="text-[#107C10]">100%</span>
                  </div>
                  <div className="h-2 bg-[#0B5D0B] rounded-full overflow-hidden">
                    <div className="h-full w-full bg-[#107C10]"></div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-gray-400">Estado: </span>
                    <span className="text-emerald-400">
                      Análisis completado
                    </span>
                  </div>
                  <Badge className="bg-[#107C10]">12 matches encontrados</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MatchCard
                  name="Javier Sánchez"
                  role="Backend Developer"
                  skills={["Python", "Django", "FastAPI"]}
                  compatibility={92}
                  initials="JS"
                  color="bg-[#107C10]"
                  icon={<Database className="h-4 w-4 mr-2" />}
                />

                <MatchCard
                  name="Laura Rodríguez"
                  role="Data Scientist"
                  skills={["Python", "TensorFlow", "Data Analysis"]}
                  compatibility={87}
                  initials="LR"
                  color="bg-[#0B5D0B]"
                  icon={<BarChart className="h-4 w-4 mr-2" />}
                />

                <MatchCard
                  name="Miguel Martínez"
                  role="Frontend Developer"
                  skills={["React", "TypeScript", "UI/UX"]}
                  compatibility={85}
                  initials="MM"
                  color="bg-[#107C10]"
                  icon={<Code className="h-4 w-4 mr-2" />}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MatchCard
                  name="Carlos Gómez"
                  role="DevOps Engineer"
                  skills={["AWS", "Docker", "CI/CD"]}
                  compatibility={83}
                  initials="CG"
                  color="bg-[#52B043]"
                  icon={<Shield className="h-4 w-4 mr-2" />}
                />

                <MatchCard
                  name="Elena López"
                  role="Project Manager"
                  skills={["Scrum", "Jira", "Team Leadership"]}
                  compatibility={79}
                  initials="EL"
                  color="bg-[#84DC5A]"
                  icon={<User className="h-4 w-4 mr-2" />}
                />

                <MatchCard
                  name="Pablo Torres"
                  role="Full Stack Developer"
                  skills={["JavaScript", "Node.js", "MongoDB"]}
                  compatibility={76}
                  initials="PT"
                  color="bg-[#0B5D0B]"
                  icon={<Zap className="h-4 w-4 mr-2" />}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
