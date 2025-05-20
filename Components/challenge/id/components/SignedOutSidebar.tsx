import React from "react";
import { Challenge } from "@/types";
import { Button } from "@/ui/button";
import { Lock } from "lucide-react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

interface SignedOutSidebarProps {
  eventData: Challenge;
}

export function SignedOutSidebar({ eventData }: SignedOutSidebarProps) {
  return (
    <div className="md:w-80 bg-gray-900 p-6 rounded-lg">
      <div className="text-center mb-6">
        <Lock className="w-12 h-12 text-white mx-auto mb-3" />
        <h3 className="text-lg font-medium text-shadow-white">
          Authenticación Requirida
        </h3>
        <p className="text-sm text-white mt-2">
          Necesitas iniciar sesión para ver los detalles del equipo y
          unirte a este evento.
        </p>
      </div>

      <SignInButton
        mode="modal"
        fallbackRedirectUrl={`/challenges/${eventData.id}`}
      >
        <Button
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600"
          size="lg"
        >
          Inicia sesion para participar
        </Button>
      </SignInButton>

      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500">
          ¿No tienes una cuenta?
        </span>{" "}
        <SignUpButton mode="modal">
          <span className="text-sm text-indigo-600 hover:underline">
            Regístrate
          </span>
        </SignUpButton>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-800 mb-3">
          Estado del evento
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Participantes</span>
          <span className="text-sm font-medium">18/32</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2 mb-4">
          <div
            className="bg-indigo-500 h-2 rounded-full"
            style={{ width: "56%" }}
          ></div>
        </div>
        <div className="text-sm text-gray-500 italic">
          El evento comenzará una vez que se hayan llenado todos los
          lugares.
        </div>
      </div>
    </div>
  );
}