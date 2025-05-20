import React, {
  useState,
  useEffect,
  Suspense,
  useCallback,
  useMemo,
  memo,
} from "react";
import { Challenge } from "@/types";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { getGroupMembers } from "@/lib/actions/challenge-registration";
import { Users, User, Loader2 } from "lucide-react";

interface ParticipantsTabProps {
  eventData: Challenge;
  groupId: string | null;
}

interface Participant {
  id: string;
  name: string;
  avatar_url?: string;
  skills?: string[];
  specialty?: string;
}

interface Team {
  id: string;
  name: string;
  members: Participant[];
  complete: boolean;
}

// Loading fallback component
const GroupMembersLoading = () => (
  <div className="flex justify-center items-center py-12">
    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
    <span className="ml-2 text-gray-300">Cargando miembros del grupo...</span>
  </div>
);

// Error component
const GroupMembersError = ({ message }: { message: string }) => (
  <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-red-300">
    {message}
  </div>
);

// Group members data fetching component
const GroupMembersList = memo(({ groupId }: { groupId: string }) => {
  const [groupMembers, setGroupMembers] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGroupMembers() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getGroupMembers(groupId);
        if (result.success) {
          setGroupMembers(result.members);
        } else {
          setError(result.message);
        }
      } catch (err) {
        console.error("Error fetching group members:", err);
        setError("Failed to load group members");
      } finally {
        setIsLoading(false);
      }
    }

    fetchGroupMembers();
  }, [groupId]);

  // Generate random skills for demo purposes
  const demoSkills = useMemo(
    () => [
      "JavaScript",
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "UI/UX",
      "Design",
      "Product Management",
      "Marketing",
      "Data Science",
    ],
    []
  );

  const getRandomSkills = useCallback(() => {
    const count = Math.floor(Math.random() * 3) + 1; // 1-3 skills
    const skills = [];
    for (let i = 0; i < count; i++) {
      const skill = demoSkills[Math.floor(Math.random() * demoSkills.length)];
      if (!skills.includes(skill)) {
        skills.push(skill);
      }
    }
    return skills;
  }, [demoSkills]);

  // Complete the GroupMembersList component
  if (isLoading) {
    return <GroupMembersLoading />;
  }

  if (error) {
    return <GroupMembersError message={error} />;
  }

  if (groupMembers.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
        <User className="w-12 h-12 mx-auto mb-3 text-gray-500" />
        <p className="text-gray-300">No hay miembros en este grupo todavía.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {groupMembers.map((member) => {
        // Use random skills for demo if member doesn't have skills
        const skills: string[] = member.skills || getRandomSkills();

        return (
          <div
            key={member.id}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-all"
          >
            <div className="flex items-start">
              <Avatar className="w-12 h-12 mr-3 border-2 border-blue-600">
                <AvatarImage src={member.avatar_url || undefined} />
                <AvatarFallback className="bg-blue-900 text-blue-300">
                  {member.name?.substring(0, 2) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-white mb-1">{member.name}</h4>
                <p className="text-sm text-gray-400 mb-2">
                  {member.specialty || "Participante"}
                </p>
                <div className="flex flex-wrap gap-1">
                  {skills.map((skill, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-xs bg-gray-700 text-gray-300"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

// Main ParticipantsTab component
export function ParticipantsTab({ eventData, groupId }: ParticipantsTabProps) {
  return (
    <div className="space-y-8">
      {groupId ? (
        <div>
          <div className="flex items-center mb-6">
            <Users className="w-6 h-6 mr-2 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Mi Grupo</h2>
          </div>
          <GroupMembersList groupId={groupId} />
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
          <Users className="w-12 h-12 mx-auto mb-3 text-gray-500" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No estás en un grupo
          </h3>
          <p className="text-gray-300 mb-4">
            Cuando te unas a un desafío, serás asignado a un grupo
            automáticamente cuando haya suficientes participantes.
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Unirse al Desafío
          </Button>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-6 text-white">
          Todos los Participantes
        </h2>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
          <p className="text-gray-300">
            Esta funcionalidad estará disponible próximamente.
          </p>
        </div>
      </div>
    </div>
  );
}
