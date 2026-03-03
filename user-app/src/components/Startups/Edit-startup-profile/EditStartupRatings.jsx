import { useState } from "react";
import { Star, Eye } from "lucide-react";

export default function EditStartupRatings() {
  const [visible, setVisible] = useState(true);

  const [reviews] = useState([
    {
      name: "Sarah Chen",
      company: "TechFlow AI",
      text:
        "Marcus provided invaluable guidance during our Series A. His network and strategic advice were game-changers.",
      rating: 5,
      time: "2 months ago",
    },
    {
      name: "James Wilson",
      company: "GreenEnergy Solutions",
      text:
        "Incredibly responsive startup who truly understands the climate tech space. Highly recommend.",
      rating: 5,
      time: "4 months ago",
    },
    {
      name: "Elena Rodriguez",
      company: "HealthSync",
      text:
        "Very supportive during early growth stages. Helped us refine our go-to-market strategy.",
      rating: 4,
      time: "6 months ago",
    },
  ]);

  // Calculate average rating
  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) /
    reviews.length;

  const roundedRating = avgRating.toFixed(1);

  return (
    <div className="bg-white rounded-3xl p-6 shadow">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Star className="text-orange-500" size={18} />
          <h3 className="font-semibold text-slate-900">
            Ratings & Feedback
          </h3>
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Visible to public</span>
          <button
            onClick={() => setVisible(!visible)}
            className={`w-10 h-5 rounded-full relative transition ${
              visible ? "bg-orange-500" : "bg-slate-300"
            }`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition ${
                visible ? "right-0.5" : "left-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      {visible && (
        <>
          {/* Rating summary */}
          <div className="bg-slate-100 rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-semibold text-slate-900">
                {roundedRating}
              </div>

              <div>
                <div className="flex text-orange-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={
                        i < Math.round(avgRating)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                </div>

                <div className="text-sm text-slate-500">
                  Based on {reviews.length} reviews
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-5">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="pb-4 border-b last:border-b-0"
              >
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <div className="font-medium text-sm text-slate-900">
                      {review.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {review.company}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="flex text-orange-500">
                      {Array.from({ length: review.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill="currentColor"
                          />
                        )
                      )}
                    </div>
                    <span>{review.time}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
