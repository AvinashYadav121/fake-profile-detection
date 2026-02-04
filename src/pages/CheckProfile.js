
// import { useState } from "react";

// /* =========================
//    DATASET SCHEMAS
// ========================= */

// const DATASET1_FIELDS = [
//   { label: "Followers Count", key: "edge_followed_by", type: "number" },
//   { label: "Following Count", key: "edge_follow", type: "number" },
//   { label: "Username Length", key: "username_length", type: "number" },
//   { label: "Username Contains Numbers?", key: "username_has_number", type: "boolean" },
//   { label: "Full Name Contains Numbers?", key: "full_name_has_number", type: "boolean" },
//   { label: "Full Name Length", key: "full_name_length", type: "number" },
//   { label: "Is Account Private?", key: "is_private", type: "boolean" },
//   { label: "Is Recently Created?", key: "is_joined_recently", type: "boolean" },
//   { label: "Has Channel?", key: "has_channel", type: "boolean" },
//   { label: "Is Business Account?", key: "is_business_account", type: "boolean" },
//   { label: "Has Guides?", key: "has_guides", type: "boolean" },
//   { label: "Has External URL?", key: "has_external_url", type: "boolean" }
// ];

// const DATASET2_FIELDS = [
//   { label: "Has Profile Picture?", key: "profile_pic", type: "boolean" },
//   { label: "Username Number Ratio", key: "nums_length_username", type: "number" },
//   { label: "Full Name Word Count", key: "fullname_words", type: "number" },
//   { label: "Full Name Number Ratio", key: "nums_length_fullname", type: "number" },
//   { label: "Username Equals Full Name?", key: "name_eq_username", type: "boolean" },
//   { label: "Bio Length", key: "description_length", type: "number" },
//   { label: "Has External URL?", key: "external_url", type: "boolean" },
//   { label: "Is Account Private?", key: "private", type: "boolean" },
//   { label: "Post Count", key: "posts", type: "number" },
//   { label: "Followers Count", key: "followers", type: "number" },
//   { label: "Following Count", key: "follows", type: "number" }
// ];

// export default function CheckProfile() {
//   /* =========================
//      STATE
//   ========================= */
//   const [mode, setMode] = useState("manual");
//   const [dataset, setDataset] = useState("dataset1");
//   const [algorithm, setAlgorithm] = useState("XGBoost");

//   const [manualInput, setManualInput] = useState({});
//   // const [username, setUsername] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [comparison, setComparison] = useState(null);

//   const activeFields =
//     dataset === "dataset1" ? DATASET1_FIELDS : DATASET2_FIELDS;

//   /* =========================
//      HELPERS
//   ========================= */
//   const handleManualChange = (key, value) => {
//     setManualInput(prev => ({ ...prev, [key]: value }));
//   };

//   const buildFeatureArray = () => {
//     return activeFields.map(field => {
//       const val = manualInput[field.key];
//       if (field.type === "boolean") return val ? 1 : 0;
//       return Number(val || 0);
//     });
//   };

//   /* =========================
//      SINGLE PREDICTION
//   ========================= */
//   const handleManualCheck = async () => {
//     setLoading(true);
//     setResult(null);
//     setComparison(null);

//     const res = await fetch("http://localhost:8000/predict", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         dataset,
//         algorithm,
//         features: buildFeatureArray()
//       })
//     });

//     const data = await res.json();
//     setResult(data);
//     setLoading(false);
//   };

//   /* =========================
//      COMPARE ALL ALGORITHMS
//   ========================= */
//   const handleCompareManual = async () => {
//     setLoading(true);
//     setResult(null);
//     setComparison(null);

//     const res = await fetch("http://localhost:8000/predict-compare", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         dataset,
//         features: buildFeatureArray()
//       })
//     });

//     const data = await res.json();
//     setComparison(data);
//     setLoading(false);
//   };

//   /* =========================
//      UI
//   ========================= */
//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6">
//         Fake Profile Detection & Algorithm Comparison
//       </h2>

//       {/* CONTROLS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <select className="border p-2 rounded" onChange={e => setMode(e.target.value)}>
//           <option value="manual">Manual Input</option>
//           <option value="instagram">Instagram Username</option>
//         </select>

//         <select className="border p-2 rounded" onChange={e => setDataset(e.target.value)}>
//           <option value="dataset1">Dataset 1</option>
//           <option value="dataset2">Dataset 2</option>
//         </select>

//         <select className="border p-2 rounded" onChange={e => setAlgorithm(e.target.value)}>
//           <option value="RandomForest">Random Forest</option>
//           <option value="LightGBM">LightGBM</option>
//           <option value="XGBoost">XGBoost</option>
//         </select>
//       </div>

