import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Star, ThumbsUp } from "lucide-react";
import { getAvatarUrl } from "../utils/avatarUrl";
import ConnectButton from "../components/ConnectButton";
import MessageButton from "../components/MessageButton";
import { fetchCompanyById, fetchReviewsByCompany, createReview, markReviewHelpful } from "../store/userApi";
import {
  selectCurrentCompany,
  selectCompanyReviews,
  selectUserLoading,
  clearCurrentCompany,
} from "../store/userSlice";
import { selectToken } from "../store/authSlice";

export default function CompanyProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const company = useSelector(selectCurrentCompany);
  const reviews = useSelector(selectCompanyReviews);
  const loading = useSelector(selectUserLoading);
  const isLoggedIn = useSelector(selectToken);

  const [reviewForm, setReviewForm] = useState({ content: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchCompanyById(id));
    dispatch(fetchReviewsByCompany(id));
    return () => dispatch(clearCurrentCompany());
  }, [dispatch, id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/login", { state: { from: { pathname: `/company/${id}` } } });
      return;
    }
    setSubmitting(true);
    const result = await dispatch(
      createReview({
        company_id: Number(id),
        content: reviewForm.content,
        rating: reviewForm.rating,
      })
    );
    setSubmitting(false);
    if (createReview.fulfilled.match(result)) {
      setReviewForm({ content: "", rating: 5 });
      dispatch(fetchReviewsByCompany(id));
    }
  };

  const handleHelpful = (reviewId) => {
    dispatch(markReviewHelpful(reviewId));
    dispatch(fetchReviewsByCompany(id));
  };

  const goBack = () => navigate(-1);

  if (loading && !company) {
    return (
      <div className="p-8 text-center text-slate-500">Loading…</div>
    );
  }

  if (!company) {
    return (
      <div className="p-8">
        <div className="text-center text-slate-500">Company not found</div>
        <button onClick={goBack} className="text-[#E5654E] hover:underline mt-2">
          Go back
        </button>
      </div>
    );
  }

  const rating = Number(company.average_rating) || 0;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  {company.logo_url && (
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <img src={getAvatarUrl(company.logo_url)} alt={company.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <h1 className="text-2xl font-bold text-slate-800">{company.name}</h1>
                  {isLoggedIn && (
                    <>
                      <ConnectButton companyId={company.id} className="shrink-0" />
                      <MessageButton company={company} className="shrink-0" />
                    </>
                  )}
                </div>
                <p className="text-slate-500 mt-1">{company.headquarters || "—"}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-[#ffe4dc] text-[#ff6b4a] text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4" fill="currentColor" />
                    {rating.toFixed(1)}
                  </span>
                  <span className="text-sm text-slate-500">
                    {company.total_reviews ?? 0} reviews
                  </span>
                </div>
              </div>
              <span className="text-xs px-2 py-1 rounded-full font-medium capitalize bg-slate-100 text-slate-600">
                {company.company_type}
              </span>
            </div>

            {company.description && (
              <p className="mt-6 text-slate-600">{company.description}</p>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {company.funding_stage && (
                <span className="bg-[#e7e4dc] text-slate-600 text-xs px-3 py-1 rounded-full">
                  {company.funding_stage}
                </span>
              )}
              {company.investment_focus && (
                <span className="bg-[#e7e4dc] text-slate-600 text-xs px-3 py-1 rounded-full">
                  {company.investment_focus}
                </span>
              )}
            </div>
          </div>
          <div className="border-t border-slate-200 p-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Reviews</h2>

            {reviews.length === 0 ? (
              <p className="text-slate-500 text-sm">No reviews yet.</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="bg-slate-50 rounded-xl p-4 border border-slate-100"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-500 font-medium">{r.rating}/5</span>
                        {(r.first_name || r.last_name) && (
                          <span className="text-sm text-slate-600">
                            — {r.first_name} {r.last_name}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleHelpful(r.id)}
                        className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        Helpful ({r.helpful_count ?? 0})
                      </button>
                    </div>
                    <p className="mt-2 text-slate-700">{r.content}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h3 className="text-base font-semibold text-slate-800 mb-4">
                Write a review
              </h3>
              {isLoggedIn ? (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Rating
                    </label>
                    <select
                      value={reviewForm.rating}
                      onChange={(e) =>
                        setReviewForm((p) => ({ ...p, rating: Number(e.target.value) }))
                      }
                      className="w-full max-w-xs rounded-lg border border-slate-200 px-4 py-2"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n} star{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Your review
                    </label>
                    <textarea
                      value={reviewForm.content}
                      onChange={(e) =>
                        setReviewForm((p) => ({ ...p, content: e.target.value }))
                      }
                      rows={4}
                      required
                      className="w-full rounded-lg border border-slate-200 px-4 py-2"
                      placeholder="Share your experience..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#ff6b4a] hover:bg-[#ff5a36] text-white font-semibold py-2 px-6 rounded-xl disabled:opacity-50"
                  >
                    {submitting ? "Submitting…" : "Submit Review"}
                  </button>
                </form>
              ) : (
                <p className="text-slate-500 text-sm">
                  <button
                    onClick={() => navigate("/login", { state: { from: { pathname: `/company/${id}` } } })}
                    className="text-[#E5654E] font-medium hover:underline"
                  >
                    Sign in
                  </button>{" "}
                  to write a review.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
