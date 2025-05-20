"use client";

import { useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { locales } from "@/i18n/config";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

/**
 * A component that allows users to switch between different languages
 */
export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const t = useTranslations("common");
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Function to switch to a different locale
  function onSelectLocale(newLocale: string) {
    startTransition(() => {
      // If we're on the default locale and switching to another locale,
      // we need to add the locale prefix to the pathname
      if (locale === "en" && newLocale !== "en") {
        router.push(`/${newLocale}${pathname}`);
      } 
      // If we're on a non-default locale and switching to the default locale,
      // we need to remove the locale prefix from the pathname
      else if (locale !== "en" && newLocale === "en") {
        router.push(pathname.replace(`/${locale}`, ""));
      } 
      // If we're switching between non-default locales,
      // we need to replace the current locale with the new one
      else if (locale !== "en" && newLocale !== "en") {
        router.push(pathname.replace(`/${locale}`, `/${newLocale}`));
      }
      // If we're on the default locale and switching to the default locale,
      // we don't need to do anything
    });
  }

  // Map of locale codes to their display names
  const localeNames: Record<string, string> = {
    en: "English",
    es: "Español",
    fr: "Français",
    de: "Deutsch",
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <span className="text-sm font-medium">{t("language")}:</span>
      <div className="flex space-x-1">
        {locales.map((loc) => (
          <Button
            key={loc}
            variant={loc === locale ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectLocale(loc)}
            disabled={isPending}
            className="text-xs px-2 py-1 h-auto"
          >
            {localeNames[loc]}
          </Button>
        ))}
      </div>
    </div>
  );
}