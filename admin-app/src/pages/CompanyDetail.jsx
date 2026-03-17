import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { ArrowLeft, Building2, Check, X } from "lucide-react";
import { fetchCompanyById, updateCompany } from "../store/adminApi";
import {
  selectCurrentCompany,
  selectAdminLoading,
  clearCurrentCompany,
} from "../store/adminSlice";
import toast from "react-hot-toast";

const COMPANY_TYPES = ["entrepreneur", "investor", "startup"];
const TIERS = ["gold", "silver", "bronze", "none"];

export default function CompanyDetail() {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state selectors
  const company = useSelector(selectCurrentCompany);
  const loading = useSelector(selectAdminLoading);

  // Local state for editable form fields
  const [form, setForm] = useState({});
  // Track saving state for UI feedback
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchCompanyById(id));
    return () => dispatch(clearCurrentCompany());
  }, [dispatch, id]);

  useEffect(() => {
    if (company) setForm(company);
  }, [company]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Save updated company details
  const handleSave = async () => {
    setSaving(true);
    const result = await dispatch(
      updateCompany({
        id: Number(id),
        ...form,

        // Ensure numeric fields are sent as numbers
        founded_year: form.founded_year ? Number(form.founded_year) : null,
        years_experience: form.years_experience ? Number(form.years_experience) : null,
        team_size: form.team_size ? Number(form.team_size) : null,
        min_investment: form.min_investment ? Number(form.min_investment) : null,
        max_investment: form.max_investment ? Number(form.max_investment) : null,
      })
    );
    setSaving(false);

    // Show success notification if update succeeded
    if (updateCompany.fulfilled.match(result)) {
      toast.success("Company updated");
    }
  };

  // Toggle company active/inactive status
  const toggleActive = () => {
    dispatch(updateCompany({ id: Number(id), is_active: !form.is_active }));
    setForm((prev) => ({ ...prev, is_active: !prev.is_active }));
    toast.success(form.is_active ? "Company deactivated" : "Company activated");
  };

  // Toggle verification status
  const toggleVerified = () => {
    dispatch(updateCompany({ id: Number(id), is_verified: !form.is_verified }));
    setForm((prev) => ({ ...prev, is_verified: !prev.is_verified }));
    toast.success(form.is_verified ? "Verification removed" : "Company verified");
  };

  const goBack = () => navigate("/content-moderation");

  if (loading && !company) {
    return (
      <div className="flex min-h-screen bg-[#f7f3ec]">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="p-8 text-center text-slate-500">Loading...</div>
        </main>
      </div>
    );
  }

  // Handle case where company does not exist
  if (!company) {
    return (
      <div className="flex min-h-screen bg-[#f7f3ec]">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="p-8 text-center text-slate-500">Company not found</div>
          <button
            onClick={goBack}
            className="text-orange-500 hover:underline"
          >
            Back to Content Moderation
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f7f3ec]">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
          <div className="p-6 border-b border-slate-200 flex justify-between items-start flex-wrap gap-4">
            <div className="flex gap-4 items-center">
              <div className="h-14 w-14 rounded-xl bg-slate-200 flex items-center justify-center">
                <Building2 className="h-7 w-7 text-slate-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">
                  {form.name || "Company"}
                </h1>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="text-xs px-2 py-1 rounded-full font-medium capitalize bg-slate-100 text-slate-600">
                    {form.company_type}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      form.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {form.is_active ? "Active" : "Inactive"}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      form.is_verified ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {form.is_verified ? "Verified" : "Unverified"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={toggleActive}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                  form.is_active
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                {form.is_active ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                {form.is_active ? "Deactivate" : "Activate"}
              </button>
              <button
                onClick={toggleVerified}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                  form.is_verified
                    ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                <Check className="w-4 h-4" />
                {form.is_verified ? "Unverify" : "Verify"}
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 text-sm font-medium"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Editable company form */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input
                type="text"
                value={form.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
              <select
                value={form.company_type || ""}
                onChange={(e) => handleChange("company_type", e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                {COMPANY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea
                value={form.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Website URL</label>
              <input
                type="url"
                value={form.website_url || ""}
                onChange={(e) => handleChange("website_url", e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Headquarters</label>
              <input
                type="text"
                value={form.headquarters || ""}
                onChange={(e) => handleChange("headquarters", e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Founder Name</label>
              <input
                type="text"
                value={form.founder_name || ""}
                onChange={(e) => handleChange("founder_name", e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Founded Year</label>
              <input
                type="number"
                value={form.founded_year ?? ""}
                onChange={(e) => handleChange("founded_year", e.target.value || null)}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Verification Tier</label>
              <select
                value={form.verification_tier || "none"}
                onChange={(e) => handleChange("verification_tier", e.target.value || null)}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                {TIERS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Years Experience</label>
              <input
                type="number"
                value={form.years_experience ?? ""}
                onChange={(e) => handleChange("years_experience", e.target.value || null)}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Team Size</label>
              <input
                type="number"
                value={form.team_size ?? ""}
                onChange={(e) => handleChange("team_size", e.target.value || null)}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Funding Stage</label>
              <input
                type="text"
                value={form.funding_stage || ""}
                onChange={(e) => handleChange("funding_stage", e.target.value)}
                placeholder="Seed, Series A, etc."
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Investment Focus</label>
              <input
                type="text"
                value={form.investment_focus || ""}
                onChange={(e) => handleChange("investment_focus", e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Min Investment</label>
              <input
                type="number"
                value={form.min_investment ?? ""}
                onChange={(e) => handleChange("min_investment", e.target.value || null)}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Max Investment</label>
              <input
                type="number"
                value={form.max_investment ?? ""}
                onChange={(e) => handleChange("max_investment", e.target.value || null)}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Logo URL</label>
              <input
                type="url"
                value={form.logo_url || ""}
                onChange={(e) => handleChange("logo_url", e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 text-sm text-slate-500">
            Created: {company.created_at ? new Date(company.created_at).toLocaleString() : "-"} | 
            Updated: {company.updated_at ? new Date(company.updated_at).toLocaleString() : "-"} | 
            Reviews: {company.total_reviews ?? 0} | 
            Avg Rating: {company.average_rating ?? 0}/5
          </div>
        </div>
      </main>
    </div>
  );
}
