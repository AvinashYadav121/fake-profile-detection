// import { useEffect, useState } from "react";

// export default function DatasetModels() {
//   const [active, setActive] = useState(1); // 1 = Dataset 1, 2 = Dataset 2
//   const [rows, setRows] = useState([]);
//   const [stats, setStats] = useState({ fake: 0, real: 0 });
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const file =
//       active === 1
//         ? "/datasets/dataset1.csv"
//         : "/datasets/dataset2.csv";

//     fetch(file)
//       .then((res) => res.text())
//       .then((text) => {
//         const lines = text.trim().split("\n");
//         const headers = lines[0].split(",");

//         let fakeCount = 0;
//         let realCount = 0;

//         const data = lines.slice(1).map((line) => {
//           const values = line.split(",");
//           const row = headers.reduce((obj, h, i) => {
//             obj[h] = values[i];
//             return obj;
//           }, {});

//           if (row.is_fake === "1" || row.fake === "1" || row.target === "1") {
//             fakeCount++;
//           } else {
//             realCount++;
//           }

//           return row;
//         });

//         setStats({ fake: fakeCount, real: realCount });
//         setRows(data.slice(0, 25)); // preview first 25 rows
//       });
//   }, [active]);

//   const featureImportance =
//     active === 1
//       ? [
//           { name: "Followers / Following ratio", value: 90 },
//           { name: "Username length", value: 78 },
//           { name: "Account privacy", value: 65 },
//           { name: "External URL", value: 58 },
//           { name: "Recently joined", value: 52 }
//         ]
//       : [
//           { name: "Profile picture", value: 85 },
//           { name: "Post count", value: 72 },
//           { name: "Username = Fullname", value: 66 },
//           { name: "Bio length", value: 58 },
//           { name: "Followers count", value: 54 }
//         ];

//   return (
//     <div className="min-h-screen bg-slate-50 py-16">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* ================= HEADER ================= */}
//         <h2 className="text-4xl font-bold mb-4">
//           Datasets & Detection Models
//         </h2>
//         <p className="text-gray-600 max-w-3xl mb-10">
//           This project uses two different datasets to detect fake social media
//           profiles. Each dataset focuses on different scammer behaviour patterns.
//         </p>

//         {/* ================= DATASET SWITCH ================= */}
//         <div className="flex gap-4 mb-10">
//           <button
//             onClick={() => setActive(1)}
//             className={`px-6 py-3 rounded-lg font-semibold ${
//               active === 1
//                 ? "bg-blue-800 text-white"
//                 : "bg-white border"
//             }`}
//           >
//             Dataset 1: Metadata-based
//           </button>

//           <button
//             onClick={() => setActive(2)}
//             className={`px-6 py-3 rounded-lg font-semibold ${
//               active === 2
//                 ? "bg-blue-800 text-white"
//                 : "bg-white border"
//             }`}
//           >
//             Dataset 2: Content-based
//           </button>
//         </div>

//         {/* ================= BADGE ================= */}
//         <div className="mb-8">
//           {active === 1 ? (
//             <span className="px-4 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-semibold">
//               Metadata-based Detection
//             </span>
//           ) : (
//             <span className="px-4 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold">
//               Content-based Detection
//             </span>
//           )}
//         </div>

//         {/* ================= FAKE vs REAL ================= */}
//         <div className="grid md:grid-cols-2 gap-6 mb-12">
//           <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-center">
//             <p className="text-sm font-semibold text-red-700">
//               Fake Profiles
//             </p>
//             <p className="text-3xl font-bold text-red-800">
//               {stats.fake}
//             </p>
//           </div>

//           <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center">
//             <p className="text-sm font-semibold text-green-700">
//               Real Profiles
//             </p>
//             <p className="text-3xl font-bold text-green-800">
//               {stats.real}
//             </p>
//           </div>
//         </div>

//         {/* ================= FEATURE IMPORTANCE ================= */}
//         <div className="bg-white rounded-xl shadow p-6 mb-12">
//           <h3 className="text-2xl font-semibold mb-6">
//             Feature Importance
//           </h3>

