export default function TipBox() {
  return (
    <section className="mb-8">
      <div className="hint-box flex items-start gap-3 rounded-lg transition-all duration-500">
        <span className="text-xl flex-shrink-0">💡</span>
        <div>
          <div
            className="text-xs font-bold uppercase tracking-wide mb-1"
            style={{ color: "var(--gold)", opacity: 0.7 }}
          >
            Совет
          </div>
          <p className="text-sm" style={{ color: "var(--gold)" }}>
            Сделай лобби в Dota 2 открытым — тогда статистика матча (убийства, герои) появится
            автоматически
          </p>
        </div>
      </div>
    </section>
  );
}
