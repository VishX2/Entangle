export default function StartupHero() {
  return (
    <section className="relative bg-gradient-to-b from-[#4a657d] to-[#3e5a70] text-white pt-20 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* TITLE */}
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Discover the next
          <br />
          generation of{" "}
          <span className="text-[#ff6b4a]">startups.</span>
        </h1>

        {/* SUBTEXT */}
        <p className="mt-6 text-lg text-gray-200 max-w-2xl mx-auto">
          Explore innovative ideas and connect with founders shaping the
          future. Whether you're an investor, entrepreneur, or startup
          enthusiast.
        </p>

        {/* FEATURE CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <FeatureCard
            icon={<TargetIcon />}
            title="Smart Matching"
            desc="AI analyzes investor requirements and startup profiles for precise alignment."
          />
          <FeatureCard
            icon={<SparkleIcon />}
            title="Personalized Suggestions"
            desc="Get tailored investment opportunities based on your portfolio and interests."
          />
          <FeatureCard
            icon={<BulbIcon />}
            title="Opportunity Discovery"
            desc="Uncover high-potential startups before they hit mainstream radar."
          />
        </div>

        {/* BUTTONS */}
        <div className="mt-10 flex justify-center gap-4">
          <button className="bg-[#ff6b4a] hover:bg-[#ff5a36] px-6 py-3 rounded-xl font-semibold shadow">
            Run AI Match
          </button>

          <button className="border border-white/30 px-6 py-3 rounded-xl text-white/90 hover:bg-white/10">
            Browse Startups
          </button>
        </div>
      </div>

      {/* CURVED BOTTOM */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-[#f5f3ef] rounded-t-[100%]" />
    </section>
  );
}

/* =====================================================
   FEATURE CARD
   ===================================================== */

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center">
      <div className="flex justify-center mb-3 text-[#ff6b4a]">
        {icon}
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-200 mt-2">{desc}</p>
    </div>
  );
}

/* =====================================================
   ICONS
   ===================================================== */

function TargetIcon() {
  return (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12c.5.5 1 1.5 1 2h6c0-.5.5-1.5 1-2a7 7 0 0 0-4-12z" />
    </svg>
  );
}
