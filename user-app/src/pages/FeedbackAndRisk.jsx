import {
  ShieldCheck,
  Lock,
  EyeOff,
  Gavel,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

export default function FeedbackAndRisk() {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F1E3] px-6 py-12 space-y-16">

      {/* HEADER */}
      <section className="max-w-4xl space-y-4">
        <h1 className="text-3xl font-semibold text-[#2B3443]">
          Safety, Privacy & Legal Protection
        </h1>
        <p className="text-sm text-[#3F5D7D] leading-relaxed">
          This platform is built with strong safeguards to protect founders,
          investors, and intellectual property. Transparency and responsibility
          are enforced by design.
        </p>
      </section>