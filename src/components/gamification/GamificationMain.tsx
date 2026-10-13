import HeroGamification from "./sections/HeroGamification";
import XpSection from "./sections/XpSection";
import StreakAndGoal from "./sections/streakAndGoal/StreakAndGoal";
import Achievements from "./sections/Achievements";
import FriendsRanking from "./sections/FriendsRanking";
import GamificationCTA from "./sections/GamificationCTA";

export default function GamificationMain() {
    return (
        <main>
            <HeroGamification />
            <XpSection />
            <StreakAndGoal />
            <Achievements />
            <FriendsRanking />
            <GamificationCTA />
        </main>
    );
}