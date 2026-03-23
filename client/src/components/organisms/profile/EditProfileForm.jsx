import { useEffect, useRef, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchProfile, updateProfile, fetchMyCompany, updateMyCompany, fetchCompanies } from '../../../store/userApi';
import { selectProfile, selectUserLoading, selectMyCompany } from '../../../store/userSlice';
import { uploadProfilePicture } from '../../../utils/imagekitUpload';
import { getAvatarUrl } from '../../../utils/avatarUrl';

const emptyCompany = {
  name: '',
  description: '',
  headquarters: '',
  website_url: '',
  founded_year: '',
  founder_name: '',
  investment_focus: '',
  min_investment: '',
  max_investment: '',
  funding_stage: '',
  team_size: '',
  years_experience: '',
};

function numOrNull(v) {
  if (v === '' || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export default function EditProfileForm({ backTo, backLabel = 'Back to profile', userType = 'entrepreneur' }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(selectProfile);
  const myCompany = useSelector(selectMyCompany);
  const loading = useSelector(selectUserLoading);
  const fileInputRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [userForm, setUserForm] = useState({ first_name: '', last_name: '', phone: '', nic_id: '' });
  const [companyForm, setCompanyForm] = useState(emptyCompany);

  const companyType = userType;

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchMyCompany(companyType));
  }, [dispatch, companyType]);

  useEffect(() => {
    if (profile) {
      setUserForm({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone: profile.phone || '',
        nic_id: profile.nic_id || '',
      });
    }
  }, [profile]);

  useEffect(() => {
    if (!myCompany) return;
    setCompanyForm({
      name: myCompany.name ?? '',
      description: myCompany.description ?? '',
      headquarters: myCompany.headquarters ?? '',
      website_url: myCompany.website_url ?? '',
      founded_year: myCompany.founded_year != null ? String(myCompany.founded_year) : '',
      founder_name: myCompany.founder_name ?? '',
      investment_focus: myCompany.investment_focus ?? '',
      min_investment: myCompany.min_investment != null ? String(myCompany.min_investment) : '',
      max_investment: myCompany.max_investment != null ? String(myCompany.max_investment) : '',
      funding_stage: myCompany.funding_stage ?? '',
      team_size: myCompany.team_size != null ? String(myCompany.team_size) : '',
      years_experience: myCompany.years_experience != null ? String(myCompany.years_experience) : '',
    });
  }, [myCompany]);

  const profilePicUrl = getAvatarUrl(profile?.profile_picture);

  const showInvestorFields = companyType === 'investor';
  const showStartupFields = companyType === 'startup';
  const showEntrepreneurFields = companyType === 'entrepreneur';

  const handleProfilePicChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    setUploading(true);
    try {
      const url = await uploadProfilePicture(file);
      const result = await dispatch(updateProfile({ profile_picture: url }));
      if (updateProfile.fulfilled.match(result)) {
        toast.success('Profile picture updated');
      } else {
        toast.error(result.payload || 'Failed to save');
      }
    } catch (err) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const buildCompanyPayload = useMemo(() => {
    return () => {
      const d = {};
      if (companyForm.name?.trim()) d.name = companyForm.name.trim();
      if (companyForm.description !== undefined) d.description = companyForm.description || null;
      if (companyForm.headquarters !== undefined) d.headquarters = companyForm.headquarters || null;
      if (companyForm.website_url !== undefined) {
        const w = companyForm.website_url.trim();
        d.website_url = w || null;
      }
      if (companyForm.founder_name !== undefined) d.founder_name = companyForm.founder_name || null;
      const fy = numOrNull(companyForm.founded_year);
      if (companyForm.founded_year !== '') d.founded_year = fy;
      const te = numOrNull(companyForm.team_size);
      if (companyForm.team_size !== '') d.team_size = te;
      const ye = numOrNull(companyForm.years_experience);
      if (companyForm.years_experience !== '') d.years_experience = ye;
      if (companyForm.investment_focus !== undefined) d.investment_focus = companyForm.investment_focus || null;
      const minI = numOrNull(companyForm.min_investment);
      if (companyForm.min_investment !== '') d.min_investment = minI;
      const maxI = numOrNull(companyForm.max_investment);
      if (companyForm.max_investment !== '') d.max_investment = maxI;
      if (companyForm.funding_stage !== undefined) d.funding_stage = companyForm.funding_stage || null;
      return d;
    };
  }, [companyForm]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const uPayload = {
        first_name: userForm.first_name,
        last_name: userForm.last_name,
        phone: userForm.phone || null,
      };
      if (userForm.nic_id !== undefined) uPayload.nic_id = userForm.nic_id || null;

      const uRes = await dispatch(updateProfile(uPayload));
      if (!updateProfile.fulfilled.match(uRes)) {
        toast.error(uRes.payload || 'Failed to save user profile');
        return;
      }

      if (!myCompany) {
        toast.success('Personal details saved');
        dispatch(fetchCompanies());
        if (backTo) navigate(backTo);
        return;
      }

      const cPayload = buildCompanyPayload();
      if (Object.keys(cPayload).length === 0) {
        toast.success('Profile saved');
        dispatch(fetchCompanies());
        if (backTo) navigate(backTo);
        return;
      }

      const cRes = await dispatch(updateMyCompany({ companyType, body: cPayload }));
      if (!updateMyCompany.fulfilled.match(cRes)) {
        toast.error(cRes.payload || 'Failed to save company profile');
        return;
      }

      toast.success('Profile saved');
      dispatch(fetchCompanies());
      dispatch(fetchMyCompany(companyType));
      if (backTo) navigate(backTo);
    } finally {
      setSaving(false);
    }
  };

  if (loading && !profile) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="flex-shrink-0">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Profile picture</label>
          <div
            className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-slate-200 bg-slate-100 cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <img src={profilePicUrl} alt="Profile" className="w-full h-full object-cover" />
            {uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-xs">Uploading...</span>
              </div>
            )}
            {!uploading && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition">
                <span className="text-white text-xs opacity-0 group-hover:opacity-100">Change</span>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePicChange}
            disabled={uploading}
          />
          <p className="text-xs text-slate-500 mt-1">Click to upload (ImageKit)</p>
        </div>

        <form onSubmit={handleSave} className="flex-1 space-y-8">
          <div>
            <h2 className="text-sm font-semibold text-slate-800 mb-3">Personal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">First name</label>
                <input
                  type="text"
                  value={userForm.first_name}
                  onChange={(e) => setUserForm((f) => ({ ...f, first_name: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Last name</label>
                <input
                  type="text"
                  value={userForm.last_name}
                  onChange={(e) => setUserForm((f) => ({ ...f, last_name: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={userForm.phone}
                  onChange={(e) => setUserForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">NIC / ID (optional)</label>
                <input
                  type="text"
                  value={userForm.nic_id}
                  onChange={(e) => setUserForm((f) => ({ ...f, nic_id: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-800 mb-3">Company / venture</h2>
            {!myCompany && !loading && (
              <p className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-3">
                No company profile loaded for this account type. Save will still update your personal details; create a company during registration if missing.
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  value={companyForm.name}
                  onChange={(e) => setCompanyForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                  required={!!myCompany}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  value={companyForm.description}
                  onChange={(e) => setCompanyForm((f) => ({ ...f, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none resize-y"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Headquarters</label>
                <input
                  type="text"
                  value={companyForm.headquarters}
                  onChange={(e) => setCompanyForm((f) => ({ ...f, headquarters: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Website URL</label>
                <input
                  type="text"
                  value={companyForm.website_url}
                  onChange={(e) => setCompanyForm((f) => ({ ...f, website_url: e.target.value }))}
                  placeholder="https://…"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Founded year</label>
                <input
                  type="number"
                  min={1800}
                  max={2100}
                  value={companyForm.founded_year}
                  onChange={(e) => setCompanyForm((f) => ({ ...f, founded_year: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Founder / contact name</label>
                <input
                  type="text"
                  value={companyForm.founder_name}
                  onChange={(e) => setCompanyForm((f) => ({ ...f, founder_name: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                />
              </div>

              {(showInvestorFields || showEntrepreneurFields) && (
                <>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Investment focus</label>
                    <textarea
                      value={companyForm.investment_focus}
                      onChange={(e) => setCompanyForm((f) => ({ ...f, investment_focus: e.target.value }))}
                      rows={2}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Min investment</label>
                    <input
                      type="number"
                      min={0}
                      value={companyForm.min_investment}
                      onChange={(e) => setCompanyForm((f) => ({ ...f, min_investment: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Max investment</label>
                    <input
                      type="number"
                      min={0}
                      value={companyForm.max_investment}
                      onChange={(e) => setCompanyForm((f) => ({ ...f, max_investment: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Years experience</label>
                    <input
                      type="number"
                      min={0}
                      value={companyForm.years_experience}
                      onChange={(e) => setCompanyForm((f) => ({ ...f, years_experience: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                    />
                  </div>
                </>
              )}

              {(showStartupFields || showEntrepreneurFields || showInvestorFields) && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Team size</label>
                    <input
                      type="number"
                      min={0}
                      value={companyForm.team_size}
                      onChange={(e) => setCompanyForm((f) => ({ ...f, team_size: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Funding stage</label>
                    <input
                      type="text"
                      value={companyForm.funding_stage}
                      onChange={(e) => setCompanyForm((f) => ({ ...f, funding_stage: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save changes'}
            </button>
            {backTo && (
              <Link
                to={backTo}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50"
              >
                {backLabel}
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
