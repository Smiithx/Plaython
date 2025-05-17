require("dotenv").config();
const {createClient} = require("@supabase/supabase-js");

// Inicializa cliente de Supabase
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Datos de prueba de desarrollo
const LOCAL_CHALLENGES = [
    {
        title: "FizzBuzz Clásico",
        description: "Escribe una función que imprima los números del 1 al 100. Para múltiplos de 3, imprime 'Fizz'; para múltiplos de 5, imprime 'Buzz'; y para múltiples de ambos, 'FizzBuzz'. Ideal para principiantes.",
        difficulty: "easy",
        tags: ["JavaScript", "Python", "Lógica"],
        teamSize: 1,
        startDate: "2025-03-01T00:00:00Z",
        endDate: "2025-03-15T00:00:00Z",
        status: "ongoing"
    }, {
        title: "Invertir Cadena",
        description: "Crea una función que invierta una cadena de texto sin usar funciones nativas como reverse(). Puedes implementarlo en cualquier lenguaje de programación.",
        difficulty: "easy",
        tags: ["JavaScript", "Strings"],
        teamSize: 1,
        startDate: "2025-03-10T00:00:00Z",
        endDate: "2025-03-20T00:00:00Z",
        status: "ongoing"
    }, {
        title: "Validar Palíndromo",
        description: "Escribe una función que determine si una cadena es un palíndromo ignorando mayúsculas, espacios y signos de puntuación. Este ejercicio mejora el manejo avanzado de strings.",
        difficulty: "mid",
        tags: ["JavaScript", "Regex", "Strings"],
        teamSize: 2,
        startDate: "2025-04-01T00:00:00Z",
        endDate: "2025-04-15T00:00:00Z",
        status: "next"
    }, {
        title: "Calculadora Básica",
        description: "Desarrolla una calculadora básica con operaciones de suma, resta, multiplicación y división. Puedes hacerlo en terminal o interfaz gráfica.",
        difficulty: "easy",
        tags: ["Python", "Consola"],
        teamSize: 1,
        startDate: "2025-03-05T00:00:00Z",
        endDate: "2025-03-25T00:00:00Z",
        status: "ongoing"
    }, {
        title: "API RESTful con Express",
        description: "Crea una API REST usando Express.js que permita gestionar usuarios, autenticación JWT y roles. Ideal para desarrolladores intermedios en Node.js.",
        difficulty: "mid",
        tags: ["Node.js", "Express", "Seguridad"],
        teamSize: 2,
        startDate: "2025-04-01T00:00:00Z",
        endDate: "2025-04-15T00:00:00Z",
        status: "ongoing"
    }, {
        title: "Juego Snake en la Terminal",
        description: "Implementa el clásico juego Snake en la terminal usando Python. Usa librerías como `curses` para controlar la entrada y salida de datos.",
        difficulty: "easy",
        tags: ["Python", "Terminal", "Lógica"],
        teamSize: 1,
        startDate: "2025-03-15T00:00:00Z",
        endDate: "2025-03-30T00:00:00Z",
        status: "finished"
    }, {
        title: "Plataforma de Hackatones Online",
        description: "Crea una web donde se organicen hackatones online. Incluye registro de equipos, calendario, chat en tiempo real y sistema de votación. Ideal para un proyecto fullstack.",
        difficulty: "expert",
        tags: ["Next.js", "Firebase", "WebSockets", "UI/UX"],
        teamSize: 5,
        startDate: "2025-05-01T00:00:00Z",
        endDate: "2025-06-01T00:00:00Z",
        status: "next"
    }, {
        title: "Login con Autenticación Social",
        description: "Implementa un sistema de inicio de sesión utilizando OAuth con Google, GitHub o Facebook. Aprende a integrar APIs externas y manejar tokens JWT.",
        difficulty: "mid",
        tags: ["React", "OAuth", "Node.js", "Auth"],
        teamSize: 2,
        startDate: "2025-04-10T00:00:00Z",
        endDate: "2025-04-25T00:00:00Z",
        status: "ongoing"
    }, {
        title: "Conversor de Monedas",
        description: "Crea una aplicación que convierta entre distintas monedas usando una API pública como ExchangeRatesAPI. Ideal para aprender consumo de APIs.",
        difficulty: "easy",
        tags: ["JavaScript", "APIs", "Frontend"],
        teamSize: 1,
        startDate: "2025-03-20T00:00:00Z",
        endDate: "2025-04-05T00:00:00Z",
        status: "ongoing"
    }, {
        title: "Gestor de Tareas Multicapa",
        description: "Diseña una aplicación completa de gestión de tareas con frontend, backend y base de datos. Usa arquitectura limpia y patrones de diseño.",
        difficulty: "expert",
        tags: ["TypeScript", "React", "Node.js", "PostgreSQL"],
        teamSize: 4,
        startDate: "2025-05-10T00:00:00Z",
        endDate: "2025-06-10T00:00:00Z",
        status: "next"
    }, {
        title: "Chat en Tiempo Real",
        description: "Crea un chat web en tiempo real usando WebSockets. Permite conexión entre múltiples usuarios y mensajes persistentes.",
        difficulty: "mid",
        tags: ["Socket.IO", "Node.js", "Realtime"],
        teamSize: 2,
        startDate: "2025-04-15T00:00:00Z",
        endDate: "2025-05-01T00:00:00Z",
        status: "next"
    }, {
        title: "Generador de QR Dinámico",
        description: "Desarrolla una herramienta que genere códigos QR dinámicamente a partir de URLs o textos proporcionados por el usuario.",
        difficulty: "easy",
        tags: ["HTML", "Canvas", "JavaScript"],
        teamSize: 1,
        startDate: "2025-03-25T00:00:00Z",
        endDate: "2025-04-10T00:00:00Z",
        status: "ongoing"
    }];

