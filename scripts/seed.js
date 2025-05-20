// scripts/seed.js
require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const {createClient} = require("@supabase/supabase-js");

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function seedDifficulties() {
    const data = [{label: "easy", sort_order: 1}, {label: "mid", sort_order: 2}, {
        label: "hard",
        sort_order: 3
    }, {label: "expert", sort_order: 4},];
    const {error} = await supabase
        .from("challenge_difficulties")
        .upsert(data, {onConflict: "label"});
    if (error) console.error("Error seeding difficulties:", error); else console.log("✅ Difficulties seeded");
}

async function seedStatuses() {
    const data = [{label: "ongoing", sort_order: 1}, {label: "next", sort_order: 2}, {
        label: "finished",
        sort_order: 3
    },];
    const {error} = await supabase
        .from("challenge_statuses")
        .upsert(data, {onConflict: "label"});
    if (error) console.error("Error seeding statuses:", error); else console.log("✅ Statuses seeded");
}

async function seedTags() {
    const data = [{name: "JavaScript"}, {name: "TypeScript"}, {name: "Python"}, {name: "Java"}, {name: "Cpp"}, {name: "Go"}, {name: "Rust"}, {name: "CSharp"}, {name: "Ruby"}, {name: "PHP"}, {name: "Node.js"}, {name: "React"}, {name: "Next.js"}, {name: "Firebase"}, {name: "Express"}, {name: "Socket.IO"}, {name: "PostgreSQL"}, {name: "Auth"}, {name: "UI/UX"}, {name: "APIs"}, // Tags adicionales
        {name: "Lógica"}, {name: "Strings"}, {name: "Regex"}, {name: "Consola"}, {name: "Seguridad"}, {name: "Terminal"}, {name: "WebSockets"}, {name: "OAuth"}, {name: "Frontend"}, {name: "Realtime"}, {name: "HTML"}, {name: "Canvas"}];

    const {error} = await supabase
        .from("tags")
        .upsert(data, {onConflict: "name"});
    if (error) throw error;
    console.log("✅ Tags seeded");
}

async function main() {
    console.log("🌱 Seeding database...");
    await seedDifficulties();
    await seedStatuses();
    await seedTags();
    console.log("🎉 Done!");
    process.exit(0);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
