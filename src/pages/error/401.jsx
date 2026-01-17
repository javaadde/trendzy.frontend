import { Link } from "react-router-dom";

function UnOtherizedPage() {
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
          Error 401
        </span>
        <h1
          className="text-7xl lg:text-8xl font-semibold tracking-tighter mb-8"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-primary)",
          }}
        >
          Private <span className="italic">Access</span>
        </h1>
        <p
          className="text-base lg:text-lg mb-12 leading-relaxed"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-secondary)",
          }}
        >
          This area is reserved for authorized personnel.
          Please authenticate to proceed into the administrative console.
        </p>
        <Link
          to="/admin/login"
          className="inline-flex items-center justify-center px-10 py-5 bg-black text-white text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-gray-800"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Authenticate Now
        </Link>
      </div>

      <div className="absolute bottom-12 text-[10px] tracking-widest uppercase text-gray-400">
        Trendzy Operational Security
      </div>
    </div>
  );
}

export default UnOtherizedPage;