(async function seedChallenges() {
    console.log("🌱 Seeding challenges...");

    // 1) Cargar lookups
    const {data: diffData, error: diffErr} = await supabase
        .from("challenge_difficulties")
        .select("id,label");
    if (diffErr) throw diffErr;
    const difficultyMap = Object.fromEntries(diffData.map(d => [d.label, d.id]));

    const {data: statusData, error: statusErr} = await supabase
        .from("challenge_statuses")
        .select("id,label");
    if (statusErr) throw statusErr;
    const statusMap = Object.fromEntries(statusData.map(s => [s.label, s.id]));

    // 2) Verificar tags existentes
    const allTags = Array.from(new Set(LOCAL_CHALLENGES.flatMap(ch => ch.tags)));
    const {data: tagData, error: tagErr} = await supabase
        .from("tags")
        .select("id,name");
    if (tagErr) throw tagErr;
    const tagMap = Object.fromEntries(tagData.map(t => [t.name, t.id]));

    const missingTags = allTags.filter(name => !tagMap[name]);
    if (missingTags.length) {
        console.error("Faltan estos tags en la DB:", missingTags);
        process.exit(1);
    }

    // 3) Upsert de retos y relaciones
    try {
        for (const ch of LOCAL_CHALLENGES) {
            // 3.1) Buscar existente
            const {data: existing, error: fetchErr} = await supabase
                .from("challenges")
                .select("id")
                .eq("title", ch.title)
                .single();
            if (fetchErr && fetchErr.code !== 'PGRST116') throw fetchErr;

            let challengeId;
            if (existing) {
                // 3.2) Actualizar registro existente
                const {error: updateErr} = await supabase
                    .from("challenges")
                    .update({
                        description: ch.description,
                        difficulty_id: difficultyMap[ch.difficulty],
                        status_id: statusMap[ch.status],
                        team_size: ch.teamSize,
                        start_date: ch.startDate,
                        end_date: ch.endDate || null,
                    })
                    .eq("id", existing.id);
                if (updateErr) throw updateErr;
                challengeId = existing.id;
            } else {
                // 3.3) Insertar nuevo registro
                const {data: created, error: insertErr} = await supabase
                    .from("challenges")
                    .insert({
                        title: ch.title,
                        description: ch.description,
                        difficulty_id: difficultyMap[ch.difficulty],
                        status_id: statusMap[ch.status],
                        team_size: ch.teamSize,
                        start_date: ch.startDate,
                        end_date: ch.endDate || null,
                    })
                    .select("id")
                    .single();
                if (insertErr) throw insertErr;
                challengeId = created.id;
            }

            // 3.4) Upsert relaciones tags
            const relations = ch.tags.map(name => ({
                challenge_id: challengeId, tag_id: tagMap[name]
            }));
            const {error: relErr} = await supabase
                .from("challenge_tags")
                .upsert(relations, {onConflict: ["challenge_id", "tag_id"]});
            if (relErr) throw relErr;

            console.log(`✅ Processed: ${ch.title}`);
        }
        console.log("🎉 All challenges processed successfully.");
        process.exit(0);
    } catch (err) {
        console.error("Error processing challenges:", err);
        process.exit(1);
    }
})();