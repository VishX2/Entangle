/**
 * Page surface uses design token --color-surface (see design-tokens.css).
 */
export function DashboardPageLayout({ hero, mainColumn, sidebar }) {
  return (
    <div className="min-h-screen bg-surface px-6 py-6">
      <div className="max-w-7xl mx-auto">
        {hero}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
          <div className="xl:col-span-2 space-y-6">{mainColumn}</div>
          <div className="space-y-6">{sidebar}</div>
        </div>
      </div>
    </div>
  );
}

/** White card on gray-100 page; avoid global CSS on `section` (see Landing.css). */
export function DashboardCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl bg-white border border-gray-200 shadow-sm px-4 sm:px-5 pt-3 pb-4 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
