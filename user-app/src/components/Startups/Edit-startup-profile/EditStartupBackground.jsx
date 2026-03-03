import { useState } from "react";
import { Briefcase, Plus, ChevronDown } from "lucide-react";

export default function EditStartupBackground() {
  const [summary, setSummary] = useState(
    "Former CTO at TechVenture Inc. with a successful exit in 2018. Built and scaled engineering teams across multiple investors. Deep expertise in enterprise SaaS, payment infrastructure, and AI applications."
  );

  const [years, setYears] = useState(15);
  const [investmentsMade, setInvestmentsMade] = useState(42);

  const [expertise, setExpertise] = useState([
    "Product Strategy",
    "Technical Due Diligence",
    "GTM Strategy",
    "Fundraising",
  ]);

  const [newExpertise, setNewExpertise] = useState("");

  const [previousInvestments, setPreviousInvestments] = useState([
    { name: "TechFlow AI", status: "Active" },
    { name: "PaymentHub", status: "Exited" },
    { name: "GreenEnergy Solutions", status: "Active" },
    { name: "DataSync Pro", status: "Active" },
  ]);

  const [newInvestment, setNewInvestment] = useState("");

  /* EXPERTISE FUNCTIONS */

  const addExpertise = () => {
    if (newExpertise && !expertise.includes(newExpertise)) {
      setExpertise([...expertise, newExpertise]);
      setNewExpertise("");
    }
  };

  const removeExpertise = (item) => {
    setExpertise(expertise.filter((e) => e !== item));
  };

  /* INVESTMENT FUNCTIONS */

  const addInvestment = () => {
    if (newInvestment) {
      setPreviousInvestments([
        ...previousInvestments,
        { name: newInvestment, status: "Active" },
      ]);
      setNewInvestment("");
    }
  };

  const updateStatus = (index, status) => {
    const updated = [...previousInvestments];
    updated[index].status = status;
    setPreviousInvestments(updated);
  };

  const removeInvestment = (index) => {
    setPreviousInvestments(
      previousInvestments.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-6">
        <Briefcase className="text-orange-500" size={20} />
        <h3 className="font-semibold text-slate-900">
          Background & Experience
        </h3>
      </div>

      <div className="space-y-6">

        {/* SUMMARY */}
        <div>
          <h4 className="text-sm font-medium text-slate-700 mb-2">
            Experience Summary
          </h4>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full bg-slate-100 rounded-xl p-4 text-sm resize-none"
            rows="4"
          />
          <div className="text-right text-xs text-slate-400 mt-1">
            {summary.length}/500
          </div>
        </div>

        {/* NUMBERS */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-2">
              Years of Experience
            </h4>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full bg-slate-100 rounded-xl px-4 py-3 text-sm"
            />
          </div>

          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-2">
              Investments Made
            </h4>
            <input
              type="number"
              value={investmentsMade}
              onChange={(e) => setInvestmentsMade(e.target.value)}
              className="w-full bg-slate-100 rounded-xl px-4 py-3 text-sm"
            />
          </div>
        </div>

        {/* EXPERTISE */}
        <div>
          <h4 className="text-sm font-medium text-slate-700 mb-3">
            Areas of Expertise
          </h4>

          <div className="flex flex-wrap gap-2 mb-3">
            {expertise.map((item, index) => (
              <span
                key={index}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-sm"
              >
                {item}
                <button
                  onClick={() => removeExpertise(item)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newExpertise}
              onChange={(e) => setNewExpertise(e.target.value)}
              placeholder="Add expertise..."
              className="flex-1 bg-slate-100 rounded-xl px-4 py-3 text-sm"
            />
            <button
              onClick={addExpertise}
              className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center hover:bg-slate-300"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* PREVIOUS INVESTMENTS */}
        <div>
          <h4 className="text-sm font-medium text-slate-700 mb-3">
            Previous Investments
          </h4>

          <div className="space-y-2">
            {previousInvestments.map((inv, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-slate-100 rounded-xl px-4 py-3"
              >
                <span className="text-sm text-slate-800">
                  {inv.name}
                </span>

                <div className="flex items-center gap-3">
                  <select
                    value={inv.status}
                    onChange={(e) =>
                      updateStatus(index, e.target.value)
                    }
                    className="text-sm bg-transparent"
                  >
                    <option>Active</option>
                    <option>Exited</option>
                  </select>

                  <button
                    onClick={() => removeInvestment(index)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ADD NEW INVESTMENT */}
          <div className="flex gap-2 mt-3">
            <input
              type="text"
              value={newInvestment}
              onChange={(e) => setNewInvestment(e.target.value)}
              placeholder="Add investment..."
              className="flex-1 bg-slate-100 rounded-xl px-4 py-3 text-sm"
            />
            <button
              onClick={addInvestment}
              className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center hover:bg-slate-300"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
