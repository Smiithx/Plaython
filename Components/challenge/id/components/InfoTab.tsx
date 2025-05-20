import React from "react";
import { Challenge } from "@/types";
import { AlertCircle } from "lucide-react";

interface InfoTabProps {
  eventData: Challenge;
  isJoined: boolean;
}

export function InfoTab({ eventData, isJoined }: InfoTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-white">
          Descripción del Evento
        </h2>
        <p className="text-gray-300 mb-4">{eventData.description}</p>
        {/* <p className="text-gray-300">
          {eventData.longDescription}
        </p> */}
      </div>

      {isJoined && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold">Estado del evento</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Participantes:</span>
              <span className="text-sm font-medium">24/32</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-indigo-500 h-2 rounded-full"
              style={{ width: "75%" }}
            ></div>
          </div>
          <div className="flex items-center gap-2 text-amber-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>
              El evento comenzará una vez que se hayan llenado todos los lugares
              y los equipos estén equilibrados.
            </span>
          </div>
        </div>
      )}
      {/* <div>
        <h3 className="text-xl font-semibold mb-3 text-white">
          Premios
        </h3>
        <ul className="space-y-2">
          {eventData.prizes.map((prize, index) => (
            <li key={index} className="flex items-start">
              <Trophy className="h-5 w-5 mr-2 text-yellow-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">{prize}</span>
            </li>
          ))}
        </ul>
      </div> */}

      {/* <div>
        <h3 className="text-xl font-semibold mb-3 text-white">
          Requisitos
        </h3>
        <ul className="space-y-2">
          {eventData.requirements.map((req, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">{req}</span>
            </li>
          ))}
        </ul>
      </div> */}

      {/* <div>
        <h3 className="text-xl font-semibold mb-3 text-white">
          Patrocinadores
        </h3>
        <div className="flex flex-wrap gap-4">
          {eventData.sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700"
            >
              {sponsor}
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
