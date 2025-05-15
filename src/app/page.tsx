"use client";
import Navbar from "../../components/index/Nab";
import Hero from "../../components/index/Hero";
import { Footer } from "../../components/index/Footer";
import { useEffect } from "react";
import { SignedOut, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Loading } from "../../components/ui/loading/Loading";
export default function HomePage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn]);

  if (isLoaded && isSignedIn) {
    return <Loading />;
  }
  return (
    <SignedOut>
      <div className="min-h-screen bg-[#0F0F0F] text-white">
        <Navbar />
        <Hero />
        <Footer />
      </div>
    </SignedOut>
  );
}