//       {/* MANUAL MODE */}
//       {mode === "manual" && (
//         <div className="bg-white p-6 rounded shadow grid grid-cols-1 md:grid-cols-2 gap-4">
//           {activeFields.map((field, i) => (
//             <div key={i}>
//               <label className="block text-sm font-medium mb-1">{field.label}</label>
//               {field.type === "boolean" ? (
//                 <select
//                   className="w-full border p-2 rounded"
//                   onChange={e => handleManualChange(field.key, e.target.value === "true")}
//                 >
//                   <option value="">Select</option>
//                   <option value="true">Yes</option>
//                   <option value="false">No</option>
//                 </select>
//               ) : (
//                 <input
//                   type="number"
//                   className="w-full border p-2 rounded"
//                   onChange={e => handleManualChange(field.key, e.target.value)}
//                 />
//               )}
//             </div>
//           ))}

//           <div className="col-span-full flex gap-4 mt-4">
//             <button
//               onClick={handleManualCheck}
//               className="bg-blue-600 text-white px-4 py-2 rounded"
//             >
//               Single Algorithm
//             </button>

//             <button
//               onClick={handleCompareManual}
//               className="bg-purple-600 text-white px-4 py-2 rounded"
//             >
//               Compare All Algorithms
//             </button>
//           </div>
//         </div>
//       )}

//       {/* LOADING */}
//       {loading && (
//         <p className="mt-4 text-blue-600 font-semibold">
//           Processing, please wait...
//         </p>
//       )}

//       {/* SINGLE RESULT */}
//       {result && (
//         <div className="mt-6 p-6 rounded shadow bg-green-100">
//           <h3 className="text-xl font-bold mb-2">Single Algorithm Result</h3>
//           <p><b>Status:</b> {result.prediction}</p>
//           <p><b>Algorithm:</b> {result.algorithm}</p>
//           {result.accuracy && <p><b>Accuracy:</b> {result.accuracy}%</p>}
//         </div>
//       )}

//       {/* SAFE COMPARISON RESULT (FIXED) */}
//       {comparison && comparison.results && (
//         <div className="mt-8 bg-white p-6 rounded shadow">
//           <h3 className="text-xl font-bold mb-4">
//             Algorithm Comparison (Same Profile)
//           </h3>

//           <table className="w-full border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border p-2">Algorithm</th>
//                 <th className="border p-2">Prediction</th>
//                 <th className="border p-2">Accuracy (%)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.entries(comparison.results).map(([algo, info]) => (
//                 <tr key={algo}>
//                   <td className="border p-2">{algo}</td>
//                   <td className="border p-2">{info.prediction}</td>
//                   <td className="border p-2">{info.accuracy}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* FALLBACK (NO CRASH) */}
//       {comparison && !comparison.results && (
//         <div className="mt-6 p-4 bg-yellow-100 rounded">
//           Comparison data not available. Try again.
//         </div>
//       )}
//     </div>
//   );
// }


import { useState } from "react";

/* =========================
   DATASET SCHEMAS
========================= */

const DATASET1_FIELDS = [
  { label: "Followers Count", key: "edge_followed_by", type: "number" },
  { label: "Following Count", key: "edge_follow", type: "number" },
  { label: "Username Length", key: "username_length", type: "number" },
  { label: "Username Contains Numbers?", key: "username_has_number", type: "boolean" },
  { label: "Full Name Contains Numbers?", key: "full_name_has_number", type: "boolean" },
  { label: "Full Name Length", key: "full_name_length", type: "number" },
  { label: "Is Account Private?", key: "is_private", type: "boolean" },
  { label: "Is Recently Created?", key: "is_joined_recently", type: "boolean" },
  { label: "Has Channel?", key: "has_channel", type: "boolean" },
  { label: "Is Business Account?", key: "is_business_account", type: "boolean" },
  { label: "Has Guides?", key: "has_guides", type: "boolean" },
  { label: "Has External URL?", key: "has_external_url", type: "boolean" }
];

const DATASET2_FIELDS = [
  { label: "Has Profile Picture?", key: "profile_pic", type: "boolean" },
  { label: "Username Number Ratio", key: "nums_length_username", type: "number" },
  { label: "Full Name Word Count", key: "fullname_words", type: "number" },
  { label: "Full Name Number Ratio", key: "nums_length_fullname", type: "number" },
  { label: "Username Equals Full Name?", key: "name_eq_username", type: "boolean" },
  { label: "Bio Length", key: "description_length", type: "number" },
  { label: "Has External URL?", key: "external_url", type: "boolean" },
  { label: "Is Account Private?", key: "private", type: "boolean" },
  { label: "Post Count", key: "posts", type: "number" },
  { label: "Followers Count", key: "followers", type: "number" },
  { label: "Following Count", key: "follows", type: "number" }
];

