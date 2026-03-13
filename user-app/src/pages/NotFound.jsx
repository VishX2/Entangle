import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B1220] flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-[#F97316] mb-2">404</p>
        <h1 className="text-2xl font-semibold text-white mb-2">Page not found</h1>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or hasn't been built yet.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#ea6822] text-white font-medium px-6 py-3 rounded-lg transition"
          >
            <Home size={20} />
            Go to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 border border-gray-500 text-gray-300 hover:bg-white/5 font-medium px-6 py-3 rounded-lg transition"
          >
            <ArrowLeft size={20} />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
