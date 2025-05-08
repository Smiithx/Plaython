"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Loading } from "../../../Components/ui/loading/Loading";

export function DashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (isLoaded) return <Loading />;

  return (
    <div>
      Dashboard page
      <UserButton />
    </div>
  );
}
