import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles, Search } from "lucide-react";
import ConnectButton from "../components/ConnectButton";
import MessageButton from "../components/MessageButton";
import {
  fetchCompanies,
  fetchInvestors,
  fetchInvestorsForStartup,
  fetchStartupsForInvestor,
  fetchInvestorsForEntrepreneur,
  fetchEntrepreneursForInvestor,
  fetchSearchByPrompt,
} from "../store/userApi";
import {
  selectCompanies,
  selectInvestors,
  selectInvestorMatches,
  selectStartupMatches,
  selectEntrepreneurMatches,
  selectInvestorEntrepreneurMatches,
  selectSearchResults,
  selectMatchmakingLoading,
  selectSearchLoading,
} from "../store/userSlice";
import { selectCurrentUser } from "../store/authSlice";

function MatchCard({ item, type, onView, redirectToRequests }) {
  const company = item.company || item;
  const score = item.score;
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition">
      <div
        className="cursor-pointer"
        onClick={() => onView?.(company.id)}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-slate-800">{company.name}</h3>
            <p className="text-sm text-slate-500 mt-1 line-clamp-2">
              {company.description || company.investment_focus || company.funding_stage || "—"}
            </p>
            <p className="text-xs text-slate-400 mt-2">
              {company.headquarters && `${company.headquarters} • `}
              {company.company_type}
            </p>
          </div>
          {score != null && (
            <span className="px-2.5 py-1 rounded-lg bg-orange-100 text-orange-700 font-semibold text-sm">
              {score}%
            </span>
          )}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center gap-2 flex-wrap">
        <button
          onClick={() => onView?.(company.id)}
          className="text-sm font-medium text-orange-600 hover:underline"
        >
          View Profile
        </button>
        <div className="flex gap-2">
          <ConnectButton companyId={company.id} variant="compact" redirectToRequests={redirectToRequests} />
          <MessageButton company={company} variant="compact" />
        </div>
      </div>
    </div>
  );
}

