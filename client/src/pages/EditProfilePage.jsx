import { EditProfileForm } from '../components/organisms/profile';

const BACK_CONFIG = {
  investor: { backTo: '/investor/profile', backLabel: 'Back to profile' },
  startup: { backTo: '/startup/profile', backLabel: 'Back to profile' },
  entrepreneur: { backTo: '/entrepreneur/profile', backLabel: 'Back to profile' },
};

export default function EditProfilePage({ userType = 'entrepreneur' }) {
  const config = BACK_CONFIG[userType] || BACK_CONFIG.entrepreneur;

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-semibold text-slate-800 mb-4">Edit profile</h1>
        <EditProfileForm backTo={config.backTo} backLabel={config.backLabel} />
      </div>
    </div>
  );
}
