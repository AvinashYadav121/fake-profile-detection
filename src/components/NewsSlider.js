import { useState, useEffect } from "react";

const scamNews = [
  {
    headline: "Fake Instagram Profiles Used to Dupe Users of Lakhs",
    image:
      "images/news1.png",
    content:
      "Cybercrime officials warned about fake Instagram accounts impersonating celebrities and influencers. Victims were contacted via direct messages and convinced to transfer money through UPI and digital wallets.",
    source: "Times of India",
    platform: "Instagram",
    link:
      "https://timesofindia.indiatimes.com/city/noida/cyber-fraud-using-fake-instagram-accounts/articleshow/117072652.cms"
  },
  {
    headline: "WhatsApp KYC Message Scam Leaves Thousands Locked Out of Accounts",
    image:
"images/news2.png", 
   content:
      "Fraudsters circulated fake WhatsApp KYC verification messages. Users who clicked malicious links unknowingly shared OTPs, allowing scammers to hijack accounts and message contacts for money.",
    source: "India Today",
    platform: "WhatsApp",
    link:
      "https://www.indiatoday.in/technology/news/story/whatsapp-kyc-scam-fake-messages-warning-2498245-2024-01-25"
  },
  {
    headline: "Romance Scams on Facebook and Instagram Drain Victims’ Savings",
    image:
"images/news22.png",    content:
      "Scammers posed as professionals on social media platforms and dating apps. After gaining trust, they fabricated emergencies and convinced victims to send large sums of money.",
    source: "The Indian Express",
    platform: "Facebook / Instagram",
    link:
      "https://indianexpress.com/article/india/romance-scam-social-media-cybercrime-8849165/"
  },
  {
    headline: "Telegram Investment Groups Expose Users to Crypto Frauds",
    image:
      "images/news4.png",
    content:
      "Fake trading groups on Telegram promised guaranteed crypto profits. Users were shown fake dashboards and profit screenshots before the groups vanished with their investments.",
    source: "Economic Times",
    platform: "Telegram",
    link:
      "https://economictimes.indiatimes.com/tech/technology/telegram-crypto-scam-india/articleshow/100985947.cms"
  }
];

export default function ScamNewsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % scamNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused]);

  const prev = () =>
    setIndex((prev) => (prev - 1 + scamNews.length) % scamNews.length);

  const next = () =>
    setIndex((prev) => (prev + 1) % scamNews.length);

  const news = scamNews[index];

  return (
    <section
      className="bg-gray-100 py-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Social Media Scam News & Headlines
        </h2>

        <img
          src={news.image}
          alt={news.headline}
          onError={(e) => (e.target.src = "/images/news/fallback.jpg")}
          className="w-full h-[420px] object-cover rounded-lg"
        />

        <div className="mt-6">
          <span className="inline-block text-sm bg-red-600 text-white px-4 py-1 rounded-full">
            {news.platform}
          </span>

          <h3 className="text-2xl font-semibold mt-4 text-gray-900">
            {news.headline}
          </h3>

          <p className="text-lg text-gray-700 mt-3 leading-relaxed">
            {news.content}
          </p>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              Source: {news.source}
            </p>

            <a
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 font-medium hover:underline"
            >
              Read Full News →
            </a>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={prev}
            className="px-6 py-2 bg-blue-800 text-white rounded hover:bg-blue-900"
          >
            ◀ Previous
          </button>
          <button
            onClick={next}
            className="px-6 py-2 bg-blue-800 text-white rounded hover:bg-blue-900"
          >
            Next ▶
          </button>
        </div>
      </div>
    </section>
  );
}
