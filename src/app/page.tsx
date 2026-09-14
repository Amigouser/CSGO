import HeroSection from "@/components/home/HeroSection";
import StatsGrid from "@/components/home/StatsGrid";
import HallOfFameBanner from "@/components/home/HallOfFameBanner";
import TournamentsPreview from "@/components/home/TournamentsPreview";
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
        <TournamentsPreview />
        <HowToStart />
        <TournamentFormats />
        <TipBox />
      </div>
    </>
  );
}
