import HeroSection from "@/components/home/HeroSection";
import StatsGrid from "@/components/home/StatsGrid";
import HallOfFameBanner from "@/components/home/HallOfFameBanner";
import TournamentsPreview from "@/components/home/TournamentsPreview";
import LiveActivityFeed from "@/components/home/LiveActivityFeed";
import HowToStart from "@/components/home/HowToStart";
import TournamentFormats from "@/components/home/TournamentFormats";
import TipBox from "@/components/home/TipBox";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsGrid />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <HallOfFameBanner />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <TournamentsPreview />
          </div>
          <div>
            <LiveActivityFeed />
          </div>
        </div>
        <HowToStart />
        <TournamentFormats />
        <TipBox />
      </div>
    </>
  );
}
