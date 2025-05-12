import { DiscIcon, Gamepad2, InstagramIcon, TwitchIcon } from "lucide-react";
import Link from "next/link";
import StarField from "../ui/animations/star-footer";
import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="vertical-section bg-black py-12 border-t border-white/10 overflow-hidden">
      <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#FF9A8B] via-[#5865F2] to-[#9146FF]"></div>
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

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Plaython. Todos los derechos
            reservados.
          </p>
          <div className="flex flex-row">
            <p className="text-white/50 text-sm">
              Hecho con{" "}
              {/*<motion.span
                className="inline-block"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                ❤️
              </motion.span>*/}{" "}
              by
            </p>

            <span className="ml-1 text-sm bg-gradient-to-r from-[#FF9A8B] via-[#5865F2] to-[#9146FF] text-transparent bg-clip-text">
              Plaython
            </span>
          </div>
        </div>
      </div>
    </footer>
    // <section className="vertical-section h-screen w-screen flex flex-col items-center justify-center relative">

    // </section>
    // <footer className="bg-[#141414] border-t border-[#2D2D2D] py-12">
    //   <div className="container mx-auto px-4">
    //     <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    //       <div>
    //         <div className="flex items-center gap-2 mb-4">
    //           <div className="rounded-lg bg-[#107C10] p-1.5">
    //             <Gamepad2 className="h-5 w-5" />
    //           </div>
    //           <span className="font-bold text-xl">Plaython</span>
    //         </div>
    //         <p className="text-white/60 text-sm mb-4">
    //           Conectando talento para crear equipos extraordinarios en
    //           hackathons y desafíos de programación.
    //         </p>
    //         <div className="flex gap-4">
    //           <a
    //             href="#"
    //             className="text-white/60 hover:text-white transition-colors"
    //           >
    //             <svg
    //               className="h-5 w-5"
    //               fill="currentColor"
    //               viewBox="0 0 24 24"
    //             >
    //               <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.163 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.839c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.308.678.917.678 1.847 0 1.333-.012 2.409-.012 2.735 0 .267.18.578.688.48C19.138 20.16 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    //             </svg>
    //           </a>
    //           <a
    //             href="#"
    //             className="text-white/60 hover:text-white transition-colors"
    //           >
    //             <svg
    //               className="h-5 w-5"
    //               fill="currentColor"
    //               viewBox="0 0 24 24"
    //             >
    //               <path d="M22.162 5.656a8.384 8.384 0 01-2.402.658A4.196 4.196 0 0021.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 00-7.126 3.814 11.874 11.874 0 01-8.62-4.37 4.168 4.168 0 00-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 01-1.894-.523v.052a4.185 4.185 0 003.355 4.101 4.21 4.21 0 01-1.89.072A4.185 4.185 0 007.97 16.65a8.394 8.394 0 01-6.191 1.732 11.83 11.83 0 006.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 002.087-2.165z" />
    //             </svg>
    //           </a>
    //           <a
    //             href="#"
    //             className="text-white/60 hover:text-white transition-colors"
    //           >
    //             <svg
    //               className="h-5 w-5"
    //               fill="currentColor"
    //               viewBox="0 0 24 24"
    //             >
    //               <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    //             </svg>
    //           </a>
    //         </div>
    //       </div>

    //       <div>
    //         <h3 className="font-bold text-lg mb-4 text-[#107C10]">Producto</h3>
    //         <ul className="space-y-2">
    //           <li>
    //             <a
    //               href="#"
    //               className="text-white/60 hover:text-white transition-colors text-sm"
    //             >
    //               Características
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="text-white/60 hover:text-white transition-colors text-sm"
    //             >
    //               Eventos
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="text-white/60 hover:text-white transition-colors text-sm"
    //             >
    //               Pricing
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="text-white/60 hover:text-white transition-colors text-sm"
    //             >
    //               Testimonios
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="text-white/60 hover:text-white transition-colors text-sm"
    //             >
    //               FAQ
    //             </a>
    //           </li>
    //         </ul>
    //       </div>

    //       <div>
    //         <h3 className="font-bold text-lg mb-4 text-[#107C10]">Compañía</h3>
    //         <ul className="space-y-2">
    //           <li>
    //             <a
    //               href="#"
    //               className="text-white/60 hover:text-white transition-colors text-sm"
    //             >
    //               Sobre Nosotros
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="text-white/60 hover:text-white transition-colors text-sm"
    //             >
    //               Blog
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="text-white/60 hover:text-white transition-colors text-sm"
    //             >
    //               Carreras
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="text-white/60 hover:text-white transition-colors text-sm"
    //             >
    //               Prensa
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="text-white/60 hover:text-white transition-colors text-sm"
    //             >
    //               Contacto
    //             </a>
    //           </li>
    //         </ul>
    //       </div>

    //       <div>
    //         <h3 className="font-bold text-lg mb-4 text-[#107C10]">Legal</h3>
    //         <ul className="space-y-2">
    //           <li>
    //             <a
    //               href="#"
    //               className="text-white/60 hover:text-white transition-colors text-sm"
    //             >
    //               Términos de Servicio
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="text-white/60 hover:text-white transition-colors text-sm"
    //             >
    //               Política de Privacidad
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="text-white/60 hover:text-white transition-colors text-sm"
    //             >
    //               Cookies
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>

    //     <div className="border-t border-[#2D2D2D] mt-12 pt-8 text-center text-white/40 text-sm">
    //       &copy; {new Date().getFullYear()} Plaython. Todos los derechos
    //       reservados.
    //     </div>
    //   </div>
    // </footer>
    // <footer id="main-footer" className="bg-gray-800 text-gray-200 pt-12 pb-8">
    //   <div className="container max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 sm:px-6 lg:px-8">
    //     <p className="text-sm">
    //       © 2025 Plaython. Todos los derechos reservados.
    //     </p>
    //     <div className="flex space-x-2 text-sm">
    //       <a href="#" className="hover:text-white transition">
    //         Twitch
    //       </a>
    //       <span className="text-gray-600">|</span>
    //       <a href="#" className="hover:text-white transition">
    //         GitHub
    //       </a>
    //       <span className="text-gray-600">|</span>
    //       <a href="#" className="hover:text-white transition">
    //         Discord
    //       </a>
    //     </div>
    //   </div>
    // </footer>
  );
}
