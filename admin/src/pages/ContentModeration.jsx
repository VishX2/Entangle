import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/organisms/Sidebar";
import {
  Check,
  X,
  Building2,
  MessageSquare,
} from "lucide-react";
import { fetchCompanies, fetchReviews, updateCompany, updateReview } from "../store/adminApi";
import { selectCompanies, selectReviews, selectAdminLoading } from "../store/adminSlice";

// Tabs for switching between content types
const TABS = ["Companies", "Reviews"];

export default function ContentModeration() {
  return (
    <div className="flex min-h-screen bg-[#f7f3ec]">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <ModerationContent />
      </main>
    </div>
  );
}

function ModerationContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Active tab state (Companies / Reviews)
  const [activeTab, setActiveTab] = useState("Companies");

  // Get data from Redux store
  const companies = useSelector(selectCompanies);
  const reviews = useSelector(selectReviews);
  const loading = useSelector(selectAdminLoading);

  useEffect(() => {
    dispatch(fetchCompanies({}));
    dispatch(fetchReviews());
  }, [dispatch]);

  // === Company moderation actions ===

  // Activate company
  const activateCompany = (id) => {
    dispatch(updateCompany({ id, is_active: true }));
  };

  // Deactivate company
  const deactivateCompany = (id) => {
    dispatch(updateCompany({ id, is_active: false }));
  };

  // Verify company
  const verifyCompany = (id) => {
    dispatch(updateCompany({ id, is_verified: true }));
  };

  // === Review moderation actions ===

  // Approve review
  const approveReview = (id) => {
    dispatch(updateReview({ id, is_approved: true }));
  };

  // Hide review
  const hideReview = (id) => {
    dispatch(updateReview({ id, is_approved: false }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Content Moderation
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review and moderate companies and reviews across the platform
        </p>
      </div>

      {/* Tabs (Companies / Reviews) */}
      <div className="flex gap-3 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
              activeTab === tab
                ? "bg-white border-slate-300 shadow-sm"
                : "border-slate-200 text-slate-500 hover:bg-white"
            }`}
          >
            {tab} ({tab === "Companies" ? companies.length : reviews.length})
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="p-8 text-center text-slate-500">Loading...</div>
      ) : activeTab === "Companies" ? (

        // ===Companies===
        <div className="space-y-4">
          {companies.map((c) => (
            <div
              key={c.id}
              onClick={() => navigate(`/content-moderation/company/${c.id}`)}
              className="bg-white rounded-xl px-6 py-5 shadow-sm border border-slate-200 flex justify-between items-center flex-wrap gap-4 cursor-pointer hover:bg-slate-50 transition"
            >
              <div className="flex gap-4 items-center">
                <div className="h-10 w-10 rounded-lg bg-slate-300 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-slate-600" />
                </div>

                {/* Company details */}
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-slate-800">{c.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full font-medium capitalize bg-slate-100 text-slate-600">
                      {c.company_type}
                    </span>

                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        c.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {c.is_active ? "Active" : "Inactive"}
                    </span>
                    
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        c.is_verified ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {c.is_verified ? "Verified" : "Unverified"}
                    </span>
                  </div>

                  {c.description && (
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                      {c.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 text-sm font-medium" onClick={(e) => e.stopPropagation()}>

                {/* Activate / Deactivate */}
                {c.is_active ? (
                  <button
                    onClick={() => deactivateCompany(c.id)}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                    Deactivate
                  </button>
                ) : (
                  <button
                    onClick={() => activateCompany(c.id)}
                    className="flex items-center gap-2 text-green-600 hover:text-green-700"
                  >
                    <Check className="h-4 w-4" />
                    Activate
                  </button>
                )}

                {/* Verify */}
                {!c.is_verified && (
                  <button
                    onClick={() => verifyCompany(c.id)}
                    className="flex items-center gap-2 text-green-600 hover:text-green-700"
                  >
                    <Check className="h-4 w-4" />
                    Verify
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Empty state */}
          {companies.length === 0 && (
            <div className="p-8 text-center text-slate-500">No companies found</div>
          )}
        </div>
      ) : (

        // ===Reviews===
        <div className="space-y-4">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-xl px-6 py-5 shadow-sm border border-slate-200 flex justify-between items-start flex-wrap gap-4"
            >
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-lg bg-slate-300 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-semibold text-slate-800">
                      {r.company_name || `Company #${r.company_id}`}
                    </h3>

                    <span className="text-xs text-slate-500">
                      Rating: {r.rating}/5
                    </span>
                    
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        r.is_approved ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {r.is_approved ? "Approved" : "Hidden"}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mt-1">{r.content}</p>
                  <div className="flex gap-4 text-xs text-slate-500 mt-2">
                    {r.first_name && (
                      <span>
                        by {r.first_name} {r.last_name}
                      </span>
                    )}
                    <span>
                      {r.created_at
                        ? new Date(r.created_at).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm font-medium">
                {r.is_approved ? (
                  <button
                    onClick={() => hideReview(r.id)}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                    Hide
                  </button>
                ) : (
                  <button
                    onClick={() => approveReview(r.id)}
                    className="flex items-center gap-2 text-green-600 hover:text-green-700"
                  >
                    <Check className="h-4 w-4" />
                    Approve
                  </button>
                )}
              </div>
            </div>
          ))}
          
          {reviews.length === 0 && (
            <div className="p-8 text-center text-slate-500">No reviews found</div>
          )}
        </div>
      )}
    </div>
  );
}
