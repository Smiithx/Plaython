import React from "react";
import { Challenge } from "@/types";

interface ScheduleTabProps {
  eventData: Challenge;
}

export function ScheduleTab({ eventData }: ScheduleTabProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white">
        Agenda del Evento
      </h2>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="space-y-6 ml-10">
          {/* {eventData.schedule.map((item, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-10 top-1 w-4 h-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="font-semibold text-white mb-1">
                  {item.time}
                </h4>
                <p className="text-gray-300">{item.activity}</p>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}