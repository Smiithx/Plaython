"use client";
import { SignIn } from "@clerk/nextjs";
import { Footer } from "../../../../../Components/index/Footer";
import Navbar from "../../../../../Components/index/Nab";

export default function Page() {
  return (
    <>
      <Navbar />
      <SignIn />
      <Footer />
    </>
  );
}
