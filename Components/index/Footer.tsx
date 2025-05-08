export function Footer() {
  return (
    // <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
    //   <div className="container mx-auto px-4">
    <footer id="main-footer" className="bg-gray-800 text-gray-200 pt-12 pb-8">
      <div className="container max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 sm:px-6 lg:px-8">
        <p className="text-sm">
          © 2025 Plaython. Todos los derechos reservados.
        </p>
        <div className="flex space-x-2 text-sm">
          <a href="#" className="hover:text-white transition">
            Twitch
          </a>
          <span className="text-gray-600">|</span>
          <a href="#" className="hover:text-white transition">
            GitHub
          </a>
          <span className="text-gray-600">|</span>
          <a href="#" className="hover:text-white transition">
            Discord
          </a>
        </div>
      </div>
    </footer>
  );
}
