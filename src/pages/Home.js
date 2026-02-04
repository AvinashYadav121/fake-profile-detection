
import { Link } from "react-router-dom";
import NewsSlider from "../components/NewsSlider";


export default function Home() {
  return (
    <div className="w-full ">

       {/* ================= HERO SECTION ================= */}

       
<section
  className="relative min-h-screen w-full flex items-center"
  style={{
    backgroundImage:
      "linear-gradient(rgba(15,42,68,0.5), rgba(15,42,68,0.5)), url('/images/perfect.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed"
  }}
>
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center text-white">

    {/* LEFT CONTENT */}
    <div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        STOP. THINK. VERIFY.
      </h1>

      <p className="text-lg mb-6 max-w-xl">
        Protect yourself from fake profiles, impersonation scams,
        phishing attacks, and online fraud using awareness and
        machine learning.
      </p>

      <div className="flex gap-4">
        <Link
          to="/check"
          className="bg-yellow-400 text-blue-900 px-6 py-3 rounded font-semibold hover:bg-yellow-300"
        >
          Check Profile
        </Link>

        <Link
          to="/quiz"
          className="border border-white px-6 py-3 rounded hover:bg-white hover:text-blue-900"
        >
          Test Awareness
        </Link>
      </div>
    </div>

    

  </div>
</section>




     
{/* ================= TYPES OF SCAMS ================= */}
<section id="learn" className="bg-yellow-50 py-16">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl font-bold mb-10 text-center">
      Common Social Media Scams
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          title: "Fake Profiles",
          image: "/images/fake.png",
          desc: "Accounts created to impersonate real users, brands, or officials."
        },
        {
          title: "Romance Scams",
          image: "/images/romance-scams.png",
          desc: "Scammers build emotional trust to steal money or personal data."
        },
        {
          title: "Impersonation Scams",
          image: "/images/impersonation-scams.png",
          desc: "Fake accounts pretending to be police, banks, or celebrities."
        },
        {
          title: "Giveaway & Investment Scams",
          image: "/images/giveaway-investment-scams.png",
          desc: "Fake offers promising high returns or prizes."
        },
        {
          title: "OTP & Phishing Scams",
          image: "/images/otp-phishing-scams.png",
          desc: "Tricking users into sharing passwords, OTPs, or login links."
        },
        {
          title: "Business Account Fraud",
          image: "/images/business-account-fraud.png",
          desc: "Fake business profiles used to collect payments or sensitive data."
        }
      ].map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
        >
          <img
            src={item.image}
            alt={item.title}
            className="h-44 w-full object-cover"
          />
          <div className="p-5">
            <h3 className="text-xl font-semibold mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ================= PREVENTION TIPS (MODERN) ================= */}
