"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Loading } from "../../Components/ui/loading/Loading";
import ChallengeShowcase from "../../Components/challenge/ChallengeShowcase";

export default function HomePage() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return <Loading />;

  return (
    <div>
      <ChallengeShowcase />
      <UserButton />
    </div>
  );
}
