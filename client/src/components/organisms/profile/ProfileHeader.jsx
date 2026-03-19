import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../../store/userApi';
import { selectProfile, selectUserLoading } from '../../../store/userSlice';
import { selectCurrentUser } from '../../../store/authSlice';

const EDIT_PATHS = {
  investor: '/investor/edit-profile',
  startup: '/startup/editProfile',
  entrepreneur: '/entrepreneur/profile/edit',
};

const BADGE_LABELS = {
  investor: 'Investor',
  startup: 'Founder',
  entrepreneur: 'Entrepreneur',
};

const DEFAULT_COVERS = {
  investor: '/cover-investor.jpg',
  startup: '/cover-startup.jpg',
  entrepreneur: '/cover-investor.jpg',
};
const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330';

function normalizeLink(raw) {
  if (!raw) return null;
  const value = String(raw).trim();
  if (!value) return null;
  if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('mailto:')) return value;
  return `https://${value}`;
}

export default function ProfileHeader({ userType = 'entrepreneur', company = null }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const authUser = useSelector(selectCurrentUser);
  const loading = useSelector(selectUserLoading);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const user = profile ?? authUser;
  const fullName = user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Profile' : 'Loading...';
  const joinedYear = user?.created_at ? new Date(user.created_at).getFullYear() : null;
  const editPath = EDIT_PATHS[userType] || EDIT_PATHS.entrepreneur;
  const badgeLabel = BADGE_LABELS[userType] || BADGE_LABELS.entrepreneur;
  const coverImage = DEFAULT_COVERS[userType] || DEFAULT_COVERS.entrepreneur;

  const socialLinks = useMemo(() => {
    const website = normalizeLink(company?.website_url);
    const linkedin = website && website.includes('linkedin.com') ? website : null;
    const x = website && (website.includes('x.com') || website.includes('twitter.com')) ? website : null;
    const mail = user?.email ? `mailto:${user.email}` : null;
    return { website, linkedin, x, mail };
  }, [company?.website_url, user?.email]);

  return (
    <div className="rounded-3xl overflow-hidden bg-white">
      <div
        className="h-48 bg-cover bg-center"
        style={{
          backgroundImage: coverImage
            ? `linear-gradient(rgba(20,30,45,.35), rgba(20,30,45,.35)), url(${coverImage})`
            : 'linear-gradient(135deg, #2f3b4b 0%, #465775 100%)',
        }}
      />
      <div className="relative px-8 pb-8">
        <div className="-mt-24 relative inline-block">
          <img
            src={user?.profile_picture || DEFAULT_AVATAR}
            alt="Profile"
            className="w-44 h-44 rounded-full object-cover border-4 border-white"
          />
          <div className="absolute bottom-4 right-4 bg-[#1d9bf0] rounded-full p-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="mt-6 flex flex-col lg:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-semibold text-slate-900">{loading ? 'Loading...' : fullName}</h1>
              <span className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-medium">
                {badgeLabel.toUpperCase()}
              </span>
            </div>
            <div className="mt-2 text-sm text-slate-600 flex flex-wrap gap-4">
              {user?.email && <span>{user.email}</span>}
              {joinedYear && <span>Joined {joinedYear}</span>}
              {company?.name && <span>{company.name}</span>}
            </div>
            <div className="flex gap-4 mt-6">
              <SocialIcon type="linkedin" href={socialLinks.linkedin} />
              <SocialIcon type="x" href={socialLinks.x} />
              <SocialIcon type="website" href={socialLinks.website} />
              <SocialIcon type="email" href={socialLinks.mail} />
            </div>
          </div>
          <div className="flex items-start gap-3">
            <button
              onClick={() => navigate(editPath)}
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition-all duration-200"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialIcon({ type, href }) {
  const icons = {
    linkedin: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v2zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4a2 2 0 0 1 0-4z" />,
    x: <path d="M18.244 2H21l-6.51 7.44L22 22h-6.828l-4.57-6.38L4.56 22H2l6.94-7.93L2 2h6.828l4.13 5.77L18.244 2z" />,
    website: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M2.5 12h19" />
        <path d="M12 2.5a15 15 0 0 1 0 19" />
        <path d="M12 2.5a15 15 0 0 0 0 19" />
      </>
    ),
    email: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6l9-6" />
      </>
    ),
  };
  return (
    <a
      href={href || '#'}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={type}
      className={`w-11 h-11 rounded-full border border-slate-300 flex items-center justify-center transition ${
        href ? 'hover:bg-slate-100' : 'opacity-40 pointer-events-none'
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2">
        {icons[type]}
      </svg>
    </a>
  );
}
