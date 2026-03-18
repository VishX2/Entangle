import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sparkles } from "lucide-react";
import Sidebar from "../components/Sidebar";
import {
  fetchCompanies,
  fetchInvestorsForStartup,
  fetchStartupsForInvestor,
  fetchInvestorsForEntrepreneur,
  fetchEntrepreneursForInvestor,
} from "../store/adminApi";

import {
  selectCompanies,
  selectInvestorMatches,
  selectStartupMatches,
  selectEntrepreneurMatches,
  selectInvestorEntrepreneurMatches,
  selectMatchmakingLoading,
} from "../store/adminSlice";

export default function AIMatchmaking() {
  const dispatch = useDispatch();

  // Redux selectors for companies and matchmaking results
  const companies = useSelector(selectCompanies);
  const investorMatches = useSelector(selectInvestorMatches);
  const startupMatches = useSelector(selectStartupMatches);
  const entrepreneurMatches = useSelector(selectEntrepreneurMatches);
  const investorEntrepreneurMatches = useSelector(selectInvestorEntrepreneurMatches);
  const loading = useSelector(selectMatchmakingLoading);

  // Local UI state for current matchmaking mode and selected entities
  const [mode, setMode] = useState("investors"); // "investors" | "entrepreneurs" | "startups"
  const [selectedInvestorId, setSelectedInvestorId] = useState(null);
  const [selectedEntrepreneurId, setSelectedEntrepreneurId] = useState(null);
  const [selectedStartupId, setSelectedStartupId] = useState(null);

  // Filter companies by their type
  const investors = (companies || []).filter((c) => c.company_type === "investor");
  const entrepreneurs = (companies || []).filter((c) => c.company_type === "entrepreneur");
  const startups = (companies || []).filter((c) => c.company_type === "startup");

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  // Run AI matchmaking for a selected investor
  const runInvestorsMatch = () => {
    if (selectedInvestorId) {
      dispatch(fetchStartupsForInvestor({ investorId: selectedInvestorId }));
      dispatch(fetchEntrepreneursForInvestor({ investorId: selectedInvestorId }));
    }
  };

  // Run AI matchmaking for a selected entrepreneur
  const runEntrepreneursMatch = () => {
    if (selectedEntrepreneurId) {
      dispatch(fetchInvestorsForEntrepreneur({ entrepreneurId: selectedEntrepreneurId }));
    }
  };

  // Run AI matchmaking for a selected startup
  const runStartupsMatch = () => {
    if (selectedStartupId) {
      dispatch(fetchInvestorsForStartup({ startupId: selectedStartupId }));
    }
  };

  // Extract match lists from API responses
  const startupList = startupMatches?.matches ?? [];
  const entrepreneurList = investorEntrepreneurMatches?.matches ?? [];
  const investorListForEntrepreneur = entrepreneurMatches?.matches ?? [];
  const investorListForStartup = investorMatches?.matches ?? [];

  // Animated loader displayed while matchmaking request is running
  const MatchmakingLoader = () => (
    <div className="animate-matchmaking-pulse bg-white rounded-xl shadow-lg border border-orange-200 overflow-hidden">
      <div className="animate-matchmaking-shimmer px-8 py-16 text-center">
        <div className="flex justify-center gap-2 mb-4">
          <Sparkles className="w-8 h-8 text-orange-500 animate-matchmaking-sparkle" />
          <Sparkles className="w-8 h-8 text-orange-400 animate-matchmaking-sparkle" style={{ animationDelay: "0.2s" }} />
          <Sparkles className="w-8 h-8 text-orange-500 animate-matchmaking-sparkle" style={{ animationDelay: "0.4s" }} />
        </div>
        <p className="text-lg font-medium text-slate-700">AI is analyzing profiles...</p>
        <p className="text-sm text-slate-500 mt-1">Finding the best matches for you</p>
        <div className="flex justify-center gap-1 mt-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-orange-400 animate-bounce"
              style={{ animationDelay: `${i * 0.1}s`, animationDuration: "0.6s" }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  // Reusable table component to display matchmaking results
  const MatchTable = ({ title, matches, type }) => (
    <div className="animate-matchmaking-fade-in bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
        <span className="font-medium">{title}</span>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-gray-100 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 text-left">{type}</th>
            <th className="px-6 py-4 text-left">Focus</th>
            <th className="px-6 py-4 text-left">Stage</th>
            <th className="px-6 py-4 text-left">Match Score</th>
            <th className="px-6 py-4 text-left">Breakdown</th>
          </tr>
        </thead>
        <tbody>
          {matches.map(({ company, score, breakdown }, idx) => (
            <tr
              key={company.id}
              className="border-b border-slate-200 last:border-0 hover:bg-gray-50 animate-matchmaking-fade-in"
              style={{ animationDelay: `${idx * 0.03}s`, animationFillMode: "both" }}
            >
              <td className="px-6 py-4 font-medium">{company.name}</td>
              <td className="px-6 py-4 text-slate-500">
                {company.investment_focus || "—"}
              </td>
              <td className="px-6 py-4 text-slate-500">
                {company.funding_stage || "—"}
              </td>
              <td className="px-6 py-4">
                <span className="font-semibold text-orange-600">{score}%</span>
              </td>
              <td className="px-6 py-4 text-slate-500 text-xs">
                {breakdown
                  ? `Ind:${breakdown.industry} Stg:${breakdown.stage} Chk:${breakdown.checkSize} Loc:${breakdown.location} Trust:${breakdown.trust}${breakdown.semantic != null ? ` Sem:${breakdown.semantic}` : ""}`
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {matches.length === 0 && (
        <div className="p-8 text-center text-slate-500">No matches found</div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#f7f3ec]">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-orange-500" />
          AI Matchmaking
        </h1>
        <p className="text-slate-500 mb-6">
          Match investors, entrepreneurs, and startups using AI-powered scoring
          {(investorMatches?.aiEnabled || startupMatches?.aiEnabled || entrepreneurMatches?.aiEnabled || investorEntrepreneurMatches?.aiEnabled) && (
            <span className="ml-2 inline-flex items-center gap-1 text-orange-600 font-medium">
              <Sparkles className="w-4 h-4" />
              OpenAI embeddings enabled
            </span>
          )}
        </p>

        {/* MODE TABS */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode("investors")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              mode === "investors"
                ? "bg-orange-500 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Investors
          </button>
          <button
            onClick={() => setMode("entrepreneurs")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              mode === "entrepreneurs"
                ? "bg-orange-500 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Entrepreneurs
          </button>
          <button
            onClick={() => setMode("startups")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              mode === "startups"
                ? "bg-orange-500 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Startups
          </button>
        </div>

        {/* INVESTORS TAB */}
        {mode === "investors" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-medium mb-4">Match for an investor</h2>
              <p className="text-sm text-slate-500 mb-4">
                Select an investor to see matching startups and entrepreneurs
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <label className="text-sm text-slate-600">Investor:</label>
                <select
                  value={selectedInvestorId ?? ""}
                  onChange={(e) =>
                    setSelectedInvestorId(e.target.value ? Number(e.target.value) : null)
                  }
                  className="px-4 py-2 rounded-lg border border-slate-200 min-w-[220px]"
                >
                  <option value="">— Select investor —</option>
                  {investors.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={runInvestorsMatch}
                  disabled={!selectedInvestorId || loading}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4" />
                  {loading ? "Matching…" : "Run AI Match"}
                </button>
              </div>
              {investors.length === 0 && (
                <p className="mt-2 text-sm text-slate-500">No investors in the database.</p>
              )}
            </div>

            {loading && selectedInvestorId && <MatchmakingLoader />}
            {!loading && startupMatches && selectedInvestorId && (
              <MatchTable
                title={`Startups matching ${startupMatches.investor?.name}`}
                matches={startupList}
                type="Startup"
              />
            )}
            {!loading && investorEntrepreneurMatches && selectedInvestorId && (
              <MatchTable
                title={`Entrepreneurs matching ${investorEntrepreneurMatches.investor?.name}`}
                matches={entrepreneurList}
                type="Entrepreneur"
              />
            )}
          </div>
        )}

        {/* ENTREPRENEURS TAB */}
        {mode === "entrepreneurs" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-medium mb-4">Match for an entrepreneur</h2>
              <p className="text-sm text-slate-500 mb-4">
                Select an entrepreneur to see matching investors
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <label className="text-sm text-slate-600">Entrepreneur:</label>
                <select
                  value={selectedEntrepreneurId ?? ""}
                  onChange={(e) =>
                    setSelectedEntrepreneurId(e.target.value ? Number(e.target.value) : null)
                  }
                  className="px-4 py-2 rounded-lg border border-slate-200 min-w-[220px]"
                >
                  <option value="">— Select entrepreneur —</option>
                  {entrepreneurs.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={runEntrepreneursMatch}
                  disabled={!selectedEntrepreneurId || loading}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4" />
                  {loading ? "Matching…" : "Run AI Match"}
                </button>
              </div>
              {entrepreneurs.length === 0 && (
                <p className="mt-2 text-sm text-slate-500">No entrepreneurs in the database.</p>
              )}
            </div>

            {loading && selectedEntrepreneurId && <MatchmakingLoader />}
            {!loading && entrepreneurMatches && (
              <MatchTable
                title={`Investors matching ${entrepreneurMatches.entrepreneur?.name}`}
                matches={investorListForEntrepreneur}
                type="Investor"
              />
            )}
          </div>
        )}

        {/* STARTUPS TAB */}
        {mode === "startups" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-medium mb-4">Match for a startup</h2>
              <p className="text-sm text-slate-500 mb-4">
                Select a startup to see matching investors
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <label className="text-sm text-slate-600">Startup:</label>
                <select
                  value={selectedStartupId ?? ""}
                  onChange={(e) =>
                    setSelectedStartupId(e.target.value ? Number(e.target.value) : null)
                  }
                  className="px-4 py-2 rounded-lg border border-slate-200 min-w-[220px]"
                >
                  <option value="">— Select startup —</option>
                  {startups.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={runStartupsMatch}
                  disabled={!selectedStartupId || loading}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4" />
                  {loading ? "Matching…" : "Run AI Match"}
                </button>
              </div>
              {startups.length === 0 && (
                <p className="mt-2 text-sm text-slate-500">No startups in the database.</p>
              )}
            </div>

            {loading && selectedStartupId && <MatchmakingLoader />}
            {!loading && investorMatches && (
              <MatchTable
                title={`Investors matching ${investorMatches.startup?.name}`}
                matches={investorListForStartup}
                type="Investor"
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
