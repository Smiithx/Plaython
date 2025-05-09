"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Loading } from "../../Components/ui/loading/Loading";

export default function HomePage() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return <Loading />;

  return (
    <div>
      <UserButton />
    </div>
  );
}