//           <div className="space-y-4">
//             {featureImportance.map((f, i) => (
//               <div key={i}>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span>{f.name}</span>
//                   <span>{f.value}%</span>
//                 </div>
//                 <div className="h-3 bg-gray-200 rounded">
//                   <div
//                     className="h-3 bg-blue-700 rounded"
//                     style={{ width: `${f.value}%` }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ================= CSV PREVIEW ================= */}
//         <div className="bg-white rounded-xl shadow p-6 mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-2xl font-semibold">
//               Dataset Preview
//             </h3>

//             <a
//               href={
//                 active === 1
//                   ? "/datasets/dataset1.csv"
//                   : "/datasets/dataset2.csv"
//               }
//               download
//               className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Download CSV
//             </a>
//           </div>

//           <input
//             type="text"
//             placeholder="Search dataset..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border px-4 py-2 rounded w-full mb-4"
//           />

//           <div className="overflow-x-auto">
//             <table className="w-full border text-sm">
//               <thead className="bg-slate-100">
//                 <tr>
//                   {rows[0] &&
//                     Object.keys(rows[0]).map((h) => (
//                       <th key={h} className="border px-3 py-2 text-left">
//                         {h}
//                       </th>
//                     ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {rows
//                   .filter((row) =>
//                     Object.values(row).some((v) =>
//                       v?.toString().toLowerCase().includes(search.toLowerCase())
//                     )
//                   )
//                   .map((row, i) => (
//                     <tr key={i} className="hover:bg-slate-50">
//                       {Object.values(row).map((v, j) => (
//                         <td key={j} className="border px-3 py-2">
//                           {v}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* ================= MODELS ================= */}
//         <div className="bg-blue-50 p-6 rounded-xl">
//           <h3 className="text-2xl font-semibold mb-3">
//             Machine Learning Models Used
//           </h3>
//           <ul className="list-disc ml-6 text-gray-700 space-y-2">
//             <li>Random Forest – strong baseline for tabular data</li>
//             <li>LightGBM – fast and scalable gradient boosting</li>
//             <li>XGBoost – high accuracy on structured datasets</li>
//           </ul>
//         </div>

//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";

/* ================= HELPER: detect fake target reliably ================= */
function isFakeProfile(value) {
  if (!value) return false;

  const v = value.toString().toLowerCase().trim();

  return (
    v === "1" ||
    v === "1.0" ||
    v === "true" ||
    v === "yes" ||
    v === "fake" ||
    v === "scam"
  );
}

