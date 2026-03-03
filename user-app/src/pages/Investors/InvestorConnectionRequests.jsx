import React from "react";

export default function InvestorConnectionRequest() {
  return (
    <div className="min-h-screen bg-slate-700 flex items-center justify-center">
      {/* Modal */}
      <div className="bg-stone-200 w-[460px] rounded-2xl shadow-xl p-6 relative">
        {/* Close button */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-slate-500 text-white flex items-center justify-center font-semibold text-lg">
            NT
          </div>
          <div>
            <h2 className="font-semibold text-lg text-gray-800">
              NovaTech AI
            </h2>
            <p className="text-sm text-sky-600 font-medium">
              CONNECTION REQUEST
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">
            Send a message to this startup
          </h3>
          <p className="text-sm text-gray-600">
            Introduce yourself and explain why you'd like to connect.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              defaultValue="Alex Morgan"
              className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-400 bg-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Organization */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Organization{" "}
              <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="Venture Capital Inc."
              className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-400 bg-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Message */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              rows="4"
              maxLength="500"
              placeholder="Hi, I'm interested in learning more about your startup..."
              className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-400 bg-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            ></textarea>
            <div className="text-right text-xs text-gray-500">
              0/500
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              className="px-5 py-2 rounded-lg border border-gray-500 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}