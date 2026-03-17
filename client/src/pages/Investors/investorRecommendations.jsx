import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Star,
  TrendingUp,
  MapPin,
  Briefcase,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { fetchCompanies, fetchInvestorsForStartup } from "../../store/userApi";
import ConnectButton from "../../components/ConnectButton";
import MessageButton from "../../components/MessageButton";
import {
  selectCompanies,
  selectInvestorMatches,
  selectMatchmakingLoading,
} from "../../store/userSlice";

export default function InvestorRecommendations() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const companies = useSelector(selectCompanies);
  const matches = useSelector(selectInvestorMatches);
  const loading = useSelector(selectMatchmakingLoading);

  const startups = (companies || []).filter((c) => c.company_type === "startup");
  const [selectedStartupId, setSelectedStartupId] = useState(null);

  useEffect(() => {
    dispatch(fetchCompanies({ type: "startup" }));
  }, [dispatch]);

  useEffect(() => {
    if (selectedStartupId) {
      dispatch(fetchInvestorsForStartup({ startupId: selectedStartupId }));
    }
  }, [dispatch, selectedStartupId]);

  const runMatch = () => {
    const id = selectedStartupId || (startups[0]?.id);
    if (id) setSelectedStartupId(id);
  };

  const investorList = matches?.matches ?? [];
  const hasData = startups.length > 0;

  return (
    <div className="min-h-screen bg-[#F5F1E3] px-6 py-10 space-y-10">
      {/* HEADER */}
      <section className="space-y-2 max-w-4xl">
        <h1 className="text-3xl font-semibold text-[#2B3443]">
          Recommended Investors
        </h1>
        <p className="text-sm text-[#3F5D7D]">
          Based on your startup profile, traction, and industry alignment.
        </p>
      </section>

      {/* STARTUP SELECTOR + RUN AI MATCH */}
      <section className="flex flex-wrap items-center gap-4">
        <label className="text-sm font-medium text-[#2B3443]">
          Select your startup:
        </label>
        <select
          value={selectedStartupId ?? ""}
          onChange={(e) => setSelectedStartupId(e.target.value ? Number(e.target.value) : null)}
          className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-[#2B3443] min-w-[200px]"
        >
          <option value="">— Pick a startup —</option>
          {startups.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <button
          onClick={runMatch}
          disabled={!hasData || loading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EF6C4E] text-white font-medium hover:bg-[#E55A3A] disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? (
            "Matching…"
          ) : (
            <>
              <Sparkles size={18} />
              Run AI Match
            </>
          )}
        </button>
      </section>

      {/* FILTER STRIP */}
      <section className="flex flex-wrap gap-3">
        {["All", "Top Match", "Verified Only", "Seed Stage", "FinTech"].map(
          (filter) => (
            <button
              key={filter}
              className="px-4 py-2 rounded-full text-sm font-medium
                         bg-white text-[#2B3443]
                         hover:bg-[#EF6C4E]/10 hover:text-[#EF6C4E]
                         transition"
            >
              {filter}
            </button>
          )
        )}
      </section>

      {/* INVESTOR CARDS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {!hasData && (
          <p className="col-span-full text-[#3F5D7D]">
            No startups in the database. Add startups to run AI matchmaking.
          </p>
        )}
        {hasData && !selectedStartupId && (
          <p className="col-span-full text-[#3F5D7D]">
            Select a startup and click &quot;Run AI Match&quot; to see recommended investors.
          </p>
        )}
        {loading && selectedStartupId && (
          <div className="col-span-full animate-matchmaking-pulse bg-white rounded-3xl p-12 shadow-lg border border-[#EF6C4E]/20">
            <div className="animate-matchmaking-shimmer rounded-2xl px-8 py-12 text-center">
              <div className="flex justify-center gap-2 mb-4">
                <Sparkles className="w-8 h-8 text-[#EF6C4E] animate-matchmaking-sparkle" />
                <Sparkles className="w-8 h-8 text-[#EF6C4E]/80 animate-matchmaking-sparkle" style={{ animationDelay: "0.2s" }} />
                <Sparkles className="w-8 h-8 text-[#EF6C4E] animate-matchmaking-sparkle" style={{ animationDelay: "0.4s" }} />
              </div>
              <p className="text-lg font-medium text-[#2B3443]">AI is analyzing profiles...</p>
              <p className="text-sm text-[#3F5D7D] mt-1">Finding the best investors for your startup</p>
              <div className="flex justify-center gap-1 mt-6">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#EF6C4E] animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s`, animationDuration: "0.6s" }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        {hasData && selectedStartupId && investorList.length === 0 && !loading && (
          <p className="col-span-full text-[#3F5D7D]">
            No investors found. Add investor companies to the database.
          </p>
        )}
        {!loading && investorList.map(({ company, score }, idx) => (
          <div key={company.id} className="animate-matchmaking-fade-in" style={{ animationDelay: `${idx * 0.05}s`, animationFillMode: "both" }}>
            <InvestorCard investor={company} match={score} />
          </div>
        ))}
      </section>
    </div>
  );
}

/* COMPONENTS */

function InvestorCard({ investor, match }) {
  const focus = (investor.investment_focus || "")
    .split(/[,;|]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const stage = investor.funding_stage || "—";

  return (
    <div
      className="bg-white rounded-3xl p-6 transition-all duration-300
                 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Top Row */}
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-[#2B3443] flex items-center gap-2">
            {investor.name}
            {investor.is_verified && (
              <CheckCircle size={16} className="text-[#EF6C4E]" />
            )}
          </h2>
          <div className="flex items-center gap-2 text-sm text-[#3F5D7D]">
            <MapPin size={14} />
            {investor.headquarters || "—"}
          </div>
        </div>

        {/* Match Score */}
        <div className="text-right">
          <p className="text-xs text-[#3F5D7D]">Match Score</p>
          <div className="flex items-center gap-1 text-[#EF6C4E] font-semibold">
            <Star size={16} />
            {match ?? 0}%
          </div>
        </div>
      </div>

      {/* Focus Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {focus.length > 0 ? (
          focus.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium
                         bg-[#C4DAE8] text-[#2B3443]"
            >
              {tag}
            </span>
          ))
        ) : (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
            —
          </span>
        )}
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-6 text-sm text-[#3F5D7D] mb-6">
        <div className="flex items-center gap-2">
          <Briefcase size={16} />
          {stage}
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp size={16} />
          High Activity
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <button
          onClick={() => navigate(`/investor/company/${investor.id}`)}
          className="text-sm font-medium text-[#EF6C4E]
                     hover:underline transition"
        >
          View Profile
        </button>
        <div className="flex gap-2">
          <ConnectButton companyId={investor.id} />
          <MessageButton company={investor} />
        </div>
      </div>
    </div>
  );
}
