export default function Awareness() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Fake Profile Awareness & Safety
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Fake profiles are commonly used for scams, identity theft,
            misinformation, and financial fraud. This page helps you understand
            how to identify, avoid, and report suspicious accounts.
          </p>
        </div>

        {/* ================= SIGNS ================= */}
        <section className="bg-white rounded-xl shadow p-8 mb-10">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            🚩 Common Signs of Fake Profiles
          </h3>

          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <ul className="space-y-2">
              <li>• Very few posts but thousands of followers</li>
              <li>• No profile picture or stolen images</li>
              <li>• Usernames with random numbers</li>
            </ul>
            <ul className="space-y-2">
              <li>• Recently created accounts</li>
              <li>• Copied or generic bio descriptions</li>
              <li>• High following with low engagement</li>
            </ul>
          </div>
        </section>

        {/* ================= SCAMS ================= */}
        <section className="bg-white rounded-xl shadow p-8 mb-10">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            💰 Common Online Scams Using Fake Profiles
          </h3>

          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <ul className="space-y-2">
              <li>• Romance scams (fake relationships)</li>
              <li>• Investment & crypto fraud</li>
              <li>• Job offer scams</li>
            </ul>
            <ul className="space-y-2">
              <li>• Fake giveaways & lottery wins</li>
              <li>• Celebrity or brand impersonation</li>
              <li>• Business account fraud</li>
            </ul>
          </div>
        </section>

        {/* ================= PROTECTION ================= */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-10">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            🛡️ How to Protect Yourself
          </h3>

          <div className="grid md:grid-cols-2 gap-4 text-gray-800">
            <ul className="space-y-2">
              <li>✔ Never share OTPs, passwords, or PINs</li>
              <li>✔ Verify profiles before trusting messages</li>
              <li>✔ Avoid clicking suspicious links</li>
            </ul>
            <ul className="space-y-2">
              <li>✔ Enable two-factor authentication (2FA)</li>
              <li>✔ Use platform privacy settings wisely</li>
              <li>✔ Report suspicious activity early</li>
            </ul>
          </div>
        </section>

        {/* ================= REPORTING ================= */}
        <section className="bg-white rounded-xl shadow p-8 mb-10">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            📢 How to Report Fake Profiles
          </h3>

          <p className="text-gray-700 mb-4">
            Reporting fake profiles helps platforms remove scammers and protect
            others. Use the in-app reporting tools:
          </p>

          <ul className="space-y-2 text-gray-700">
            <li>• Instagram → Profile → Report → Fake Account</li>
            <li>• Facebook → Report Profile → Pretending to be someone</li>
            <li>• Twitter/X → Report → Spam or Fake Account</li>
            <li>• LinkedIn → Report → Fake Profile</li>
          </ul>
        </section>

        {/* ================= PROJECT ROLE ================= */}
        <section className="bg-emerald-50 rounded-xl p-8">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            🤖 How This Project Helps
          </h3>

          <p className="text-gray-800 leading-relaxed max-w-4xl">
            This project uses machine learning algorithms to analyze profile
            behaviour, content, and activity patterns to predict whether an
            account is fake or real. It assists individuals, organizations, and
            platforms in identifying suspicious accounts quickly and reducing
            the risk of online fraud.
          </p>
        </section>

      </div>
    </div>
  );
}
