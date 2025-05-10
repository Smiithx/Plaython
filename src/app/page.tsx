import ChallengeShowcaseServer from "../../Components/challenge/ChallengeShowcaseServer";
import { useSession, UserButton, useUser } from "@clerk/nextjs"

export default function HomePage() {
    return (
        <div>
            <ChallengeShowcaseServer />
            <UserButton />
        </div>
    )
}
