const { prisma } = require('../lib/prisma');

async function stats(req, res, next) {
  try {
    const [companies, users, reviews, reports, verifiedCount, pendingReviews, pendingConnections] = await Promise.all([
      prisma.company.findMany({ select: { id: true, name: true, company_type: true, is_verified: true, verification_tier: true, created_at: true } }),
      prisma.user.count(),
      prisma.review.findMany({ select: { id: true, is_approved: true, created_at: true, company: { select: { name: true } } } }),
      prisma.report.count(),
      prisma.company.count({ where: { is_verified: true } }),
      prisma.review.count({ where: { is_approved: false } }),
      prisma.connectionRequest.count({ where: { status: 'pending' } }),
    ]);

    const startups = companies.filter((c) => c.company_type === 'startup').length;
    const investors = companies.filter((c) => c.company_type === 'investor').length;

    const now = new Date();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        month: d.toLocaleString('en', { month: 'short' }),
        gold: 0,
        silver: 0,
        bronze: 0,
        _date: d,
      });
    }
    for (const c of companies) {
      const created = new Date(c.created_at);
      for (const m of months) {
        if (created.getMonth() === m._date.getMonth() && created.getFullYear() === m._date.getFullYear()) {
          const tier = c.verification_tier || 'none';
          if (tier === 'gold') m.gold++;
          else if (tier === 'silver') m.silver++;
          else if (tier === 'bronze') m.bronze++;
          break;
        }
      }
    }
    const lineData = months.map(({ _date, ...rest }) => rest);

    const barData = [
      { name: 'Verifications', value: verifiedCount, fill: '#f97316' },
      { name: 'Reports', value: reports, fill: '#334155' },
      { name: 'Moderation', value: pendingReviews, fill: '#1f2937' },
      { name: 'Investors', value: investors, fill: '#94a3b8' },
    ];

    const activities = [
      ...reviews.slice(0, 10).map((r) => ({
        type: 'review',
        title: r.is_approved ? 'Review approved' : 'Review pending',
        subtitle: r.company?.name || 'Company',
        tag: r.is_approved ? null : 'Pending',
        tagStyle: 'bg-amber-100 text-amber-800',
        created_at: r.created_at,
      })),
      ...[...companies].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5).map((c) => ({
        type: 'company',
        title: c.is_verified ? 'Company verified' : 'Company registered',
        subtitle: c.name || 'Company',
        tag: c.verification_tier && c.verification_tier !== 'none' ? c.verification_tier.charAt(0).toUpperCase() + c.verification_tier.slice(1) : null,
        tagStyle: c.verification_tier === 'gold' ? 'bg-yellow-100 text-yellow-800' : c.verification_tier === 'silver' ? 'bg-slate-100 text-slate-700' : 'bg-orange-100 text-orange-800',
        created_at: c.created_at,
      })),
    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const recentActivity = activities.slice(0, 8).map((a) => ({
      ...a,
      time: formatTimeAgo(a.created_at),
    }));

    res.json({
      stats: {
        startupsCount: startups,
        companiesCount: companies.length,
        investorsCount: investors,
        usersCount: users,
        reportsCount: reports,
        pendingConnectionsCount: pendingConnections,
      },
      lineData,
      barData,
      recentActivity,
    });
  } catch (err) {
    next(err);
  }
}

function formatTimeAgo(date) {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

module.exports = { stats };