export default function DatasetModels() {
  const [active, setActive] = useState(1); // 1 = metadata, 2 = content
  const [rows, setRows] = useState([]);
  const [stats, setStats] = useState({ fake: 0, real: 0 });
  const [search, setSearch] = useState("");

  /* ================= LOAD CSV ================= */
  useEffect(() => {
    const file =
      active === 1
        ? "/datasets/dataset1.csv"
        : "/datasets/dataset2.csv";

    fetch(file)
      .then((res) => {
        if (!res.ok) throw new Error("CSV file not found");
        return res.text();
      })
      .then((text) => {
        const lines = text
          .trim()
          .split("\n")
          .map((l) => l.replace("\r", ""));

        if (lines.length < 2) return;

        const delimiter = lines[0].includes(";") ? ";" : ",";
        const headers = lines[0].split(delimiter);

        let fakeCount = 0;
        let realCount = 0;

        const data = lines.slice(1).map((line) => {
          const values = line.split(delimiter);
          const row = {};

          headers.forEach((h, i) => {
            row[h] = (values[i] ?? "").trim();
          });

          const targetValue =
            row.is_fake ??
            row.fake ??
            row.target ??
            row.label ??
            row.class;

          if (isFakeProfile(targetValue)) fakeCount++;
          else realCount++;

          return row;
        });

        setStats({ fake: fakeCount, real: realCount });
        setRows(data.slice(0, 25)); // preview first 25 rows
      })
      .catch((err) => {
        console.error("Dataset load error:", err);
        setRows([]);
        setStats({ fake: 0, real: 0 });
      });
  }, [active]);

  /* ================= FEATURE IMPORTANCE ================= */
  const featureImportance =
    active === 1
      ? [
          { name: "Followers / Following ratio", value: 90 },
          { name: "Username length", value: 78 },
          { name: "Account privacy", value: 66 },
          { name: "External URL", value: 58 },
          { name: "Recently joined", value: 52 }
        ]
      : [
          { name: "Profile picture", value: 86 },
          { name: "Post count", value: 72 },
          { name: "Username = Fullname", value: 65 },
          { name: "Bio length", value: 58 },
          { name: "Followers count", value: 54 }
        ];

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <h2 className="text-4xl font-bold mb-4">
          Datasets & Detection Models
        </h2>
        <p className="text-gray-600 max-w-3xl mb-10">
          Two different datasets are used to detect fake social media profiles.
          Each dataset focuses on a different detection strategy.
        </p>

        {/* ================= DATASET SWITCH ================= */}
        <div className="flex gap-4 mb-10">
          <button
            onClick={() => setActive(1)}
            className={`px-6 py-3 rounded-lg font-semibold ${
              active === 1
                ? "bg-blue-800 text-white"
                : "bg-white border"
            }`}
          >
            Dataset 1: Metadata-based
          </button>

          <button
            onClick={() => setActive(2)}
            className={`px-6 py-3 rounded-lg font-semibold ${
              active === 2
                ? "bg-blue-800 text-white"
                : "bg-white border"
            }`}
          >
            Dataset 2: Content-based
          </button>
        </div>

        {/* ================= BADGE ================= */}
        <div className="mb-8">
          {active === 1 ? (
            <span className="px-4 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-semibold">
              Metadata-based Detection
            </span>
          ) : (
            <span className="px-4 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold">
              Content-based Detection
            </span>
          )}
        </div>

        {/* ================= FAKE vs REAL ================= */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-center">
            <p className="text-sm font-semibold text-red-700">
              Fake Profiles
            </p>
            <p className="text-3xl font-bold text-red-800">
              {stats.fake}
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center">
            <p className="text-sm font-semibold text-green-700">
              Real Profiles
            </p>
            <p className="text-3xl font-bold text-green-800">
              {stats.real}
            </p>
          </div>
        </div>

        {/* ================= FEATURE IMPORTANCE ================= */}
        <div className="bg-white rounded-xl shadow p-6 mb-12">
          <h3 className="text-2xl font-semibold mb-6">
            Feature Importance
          </h3>

          <div className="space-y-4">
            {featureImportance.map((f, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{f.name}</span>
                  <span>{f.value}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded">
                  <div
                    className="h-3 bg-blue-700 rounded"
                    style={{ width: `${f.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= CSV PREVIEW ================= */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold">
              Dataset Preview
            </h3>

            <a
              href={
                active === 1
                  ? "/datasets/dataset1.csv"
                  : "/datasets/dataset2.csv"
              }
              download
              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Download CSV
            </a>
          </div>

          <input
            type="text"
            placeholder="Search dataset..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded w-full mb-4"
          />

          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead className="bg-slate-100">
                <tr>
                  {rows.length > 0 &&
                    Object.keys(rows[0]).map((h) => (
                      <th key={h} className="border px-3 py-2 text-left">
                        {h}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {rows
                  .filter((row) =>
                    Object.values(row).some((v) =>
                      v
                        ?.toString()
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    )
                  )
                  .map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      {Object.values(row).map((v, j) => (
                        <td key={j} className="border px-3 py-2">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= MODELS ================= */}
        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="text-2xl font-semibold mb-3">
            Machine Learning Models Used
          </h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Random Forest – strong baseline for tabular features</li>
            <li>LightGBM – fast, scalable gradient boosting</li>
            <li>XGBoost – high accuracy on structured data</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