export default function CheckProfile() {
  
  const [dataset, setDataset] = useState("dataset1");
  const [algorithm, setAlgorithm] = useState("XGBoost");

  const [manualInput, setManualInput] = useState({});
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);
  const [comparison, setComparison] = useState(null);

  const activeFields =
    dataset === "dataset1" ? DATASET1_FIELDS : DATASET2_FIELDS;

  /* =========================
     HELPERS
  ========================= */

  const handleManualChange = (key, value) => {
    setManualInput(prev => ({ ...prev, [key]: value }));
  };

  const hasValidInput = () => {
    return activeFields.some(field => {
      const val = manualInput[field.key];
      return val !== undefined && val !== "" && val !== null;
    });
  };

  const buildFeatureArray = () => {
    return activeFields.map(field => {
      const val = manualInput[field.key];
      if (field.type === "boolean") return val ? 1 : 0;
      return Number(val || 0);
    });
  };

  const normalizeComparison = (data) => {
    if (data.results) return data;
    return { results: data };
  };

  /* =========================
     SINGLE PREDICTION
  ========================= */

  const handleManualCheck = async () => {
    if (!hasValidInput()) {
      setResult({ error: "Please fill at least one profile detail before checking." });
      setComparison(null);
      return;
    }

    setLoading(true);
    setResult(null);
    setComparison(null);

    const res = await fetch(process.env.REACT_APP_API_URL + "predict", {
      
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dataset,
        algorithm,
        features: buildFeatureArray()
      })
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  /* =========================
     COMPARE ALL ALGORITHMS
  ========================= */

  const handleCompareManual = async () => {
    if (!hasValidInput()) {
      setComparison({ error: "Please fill at least one profile detail before comparing." });
      setResult(null);
      return;
    }

    setLoading(true);
    setResult(null);
    setComparison(null);

    const res = await fetch(`${process.env.REACT_APP_API_URL}/predict-compare`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dataset,
        features: buildFeatureArray()
      })
    });

    const data = await res.json();
    setComparison(normalizeComparison(data));
    setLoading(false);
  };

  /* =========================
     UI
  ========================= */

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">
        Fake Profile Detection & Algorithm Comparison
      </h2>

      {/* CONTROLS */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <select
          className="border p-2 rounded"
          onChange={e => setDataset(e.target.value)}
        >
          <option value="dataset1">Dataset 1 (Metadata)</option>
          <option value="dataset2">Dataset 2 (Content)</option>
        </select>

        <select
          className="border p-2 rounded"
          onChange={e => setAlgorithm(e.target.value)}
        >
          <option value="RandomForest">Random Forest</option>
          <option value="LightGBM">LightGBM</option>
          <option value="XGBoost">XGBoost</option>
        </select>
      </div>

      {/* INPUT FORM */}
      <div className="bg-white p-6 rounded shadow grid md:grid-cols-2 gap-4">
        {activeFields.map((field, i) => (
          <div key={i}>
            <label className="block text-sm font-medium mb-1">
              {field.label}
            </label>

            {field.type === "boolean" ? (
              <select
                className="w-full border p-2 rounded"
                onChange={e =>
                  handleManualChange(field.key, e.target.value === "true")
                }
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            ) : (
              <input
                type="number"
                className="w-full border p-2 rounded"
                onChange={e =>
                  handleManualChange(field.key, e.target.value)
                }
              />
            )}
          </div>
        ))}

        <div className="col-span-full flex gap-4 mt-4">
          <button
            onClick={handleManualCheck}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Single Algorithm
          </button>

          <button
            onClick={handleCompareManual}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Compare All Algorithms
          </button>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="mt-4 text-blue-600 font-semibold">
          Processing, please wait...
        </p>
      )}

      {/* SINGLE RESULT */}
      {result && (
        result.error ? (
          <div className="mt-6 p-4 bg-yellow-100 text-yellow-800 rounded">
            ⚠️ {result.error}
          </div>
        ) : (
          <div
            className={`mt-6 p-6 rounded shadow ${
              result.prediction === "Fake Account"
                ? "bg-red-100"
                : "bg-green-100"
            }`}
          >
            <h3 className="text-xl font-bold mb-2">Single Algorithm Result</h3>
            <p><b>Status:</b> {result.prediction}</p>
            <p><b>Algorithm:</b> {result.algorithm}</p>
            {result.accuracy && <p><b>Accuracy:</b> {result.accuracy}%</p>}
          </div>
        )
      )}

      {/* COMPARISON RESULT */}
      {comparison && (
        comparison.error ? (
          <div className="mt-6 p-4 bg-yellow-100 text-yellow-800 rounded">
            ⚠️ {comparison.error}
          </div>
        ) : comparison.results ? (
          <div className="mt-8 bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-4">
              Algorithm Comparison (Same Profile)
            </h3>

            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Algorithm</th>
                  <th className="border p-2">Prediction</th>
                  <th className="border p-2">Accuracy (%)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(comparison.results).map(([algo, info]) => (
                  <tr key={algo}>
                    <td className="border p-2">{algo}</td>
                    <td className="border p-2">{info.prediction}</td>
                    <td className="border p-2">{info.accuracy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null
      )}
    </div>
  );
}
