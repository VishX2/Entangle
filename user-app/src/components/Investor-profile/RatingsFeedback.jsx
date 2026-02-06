export default function RatingsFeedback() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center">
            <StarIcon />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">
            Ratings & Feedback
          </h3>
        </div>

        <button className="text-sm text-slate-400 hover:text-slate-600 transition flex items-center gap-1">
          View All
          <ChevronRightIcon />
        </button>
      </div>

      {/* SUMMARY CARD */}
      <div className="bg-yellow-50 rounded-xl p-4 flex items-center justify-between mb-6">
        <div className="flex items-center gap-6">

          {/* SCORE */}
          <div className="text-center">
            <div className="text-3xl font-semibold text-yellow-500">4.9</div>
            <Stars count={5} />
            <div className="text-xs text-slate-400 mt-1">
              124 reviews
            </div>
          </div>

          {/* RESPONSIVENESS */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <ClockIcon />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">
                Highly Responsive
              </p>
              <p className="text-xs text-slate-500">
                Avg. response time: 2 hours
              </p>
            </div>
          </div>
        </div>

        {/* BADGE */}
        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
          Top Rated
        </span>
      </div>

      {/* RECENT REVIEWS */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
          <MessageIcon />
          Recent Reviews
        </div>

        <ReviewItem
          initials="SC"
          name="Sarah Chen"
          company="TechFlow AI"
          time="2 weeks ago"
          text="Incredibly responsive and provided valuable strategic guidance beyond just capital."
          rating={5}
          color="bg-orange-100 text-orange-600"
        />

        <ReviewItem
          initials="MJ"
          name="Marcus Johnson"
          company="GreenGrid"
          time="1 month ago"
          text="Professional approach and deep industry knowledge. Highly recommend!"
          rating={5}
          color="bg-rose-100 text-rose-600"
        />

        <ReviewItem
          initials="EW"
          name="Emma Williams"
          company="HealthSync"
          time="2 months ago"
          text="Great mentor, always available for quick calls when needed."
          rating={4}
          color="bg-pink-100 text-pink-600"
        />
      </div>
    </div>
  );
}

/* =====================================================
   SUB COMPONENTS
   ===================================================== */

function ReviewItem({ initials, name, company, time, text, rating, color }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 mb-3 last:mb-0">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold ${color}`}
          >
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">
              {name}{" "}
              <span className="text-xs text-slate-400">
                from {company}
              </span>
            </p>
            <Stars count={rating} small />
          </div>
        </div>

        <span className="text-xs text-slate-400">{time}</span>
      </div>

      <p className="text-sm text-slate-600">
        {text}
      </p>
    </div>
  );
}

function Stars({ count, small }) {
  return (
    <div className={`flex gap-0.5 ${small ? "mt-0.5" : "mt-1"}`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width={small ? 12 : 14}
          height={small ? 12 : 14}
          viewBox="0 0 24 24"
          fill={i < count ? "#fbbf24" : "none"}
          stroke="#fbbf24"
          strokeWidth="2"
        >
          <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
        </svg>
      ))}
    </div>
  );
}

/* =====================================================
   ICONS
   ===================================================== */

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24">
      <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#3b82f6" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="#3b82f6" strokeWidth="2" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"
        stroke="#64748b"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18l6-6-6-6"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
