"use client";
import { useEffect, useState } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Gamepad2 } from "lucide-react";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <>
      <header
        className={`border-b border-[#2D2D2D] px-4 py-3 sticky top-0 z-10
    ${
      scrolled
        ? "bg-transparent backdrop-blur-md shadow-md"
        : "bg-[#141414]/80 backdrop-blur "
    }
    `}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-[#107C10] p-1.5">
              <Gamepad2 className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl">Plaython</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Características
            </Link>
            <Link
              href="#events"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Eventos
            </Link>
            <Link
              href="#matchmaking"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Cómo Funciona
            </Link>
            <Link
              href="#teams"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Equipos
            </Link>
          </nav>
          <div className="hidden md:block">
            <div className="flex items-center space-x-2 md:block">
              <SignInButton>
                <button className="py-2 px-4 rounded text-white/80 hover:text-white hover:bg-[#1E1E1E]">
                  Iniciar Sesión
                </button>
              </SignInButton>

              <SignUpButton>
                <button className="bg-[#107C10] hover:bg-[#0B5D0B] text-white font-medium py-2 px-4 rounded">
                  Registrarse
                </button>
              </SignUpButton>
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-400 hover:bg-blue-50 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-4">
            <div className="block px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-50">
              <SignInButton />
            </div>
            <div className="block px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-50">
              <SignUpButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
