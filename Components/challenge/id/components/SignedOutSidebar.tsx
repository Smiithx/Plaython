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
          Necesitas iniciar sesión para ver los detalles del equipo y unirte a
          este evento.
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
        <span className="text-sm text-gray-500">¿No tienes una cuenta?</span>{" "}
        <SignUpButton mode="modal">
          <span className="text-sm text-indigo-600 hover:underline">
            Regístrate
          </span>
        </SignUpButton>
      </div>
    </div>
  );
}
