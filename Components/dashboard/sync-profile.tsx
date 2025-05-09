// src/components/SyncProfile.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function SyncProfile() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [synced, setSynced] = useState(false);

    /*useEffect(() => {
        // 1) espera a que Clerk termine de cargar y el usuario esté logueado
        if (!isLoaded || !isSignedIn || !user) return;

        // 2) arma la key AHORA que user ya existe
        const key = `syncedProfile_${user.id}`;

        // 3) chequea si ya sincronizaste en esta sesión
        if (sessionStorage.getItem(key) === "true") {
            setSynced(true);
            return;
        }

        // 4) llama al endpoint y marca en sessionStorage
        fetch("/api/sync-profile", { method: "POST" })
            .then((res) => {
                if (res.ok) {
                    console.log("Synced!");
                    // sessionStorage.setItem(key, "true");
                    // setSynced(true);
                } else {
                    console.error("sync failed", res.status);
                }
            })
            .catch((err) => console.error("Error sync-profile:", err));
    }, [isLoaded, isSignedIn, user]);*/

    return null;
}
