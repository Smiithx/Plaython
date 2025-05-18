"use client";
import React, { useState } from "react";
import { Challenge } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/tabs";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Zap,
  CheckCircle,
  ChevronLeft,
} from "lucide-react";
import { Badge } from "@/ui/badge";
import Link from "next/link";
import { Button } from "@/ui/button";
import StarField from "@/ui/animations/star-footer";

interface ChallengeDetailClientProps {
  eventData: Challenge;
}

export default function ChallengeDetailClient({
  eventData,
}: ChallengeDetailClientProps) {
  const [activeTab, setActiveTab] = useState<
    "info" | "participants" | "schedule" | "discussion"
  >("info");
  const [isJoined, setIsJoined] = useState<boolean>(false);

  const startDate = new Date(eventData.startDate!);
  const endDate = new Date(eventData.endDate!);

  const formatDate = (date: Date): string => {
    if (isNaN(date.getTime())) {
      throw new Error("Fecha inválida");
    }
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date: Date): string =>
    date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

  const calculateDuration = (): string => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)) % 24;

    if (diffDays > 0 && diffHours > 0)
      return `${diffDays} días y ${diffHours} horas`;
    if (diffDays > 0) return `${diffDays} días`;
    return `${diffHours} horas`;
  };

  const handleJoinEvent = () => setIsJoined((prev) => !prev);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="relative h-80 bg-gradient-to-r from-purple-900 via-blue-800 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-8">
          <Link
            href="/challenges"
            className="z-10 absolute top-4 left-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition text-gray-300"
          >
            <ChevronLeft className="h-5 w-5" />
            Volver a retos
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {eventData.tags.map((category, index) => (
              <Badge
                key={index}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                {category}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            {eventData.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 font-bold">
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
              {/* <span>{eventData.currentParticipants}/{eventData.maxParticipants}</span> */}
            </div>
          </div>
        </div>
      </div>
      <StarField />

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-8 z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden mb-8">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                defaultValue="info"
              >
                <div className="px-6 pt-6">
                  <TabsList className="grid grid-cols-4 gap-4 bg-gray-800 p-1 rounded-lg">
                    <TabsTrigger
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md"
                      value="info"
                    >
                      Información
                    </TabsTrigger>
                    <TabsTrigger
                      value="participants"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md"
                    >
                      Participantes
                    </TabsTrigger>
                    <TabsTrigger
                      value="schedule"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md"
                    >
                      Agenda
                    </TabsTrigger>
                    <TabsTrigger
                      value="discussion"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md"
                    >
                      Discusión
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="info" className="p-6 text-gray-300">
                  {eventData.description}
                </TabsContent>
                <TabsContent value="participants" className="p-6">
                  {/* Participantes content here */}
                </TabsContent>
                <TabsContent value="schedule" className="p-6">
                  {/* Agenda content here */}
                </TabsContent>
                <TabsContent value="discussion" className="p-6">
                  {/* Discussion content here */}
                </TabsContent>
              </Tabs>
            </div>
            <Button
              onClick={handleJoinEvent}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isJoined ? (
                <>
                  <CheckCircle className="mr-2" />
                  Ya estás inscrito
                </>
              ) : (
                <>
                  <Zap className="mr-2" />
                  Unirse al evento
                </>
              )}
            </Button>
          </div>

          <aside className="lg:w-1/3 space-y-6">
            {/* Sidebar metadata here, similar extraction */}
          </aside>
        </div>
      </div>
    </div>
  );
}
