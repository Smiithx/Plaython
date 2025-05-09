import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse }      from "next/server";

export async function POST(req: Request) {
    // 1) Lanza 404 si no hay sesión
    await auth.protect();

    // 2) Ahora sí hay sesión: leemos userId
    const { userId } = await auth();

    // 3) Obtenemos email con clerkClient
    const user = await clerkClient.users.getUser(userId);
    const email = user.emailAddresses?.[0]?.emailAddress;
    if (!email) {
        return NextResponse.json({ error: "Sin email en Clerk" }, { status: 400 });
    }

    // 4) Upsert en Supabase...
    // ...
}
