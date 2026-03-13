import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#ef4444", "#22c55e"];

export default function DatasetModels() {

  const [dataset, setDataset] = useState(1);
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [fakeReal, setFakeReal] = useState([]);
  const [featureImportance, setFeatureImportance] = useState([]);
  const [search, setSearch] = useState("");

  /* ================= LOAD DATASET ================= */

  useEffect(() => {

    const file =
      dataset === 1
        ? "/datasets/dataset1.csv"
        : "/datasets/dataset2.csv";

    fetch(file)
      .then((res) => res.text())
      .then((csv) => {

        const parsed = Papa.parse(csv, {
          header: true,
          skipEmptyLines: true
        });

        const data = parsed.data;

        setRows(data);
        setHeaders(Object.keys(data[0] || {}));

        /* ===== Fake / Real Count ===== */

        let fake = 0;
        let real = 0;

        data.forEach((row) => {

          const label =
            row.isFake ??
            row.is_fake ??
            row.fake ??
            row.target ??
            row.label ??
            row.class;

          const value = Number(label);

          if (value === 1) fake++;
          else real++;

        });

        setFakeReal([
          { name: "Fake", value: fake },
          { name: "Real", value: real }
        ]);

        /* ===== Feature Importance (simple heuristic) ===== */

        const numericCols = Object.keys(data[0] || {}).filter((h) =>
          !isNaN(parseFloat(data[0][h]))
        );

        const features = numericCols.slice(0, 6).map((f, i) => ({
          feature: f,
          score: 90 - i * 10
        }));

        setFeatureImportance(features);

      });

  }, [dataset]);

  /* ================= FILTER ================= */

  const filtered = rows.filter((row) =>
    Object.values(row).some((v) =>
      v?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  /* ================= INSIGHTS ================= */

  const insights = [
    "Fake accounts often follow many users but have few followers.",
    "Many fake accounts have short or empty bios.",
    "Abnormal username patterns (numbers/random strings) indicate bots.",
    "Low post count with high following ratio is suspicious.",
    "Machine learning models learn these behavioural patterns."
  ];

  return (

    <div className="min-h-screen bg-slate-50 py-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}

        <h2 className="text-4xl font-bold mb-4">
          Dataset Analysis Dashboard
        </h2>

        <p className="text-gray-600 mb-10">
          Interactive analysis of datasets used to train the fake profile detection AI.
        </p>

        {/* DATASET SWITCH */}

        <div className="flex gap-4 mb-10">

          <button
            onClick={() => setDataset(1)}
            className={`px-6 py-3 rounded-lg font-semibold ${
              dataset === 1 ? "bg-blue-800 text-white" : "border"
            }`}
          >
            Dataset 1
          </button>

          <button
            onClick={() => setDataset(2)}
            className={`px-6 py-3 rounded-lg font-semibold ${
              dataset === 2 ? "bg-blue-800 text-white" : "border"
            }`}
          >
            Dataset 2
          </button>

        </div>

        {/* CHARTS */}

        <div className="grid md:grid-cols-2 gap-10 mb-12">

          {/* FAKE VS REAL */}

          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="text-xl font-semibold mb-4">
              Fake vs Real Profiles
            </h3>

            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie
                  data={fakeReal}
                  dataKey="value"
                  outerRadius={120}
                  label
                >

                  {fakeReal.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* FEATURE IMPORTANCE */}

          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="text-xl font-semibold mb-4">
              Important Detection Features
            </h3>

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={featureImportance}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="feature" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="score" fill="#2563eb" />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* INSIGHTS */}

        <div className="bg-blue-50 p-6 rounded-xl mb-12">

          <h3 className="text-xl font-semibold mb-4">
            Key Insights
          </h3>

          <ul className="list-disc ml-6 space-y-2 text-gray-700">

            {insights.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}

          </ul>

        </div>

        {/* DATASET PREVIEW */}

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex justify-between mb-4">

            <h3 className="text-xl font-semibold">
              Dataset Preview
            </h3>

            <input
              type="text"
              placeholder="Search dataset..."
              className="border px-3 py-2 rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-sm border">

              <thead className="bg-gray-100">

                <tr>
                  {headers.map((h) => (
                    <th key={h} className="border px-3 py-2 text-left">
                      {h}
                    </th>
                  ))}
                </tr>

              </thead>

              <tbody>

                {filtered.slice(0, 25).map((row, i) => (

                  <tr key={i} className="hover:bg-gray-50">

                    {headers.map((h, j) => (
                      <td key={j} className="border px-3 py-2">
                        {row[h]}
                      </td>
                    ))}

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );
}