import React from "react";
import { Challenge } from "@/types";
import { Button } from "@/ui/button";
import { MessageSquare, Share2 } from "lucide-react";

interface DiscussionTabProps {
  eventData: Challenge;
}

export function DiscussionTab({ eventData }: DiscussionTabProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          Discusión del Evento
        </h2>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
          Nueva Pregunta
        </Button>
      </div>

      <div className="space-y-4">
        {/* {eventData.discussions.map((discussion) => (
          <div
            key={discussion.id}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-500 transition-all"
          >
            <div className="flex items-start mb-3">
              <img
                src={discussion.avatar || "/placeholder.svg"}
                alt={discussion.user}
                className="w-10 h-10 rounded-full mr-3 bg-gray-700"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-white">
                    {discussion.user}
                  </h4>
                  <span className="text-xs text-gray-400">
                    {new Date(discussion.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-300">
                  {discussion.message}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center pl-12">
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30"
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                {discussion.replies} respuestas
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-gray-300 hover:bg-gray-800"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Compartir
              </Button>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
}