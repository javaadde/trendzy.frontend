import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <div className="animate-fade-in max-w-lg">
        <span
          className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-4 block"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-muted)",
          }}
        >
          Error 404
        </span>
        <h1
          className="text-8xl lg:text-9xl font-semibold tracking-tighter mb-8"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-primary)",
          }}
        >
          Lost in <span className="italic">Style</span>
        </h1>
        <p
          className="text-base lg:text-lg mb-12 leading-relaxed"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-secondary)",
          }}
        >
          The page you are seeking has vanished from our collection.
          Perhaps it was a limited edition, or it never existed at all.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-10 py-5 bg-black text-white text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-gray-800"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Return to Atelier
        </Link>
      </div>

      <div className="absolute bottom-12 text-[10px] tracking-widest uppercase text-gray-400">
        Trendzy Luxury Group
      </div>
    </div>
  );
}

export default NotFoundPage;
