"use client";
import Hero from "../../../Components/index/Hero";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/ui/language-switcher";

export interface HomePageProps {}

export default function HomePage({}: HomePageProps) {
  // Use the useTranslations hook to access translations
  const t = useTranslations("home");

  return (
    <div className="min-h-screen bg-black">
      {/* Language switcher in the top-right corner
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>*/}

      {/* Example of using translations
      <div className="absolute top-4 left-4 z-50 text-white p-4 bg-black/50 rounded-lg max-w-md">
        <h2 className="text-xl font-bold mb-2">{t("features.title")}</h2>
        <p className="mb-2">{t("features.teamwork.description")}</p>
        <p className="mb-2">{t("features.challenges.description")}</p>
        <p>{t("features.community.description")}</p>
      </div>*/}

      <Hero />
    </div>
  );
}
