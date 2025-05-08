import Image from "next/image";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative pt-28 pb-40 overflow-hidden bg-gradient-to-b from-slate-900/80 to-blue-950/60"
    >
      <div className="absolute inset-0 z-0">
        {/* <Image
          width={}
          height={}
          src=""
          alt=""
          className="w-full h-full object-cover"
        /> */}
      </div>
      <div className="container mx-auto sm:px-6 lg:px-8 px-4 relative z-10">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            TITULO
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-blue-200 mb-6">
            SUBTITULO
          </h2>
          <p className="text-lg md:text-xl mb-8 text-slate-200">
            Únete a equipos gamificados para superar retos de programación y
            subir de nivel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/auth/login"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition-all duration-300 text-center"
            >
              Unete ahora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
