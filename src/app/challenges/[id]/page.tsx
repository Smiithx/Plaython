import { notFound } from "next/navigation";
import { getChallengeById } from "@/lib/services/challenges";
import { ChallengePageProps } from "@/types";
import ChallengeDetailClient from "../../../../Components/challenge/id/ChallengeDetailClient";

export default async function ChallengeDetailServer({
  params,
}: ChallengePageProps) {
  const { id } = await params;
  const eventData = await getChallengeById(id);
  if (!eventData) {
    notFound();
  }

  return <ChallengeDetailClient eventData={eventData} />;
}
