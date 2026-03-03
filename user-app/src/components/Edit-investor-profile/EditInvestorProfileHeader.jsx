import { useRef, useState } from "react";
import defaultProfile from "../../assets/investor-profile/investor1.jpg";
import defaultCover from "../../assets/investor-profile/cover.jpg";

export default function EditInvestorProfileHeader() {
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [coverImage, setCoverImage] = useState(defaultCover);
  const [bio, setBio] = useState(
    "Serial entrepreneur turned angel investor with 15+ years in tech. Passionate about backing visionary founders building transformative companies in fintech, AI, and climate tech."
  );

  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) setCoverImage(URL.createObjectURL(file));
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow">

      {/* COVER IMAGE */}
      <div
        className="h-56 bg-cover bg-center relative cursor-pointer"
        style={{ backgroundImage: `url(${coverImage})` }}
        onClick={() => coverInputRef.current.click()}
      >
        <input
          type="file"
          accept="image/*"
          ref={coverInputRef}
          onChange={handleCoverChange}
          className="hidden"
        />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="relative px-8 pb-6">

        {/* PROFILE IMAGE */}
        <div
          className="-mt-16 relative inline-block cursor-pointer"
          onClick={() => profileInputRef.current.click()}
        >
          <img
            src={profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white object-cover shadow"
          />

          {/* ORANGE EDIT ICON */}
          <div className="absolute bottom-1 right-1 w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">
            ✎
          </div>

          <input
            type="file"
            accept="image/*"
            ref={profileInputRef}
            onChange={handleProfileChange}
            className="hidden"
          />
        </div>

        {/* BUTTONS (TOP RIGHT) */}
        <div className="absolute right-8 top-4 flex gap-3">
          <button className="px-4 py-2 rounded-xl bg-slate-100 text-sm">
            AI Suggestions
          </button>
          <button className="px-4 py-2 rounded-xl bg-slate-100 text-sm">
            Public Profile
          </button>
          <button className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm">
            Save Changes
          </button>
        </div>

        {/* NAME + TAGS */}
        <div className="mt-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-lg font-semibold text-slate-900">
              Marcus Reynolds
            </h2>

            <span className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-medium">
              Angel Investor
            </span>

            <span className="text-xs px-3 py-1 rounded-full bg-gray-200 text-gray-700">
              Verified
            </span>
          </div>

          {/* INFO ROW */}
          <div className="flex gap-4 text-sm text-slate-500 mt-3 flex-wrap">
            <span className="bg-slate-100 px-3 py-1 rounded-lg">
              San Francisco, CA
            </span>
            <span className="bg-slate-100 px-3 py-1 rounded-lg">
              marcus@entangle.vc
            </span>
            <span className="text-slate-400">
              Joined 2019
            </span>
          </div>

          {/* BIO TEXTAREA */}
          <div className="mt-4">
            <textarea
              className="w-full text-sm text-slate-700 border rounded-xl p-3 resize-none"
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <div className="text-right text-xs text-slate-400 mt-1">
              {bio.length}/300 characters
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
