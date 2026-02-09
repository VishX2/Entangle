import profileImg from "../../assets/investor-profile/investor1.jpg";
import coverImg from "../../assets/investor-profile/cover.jpg";

export default function EditInvestorProfileHeader() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow">
      <div
        className="h-52 bg-cover bg-center"
        style={{ backgroundImage: `url(${coverImg})` }}
      />

      <div className="p-6 relative">
        <img
          src={profileImg}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white absolute -top-12 left-6"
        />

        <div className="ml-32">
          <h2 className="text-xl font-semibold">Marcus Reynolds</h2>
        </div>
      </div>
    </div>
  );
}
