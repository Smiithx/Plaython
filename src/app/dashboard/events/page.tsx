// src/app/dashboard/events/page.tsx
import dynamic from "next/dynamic";
import {Suspense} from "react";
import {getRegisteredChallenges} from "@/lib/services/challenges";

const EventsPageClient = dynamic(
    () => import("./EventsPageClient"),
    {
        loading: () => (
            <div className="w-full h-96 flex items-center justify-center">
                <div className="animate-pulse text-center">
                    <div className="h-8 w-64 bg-gray-300 rounded mb-4 mx-auto"></div>
                    <div className="h-4 w-48 bg-gray-300 rounded mb-2 mx-auto"></div>
                    <div className="h-4 w-56 bg-gray-300 rounded mb-2 mx-auto"></div>
                    <div className="h-4 w-40 bg-gray-300 rounded mx-auto"></div>
                </div>
            </div>
        ),
        ssr: true
    }
);

export default async function Page() {
    const { current, upcoming, past }  = await getRegisteredChallenges ();
    console.log(`past`, past)
    return (
        <Suspense
            fallback={
                <div className="h-screen flex items-center justify-center">
                    Cargando eventos...
                </div>
            }
        >
            <EventsPageClient current={current} upcoming={upcoming} past={past}/>
        </Suspense>
    );
}
