"use client";

import { DiscIcon, InstagramIcon, TwitchIcon } from "lucide-react";
import Link from "next/link";
import StarField from "../ui/animations/star-footer";
import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="relative bg-black py-12 overflow-hidden">
      <StarField small />

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 justify-items-end md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-2xl mb-4">
              <span className="bg-gradient-to-r from-[#FF9A8B] via-[#5865F2] to-[#9146FF] text-transparent bg-clip-text">
                Plaython
              </span>
            </h3>

            <p className="text-white/70">
              La plataforma de emparejamiento definitiva para desafíos de
              codificación y eventos de programación.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-white/70 hover:text-[#5865F2]">
                <DiscIcon className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-white/70 hover:text-[#FF9A8B]">
                <InstagramIcon className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-white/70 hover:text-[#9146FF]">
                <TwitchIcon className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 items-center text-center justify-items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Plaython. Todos los derechos
            reservados.
          </p>
          <div className="flex flex-row items-center text-center">
            <p className="text-white/50 text-sm">
              Hecho con{" "}
              <motion.span
                className="inline-block"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                ❤️
              </motion.span>
              by
            </p>

            <span className="ml-1 text-sm bg-gradient-to-r from-[#FF9A8B] via-[#5865F2] to-[#9146FF] text-transparent bg-clip-text">
              Plaython
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
