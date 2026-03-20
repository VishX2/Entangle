import { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileHeader } from '../components/organisms/profile';
import { fetchCompanies, fetchReviewsByCompany, createReview } from '../store/userApi';
import { selectCompanies, selectCompanyReviews } from '../store/userSlice';
import { selectCurrentUser, selectToken } from '../store/authSlice';
import toast from 'react-hot-toast';
import { Shield, BadgeCheck, Sparkles, BriefcaseBusiness, Bell, Rocket, Lightbulb, Handshake } from 'lucide-react';

const EDIT_PATHS = {
  investor: '/investor/edit-profile',
  startup: '/startup/editProfile',
  entrepreneur: '/entrepreneur/profile/edit',
};

const LABEL_CONFIG = {
  investor: {
    rolePill: 'ANGEL INVESTOR',
    name: 'Investor profile / firm',
    focus: 'Investment thesis',
    history: 'Investment History',
    preferences: 'Investment Preferences',
    insights: 'AI Tools & Insights',
    rightTitle: 'Connect & Interact',
  },
  startup: {
    rolePill: 'FOUNDER',
    name: 'Startup profile',
    focus: 'About startup',
    history: 'Growth Highlights',
    preferences: 'Business Preferences',
    insights: 'AI Growth Insights',
    rightTitle: 'Collaborate & Connect',
  },
  entrepreneur: {
    rolePill: 'ENTREPRENEUR',
    name: 'Venture profile',
    focus: 'About venture',
    history: 'Venture Journey',
    preferences: 'Growth Preferences',
    insights: 'AI Founder Insights',
    rightTitle: 'Network & Interact',
  },
};

