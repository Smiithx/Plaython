import React from "react";
import { Badge } from "@/ui/badge";
import Link from "next/link";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Challenge } from "@/types";

interface ChallengeHeaderProps {
  eventData: Challenge;
  formatDate: (date: Date) => string;
  calculateDuration: () => string;
}

export function ChallengeHeader({
  eventData,
  formatDate,
  calculateDuration,
}: ChallengeHeaderProps) {
  const startDate = new Date(eventData.startDate!);

  return (
    <div className="relative h-80 bg-gradient-to-r from-purple-900 via-blue-800 to-indigo-900 overflow-hidden">
      <div className="absolute inset-0 opacity-30 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent"></div>
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-8">
        {/* Back button */}
        <Link
          href="/challenges"
          className="z-10 inline-flex items-center absolute top-4 left-4 gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Volver a retos
        </Link>
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {eventData?.tags.map((category, index) => (
            <Badge
              key={index}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              {category}
            </Badge>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
          {eventData.title}
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-white font-bold">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-purple-400" />
            <span>{formatDate(startDate)}</span>
          </div>

          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-400" />
            <span>{calculateDuration()}</span>
          </div>

          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-pink-400" />
            {/* <span>{eventData.location}</span> */}
          </div>

          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-green-400" />
            {/* <span>
              {eventData.currentParticipants}/{eventData.maxParticipants}{" "}
              participantes
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
}