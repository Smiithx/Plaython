"use client";

import { useUser } from "@clerk/nextjs";
import { Loading } from "../../../Components/ui/loading/Loading";
import Navbar from "../../../Components/index/Nab";
import ChallengeShowcaseServer from "../../../Components/challenge/ChallengeShowcaseServer";
import { Footer } from "../../../Components/index/Footer";

export default function ChallengesPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return <Loading />;

  return (
    <div>
      <Navbar />
      <ChallengeShowcaseServer />
      <Footer />
    </div>
  );
}
