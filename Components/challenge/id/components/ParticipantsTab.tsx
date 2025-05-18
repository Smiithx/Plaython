import React, { useState } from "react";
import { Challenge } from "@/types";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";

interface ParticipantsTabProps {
  eventData: Challenge;
}
interface Participant {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  specialty: string;
  teamId: string | null;
}

interface Team {
  id: string;
  name: string;
  members: Participant[];
  complete: boolean;
}

export function ParticipantsTab({ eventData }: ParticipantsTabProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-white">
          Equipos Participantes
        </h2>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {eventData.teams.map((team) => (
            <div
              key={team.id}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-500 transition-all"
            >
              <div className="flex items-center mb-3">
                <img
                  src={team.avatar || "/placeholder.svg"}
                  alt={team.name}
                  className="w-10 h-10 rounded-full mr-3 bg-gray-700"
                />
                <div>
                  <h4 className="font-semibold text-white">
                    {team.name}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {team.members} miembros
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                {team.project}
              </p>
            </div>
          ))}
        </div> */}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-white">
          Participantes Individuales
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* {eventData.participants.map((participant) => (
            <div
              key={participant.id}
              className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-blue-500 transition-all"
            >
              <div className="flex items-center">
                <img
                  src={participant.avatar || "/placeholder.svg"}
                  alt={participant.name}
                  className="w-8 h-8 rounded-full mr-2 bg-gray-700"
                />
                <div>
                  <h4 className="font-medium text-white text-sm">
                    {participant.name}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {participant.role}
                  </p>
                </div>
              </div>
            </div>
          ))} */}
        </div>

        {/* {eventData.currentParticipants >
          eventData.participants.length && (
          <Button
            variant="outline"
            className="mt-4 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Ver todos los participantes (
            {eventData.currentParticipants})
          </Button>
        )} */}
      </div>
    </div>
  );
}
