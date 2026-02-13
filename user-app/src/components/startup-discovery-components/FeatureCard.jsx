export default function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-200 mt-2">{desc}</p>
    </div>
  );
}
