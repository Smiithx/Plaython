import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import ChallengeShowcaseServer
const ChallengeShowcaseServer = dynamic(
  () => import("../../../../Components/challenge/ChallengeShowcaseServer"),
  {
    loading: () => (
      <div className="w-full h-96 flex items-center justify-center bg-[#0F0F0F]">
        <div className="animate-pulse text-center text-white">
          <p className="text-xl">Loading challenges...</p>
        </div>
      </div>
    ),
    ssr: true
  }
);

export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <Suspense fallback={
        <div className="w-full h-96 flex items-center justify-center bg-[#0F0F0F]">
          <div className="animate-pulse text-center text-white">
            <p className="text-xl">Loading challenges...</p>
          </div>
        </div>
      }>
        <ChallengeShowcaseServer />
      </Suspense>
    </div>
  );
}
