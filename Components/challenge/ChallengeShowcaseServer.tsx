import { Suspense } from "react";
import { getAllChallenges }    from "@/lib/services/challenges";
import { getAllTags }          from "@/lib/services/tags";
import { getAllDifficulties }  from "@/lib/services/difficulties";
import { getAllStatuses }      from "@/lib/services/statuses";

// Import the dynamic client component
import dynamic from "next/dynamic";

// Dynamically import ChallengeShowcase with a loading fallback
const ChallengeShowcase = dynamic(
  () => import("./ChallengeShowcase"),
  {
    loading: () => (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 w-64 bg-gray-300 rounded mb-4 mx-auto"></div>
          <div className="h-4 w-48 bg-gray-300 rounded mb-2 mx-auto"></div>
          <div className="h-4 w-56 bg-gray-300 rounded mb-2 mx-auto"></div>
          <div className="h-4 w-40 bg-gray-300 rounded mx-auto"></div>
        </div>
      </div>
    ),
    ssr: true
  }
);

export default async function ChallengeShowcaseServer() {
  // 1. Fetch de datos
  const challenges  = await getAllChallenges();
  const tags        = await getAllTags();
  const difficulties = await getAllDifficulties();
  const statuses    = await getAllStatuses();

  // 2. Renderiza el Client pasándole los datos dentro de Suspense
  return (
    <Suspense fallback={
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 w-64 bg-gray-300 rounded mb-4 mx-auto"></div>
          <div className="h-4 w-48 bg-gray-300 rounded mb-2 mx-auto"></div>
          <div className="h-4 w-56 bg-gray-300 rounded mb-2 mx-auto"></div>
          <div className="h-4 w-40 bg-gray-300 rounded mx-auto"></div>
        </div>
      </div>
    }>
      <ChallengeShowcase
        challenges={challenges}
        tags={tags}
        difficulties={difficulties}
        statuses={statuses}
      />
    </Suspense>
  );
}
