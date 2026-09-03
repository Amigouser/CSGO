import Link from "next/link";
import TournamentCard from "@/components/tournament/TournamentCard";

export default function TournamentsPreview() {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
          Все турниры
        </h2>
        <Link
          href="/tournaments"
          className="text-sm font-medium transition-colors"
          style={{ color: "var(--gold)" }}
        >
          Смотреть все →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="skeleton h-32" />
            <div className="p-4 space-y-2">
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
