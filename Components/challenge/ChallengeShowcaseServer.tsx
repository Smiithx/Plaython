import ChallengeShowcase from "./ChallengeShowcase";
import { getAllChallenges }    from "@/lib/services/challenges";
import { getAllTags }          from "@/lib/services/tags";
import { getAllDifficulties }  from "@/lib/services/difficulties";
import { getAllStatuses }      from "@/lib/services/statuses";

export default async function ChallengeShowcaseServer() {
  // 1. Fetch de datos
  const challenges  = await getAllChallenges();
  const tags        = await getAllTags();
  const difficulties = await getAllDifficulties();
  const statuses    = await getAllStatuses();

  // 2. Renderiza el Client pasándole los datos
  return (
      <ChallengeShowcase
          challenges={challenges}
          tags={tags}
          difficulties={difficulties}
          statuses={statuses}
      />
  );
}
