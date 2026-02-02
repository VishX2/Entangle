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

      {/* TRUST GRID */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <TrustCard
            icon={ShieldCheck}
            title="Responsible Use License"
            subtitle="Mandatory for all investors"
            highlight="License required"
          >
            Investors must explicitly accept a license agreement before
            accessing startup data. Responsibility for how information is
            accessed and used lies with the user.
          </TrustCard>

          <TrustCard
            icon={EyeOff}
            title="Private Data Controls"
            subtitle="Founder-controlled visibility"
            highlight="Private by default"
          >
            Sensitive startup details can be marked as private and are visible
            only to verified investors who meet trust and compliance
            requirements.
          </TrustCard>

          <TrustCard
            icon={Lock}
            title="IP Exposure Prevention"
            subtitle="Designed to protect ideas"
            highlight="IP protected"
          >
            The system limits copying, exporting, and unintended exposure of
            intellectual property. Startups retain full ownership at all times.
          </TrustCard>

          <TrustCard
            icon={Gavel}
            title="Active Enforcement"
            subtitle="Admin oversight enabled"
            highlight="Monitored"
          >
            Misuse is actively monitored. Administrators may restrict access,
            suspend accounts, or take enforcement action against policy
            violations.
          </TrustCard>
        </div>
      </section>