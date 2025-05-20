"use client";
import React, { useState, useEffect, Suspense, useCallback } from "react";
import dynamic from "next/dynamic";
import { Challenge } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/tabs";
import StarField from "@/ui/animations/star-footer";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

// Fallback components for Suspense
const TabContentFallback = ({ message }: { message: string }) => (
  <div className="flex justify-center items-center py-12">
    <Loader2 className="w-8 h-8 text-blue-500 animate-spin mr-3" />
    <span className="text-gray-300">{message}</span>
  </div>
);

// Dynamically import components with lazy loading
const InfoTab = dynamic(() => import("@/challenge/id/components/InfoTab").then(mod => ({ default: mod.InfoTab })), {
  ssr: true
});

const ParticipantsTab = dynamic(() => import("@/challenge/id/components/ParticipantsTab").then(mod => ({ default: mod.ParticipantsTab })), {
  ssr: true
});

const ScheduleTab = dynamic(() => import("@/challenge/id/components/ScheduleTab").then(mod => ({ default: mod.ScheduleTab })), {
  ssr: true
});

const DiscussionTab = dynamic(() => import("@/challenge/id/components/DiscussionTab").then(mod => ({ default: mod.DiscussionTab })), {
  ssr: true
});

const SignedOutSidebar = dynamic(() => import("@/challenge/id/components/SignedOutSidebar").then(mod => ({ default: mod.SignedOutSidebar })), {
  ssr: true
});

const SignedInSidebar = dynamic(() => import("@/challenge/id/components/SignedInSidebar").then(mod => ({ default: mod.SignedInSidebar })), {
  ssr: true
});

// Keep ChallengeHeader non-lazy as it's immediately visible
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

  // Fetch registration status on component mount
  useEffect(() => {
    async function checkStatus() {
      setIsLoading(true);
      setError(null);

      try {
        const status = await checkRegistrationStatus(eventData.id);
        setIsJoined(status.isRegistered);
        setGroupId(status.groupId);
      } catch (err) {
        console.error("Error checking registration status:", err);
        setError("Failed to check registration status");
      } finally {
        setIsLoading(false);
      }
    }

    checkStatus();
  }, [eventData.id]);

  const formatDate = useCallback((date: Date): string => {
    if (isNaN(date.getTime())) {
      throw new Error("Fecha inválida");
    }
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  const formatTime = useCallback((date: Date): string =>
    date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
  []);

  const calculateDuration = useCallback((): string => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)) % 24;

    if (diffDays > 0 && diffHours > 0)
      return `${diffDays} días y ${diffHours} horas`;
    if (diffDays > 0) return `${diffDays} días`;
    return `${diffHours} horas`;
  }, [startDate, endDate]);

  const handleJoinEvent = useCallback(async () => {
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
  }, [eventData.id, isJoined, setIsLoading, setError, setIsJoined, setGroupId]);

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
                  <Suspense fallback={<TabContentFallback message="Cargando información..." />}>
                    <InfoTab eventData={eventData} isJoined={isJoined} />
                  </Suspense>
                </TabsContent>

                <TabsContent value="participants" className="p-6">
                  <Suspense fallback={<TabContentFallback message="Cargando participantes..." />}>
                    <ParticipantsTab eventData={eventData} groupId={groupId} />
                  </Suspense>
                </TabsContent>

                <TabsContent value="schedule" className="p-6">
                  <Suspense fallback={<TabContentFallback message="Cargando agenda..." />}>
                    <ScheduleTab eventData={eventData} />
                  </Suspense>
                </TabsContent>

                <TabsContent value="discussion" className="p-6">
                  <Suspense fallback={<TabContentFallback message="Cargando discusión..." />}>
                    <DiscussionTab eventData={eventData} />
                  </Suspense>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <SignedOut>
              <Suspense fallback={<TabContentFallback message="Cargando..." />}>
                <SignedOutSidebar eventData={eventData} />
              </Suspense>
            </SignedOut>
            <SignedIn>
              <Suspense fallback={<TabContentFallback message="Cargando..." />}>
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
              </Suspense>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
}
