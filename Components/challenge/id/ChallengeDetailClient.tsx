"use client";
import React, { useState, useEffect } from "react";
import { Challenge } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/tabs";
import StarField from "@/ui/animations/star-footer";
import { SignedIn, SignedOut } from "@clerk/nextjs";

// Import components
import { InfoTab } from "@/challenge/id/components/InfoTab";
import { ParticipantsTab } from "@/challenge/id/components/ParticipantsTab";
import { ScheduleTab } from "@/challenge/id/components/ScheduleTab";
import { DiscussionTab } from "@/challenge/id/components/DiscussionTab";
import { SignedOutSidebar } from "@/challenge/id/components/SignedOutSidebar";
import { SignedInSidebar } from "@/challenge/id/components/SignedInSidebar";
import { ChallengeHeader } from "@/challenge/id/components/ChallengeHeader";

// Import server actions
import {
  registerForChallenge,
  unregisterFromChallenge,
  checkRegistrationStatus
} from "@/lib/actions/challenge-registration";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [groupId, setGroupId] = useState<string | null>(null);

  const startDate = new Date(eventData.startDate!);
  const endDate = new Date(eventData.endDate!);

  // Check registration status on component mount
  useEffect(() => {
    async function checkStatus() {
      try {
        const status = await checkRegistrationStatus(eventData.id);
        setIsJoined(status.isRegistered);
        setGroupId(status.groupId);
      } catch (err) {
        console.error("Error checking registration status:", err);
        setError("Failed to check registration status");
      }
    }

    checkStatus();
  }, [eventData.id]);

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

  const handleJoinEvent = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (isJoined) {
        // Unregister from the challenge
        const result = await unregisterFromChallenge(eventData.id);
        if (result.success) {
          setIsJoined(false);
          setGroupId(null);
        } else {
          setError(result.message);
        }
      } else {
        // Register for the challenge
        const result = await registerForChallenge(eventData.id);
        if (result.success) {
          setIsJoined(true);
          // Check if a group was assigned
          const status = await checkRegistrationStatus(eventData.id);
          setGroupId(status.groupId);
        } else {
          setError(result.message);
        }
      }
    } catch (err) {
      console.error("Error handling event registration:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <ChallengeHeader
        eventData={eventData}
        formatDate={formatDate}
        calculateDuration={calculateDuration}
      />
      <StarField />

      {/* Main content */}
      <div className="relative container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main column */}
          <div className="lg:w-2/3">
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden mb-8">
              <Tabs
                defaultValue="info"
                className="w-full"
                onValueChange={(value) =>
                  setActiveTab(
                    value as "info" | "participants" | "schedule" | "discussion"
                  )
                }
              >
                <div className="px-6 pt-6 justify-self-center">
                  <TabsList
                    className={`grid ${
                      isJoined ? "grid-cols-4 gap-4" : "grid-cols-3 gap-3"
                    } bg-gray-800 p-1 rounded-lg`}
                  >
                    <TabsTrigger
                      value="info"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md"
                    >
                      Información
                    </TabsTrigger>

                    <SignedIn>
                      {isJoined && (
                        <TabsTrigger
                          value="participants"
                          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md"
                        >
                          Mi grupo
                        </TabsTrigger>
                      )}
                    </SignedIn>
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

                <TabsContent value="info" className="p-6">
                  <InfoTab eventData={eventData} isJoined={isJoined} />
                </TabsContent>

                <TabsContent value="participants" className="p-6">
                  <ParticipantsTab eventData={eventData} />
                </TabsContent>

                <TabsContent value="schedule" className="p-6">
                  <ScheduleTab eventData={eventData} />
                </TabsContent>

                <TabsContent value="discussion" className="p-6">
                  <DiscussionTab eventData={eventData} />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <SignedOut>
              <SignedOutSidebar eventData={eventData} />
            </SignedOut>
            <SignedIn>
              <SignedInSidebar
                eventData={eventData}
                setIsJoined={setIsJoined}
                isJoined={isJoined}
                isLoading={isLoading}
                error={error}
                groupId={groupId}
                handleJoinEvent={handleJoinEvent}
                formatDate={formatDate}
                formatTime={formatTime}
                calculateDuration={calculateDuration}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
}
