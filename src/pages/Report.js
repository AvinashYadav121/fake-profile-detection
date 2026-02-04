import { useState } from "react";

export default function Report() {
  const [profile, setProfile] = useState({
    platform: "",
    username: "",
    followers: "",
    following: "",
    hasPhoto: "",
    privateAcc: ""
  });

  const [checked, setChecked] = useState(false);
  const [risk, setRisk] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  /* =========================
     DEMO CHECK LOGIC (Frontend)
     (Replace with ML API later)
  ========================= */
  const handleCheck = () => {
    if (!profile.username || !profile.platform) {
      alert("Please fill platform and username");
      return;
    }

    let score = 0;

    if (Number(profile.followers) < 50) score++;
    if (Number(profile.following) > 1000) score++;
    if (profile.hasPhoto === "no") score++;
    if (profile.privateAcc === "yes") score++;

    let result = "Low Risk";
    if (score >= 3) result = "High Risk";
    else if (score === 2) result = "Medium Risk";

    setRisk(result);
    setChecked(true);
  };

  const handleReport = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-5xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <h2 className="text-4xl font-bold mb-4">
          Check & Report Suspicious Profiles
        </h2>
        <p className="text-gray-600 max-w-3xl mb-10">
          Enter profile details to assess risk. If the profile looks suspicious,
          you can report it or submit feedback.
        </p>

        {/* ================= PROFILE FORM ================= */}
        {!checked && (
          <section className="bg-white rounded-xl shadow p-8 mb-10">
            <h3 className="text-2xl font-semibold mb-6">
              🔍 Profile Details
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <select
                className="border p-2 rounded"
                onChange={e => handleChange("platform", e.target.value)}
              >
                <option value="">Select Platform</option>
                <option>Instagram</option>
                <option>Facebook</option>
                <option>Twitter / X</option>
                <option>LinkedIn</option>
              </select>

              <input
                className="border p-2 rounded"
                placeholder="Username / Profile URL"
                onChange={e => handleChange("username", e.target.value)}
              />

              <input
                type="number"
                className="border p-2 rounded"
                placeholder="Followers Count"
                onChange={e => handleChange("followers", e.target.value)}
              />

              <input
                type="number"
                className="border p-2 rounded"
                placeholder="Following Count"
                onChange={e => handleChange("following", e.target.value)}
              />

              <select
                className="border p-2 rounded"
                onChange={e => handleChange("hasPhoto", e.target.value)}
              >
                <option value="">Profile Picture?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              <select
                className="border p-2 rounded"
                onChange={e => handleChange("privateAcc", e.target.value)}
              >
                <option value="">Private Account?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <button
              onClick={handleCheck}
              className="mt-6 bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Check Profile Risk
            </button>
          </section>
        )}

        {/* ================= RESULT ================= */}
        {checked && !submitted && (
          <section className="bg-white rounded-xl shadow p-8 mb-10">
            <h3 className="text-2xl font-semibold mb-4">
              🧠 Risk Assessment Result
            </h3>

            <div
              className={`p-6 rounded text-lg font-semibold ${
                risk === "High Risk"
                  ? "bg-red-100 text-red-800"
                  : risk === "Medium Risk"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {risk}
            </div>

            <p className="mt-4 text-gray-700">
              {risk === "High Risk" &&
                "This profile shows multiple red flags commonly seen in scam accounts."}
              {risk === "Medium Risk" &&
                "This profile has some suspicious indicators. Proceed with caution."}
              {risk === "Low Risk" &&
                "This profile does not show strong scam indicators based on provided details."}
            </p>

            <div className="flex gap-4 mt-6">
              {risk !== "Low Risk" && (
                <button
                  onClick={handleReport}
                  className="bg-red-600 text-white px-5 py-2 rounded"
                >
                  Report Profile
                </button>
              )}

              <button
                onClick={() => setSubmitted(true)}
                className="bg-gray-600 text-white px-5 py-2 rounded"
              >
                Send Feedback
              </button>
            </div>
          </section>
        )}

        {/* ================= THANK YOU ================= */}
        {submitted && (
          <section className="bg-green-100 rounded-xl p-8 text-green-800">
            ✅ Thank you for your input.  
            Your feedback helps improve scam awareness and detection systems.
          </section>
        )}

        {/* ================= DISCLAIMER ================= */}
        <p className="text-sm text-gray-500 mt-6">
          This tool provides a preliminary risk assessment for awareness purposes.
          Always report serious scams using official platform or government channels.
        </p>

      </div>
    </div>
  );
}
