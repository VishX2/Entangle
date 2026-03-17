import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function EntrepreneurProfile() {
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState(true);
  const [messages, setMessages] = useState(true);

  return (
    <div className="min-h-screen bg-[#f3f4f6] px-8 py-8">
      <div className="max-w-[1400px] mx-auto space-y-8">

        {/*  HEADER  */}
        {/* ================= HEADER ================= */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition">


          <div
            className="h-56 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1506744038136-46273834b3fb)",
            }}
          />

          <div className="px-10 pb-10">

            <div className="-mt-24 relative w-fit group">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                className="w-44 h-44 rounded-full border-4 border-white object-cover shadow-md group-hover:scale-105 transition"
              />
              <div className="absolute bottom-5 right-5 bg-blue-500 p-2 rounded-full shadow">
                <CheckIcon />
              </div>
            </div>

            <div className="mt-6 flex justify-between flex-wrap gap-8">

              <div>
                <div className="flex items-center gap-4 flex-wrap">
                  <h1 className="text-3xl font-semibold text-slate-900">
                    Elena Martinez
                  </h1>

                  <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-medium">
                    FOUNDER
                  </span>
                </div>

                <div className="mt-2 text-sm text-slate-500 flex gap-5 flex-wrap">
                  <span>San Francisco, California</span>
                  <span>elena@martinez.vc</span>
                  <span>Joined 2019</span>
                </div>

                <p className="mt-4 text-sm text-slate-600 max-w-2xl">
                  Backing visionary founders building the future of work,
                  AI, and sustainable technology.
                </p>
                {/*  SOCIAL MEDIA  */}
                <div className="flex gap-3 mt-5">

                  <SocialIcon>
                    <LinkedInIcon />
                  </SocialIcon>

                  <SocialIcon>
                    <XIcon />
                  </SocialIcon>

                  <SocialIcon>
                    <GlobeIcon />
                  </SocialIcon>

                  <SocialIcon>
                    <MailIcon />
                  </SocialIcon>

                </div>


                <div className="flex gap-14 mt-7 text-sm">
                  <Stat value="2.5K" label="Connections" />
                  <Stat value="12.8K" label="Followers" />
                  <Stat value="847" label="Posts" />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/entrepreneur/profile/edit")}
                  className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition"
                >
                  Edit Profile
                </button>

                <button className="border border-slate-300 px-6 py-2.5 rounded-full text-sm hover:bg-slate-100 transition">
                  Public Profile
                </button>

                <button className="bg-orange-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-orange-600 transition">
                  AI Suggestions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*  MAIN GRID  */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="xl:col-span-2 space-y-8">

            {/* Verification */}
        
    <div className="bg-white rounded-2xl p-6 border border-slate-100">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <ShieldIcon />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">
            Verification & Trust
          </h3>
        </div>

        <div className="text-sm text-slate-500">
          Trust Score{" "}
          <span className="text-blue-600 font-semibold ml-1">92%</span>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-5">
        <div className="h-full w-[92%] bg-orange-500 rounded-full" />
      </div>

      {/* VERIFICATION ITEMS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VerifyItem icon={<IdIcon />} label="Identity Verified" />
        <VerifyItem icon={<MailIcon />} label="Email Verified" />
        <VerifyItem icon={<BadgeIcon />} label="Platform Trust Badge" />
        <VerifyItem icon={<DocIcon />} label="License Agreement" />
      </div>

      {/* FOOTER */}
      <div className="mt-5 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-blue-600">
          <CheckCircleIcon />
          Fully Verified Investor
        </div>

        <div className="text-slate-400 text-xs">
          4/4 complete
        </div>
      </div>
    </div>

    {/* Investment History */}
        <Card title="Investment History">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatBox value="47" label="Total Investments" />
                <StatBox value="23" label="Active" />
                <StatBox value="18" label="Exited" />
                <StatBox value="$125K" label="Avg. Investment" />
              </div>

          <h3 className="text-sm font-medium mb-4">Success Stories</h3>

              <Success />
              <Success />
            </Card>
            {/*  BACKGROUND & EXPERIENCE  */}
        <Card
           title={
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center">
                  <DocIcon />
                </div>
                <span>Background & Experience</span>
              </div>
            }
          >
            <div className="bg-slate-50 rounded-xl p-6 text-sm text-slate-600 leading-relaxed">
              Seasoned investor with over 15 years of experience in technology and venture capital.
              Passionate about supporting innovative founders building solutions for real-world problems.
              Former CTO of a Fortune 500 company with deep expertise in scaling startups.
            </div>

            {/* Stats */}
            <div className="bg-orange-50 rounded-xl p-6 flex gap-12 mt-6">
              <div>
                <div className="text-2xl font-bold text-orange-600">15+</div>
                <div className="text-xs text-slate-500">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">50+</div>
                <div className="text-xs text-slate-500">Investments Made</div>
              </div>
            </div>

            {/* Areas of Expertise */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Areas of Expertise</h4>
              <div className="flex flex-wrap gap-3">
                {["Mentorship", "Strategy", "Marketing", "Technology", "Operations"].map((tag) => (
                  <span
                    key={tag}
                    className="bg-slate-100 text-sm px-4 py-2 rounded-full hover:bg-orange-100 transition"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Previous Investments */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-4">Previous Investments</h4>

              {[
                { name: "TechFlow AI", year: "2023", status: "Active" },
                { name: "GreenGrid Energy", year: "2022", status: "Exited" },
                { name: "HealthSync", year: "2021", status: "Active" },
                { name: "EduLearn Pro", year: "2020", status: "Exited" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between items-center bg-slate-50 rounded-xl p-4 mb-3 hover:bg-orange-50 transition"
                >
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.year}</p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      item.status === "Active"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>


            {/*  RATINGS & FEEDBACK  */}
            <Card
              title={
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-yellow-50 flex items-center justify-center">
                    <StarIcon />
                  </div>
                  <span>Ratings & Feedback</span>
                </div>
              }
              right={
                <button className="text-sm text-slate-400 hover:text-slate-600 flex items-center gap-1 transition">
                  View All
                  <ChevronRightIcon />
                </button>
              }
            >
              {/* SUMMARY */}
              <div className="bg-[#fdf6dc] rounded-xl p-6 flex justify-between items-center mb-6">
                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-4xl font-bold text-yellow-500">
                      4.9
                    </div>
                    <Stars count={5} />
                    <p className="text-xs text-slate-400 mt-1">
                      124 reviews
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
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

                <span className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
                  Top Rated
                </span>
              </div>
              {/*  RECENT REVIEWS  */}

            <div className="mt-6">

              <div className="flex items-center gap-2 mb-4 text-sm text-slate-600">
                <MessageIcon />
                <span className="font-medium">Recent Reviews</span>
              </div>

              <ReviewCard
                initials="SC"
                name="Sarah Chen"
                company="TechFlow AI"
                time="2 weeks ago"
                text="Incredibly responsive and provided valuable strategic guidance beyond just capital."
                color="bg-orange-100 text-orange-600"
              />

              <ReviewCard
                initials="MJ"
                name="Marcus Johnson"
                company="GreenGrid"
                time="1 month ago"
                text="Professional approach and deep industry knowledge. Highly recommend!"
                color="bg-rose-100 text-rose-600"
              />

              <ReviewCard
                initials="EW"
                name="Emma Williams"
                company="HealthSync"
                time="2 months ago"
                text="Great mentor, always available for quick calls when needed."
                color="bg-pink-100 text-pink-600"
              />

            </div>


              {/* Reviews */}
              <ReviewCard
                initials="SC"
                name="Sarah Chen"
                company="TechFlow AI"
                time="2 weeks ago"
                text="Incredibly responsive and provided valuable strategic guidance beyond just capital."
                color="bg-orange-100 text-orange-600"
              />
              <ReviewCard
                initials="MJ"
                name="Marcus Johnson"
                company="GreenGrid"
                time="1 month ago"
                text="Professional approach and deep industry knowledge."
                color="bg-rose-100 text-rose-600"
              />
            </Card>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">

      <Card>
       
          <div className="flex items-center gap-3">
           
            <span className="text-lg font-semibold text-slate-900">
              Connect & Interact
            </span>
          </div>
        
        <div className="grid grid-cols-2 gap-6 mt-4">

          {/* Connect */}
          <button className="bg-orange-500 text-white py-2 rounded-3xl text-sm font-semibold hover:bg-orange-600 transition shadow-sm">
            Connect
          </button>

          {/* Pitch Startup */}
          <button className="bg-orange-500 text-white py-2 rounded-3xl text-sm font-semibold hover:bg-orange-600 transition shadow-sm">
            Pitch Startup
          </button>

          {/* Message */}
          <button className="border-2 border-slate-300 text-slate-700 py-2 rounded-3xl text-sm font-semibold hover:bg-slate-100 transition">
            Message
          </button>

          {/* Meeting */}
          <button className="bg-slate-200 text-slate-400 py-1 rounded-3xl text-sm font-semibold cursor-not-allowed">
            Meeting
          </button>

        </div>
        
        </Card>

            {/*  AI TOOLS & INSIGHTS  */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                  ✨
                </div>
                <span>AI Tools & Insights</span>
              </div>
            }
          >
            {/* Profile Completeness */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Profile Completeness</span>
                <span className="text-orange-500 font-semibold">85%</span>
              </div>
              <ProgressBar percent={85} />
              <ul className="mt-4 text-sm text-slate-600 space-y-2">
                <li>• Add more expertise tags</li>
                <li>• Update investment range</li>
                <li>• Add recent exits</li>
              </ul>
            </div>

            {/* AI Match Insights */}
            <div className="bg-slate-50 rounded-xl p-4 text-sm mb-4">
              <p className="font-medium mb-2">AI Match Insights</p>
              <ul className="space-y-2 text-slate-600">
                <li>✔ Strong match with AI startups</li>
                <li>✔ Consider expanding to Series B</li>
                <li>✔ FinTech expertise in high demand</li>
              </ul>
            </div>

            {/* Privacy Alert */}
            <div className="bg-orange-50 text-sm p-4 rounded-xl mb-4">
              <p className="font-medium text-orange-600">Privacy Alert</p>
              <p className="text-slate-600 mt-1">
                Consider hiding specific investment amounts in public view.
              </p>
            </div>

            <button className="w-full bg-orange-500 text-white py-3 rounded-xl mb-3 hover:bg-orange-600 transition">
              Run AI Profile Check →
            </button>

            <button className="w-full border border-slate-300 py-3 rounded-xl hover:bg-slate-100 transition">
              Improve My Profile with AI
            </button>
            </Card>
                  <Card
                    title={
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                            <BellIcon />
                          </div>
                          <span className="text-sm font-semibold text-slate-800">
                            Notifications
                          </span>
                        </div>

                        <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                          4 new
                        </span>
                      </div>
                    }
                  >

                    <div className="space-y-4">

                      {/* Notification Item */}
                      <div className="bg-slate-50 rounded-xl p-4 hover:bg-orange-50 transition cursor-pointer">
                        <p className="text-sm font-medium text-slate-800">
                          New Pitch Request
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          CleanTech Innovations wants to pitch their Series A
                        </p>
                        <p className="text-xs text-slate-400 mt-2">
                          2 hours ago
                        </p>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4 hover:bg-orange-50 transition cursor-pointer">
                        <p className="text-sm font-medium text-slate-800">
                          New Message
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Sarah Chen sent you a follow-up message
                        </p>
                        <p className="text-xs text-slate-400 mt-2">
                          5 hours ago
                        </p>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4 hover:bg-orange-50 transition cursor-pointer">
                        <p className="text-sm font-medium text-slate-800">
                          Connection Request
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Michael Torres wants to connect
                        </p>
                        <p className="text-xs text-slate-400 mt-2">
                          1 day ago
                        </p>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4 hover:bg-orange-50 transition cursor-pointer">
                        <p className="text-sm font-medium text-slate-800">
                          New Review
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          You received a 5-star review from HealthSync
                        </p>
                        <p className="text-xs text-slate-400 mt-2">
                          2 days ago
                        </p>
                      </div>

                    </div>

                    {/* View All */}
                    <div className="mt-5 text-center">
                      <button className="text-sm text-slate-500 hover:text-slate-700 transition">
                        View All Notifications →
                      </button>
                    </div>

                  </Card>

            <Card
            title={
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                    <ShieldIcon />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    Privacy & Settings
                  </span>
                </div>

                <button className="text-sm text-slate-400 hover:text-slate-600 transition">
                  Manage
                </button>
              </div>
            }
          >

            <div className="space-y-4">

              {/* Profile Visibility */}
              <SettingRow
                icon={<EyeIcon />}
                title="Profile Visibility"
                desc="Make your profile visible to startups"
                enabled={visibility}
                setEnabled={setVisibility}
              />

              {/* Hide Investment Amounts */}
              <SettingRow
                icon={<DollarIcon />}
                title="Hide Investment Amounts"
                desc="Hide specific investment figures"
                enabled={false}
                setEnabled={() => {}}
              />

              {/* Allow Messages */}
              <SettingRow
                icon={<MessageIcon />}
                title="Allow Messages"
                desc="Receive direct messages from startups"
                enabled={messages}
                setEnabled={setMessages}
              />

              {/* Accept Pitch Requests */}
              <SettingRow
                icon={<EditIcon />}
                title="Accept Pitch Requests"
                desc="Allow startups to send pitch requests"
                enabled={true}
                setEnabled={() => {}}
              />
            </div>
          </Card>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

/* ================= COMPONENTS ================= */

function Card({ title, right, children }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm font-semibold text-slate-800">{title}</div>
        {right}
      </div>
      {children}
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="font-semibold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}

function StatBox({ value, label }) {
  return (
    <div className="bg-slate-100 rounded-xl p-6 text-center hover:shadow-md transition">
      <div className="text-xl font-semibold">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}

function ProgressBar({ percent }) {
  return (
    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-orange-500 rounded-full transition-all duration-700"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

function Verify({ text }) {
  return (
    <div className="bg-slate-100 rounded-xl p-4 text-sm hover:bg-orange-50 transition">
      {text}
    </div>
  );
}

function Success() {
  return (
    <div className="bg-orange-50 rounded-xl p-5 flex justify-between items-center mb-4 hover:shadow transition">
      <div>
        <p className="text-sm font-medium">TechFlow AI</p>
        <p className="text-xs text-slate-500">
          Led seed round, valued at $50M
        </p>
      </div>
      <span className="bg-blue-100 text-blue-600 px-3 py-1 text-xs rounded-full">
        +340%
      </span>
    </div>
  );
}

function Notification({ text }) {
  return (
    <div className="bg-slate-100 rounded-xl p-4 mb-3 hover:bg-orange-50 transition cursor-pointer">
      {text}
    </div>
  );
}

function ToggleRow({ label, enabled, setEnabled }) {
  return (
    <div className="flex justify-between items-center bg-slate-100 rounded-xl p-4 mb-3">
      <span className="text-sm">{label}</span>
      <div
        onClick={() => setEnabled(!enabled)}
        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition ${
          enabled ? "bg-slate-900" : "bg-slate-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transition ${
            enabled ? "translate-x-6" : ""
          }`}
        />
      </div>
    </div>
  );
}
function MessageIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"
        stroke="#64748b"
        strokeWidth="2"
      />
    </svg>
  );
}

function ReviewCard({ initials, name, company, time, text, color }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 mb-3 hover:bg-slate-100 transition">
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold ${color}`}>
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">
              {name}
              <span className="text-xs text-slate-400 ml-1">
                from {company}
              </span>
            </p>
            <Stars count={5} small />
          </div>
        </div>
        <span className="text-xs text-slate-400">{time}</span>
      </div>
      <p className="text-sm text-slate-600">{text}</p>
    </div>
  );
}
function SettingRow({ icon, title, desc, enabled, setEnabled }) {
  return (
    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl hover:bg-slate-100 transition">

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
          {icon}
        </div>

        <div>
          <p className="text-sm font-medium text-slate-800">
            {title}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {desc}
          </p>
        </div>
      </div>

      {/* Toggle */}
      <div
        onClick={() => setEnabled(!enabled)}
        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition ${
          enabled ? "bg-slate-900" : "bg-slate-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transition ${
            enabled ? "translate-x-6" : ""
          }`}
        />
      </div>

    </div>
  );
}



/* ================= ICONS ================= */

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#facc15">
      <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke="#94a3b8" strokeWidth="2" />
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

function Stars({ count, small }) {
  return (
    <div className={`flex gap-0.5 ${small ? "mt-0.5" : "mt-1"}`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width={small ? 12 : 14}
          height={small ? 12 : 14}
          viewBox="0 0 24 24"
          fill={i < count ? "#facc15" : "none"}
          stroke="#facc15"
          strokeWidth="2"
        >
          <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
        </svg>
      ))}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" fill="none" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7"
        stroke="#64748b"
        strokeWidth="2"
      />
      <circle cx="12" cy="20" r="1.5" fill="#64748b" />
    </svg>
  );
}

/* ================= VERIFICATION COMPONENTS ================= */

function VerifyItem({ icon, label }) {
  return (
    <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 hover:bg-blue-50 transition">
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm">
        {icon}
      </div>
      <span className="text-sm text-slate-700 font-medium">
        {label}
      </span>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"
        stroke="#3b82f6"
        strokeWidth="2"
        fill="#eff6ff"
      />
    </svg>
  );
}

function IdIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="8" cy="12" r="2" fill="#3b82f6"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="#3b82f6" strokeWidth="2"/>
      <path d="M3 7l9 6 9-6" stroke="#3b82f6" strokeWidth="2"/>
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="#3b82f6" strokeWidth="2"/>
      <path d="M8 14l-2 6 6-3 6 3-2-6" stroke="#3b82f6" strokeWidth="2"/>
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M6 2h9l5 5v15H6z" stroke="#3b82f6" strokeWidth="2"/>
      <path d="M14 2v6h6" stroke="#3b82f6" strokeWidth="2"/>
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#10b981" strokeWidth="2"/>
      <path d="M8 12l2 2 4-4" stroke="#10b981" strokeWidth="2"/>
    </svg>
  );
}
function SocialIcon({ children }) {
  return (
    <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-500 transition cursor-pointer">
      {children}
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 3a2 2 0 100 4 2 2 0 000-4zM3 8h2v13H3zM8 8h2v2h.03c.28-.53.97-1.09 2-1.09 2.14 0 2.53 1.41 2.53 3.24V21h-2v-6.63c0-1.58-.03-3.62-2.2-3.62-2.2 0-2.54 1.72-2.54 3.5V21H8z"/>
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9-8-11h6l4 6 6-6z"/>
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9"/>
      <path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18"/>
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M1 12s4-6 11-6 11 6 11 6-4 6-11 6-11-6-11-6z"
        stroke="#64748b" strokeWidth="2"/>
      <circle cx="12" cy="12" r="3"
        stroke="#64748b" strokeWidth="2"/>
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2v20M17 7c0-2-2-3-5-3s-5 1-5 3 2 3 5 3 5 1 5 3-2 3-5 3-5-1-5-3"
        stroke="#64748b" strokeWidth="2"/>
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M4 20h4l10-10-4-4L4 16v4z"
        stroke="#64748b" strokeWidth="2"/>
    </svg>
  );
}



