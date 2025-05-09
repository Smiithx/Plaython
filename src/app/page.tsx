"use client"
import { useEffect, useState } from "react"
import { useSession, UserButton } from "@clerk/nextjs"
import { supabaseClient } from "@/lib/supabaseClient"
import { Loading } from "../../Components/ui/loading/Loading"
import ChallengeShowcase from "../../Components/challenge/ChallengeShowcase";

export default function HomePage() {
    const { isLoaded, session } = useSession()
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        if (!isLoaded || !session) return

        // Ahora puedes hacer consultas
        supabaseClient
            .from("test")
            .select("*")
            .then(({ data, error }) => {
                if (error) console.error(error);
                else setData(data!);
                console.log(data)
            });
    }, [isLoaded, session])

    if (!isLoaded) return <Loading />

    return (
        <div>
            <ChallengeShowcase />
            <UserButton />
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