<section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}
    <div className="text-center mb-14">
      <h2 className="text-4xl font-bold mb-3">
        How to Protect Yourself
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Simple steps that can save you from online fraud, fake profiles,
        and emotional manipulation.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-12 items-center">

      {/* LEFT – Tips Cards */}
      <div className="space-y-5">

        {[
          {
            text: "Check profile age, followers, and activity",
            color: "from-green-400 to-emerald-500"
          },
          {
            text: "Be cautious of urgent or threatening messages",
            color: "from-yellow-400 to-amber-500"
          },
          {
            text: "Never share OTPs, passwords, or PINs",
            color: "from-orange-400 to-red-500"
          },
          {
            text: "Verify accounts through official websites",
            color: "from-sky-400 to-blue-500"
          },
          {
            text: "Report suspicious profiles immediately",
            color: "from-rose-400 to-pink-500"
          }
        ].map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 p-5 rounded-xl text-white
            bg-gradient-to-r ${item.color}
            shadow-md hover:shadow-xl transition`}
          >
            <span className="text-2xl">✔️</span>
            <p className="text-lg font-medium">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* RIGHT – Image + Explanation */}
      <div className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-lg">

        <img
          src="/images/why-fake-dangerous.png"
          alt="Why fake profiles are dangerous"
          className="rounded-xl mb-6"
        />

        <h3 className="text-2xl font-semibold mb-3">
          Why Fake Profiles Are Dangerous
        </h3>

        <p className="text-gray-700 leading-relaxed">
          Fake profiles are used to spread misinformation, steal money,
          collect sensitive personal data, and emotionally manipulate
          victims. Many scams start with a simple message.
        </p>

        <div className="mt-4 inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
          Early Detection = Prevent Harm
        </div>
      </div>

    </div>
  </div>
</section>


      {/* ================= NEWS & CASE REPORTS ================= */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <NewsSlider />
          <h2 className="text-3xl font-bold mb-8">
            Real Scam Case Reports
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Instagram impersonation fraud case", image: "/images/fake-pro.webp" },
              { title: "Fake celebrity giveaway scam", image: "/images/giveway.png" },
              { title: "Romance scam via social media", image: "/images/rom.png" },
              { title: "Business account fraud on Instagram", image: "/images/busss.png" },
              { title: "Phishing attack using verified-looking profiles", image: "/images/otp-phishing-scams.png" }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded shadow hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-32 w-full object-cover rounded mb-4"
                />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm mt-2 text-gray-600">
                  Based on real online fraud and scam reports.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* ================= QUIZ CTA ================= */}
<section className="relative bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 py-20 overflow-hidden">
  {/* Decorative circles */}
  <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-200 rounded-full opacity-40" />
  <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-yellow-300 rounded-full opacity-30" />

  <div className="relative max-w-7xl mx-auto px-6">
    <div className="bg-white/70 backdrop-blur rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
      
      {/* Text */}
      <div className="max-w-xl">
        <span className="inline-block mb-3 px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">
          Scam Awareness Quiz
        </span>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Test Your Scam Awareness
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed">
          See how well you can spot scams. Learn common tricks used by scammers
          and what to do to protect yourself and your family.
        </p>

        <p className="mt-3 text-sm text-gray-600 flex items-center gap-2">
          ⏱ Takes about 4 minutes · 📱 Mobile friendly
        </p>
      </div>

      {/* CTA Button */}
      <div className="flex flex-col items-center">
        <Link
          to="/quiz"
          className="group bg-blue-800 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-md hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
        >
          Start Quiz →
        </Link>

        <p className="mt-3 text-sm text-gray-600">
          No sign-up required
        </p>
      </div>
    </div>
  </div>
</section>

   
      {/* ================= SCAM STATISTICS & INSIGHTS ================= */}
<section className="py-20 bg-slate-900 text-white">
  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-4xl font-bold mb-4 text-center">
      Scam Statistics & Insights
    </h2>
    <p className="text-center text-gray-300 max-w-3xl mx-auto mb-14">
      Real-world data shows how social media scams impact people globally
      and why awareness is the strongest defence.
    </p>

    {/* ================= TOP STATS ================= */}
    <div className="grid md:grid-cols-4 gap-6 mb-16">
      {[
        { label: "Reported Cybercrime Cases (India – 2023)", value: "86,000+" },
        { label: "Money Lost Globally (Annual)", value: "$10+ Billion" },
        { label: "Most Used Scam Platform", value: "WhatsApp & Instagram" },
        { label: "Fastest Growing Scam", value: "Investment & Impersonation" }
      ].map((item, i) => (
        <div
          key={i}
          className="bg-slate-800 rounded-xl p-6 text-center shadow-lg"
        >
          <div className="text-3xl font-bold text-yellow-400 mb-2">
            {item.value}
          </div>
          <p className="text-sm text-gray-300">
            {item.label}
          </p>
        </div>
      ))}
    </div>

    {/* ================= SCAM TYPES ================= */}
    <div className="grid md:grid-cols-2 gap-10 mb-16">
      <div>
        <h3 className="text-2xl font-semibold mb-4">
          Most Common Scam Types
        </h3>
        <ul className="space-y-3 text-lg text-gray-300">
          <li>• Fake profile & impersonation scams</li>
          <li>• Investment & crypto fraud</li>
          <li>• Romance & emotional manipulation scams</li>
          <li>• Job & work-from-home scams</li>
          <li>• OTP, phishing & account takeover</li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4">
          Platforms Most Targeted
        </h3>
        <ul className="space-y-3 text-lg text-gray-300">
          <li>• WhatsApp – fake messages & OTP scams</li>
          <li>• Instagram – fake profiles & investments</li>
          <li>• Facebook – romance & marketplace scams</li>
          <li>• Telegram – trading & crypto fraud</li>
        </ul>
      </div>
    </div>

    {/* ================= WHO IS TARGETED ================= */}
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {[
        {
          title: "Age Groups",
          points: [
            "18–35: Job & investment scams",
            "30–50: Business & impersonation",
            "50+: OTP & authority scams"
          ]
        },
        {
          title: "Gender",
          points: [
            "Men: Investment & crypto scams",
            "Women: Romance & impersonation scams",
            "All genders targeted equally"
          ]
        },
        {
          title: "How Victims Are Trapped",
          points: [
            "Urgency & fear tactics",
            "Trust-building conversations",
            "Fake screenshots & proofs"
          ]
        }
      ].map((box, i) => (
        <div
          key={i}
          className="bg-slate-800 rounded-xl p-6 shadow"
        >
          <h4 className="text-xl font-semibold mb-3 text-yellow-400">
            {box.title}
          </h4>
          <ul className="text-gray-300 space-y-2 text-sm">
            {box.points.map((p, idx) => (
              <li key={idx}>• {p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* ================= DISCLAIMER ================= */}
    <p className="text-center text-xs text-gray-400 max-w-4xl mx-auto">
      Statistics are based on public reports from NCRB, cybersecurity agencies,
      global fraud studies, and media investigations. Values are approximate
      and shown for awareness and educational purposes.
    </p>

  </div>
</section>


    </div>
  );
}
