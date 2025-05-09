import { Calendar, ArrowUp, ArrowRight, Users, Trophy } from "lucide-react";
import { Card, CardContent } from "../../ui/card";

type StatsType = {
  title: string;
  icon: string;
  point: number;
};
export function CustomStats({ title, point }: StatsType) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-[#1E1E1E]/60 border-[#2D2D2D] shadow-[0_4px_15px_rgba(0,0,0,0.5)] backdrop-blur-md relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#107C10]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-400">{title}</h3>
                <div className="text-2xl font-bold">{point}</div>
              </div>
              <div className="rounded-full p-2 bg-[#0B5D0B]/70 border border-[#107C10]/30">
                <Calendar className="h-5 w-5 text-[#107C10]" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                {/* <Icon/> */}
                <ArrowUp className="mr-1 h-4 w-4 text-emerald-500" />
                <span className="text-emerald-500 font-medium">+2</span>
                <span className="text-gray-400 ml-1">vs último mes</span>
              </div>
              <button className="text-xs text-[#107C10] font-medium hover:text-[#52B043] flex items-center gap-1">
                <span>Detalles</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
