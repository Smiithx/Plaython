import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Challenge, Discussion } from "@/types";
import { Button } from "@/ui/button";
import {
  MessageSquare,
  Share2,
  ThumbsUp,
  Send,
  Plus,
  Filter,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { Badge } from "@/ui/badge";
import { useCreateDiscussion, useDiscussion } from "@/lib/hooks/useDiscussion";
import { useUser } from "@clerk/nextjs";

export interface DiscussionTabProps {
  eventData: Challenge;
}

// export interface Discussion {
//   id: string;
//   user: string;
//   userId: string;
//   avatar?: string;
//   date: string;
//   message: string;
//   replies: number;
//   likes: number;
//   tags: string[];
//   isLiked?: boolean;
// }

export function DiscussionTab({ eventData }: DiscussionTabProps) {
  const { user } = useUser();

  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  //fetch
  const {
    execute: fetchDiscussions,
    clearCache: clearDiscussionCache,
    data: discussions = [],
    error: fetchError,
    isLoading: isLoadingDiscussions,
    setData: setDiscussions,
  } = useDiscussion();

  // created
  const {
    error: createError,
    execute: createNewDiscussion,
    isLoading: isCreatingDiscussion,
  } = useCreateDiscussion();

  // useEffect(() => {
  //   fetchDiscussions();
  // }, [fetchDiscussions]);
  const handleCreateDiscussion = async () => {
    if (!newPostContent.trim()) return;

    const newDiscussion: Omit<Discussion, "id"> = {
      // userName: String(user?.fullName),
      user_id: String(user?.id),
      // userAvatarUrl: user?.imageUrl,
      timestamp: new Date().toISOString(),
      message: newPostContent,
      likes: 0,
      isLiked: false,
    };

    try {
      await createNewDiscussion(newDiscussion);
      setNewPostContent("");
      setShowNewPost(false);
      // await fetchDiscussions()
    } catch (err) {
      console.error("Error al crear la discusión:", err);
    }
  };
  // Format date to relative time (e.g., "2 days ago")
  const formatRelativeTime = useCallback((dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffDays > 0) {
      return diffDays === 1 ? "ayer" : `hace ${diffDays} días`;
    } else if (diffHours > 0) {
      return `hace ${diffHours} horas`;
    } else if (diffMinutes > 0) {
      return `hace ${diffMinutes} minutos`;
    } else {
      return "justo ahora";
    }
  }, []);

  // Handle like button click
  // const handleLike = useCallback((id: string) => {
  //   setDiscussions((prevDiscussions) =>
  //     prevDiscussions.map((discussion) => {
  //       if (discussion.id === id) {
  //         const isLiked = !discussion.isLiked;
  //         return {
  //           ...discussion,
  //           likes: isLiked ? discussion.likes + 1 : discussion.likes - 1,
  //           isLiked,
  //         };
  //       }
  //       return discussion;
  //     })
  //   );
  // }, []);

  // Handle new post submission
  // const handleSubmitPost = useCallback(() => {
  //   if (!newPostContent.trim()) return;

  //   const newPost: Discussion = {
  //     id: `new-${Date.now()}`,
  //     user: "Usuario Actual",
  //     userId: "current-user",
  //     date: new Date().toISOString(),
  //     message: newPostContent,
  //     replies: 0,
  //     likes: 0,
  //     tags: ["Nueva Publicación"],
  //     isLiked: false,
  //   };

  //   setDiscussions((prevDiscussions) => [newPost, ...prevDiscussions]);
  //   setNewPostContent("");
  //   setShowNewPost(false);
  // }, [newPostContent]);

  // Filter discussions based on search query
  const filteredDiscussions = useMemo(() => {
    const list = Array.isArray(discussions) ? discussions : [];

    return list.filter(
      (discussion: Discussion) =>
        discussion.message.toLowerCase().includes(searchQuery.toLowerCase())
      // discussion.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [discussions, searchQuery]);

  if (isLoadingDiscussions) return <div>Cargando discusiones...</div>;
  if (fetchError)
    return <div>Error al cargar discusiones: {fetchError.message}</div>;
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <MessageSquare className="mr-2 h-6 w-6 text-blue-400" />
          Discusión del Evento
        </h2>
        <Button
          onClick={() => setShowNewPost(!showNewPost)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Pregunta
        </Button>
      </div>

      {/* Search and filter */}
      <div className="mb-6 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar en las discusiones..."
            className="pl-10 bg-gray-800 border-gray-700 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="border-gray-700 text-gray-300">
          <Filter className="h-4 w-4 mr-2" />
          Filtrar
        </Button>
      </div>

      {/* New post form */}
      {showNewPost && (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">
            Nueva Pregunta o Comentario
          </h3>
          <Textarea
            placeholder="Escribe tu pregunta o comentario aquí..."
            className="bg-gray-900 border-gray-700 text-white mb-3 min-h-[100px]"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300"
              onClick={() => setShowNewPost(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleCreateDiscussion}
              disabled={!newPostContent.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              Publicar
            </Button>
          </div>
        </div>
      )}

      {/* Discussions list */}
      <div className="space-y-4">
        {filteredDiscussions.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-500" />
            <p className="text-gray-300">
              {searchQuery
                ? "No se encontraron discusiones que coincidan con tu búsqueda."
                : "No hay discusiones todavía. ¡Sé el primero en publicar!"}
            </p>
          </div>
        ) : (
          filteredDiscussions.map((discussion: Discussion) => (
            <div
              key={discussion.id}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-500 transition-all"
            >
              <div className="flex items-start mb-3">
                <Avatar className="w-10 h-10 mr-3">
                  <AvatarImage
                    src={discussion.userAvatarUrl ?? ""}
                    alt={discussion.user_id}
                  />
                  <AvatarFallback className="bg-blue-900 text-blue-300">
                    A{/* {discussion.userName.substring(0, 2)} */}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold text-white">
                      {discussion.userName}
                    </h4>
                    <span className="text-xs text-gray-400">
                      {formatRelativeTime(discussion.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-2">{discussion.message}</p>
                  {/* <div className="flex flex-wrap gap-1 mb-2">
                    {discussion.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-xs bg-gray-700 text-gray-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div> */}
                </div>
              </div>
              <div className="flex justify-between items-center pl-12">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`hover:bg-blue-900/30 ${
                      discussion.isLiked
                        ? "text-blue-400"
                        : "text-gray-400 hover:text-blue-300"
                    }`}
                    // onClick={() => handleLike(discussion.id)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {discussion.likes}
                  </Button>
                  {/* <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-blue-300 hover:bg-blue-900/30"
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {discussion.replies} respuestas
                  </Button> */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
{
  /* <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-gray-300 hover:bg-gray-800"
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Compartir
                </Button> */
}

// // Generate demo discussions
// const generateDemoDiscussions = useMemo((): Discussion[] => {
//   const now = new Date();
//   const yesterday = new Date(now);
//   yesterday.setDate(yesterday.getDate() - 1);
//   const twoDaysAgo = new Date(now);
//   twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

//   return [
//     {
//       id: "1",
//       user: "María García",
//       userId: "user1",
//       avatar: "https://i.pravatar.cc/150?img=1",
//       date: now.toISOString(),
//       message:
//         "¡Hola a todos! ¿Alguien más está emocionado por este desafío? Es mi primera vez participando en un evento de este tipo y me encantaría conocer sus experiencias previas.",
//       replies: 3,
//       likes: 5,
//       tags: ["Presentación", "Networking"],
//       isLiked: false,
//     },
//     {
//       id: "2",
//       user: "Carlos Rodríguez",
//       userId: "user2",
//       avatar: "https://i.pravatar.cc/150?img=2",
//       date: yesterday.toISOString(),
//       message:
//         "¿Alguien sabe si necesitamos preparar algo específico para la primera sesión? No quiero llegar sin estar preparado.",
//       replies: 2,
//       likes: 3,
//       tags: ["Pregunta", "Preparación"],
//       isLiked: true,
//     },
//     {
//       id: "3",
//       user: "Ana Martínez",
//       userId: "user3",
//       avatar: "https://i.pravatar.cc/150?img=3",
//       date: twoDaysAgo.toISOString(),
//       message:
//         "Estoy buscando compañeros con experiencia en desarrollo frontend para formar un equipo equilibrado. Yo tengo experiencia en backend y bases de datos. ¡Contáctenme si están interesados!",
//       replies: 5,
//       likes: 8,
//       tags: ["Equipo", "Frontend", "Backend"],
//       isLiked: false,
//     },
//   ];
// }, []);

// const [discussions, setDiscussions] = useState<Discussion[]>(
//   generateDemoDiscussions
// );
