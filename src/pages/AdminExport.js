import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function AdminExport() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, "feedback_data"));
      const rows = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(rows);
      setLoading(false);
    };

    fetchData();
  }, []);

  const exportCSV = () => {
    const headers = [
      "dataset",
      "features",
      "finalModelPrediction",
      "finalConfidence",
      "userLabel",
      "userSatisfied",
    ];

    const rows = data.map(d => [
      d.dataset,
      JSON.stringify(d.features),
      d.finalModelPrediction,
      d.finalConfidence,
      d.userLabel,
      d.userSatisfied,
    ]);

    const csv =
      [headers, ...rows].map(r => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "training_data.csv";
    a.click();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Training Data Export
      </h2>

      <button
        onClick={exportCSV}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Export CSV
      </button>

      <p className="text-sm text-gray-600">
        Total Samples: {data.length}
      </p>
    </div>
  );
}
