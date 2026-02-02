import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";

export default function EditStartupProfile() {
  const [form, setForm] = useState({
    name: "Your Startup",
    email: "founder@startup.com",
    location: "San Francisco, USA",
    description: "",
    stage: "Seed",
    seeking: "$250K",
    equity: "10%",
    thesis: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="min-h-screen px-10 py-8 space-y-10"
      style={{ backgroundColor: "#F5F1E3" }}
    ></div>