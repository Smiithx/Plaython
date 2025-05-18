"use client";
import { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "motion/react";
import { Code } from "lucide-react";
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
        className={`px-4 py-3 sticky top-0 z-10
    ${
      scrolled
        ? "bg-transparent backdrop-blur-md shadow-md"
        : "bg-black backdrop-blur"
    }
    `}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex space-x-7 items-center">
            <div className="flex gap-2">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="bg-purple-600 rounded-lg p-2"
              >
                <Code className="w-6 h-6 text-white" />
              </motion.div>
              <span className="items-center self-center place-self-center text-2xl bg-gradient-to-r from-[#FF9A8B] via-[#5865F2] to-[#9146FF] text-transparent bg-clip-text">
                <Link href="/"> Plaython</Link>
              </span>
            </div>
            <nav className="flex md:flex gap-6 font-semibold">
              <span className="border-b-2 border-transparent transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#FF9A8B]/20 hover:via-[#5865F2]/20 hover:to-[#9146FF]/20 hover:border-white/40 hover:rounded-t-lg px-4 py-2">
                <Link
                  href="/challenges"
                  className="font-[var(--font-bebas)] text-sm text-white/80 inline-block"
                >
                  Eventos
                </Link>
              </span>
              <SignedIn>
                {/* <span className="border-b-2 border-transparent transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#FF9A8B]/20 hover:via-[#5865F2]/20 hover:to-[#9146FF]/20 hover:border-white/40 hover:rounded-t-lg px-4 py-2">
                  <Link
                    href="/challenges"
                    className="font-[var(--font-bebas)] text-sm text-white/80 inline-block"
                  >
                    Eventos
                  </Link>
                </span> */}

                <span className="border-b-2 border-transparent transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#FF9A8B]/20 hover:via-[#5865F2]/20 hover:to-[#9146FF]/20 hover:border-white/40 hover:rounded-t-lg px-4 py-2">
                  <Link
                    href="/dashboard"
                    className="font-[var(--font-bebas)] text-sm text-white/80 inline-block"
                  >
                    Panel
                  </Link>
                </span>
              </SignedIn>
              <SignedOut>
                <span className="border-b-2 border-transparent transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#FF9A8B]/20 hover:via-[#5865F2]/20 hover:to-[#9146FF]/20 hover:border-white/40 hover:rounded-t-lg px-4 py-2">
                  <Link
                    href="/como-funciona"
                    className="font-[var(--font-bebas)] text-sm text-white/80 inline-block"
                  >
                    Cómo Funciona
                  </Link>
                </span>
              </SignedOut>
            </nav>
          </div>
          <div className="hidden md:block">
            <div className="space-x-7 items-center md:flex gap-3">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="py-2 px-4 rounded text-white/80 hover:text-white duration-300 hover:bg-gradient-to-r hover:from-[#FF9A8B]/20 hover:via-[#5865F2]/20 hover:to-[#9146FF]/20 hover:border-white/40">
                    Iniciar Sesión
                  </button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <button className="relative overflow-hidden bg-gradient-to-r from-cyan-400 via-[#5865F2] to-[#9146FF] text-white font-semibold rounded-lg transition-colors duration-300 hover:from-purple-700 hover:to-pink-600 py-2 px-4 shiny-btn">
                    Registrarse
                  </button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <div className="hidden md:flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
                  <UserButton />
                </div>
              </SignedIn>
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
