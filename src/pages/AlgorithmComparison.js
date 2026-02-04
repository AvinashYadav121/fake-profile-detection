import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AlgorithmComparison() {
  const [dataset, setDataset] = useState("dataset1");

  // Accuracy values from training
  const accuracyData = {
    dataset1: {
      RandomForest: 95.38,
      LightGBM: 97.77,
      XGBoost: 98.41
    },
    dataset2: {
      RandomForest: 94.12,
      LightGBM: 96.85,
      XGBoost: 97.63
    }
  };

  const selectedData = accuracyData[dataset];

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <h2 className="text-4xl font-bold mb-4">
          Algorithm Performance Comparison
        </h2>
        <p className="text-gray-600 max-w-3xl mb-10">
          This section compares machine learning algorithms used for fake
          profile detection across different datasets.
        </p>

        {/* ================= DATASET SWITCH ================= */}
        <div className="flex gap-4 mb-10">
          <button
            onClick={() => setDataset("dataset1")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              dataset === "dataset1"
                ? "bg-blue-800 text-white"
                : "bg-white border hover:bg-slate-100"
            }`}
          >
            Dataset 1 (Metadata-based)
          </button>

          <button
            onClick={() => setDataset("dataset2")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              dataset === "dataset2"
                ? "bg-blue-800 text-white"
                : "bg-white border hover:bg-slate-100"
            }`}
          >
            Dataset 2 (Content-based)
          </button>
        </div>

        {/* ================= HIGHLIGHT STATS ================= */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {Object.entries(selectedData).map(([algo, acc]) => (
            <div
              key={algo}
              className="bg-white rounded-xl shadow p-6 text-center"
            >
              <p className="text-sm text-gray-500 mb-1">
                {algo}
              </p>
              <p className="text-3xl font-bold text-blue-800">
                {acc}%
              </p>
            </div>
          ))}
        </div>

        {/* ================= CHART ================= */}
        <div className="bg-white rounded-xl shadow p-6 mb-12">
          <h3 className="text-2xl font-semibold mb-6">
            Accuracy Comparison
          </h3>

          <Bar
            data={{
              labels: Object.keys(selectedData),
              datasets: [
                {
                  label: "Accuracy (%)",
                  data: Object.values(selectedData),
                  backgroundColor: [
                    "#2563eb",
                    "#22c55e",
                    "#f59e0b"
                  ]
                }
              ]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (ctx) => `${ctx.parsed.y}% accuracy`
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  ticks: {
                    callback: (v) => `${v}%`
                  }
                }
              }
            }}
          />
        </div>

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded-xl shadow p-6 mb-12">
          <h3 className="text-2xl font-semibold mb-4">
            Accuracy Table
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border px-4 py-2 text-left">
                    Algorithm
                  </th>
                  <th className="border px-4 py-2 text-left">
                    Accuracy (%)
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(selectedData).map(([algo, acc]) => (
                  <tr key={algo} className="hover:bg-slate-50">
                    <td className="border px-4 py-2">
                      {algo}
                    </td>
                    <td className="border px-4 py-2 font-semibold">
                      {acc}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= ANALYSIS ================= */}
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-4">
            Model Analysis
          </h3>

          <ul className="space-y-3 text-gray-700">
            <li>
              <b>XGBoost</b> achieves the highest accuracy due to its strong
              gradient boosting and ability to model complex feature
              interactions.
            </li>
            <li>
              <b>LightGBM</b> offers a strong balance between speed and accuracy,
              making it suitable for large-scale datasets.
            </li>
            <li>
              <b>Random Forest</b> provides stable performance and is easier to
              interpret, but with slightly lower accuracy.
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
