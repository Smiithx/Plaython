import { Loading } from "../../../Components/ui/loading/Loading";
import Navbar from "../../../Components/index/Nab";
import ChallengeShowcaseServer from "../../../Components/challenge/ChallengeShowcaseServer";
import { Footer } from "../../../Components/index/Footer";

export default function ChallengesPage() {

  return (
    <div>
      <Navbar />
      <ChallengeShowcaseServer />
      <Footer />
    </div>
  );
}
