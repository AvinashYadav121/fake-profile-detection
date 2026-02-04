export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white mt-1">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        <div>
          <h3 className="font-bold text-lg mb-2">Fake Profile Watch</h3>
          <p className="text-sm">
            An awareness and machine learning based system to identify fake
            social media profiles and prevent online fraud.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>Check Profile</li>
            <li>Awareness Quiz</li>
            <li>Scam News</li>
            <li>Report Fraud</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Disclaimer</h4>
          <p className="text-sm">
            This project is for educational and awareness purposes only.
            Predictions are based on machine learning models and should not be
            treated as legal advice.
          </p>
        </div>

      </div>

      <div className="bg-blue-900 text-center py-3 text-sm">
        © 2026 Fake Profile Detection Project
      </div>
    </footer>
  );
}
