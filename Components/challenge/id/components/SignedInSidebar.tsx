import React, { useCallback, useEffect, useState } from "react";
import { Challenge } from "@/types";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Zap, CheckCircle, Share2, MapPin, Award } from "lucide-react";
import { Loading } from "@/ui/loading/Loading";

interface SignedInSidebarProps {
  eventData: Challenge;
  isJoined: boolean;
  setIsJoined: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading?: boolean;
  error?: string | null;
  groupId?: string | null;
  handleJoinEvent: () => void;
  formatDate: (date: Date) => string;
  formatTime: (date: Date) => string;
  calculateDuration: () => string;
}

export function SignedInSidebar({
  eventData,
  isJoined,
  setIsJoined,
  isLoading = false,
  error = null,
  groupId = null,
  handleJoinEvent,
  formatDate,
  formatTime,
  calculateDuration,
}: SignedInSidebarProps) {
  const startDate = new Date(eventData.startDate!);
  const endDate = new Date(eventData.endDate!);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const showGroupNotificationOnce = useCallback(() => {
    const alreadyShown = sessionStorage.getItem("group-toast-shown");

    if (!alreadyShown && groupId) {
      // toas.success(`¡Has sido asignado a un grupo! ID: ${groupId}`);
      sessionStorage.setItem("group-toast-shown", "true");
    }
  }, [groupId]);

  // Activa la confirmación después de 3 segundos
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isJoined) {
      timeout = setTimeout(() => {
        setShowConfirmation(true);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [isJoined]);

  useEffect(() => {
    showGroupNotificationOnce();
  }, [showGroupNotificationOnce]);

  const difficulty_en = {
    easy: "Facil",
    half: "Medio",
    dificil: "difficult",
    expert: "Experto",
  };

  const handleJoin = () => {
    setIsJoined(true);
    setShowConfirmation(false);
  };

  const handleLeave = () => {
    handleJoinEvent(); // Call the actual function to unregister from the challenge
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6 sticky top-4">
        <div className="mb-6">
          {isJoined && showConfirmation && (
            <div className="flex items-center justify-between p-4 bg-green-200 border border-green-200 rounded-lg mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-green-800">
                    ¡Te has unido al evento!
                  </h3>
                </div>
              </div>
              <Button
                className="text-black border-gray-300 hover:bg-green-400"
                variant="outline"
                size="sm"
                onClick={handleLeave}
              >
                Salir del Evento
              </Button>
            </div>
          )}

          {!showConfirmation && (
            <Button
              onClick={handleJoinEvent}
              disabled={isLoading}
              className={`w-full ${
                isJoined
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              }`}
            >
              {isLoading ? (
                <Loading />
              ) : isJoined ? (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Ya estás inscrito
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-5 w-5" />
                  Unirse al Evento
                </>
              )}
            </Button>
          )}

          {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}

          {groupId && (
            <div className="mt-2 text-green-500 text-sm">
              ¡Has sido asignado a un grupo! ID: {groupId}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-gray-800">
            <span className="text-gray-400">Organizado por</span>
            <span className="font-medium text-white">
              {eventData.organizer ?? "Plaython"}
            </span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-800">
            <span className="text-gray-400">Fecha de inicio</span>
            <span className="font-medium text-white">
              {formatDate(startDate)}
            </span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-800">
            <span className="text-gray-400">Hora de inicio</span>
            <span className="font-medium text-white">
              {formatTime(startDate)}
            </span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-800">
            <span className="text-gray-400">Fecha de finalización</span>
            <span className="font-medium text-white">
              {formatDate(endDate)}
            </span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-800">
            <span className="text-gray-400">Duración</span>
            <span className="font-medium text-white">
              {calculateDuration()}
            </span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-800">
            <span className="text-gray-400">Modalidad</span>
            <div>
              <Badge className="ml-2 bg-gradient-to-r from-pink-600 to-orange-600 text-white">
                Virtual
              </Badge>
            </div>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-800">
            <span className="text-gray-400">Dificultad</span>
            <span className="font-medium text-white">
              {difficulty_en[eventData.difficulty]}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Valoración</span>
            <div className="flex items-center"></div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Comparte este evento
          </h3>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="icon"
              className="border-blue-600 text-blue-500 hover:bg-blue-900/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-twitter"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-blue-800 text-blue-700 hover:bg-blue-900/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-facebook"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-green-600 text-green-500 hover:bg-green-900/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-message-circle"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-blue-600 text-blue-500 hover:bg-blue-900/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Más
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
