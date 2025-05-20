import React from "react";
import { Challenge } from "@/types";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Badge } from "@/ui/badge";

interface ScheduleTabProps {
  eventData: Challenge;
}

interface ScheduleItem {
  time: string;
  date: string;
  activity: string;
  location?: string;
  type?: "workshop" | "presentation" | "networking" | "break" | "other";
}

export function ScheduleTab({ eventData }: ScheduleTabProps) {
  // Generate demo schedule based on event start and end dates
  const generateDemoSchedule = (): ScheduleItem[] => {
    const startDate = new Date(eventData.startDate!);
    const endDate = new Date(eventData.endDate!);

    // If dates are invalid, return empty schedule
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return [];
    }

    const schedule: ScheduleItem[] = [];

    // Format date as "DD/MM/YYYY"
    const formatDate = (date: Date) => {
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    // Day 1
    const day1 = new Date(startDate);
    const day1Str = formatDate(day1);

    schedule.push({
      date: day1Str,
      time: "09:00",
      activity: "Bienvenida y presentación del desafío",
      type: "presentation",
      location: "Sala Principal Virtual"
    });

    schedule.push({
      date: day1Str,
      time: "10:00",
      activity: "Formación de equipos y networking",
      type: "networking",
      location: "Salas de Equipos"
    });

    schedule.push({
      date: day1Str,
      time: "12:00",
      activity: "Almuerzo",
      type: "break"
    });

    schedule.push({
      date: day1Str,
      time: "13:00",
      activity: "Taller: Herramientas y recursos disponibles",
      type: "workshop",
      location: "Sala de Talleres"
    });

    schedule.push({
      date: day1Str,
      time: "16:00",
      activity: "Trabajo en equipo",
      type: "other",
      location: "Salas de Equipos"
    });

    // If event is more than 1 day, add day 2
    if ((endDate.getTime() - startDate.getTime()) > 24 * 60 * 60 * 1000) {
      const day2 = new Date(startDate);
      day2.setDate(day2.getDate() + 1);
      const day2Str = formatDate(day2);

      schedule.push({
        date: day2Str,
        time: "09:00",
        activity: "Revisión de avances",
        type: "presentation",
        location: "Sala Principal Virtual"
      });

      schedule.push({
        date: day2Str,
        time: "10:00",
        activity: "Taller: Técnicas de presentación",
        type: "workshop",
        location: "Sala de Talleres"
      });

      schedule.push({
        date: day2Str,
        time: "12:00",
        activity: "Almuerzo",
        type: "break"
      });

      schedule.push({
        date: day2Str,
        time: "13:00",
        activity: "Trabajo en equipo",
        type: "other",
        location: "Salas de Equipos"
      });

      schedule.push({
        date: day2Str,
        time: "17:00",
        activity: "Presentaciones finales",
        type: "presentation",
        location: "Sala Principal Virtual"
      });

      schedule.push({
        date: day2Str,
        time: "19:00",
        activity: "Anuncio de ganadores y cierre",
        type: "presentation",
        location: "Sala Principal Virtual"
      });
    }

    return schedule;
  };

  const schedule = generateDemoSchedule();

  // Group schedule items by date
  const scheduleByDate: Record<string, ScheduleItem[]> = {};
  schedule.forEach(item => {
    if (!scheduleByDate[item.date]) {
      scheduleByDate[item.date] = [];
    }
    scheduleByDate[item.date].push(item);
  });

  // Get badge color based on activity type
  const getBadgeClass = (type?: string) => {
    switch (type) {
      case "workshop":
        return "bg-blue-900 text-blue-300 border-blue-700";
      case "presentation":
        return "bg-purple-900 text-purple-300 border-purple-700";
      case "networking":
        return "bg-green-900 text-green-300 border-green-700";
      case "break":
        return "bg-orange-900 text-orange-300 border-orange-700";
      default:
        return "bg-gray-900 text-gray-300 border-gray-700";
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
        <Calendar className="mr-2 h-6 w-6 text-blue-400" />
        Agenda del Evento
      </h2>

      {schedule.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
          <p className="text-gray-300">
            No hay información de agenda disponible para este evento.
          </p>
        </div>
      ) : (
        Object.keys(scheduleByDate).map((date, dateIndex) => (
          <div key={date} className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Día {dateIndex + 1} - {date}
            </h3>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600"></div>
              <div className="space-y-6 ml-10">
                {scheduleByDate[date].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-10 top-1 w-4 h-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-white flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-blue-400" />
                          {item.time}
                        </h4>
                        <Badge className={`${getBadgeClass(item.type)}`}>
                          {item.type === "workshop" ? "Taller" : 
                           item.type === "presentation" ? "Presentación" :
                           item.type === "networking" ? "Networking" :
                           item.type === "break" ? "Descanso" : "Actividad"}
                        </Badge>
                      </div>
                      <p className="text-gray-300 mb-2">{item.activity}</p>
                      {item.location && (
                        <p className="text-gray-400 text-sm flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          {item.location}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