export default function AiMatchmaking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const companies = useSelector(selectCompanies);
  const investors = useSelector(selectInvestors);
  const investorMatches = useSelector(selectInvestorMatches);
  const startupMatches = useSelector(selectStartupMatches);
  const entrepreneurMatches = useSelector(selectEntrepreneurMatches);
  const investorEntrepreneurMatches = useSelector(selectInvestorEntrepreneurMatches);
  const searchResults = useSelector(selectSearchResults);
  const matchmakingLoading = useSelector(selectMatchmakingLoading);
  const searchLoading = useSelector(selectSearchLoading);

  const [prompt, setPrompt] = useState("");
  const [searchType, setSearchType] = useState("");
  const [selectedInvestorId, setSelectedInvestorId] = useState(null);
  const [selectedStartupId, setSelectedStartupId] = useState(null);
  const [selectedEntrepreneurId, setSelectedEntrepreneurId] = useState(null);

  const currentUser = useSelector(selectCurrentUser);
  const companyType = location.pathname.startsWith("/investor")
    ? "investor"
    : location.pathname.startsWith("/startup")
    ? "startup"
    : "entrepreneur";

  const investorsList = (companies || []).filter((c) => c.company_type === "investor");
  const startupsList = (companies || []).filter((c) => c.company_type === "startup");
  const entrepreneursList = (companies || []).filter((c) => c.company_type === "entrepreneur");

  const myCompany = useMemo(() => {
    if (!currentUser?.id || !companies?.length) return null;
    return companies.find(
      (c) => Number(c.created_by) === Number(currentUser.id) && c.company_type === companyType
    ) || null;
  }, [companies, currentUser?.id, companyType]);

  useEffect(() => {
    dispatch(fetchCompanies());
    if (companyType === "investor") dispatch(fetchInvestors());
  }, [dispatch, companyType]);

  useEffect(() => {
    if (!myCompany) return;
    if (companyType === "investor") {
      dispatch(fetchStartupsForInvestor({ investorId: myCompany.id }));
      dispatch(fetchEntrepreneursForInvestor({ investorId: myCompany.id }));
    } else if (companyType === "startup") {
      dispatch(fetchInvestorsForStartup({ startupId: myCompany.id }));
    } else if (companyType === "entrepreneur") {
      dispatch(fetchInvestorsForEntrepreneur({ entrepreneurId: myCompany.id }));
    }
  }, [dispatch, companyType, myCompany?.id]);

  const runInvestorMatch = () => {
    if (selectedInvestorId) {
      dispatch(fetchStartupsForInvestor({ investorId: selectedInvestorId }));
      dispatch(fetchEntrepreneursForInvestor({ investorId: selectedInvestorId }));
    }
  };

  const runStartupMatch = () => {
    if (selectedStartupId) {
      dispatch(fetchInvestorsForStartup({ startupId: selectedStartupId }));
    }
  };

  const runEntrepreneurMatch = () => {
    if (selectedEntrepreneurId) {
      dispatch(fetchInvestorsForEntrepreneur({ entrepreneurId: selectedEntrepreneurId }));
    }
  };

  const runSearch = () => {
    if (prompt.trim()) {
      dispatch(
        fetchSearchByPrompt({
          prompt: prompt.trim(),
          type: searchType || undefined,
        })
      );
    }
  };

  const viewCompany = (id) => {
    const base = companyType === "investor" ? "/investor" : companyType === "startup" ? "/startup" : "/entrepreneur";
    navigate(`${base}/company/${id}`);
  };

  const redirectToRequests =
    companyType === "investor"
      ? "/investor/requests"
      : companyType === "startup"
      ? "/startup/requests"
      : "/entrepreneur/requests";

  const startupMatchList = startupMatches?.matches ?? [];
  const entrepreneurMatchList = investorEntrepreneurMatches?.matches ?? [];
  const investorForEntrepreneurList = entrepreneurMatches?.matches ?? [];
  const investorForStartupList = investorMatches?.matches ?? [];
  const searchMatchList = searchResults?.matches ?? [];

  const Loader = () => (
    <div className="animate-pulse bg-white rounded-xl p-12 shadow-sm border border-orange-200 text-center">
      <div className="flex justify-center gap-2 mb-4">
        <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />
      </div>
      <p className="text-slate-600">AI is analyzing profiles...</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2 text-slate-800">
          <Sparkles className="w-6 h-6 text-orange-500" />
          AI Matchmaking
        </h1>
        <p className="text-slate-500 mt-1">
          Find matches based on your profile, or search the database with natural language
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
          <Search className="w-5 h-5 text-orange-500" />
          Search with AI prompt
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          Describe what you&apos;re looking for (e.g. &quot;fintech startups in seed stage&quot;, &quot;investors interested in AI&quot;) and get relevant results from our database.
        </p>
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
            placeholder="e.g. HealthTech investors, early-stage startups in Berlin..."
            className="flex-1 min-w-[240px] px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
          />
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white"
          >
            <option value="">All types</option>
            <option value="investor">Investors only</option>
            <option value="startup">Startups only</option>
            <option value="entrepreneur">Entrepreneurs only</option>
          </select>
          <button
            onClick={runSearch}
            disabled={!prompt.trim() || searchLoading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search className="w-4 h-4" />
            {searchLoading ? "Searching…" : "Search"}
          </button>
        </div>
      </div>

      {searchResults && (
        <div>
          <h2 className="text-lg font-medium mb-4">Search results for &quot;{searchResults.query}&quot;</h2>
          {searchLoading ? (
            <Loader />
          ) : searchMatchList.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchMatchList.map((item) => (
                <MatchCard key={item.company?.id} item={item} onView={viewCompany} redirectToRequests={redirectToRequests} />
              ))}
            </div>
          ) : (
            <p className="text-slate-500">No matches found. Try a different prompt.</p>
          )}
        </div>
      )}

      {companyType === "investor" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              Matches for your profile
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              {myCompany
                ? "Startups and entrepreneurs matched to your investment profile."
                : "Load your profile to see personalized matches."}
            </p>
          </div>

          {matchmakingLoading && myCompany && <Loader />}
          {!matchmakingLoading && myCompany && startupMatchList.length === 0 && entrepreneurMatchList.length === 0 && (
            <p className="text-slate-500">No matches found yet. Complete your profile to improve matching.</p>
          )}
          {!matchmakingLoading && startupMatches && myCompany && startupMatchList.length > 0 && (
            <div>
              <h3 className="font-medium mb-3">Matching startups</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {startupMatchList.map((item) => (
                  <MatchCard key={item.company.id} item={item} onView={viewCompany} redirectToRequests={redirectToRequests} />
                ))}
              </div>
            </div>
          )}
          {!matchmakingLoading && investorEntrepreneurMatches && myCompany && entrepreneurMatchList.length > 0 && (
            <div>
              <h3 className="font-medium mb-3">Matching entrepreneurs</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {entrepreneurMatchList.map((item) => (
                  <MatchCard key={item.company.id} item={item} onView={viewCompany} redirectToRequests={redirectToRequests} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {companyType === "startup" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              Matches for your startup
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              {myCompany
                ? "Investors matched to your startup profile."
                : "Complete your startup profile to see personalized matches."}
            </p>
          </div>

          {matchmakingLoading && myCompany && <Loader />}
          {!matchmakingLoading && myCompany && investorForStartupList.length === 0 && (
            <p className="text-slate-500">No matches found yet. Complete your profile to improve matching.</p>
          )}
          {!matchmakingLoading && investorMatches && myCompany && investorForStartupList.length > 0 && (
            <div>
              <h3 className="font-medium mb-3">Matching investors</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {investorForStartupList.map((item) => (
                  <MatchCard key={item.company.id} item={item} onView={viewCompany} redirectToRequests={redirectToRequests} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {companyType === "entrepreneur" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              Matches for your profile
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              {myCompany
                ? "Investors matched to your entrepreneur profile."
                : "Complete your profile to see personalized matches."}
            </p>
          </div>

          {matchmakingLoading && myCompany && <Loader />}
          {!matchmakingLoading && myCompany && investorForEntrepreneurList.length === 0 && (
            <p className="text-slate-500">No matches found yet. Complete your profile to improve matching.</p>
          )}
          {!matchmakingLoading && entrepreneurMatches && myCompany && investorForEntrepreneurList.length > 0 && (
            <div>
              <h3 className="font-medium mb-3">Matching investors</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {investorForEntrepreneurList.map((item) => (
                  <MatchCard key={item.company.id} item={item} onView={viewCompany} redirectToRequests={redirectToRequests} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
