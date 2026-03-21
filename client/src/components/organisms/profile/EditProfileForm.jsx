import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchProfile, updateProfile } from '../../../store/userApi';
import { selectProfile, selectUserLoading } from '../../../store/userSlice';
import { uploadProfilePicture } from '../../../utils/imagekitUpload';
import { getAvatarUrl } from '../../../utils/avatarUrl';

export default function EditProfileForm({ backTo, backLabel = 'Back to profile' }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(selectProfile);
  const loading = useSelector(selectUserLoading);
  const fileInputRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ first_name: '', last_name: '', phone: '' });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setForm({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone: profile.phone || '',
      });
    }
  }, [profile]);

  const profilePicUrl = getAvatarUrl(profile?.profile_picture);

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

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const result = await dispatch(updateProfile(form));
      if (updateProfile.fulfilled.match(result)) {
        toast.success('Profile saved');
        if (backTo) navigate(backTo);
      } else {
        toast.error(result.payload || 'Failed to save');
      }
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

        <form onSubmit={handleSave} className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">First name</label>
            <input
              type="text"
              value={form.first_name}
              onChange={(e) => setForm((f) => ({ ...f, first_name: e.target.value }))}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Last name</label>
            <input
              type="text"
              value={form.last_name}
              onChange={(e) => setForm((f) => ({ ...f, last_name: e.target.value }))}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
            />
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
