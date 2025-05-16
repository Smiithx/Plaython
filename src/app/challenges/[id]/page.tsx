// "use client";

// import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../Components/ui/tabs";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  MessageSquare,
  Share2,
  Star,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  Zap,
  User,
} from "lucide-react";
import { Badge } from "../../../../Components/ui/badge";
import Link from "next/link";
import { getChallengeById } from "@/lib/services/challenges";
import { notFound } from "next/navigation";
import { Button } from "../../../../Components/ui/button";
import StarField from "../../../../Components/ui/animations/star-footer";

const statusGradient = {
  finished: "bg-gradient-to-r from-gray-600 to-gray-400",
  ongoing:
    "bg-gradient-to-r from-green-500 via-teal-400 to-blue-500 animate-pulse",
  next: "bg-gradient-to-r from-purple-600 via-pink-500 to-red-500",
};

export default async function ChallengeDetail({
  params,
}: {
  params: { id: string };
}) {
  // const [isJoined, setIsJoined] = useState(false);
  // const [activeTab, setActiveTab] = useState("info");
  const eventData = await getChallengeById(params.id);
  console.log(" datos by id ", eventData);
  if (!eventData) {
    notFound();
  }
  // // Formatear fechas
  const startDate = new Date(eventData.start_date);
  const endDate = new Date(eventData.end_date);

  const formatDate = (date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // // Calcular duración del evento
  const calculateDuration = () => {
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)) % 24;

    if (diffDays > 0 && diffHours > 0) {
      return `${diffDays} días y ${diffHours} horas`;
    } else if (diffDays > 0) {
      return `${diffDays} días`;
    } else {
      return `${diffHours} horas`;
    }
  };

  // Manejar unirse al evento
  // const handleJoinEvent = () => {
  //   setIsJoined(!isJoined);
  // };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="relative h-80 bg-gradient-to-r from-purple-900 via-blue-800 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-8">
          {/* Botón de retroceso */}
          <Link
            href="/challenges"
            className="z-10 inline-flex items-center absolute top-4 left-4 gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Volver a retos
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {eventData?.tags.map((category, index) => (
              <Badge
                key={index}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                {category}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
            {eventData.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-white font-bold">
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
              {/* <span>
                 {eventData.currentParticipants}/{eventData.maxParticipants}{" "}
                 participantes
               </span> */}
            </div>
          </div>
        </div>
      </div>
      <StarField />
      {/* Contenido principal */}
      <div className="relative container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Columna principal */}
          <div className="lg:w-2/3">
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden mb-8">
              <Tabs
                defaultValue="info"
                className="w-full"
                // onValueChange={setActiveTab}
              >
                <div className="px-6 pt-6 justify-self-center">
                  <TabsList className="grid grid-cols-4 gap-4 bg-gray-800 p-1 rounded-lg">
                    <TabsTrigger
                      value="info"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md"
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

                <TabsContent value="info" className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-white">
                        Descripción del Evento
                      </h2>
                      <p className="text-gray-300 mb-4">
                        {eventData.description}
                      </p>
                      <p className="text-gray-300">{eventData.description}</p>
                      {/* <p className="text-gray-300">
                         {eventData.longDescription}
                       </p> */}
                    </div>

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
                </TabsContent>

                <TabsContent value="participants" className="p-6">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-6 text-white">
                        Equipos Participantes
                      </h2>
                      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {eventData.teams.map((team) => (
                           <div
                             key={team.id}
                             className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-500 transition-all"
                           >
                             <div className="flex items-center mb-3">
                               <img
                                 src={team.avatar || "/placeholder.svg"}
                                 alt={team.name}
                                 className="w-10 h-10 rounded-full mr-3 bg-gray-700"
                               />
                               <div>
                                 <h4 className="font-semibold text-white">
                                   {team.name}
                                 </h4>
                                 <p className="text-sm text-gray-400">
                                   {team.members} miembros
                                 </p>
                               </div>
                             </div>
                             <p className="text-gray-300 text-sm">
                               {team.project}
                             </p>
                           </div>
                         ))}
                       </div> */}
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold mb-6 text-white">
                        Participantes Individuales
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {/* {eventData.participants.map((participant) => (
                           <div
                             key={participant.id}
                             className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-blue-500 transition-all"
                           >
                             <div className="flex items-center">
                               <img
                                 src={participant.avatar || "/placeholder.svg"}
                                 alt={participant.name}
                                 className="w-8 h-8 rounded-full mr-2 bg-gray-700"
                               />
                               <div>
                                 <h4 className="font-medium text-white text-sm">
                                   {participant.name}
                                 </h4>
                                 <p className="text-xs text-gray-400">
                                   {participant.role}
                                 </p>
                               </div>
                             </div>
                           </div>
                         ))} */}
                      </div>

                      {/* {eventData.currentParticipants >
                         eventData.participants.length && (
                         <Button
                           variant="outline"
                           className="mt-4 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                         >
                           Ver todos los participantes (
                           {eventData.currentParticipants})
                         </Button>
                       )} */}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="schedule" className="p-6">
                  <h2 className="text-2xl font-bold mb-6 text-white">
                    Agenda del Evento
                  </h2>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600"></div>
                    <div className="space-y-6 ml-10">
                      {/* {eventData.schedule.map((item, index) => (
                         <div key={index} className="relative">
                           <div className="absolute -left-10 top-1 w-4 h-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
                           <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                             <h4 className="font-semibold text-white mb-1">
                               {item.time}
                             </h4>
                             <p className="text-gray-300">{item.activity}</p>
                           </div>
                         </div>
                       ))} */}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="discussion" className="p-6">
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
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Barra lateral */}
          <div className="lg:w-1/3">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6 sticky top-4">
              <div className="mb-6">
                <Button
                // onClick={handleJoinEvent}
                // className={`w-full text-lg py-6 ${
                //   isJoined
                //     ? "bg-green-600 hover:bg-green-700"
                //     : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                // }`}
                >
                  {/* {isJoined ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Ya estás inscrito
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-5 w-5" />
                      Unirse al Evento
                    </>
                  )} */}
                </Button>

                {/* {!isJoined && (
                   <p className="text-center text-gray-400 text-sm mt-2">
                     {eventData.maxParticipants - eventData.currentParticipants}{" "}
                     plazas disponibles
                   </p>
                 )} */}
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
                    {/* <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      Presencial
                    </Badge> */}
                    {/* {eventData.virtualOption && (
                       <Badge className="ml-2 bg-gradient-to-r from-pink-600 to-orange-600 text-white">
                         Virtual
                       </Badge>
                     )} */}
                  </div>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                  <span className="text-gray-400">Dificultad</span>
                  <span className="font-medium text-white">
                    {eventData.difficulty}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Valoración</span>
                  <div className="flex items-center">
                    {/* <div className="flex mr-1">
                       {[...Array(5)].map((_, i) => (
                         <Star
                           key={i}
                           className={`h-4 w-4 ${
                             i < Math.floor(eventData.rating)
                               ? "text-yellow-400 fill-yellow-400"
                               : i < eventData.rating
                               ? "text-yellow-400 fill-yellow-400 opacity-50"
                               : "text-gray-600"
                           }`}
                         />
                       ))}
                     </div> */}
                    {/* <span className="font-medium text-white">
                       {eventData.rating} ({eventData.reviews})
                     </span> */}
                  </div>
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

              {/* {isJoined && (
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <h3 className="text-lg font-semibold mb-4 text-white">
                    Acciones
                  </h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Invitar amigos
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Reportar problema
                    </Button>
                  </div>
                </div>
              )} */}
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Ubicación
              </h3>
              <div className="bg-gray-800 rounded-lg h-48 mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-gray-500" />
                <span className="ml-2 text-gray-400">Mapa no disponible</span>
              </div>
              {/* <p className="text-gray-300 mb-4">{eventData.location}</p> */}
              <Button
                variant="outline"
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Ver en Google Maps
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