export default function ProfilePage({ userType = 'entrepreneur' }) {
  const dispatch = useDispatch();
  const companies = useSelector(selectCompanies);
  const companyReviews = useSelector(selectCompanyReviews);
  const currentUser = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);
  const [reviewForm, setReviewForm] = useState({ company_id: '', rating: 5, content: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const myCompany = useMemo(
    () =>
      companies?.find(
        (c) => Number(c.created_by) === Number(currentUser?.id) && c.company_type === userType
      ) ?? null,
    [companies, currentUser?.id, userType]
  );

  const labels = LABEL_CONFIG[userType] || LABEL_CONFIG.entrepreneur;
  const editPath = EDIT_PATHS[userType] || EDIT_PATHS.entrepreneur;
  const website = myCompany?.website_url;
  const receivedReviews = companyReviews || [];
  const reviewTargets = useMemo(
    () => (companies || []).filter((c) => c.id !== myCompany?.id && c.is_active),
    [companies, myCompany?.id]
  );

  useEffect(() => {
    if (myCompany?.id) dispatch(fetchReviewsByCompany(myCompany.id));
  }, [dispatch, myCompany?.id]);

  const handleCreateReview = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error('Please log in to write a review');
      return;
    }
    const target = Number(reviewForm.company_id);
    if (!target) {
      toast.error('Please select a profile to review');
      return;
    }
    setSubmittingReview(true);
    const result = await dispatch(
      createReview({ company_id: target, rating: Number(reviewForm.rating), content: reviewForm.content })
    );
    setSubmittingReview(false);
    if (createReview.fulfilled.match(result)) {
      toast.success('Review submitted');
      setReviewForm({ company_id: '', rating: 5, content: '' });
    } else {
      toast.error(result.payload || 'Failed to submit review');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0DD] px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <ProfileHeader userType={userType} company={myCompany} />
        <div className={`mt-6 ${userType === 'entrepreneur' ? 'space-y-8' : 'space-y-6'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2" title="Background & Experience">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-medium">
                  {labels.rolePill}
                </span>
              </div>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-slate-500">{labels.name}</dt>
                  <dd className="font-medium text-slate-800">{myCompany?.name || '—'}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Stage</dt>
                  <dd className="text-slate-700">{myCompany?.funding_stage || '—'}</dd>
                </div>
                <div className="md:col-span-2">
                  <dt className="text-slate-500">{labels.focus}</dt>
                  <dd className="text-slate-700 whitespace-pre-line">{myCompany?.description || myCompany?.investment_focus || '—'}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Headquarters</dt>
                  <dd className="text-slate-700">{myCompany?.headquarters || '—'}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Team size</dt>
                  <dd className="text-slate-700">{myCompany?.team_size ?? '—'}</dd>
                </div>
                <div className="md:col-span-2">
                  <dt className="text-slate-500">Website</dt>
                  <dd>
                    {website ? (
                      <a
                        href={website.startsWith('http') ? website : `https://${website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:underline break-all"
                      >
                        {website}
                      </a>
                    ) : (
                      <span className="text-slate-700">—</span>
                    )}
                  </dd>
                </div>
              </dl>
            </Card>

            <Card title={labels.rightTitle}>
              <h3 className="font-semibold text-slate-800 mb-3">Verification & Trust</h3>
              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50 mb-4">
                <div className="flex items-center gap-2 text-slate-800 font-medium">
                  <BadgeCheck size={16} className="text-emerald-600" />
                  {myCompany?.is_verified ? 'Verified profile' : 'Pending verification'}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {myCompany?.is_verified
                    ? `Tier: ${(myCompany?.verification_tier || 'none').toUpperCase()}`
                    : 'Complete details to improve verification confidence.'}
                </p>
              </div>

              <h3 className="font-semibold text-slate-800 mb-3">{labels.insights}</h3>
              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50 mb-4 text-sm">
                <div className="flex items-center gap-2 text-slate-800 font-medium">
                  <Sparkles size={16} className="text-orange-500" />
                  Profile completeness
                </div>
                <p className="text-slate-600 mt-2">
                  {myCompany?.description ? 'Description added' : 'Add a strong description'}
                  {' • '}
                  {myCompany?.website_url ? 'Website linked' : 'Link website/social'}
                </p>
              </div>

              <h3 className="font-semibold text-slate-800 mb-3">{labels.rightTitle}</h3>
              <div className="space-y-2 text-sm">
                <Link to={editPath} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50">
                  <Rocket size={14} />
                  Edit profile
                </Link>
                <Link to={`/${userType}/ai-matchmaking`} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50">
                  <Lightbulb size={14} />
                  AI matchmaking
                </Link>
                <Link to={`/${userType}/messages`} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50">
                  <Handshake size={14} />
                  Messages
                </Link>
                <Link to={`/${userType}/requests`} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50">
                  <Bell size={14} />
                  Connection requests
                </Link>
                {myCompany?.id && (
                  <Link to={`/${userType}/company/${myCompany.id}`} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50">
                    <Shield size={14} />
                    Public profile view
                  </Link>
                )}
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2" title={labels.preferences}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <InfoTile
                  icon={<BriefcaseBusiness size={16} className="text-[#465775]" />}
                  label={userType === 'investor' ? 'Investment range' : 'Funding needs'}
                  value={
                    myCompany?.min_investment != null && myCompany?.max_investment != null
                      ? `$${Number(myCompany.min_investment).toLocaleString()} - $${Number(myCompany.max_investment).toLocaleString()}`
                      : '—'
                  }
                />
                <InfoTile
                  icon={<Shield size={16} className="text-[#465775]" />}
                  label="Stage"
                  value={myCompany?.funding_stage || '—'}
                />
                <InfoTile
                  icon={<BadgeCheck size={16} className="text-[#465775]" />}
                  label="Focus"
                  value={myCompany?.investment_focus || '—'}
                />
                <InfoTile
                  icon={<Sparkles size={16} className="text-[#465775]" />}
                  label="Years experience"
                  value={myCompany?.years_experience ?? '—'}
                />
              </div>
            </Card>

            <Card title="Notifications & Privacy">
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="rounded-xl border border-slate-200 p-3 bg-slate-50">Message alerts: Enabled</li>
                <li className="rounded-xl border border-slate-200 p-3 bg-slate-50">Review alerts: Enabled</li>
                <li className="rounded-xl border border-slate-200 p-3 bg-slate-50">Profile visibility: Public</li>
              </ul>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2" title={labels.history}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <StatTile label="Total Reviews" value={String(receivedReviews.length)} />
                <StatTile label="Verified" value={myCompany?.is_verified ? 'Yes' : 'No'} />
                <StatTile label="Stage" value={myCompany?.funding_stage || 'N/A'} />
                <StatTile label="Team" value={String(myCompany?.team_size ?? 'N/A')} />
              </div>
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Ratings & Reviews</h2>
              {receivedReviews.length === 0 ? (
                <p className="text-sm text-slate-500">No reviews yet.</p>
              ) : (
                <div className="space-y-3">
                  {receivedReviews.map((r) => (
                    <div key={r.id} className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                      <div className="text-sm font-semibold text-amber-600">{r.rating}/5</div>
                      <p className="text-sm text-slate-700 mt-1">{r.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card title="Write a review">
              <form onSubmit={handleCreateReview} className="space-y-3">
                <select
                  value={reviewForm.company_id}
                  onChange={(e) => setReviewForm((p) => ({ ...p, company_id: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                  required
                >
                  <option value="">Select profile</option>
                  {reviewTargets.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <select
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm((p) => ({ ...p, rating: Number(e.target.value) }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n} star{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
                <textarea
                  rows={4}
                  value={reviewForm.content}
                  onChange={(e) => setReviewForm((p) => ({ ...p, content: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                  placeholder="Share your experience..."
                  required
                />
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="w-full px-4 py-2 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 disabled:opacity-50"
                >
                  {submittingReview ? 'Submitting…' : 'Submit review'}
                </button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoTile({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
      <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wide">
        {icon}
        <span>{label}</span>
      </div>
      <p className="mt-2 text-slate-800 font-medium">{value || '—'}</p>
    </div>
  );
}

function Card({ title, children, className = '' }) {
  return (
    <section className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-200 ${className}`}>
      {title && <h2 className="text-lg font-semibold text-slate-800 mb-4">{title}</h2>}
      {children}
    </section>
  );
}

function StatTile({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-center">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="text-sm font-semibold text-slate-800 mt-1">{value || '—'}</div>
    </div>
  );
}
