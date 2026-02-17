

// import { useState } from "react";
// import { auth, db } from "../firebase";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";

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
//   { label: "Has External URL?", key: "has_external_url", type: "boolean" },
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
//   { label: "Following Count", key: "follows", type: "number" },
// ];

// export default function CheckProfile() {
//   /* =========================
//      STATE
//   ========================= */
//   const [dataset, setDataset] = useState("dataset1");
//   const [algorithm, setAlgorithm] = useState("XGBoost");
//   const [manualInput, setManualInput] = useState({});
//   const [loading, setLoading] = useState(false);

//   const [result, setResult] = useState(null);
//   const [comparisonResults, setComparisonResults] = useState(null);

//   // feedback flow
//   const [feedbackStage, setFeedbackStage] = useState(null);
//   // null | "ask" | "label"

//   const activeFields =
//     dataset === "dataset1" ? DATASET1_FIELDS : DATASET2_FIELDS;

//   /* =========================
//      HELPERS
//   ========================= */

//   const handleManualChange = (key, value) => {
//     setManualInput((prev) => ({ ...prev, [key]: value }));
//   };

//   const hasValidInput = () =>
//     activeFields.some((field) => {
//       const val = manualInput[field.key];
//       return val !== undefined && val !== "" && val !== null;
//     });

//   const buildFeatureArray = () =>
//     activeFields.map((field) => {
//       const val = manualInput[field.key];
//       if (field.type === "boolean") return val ? 1 : 0;
//       return Number(val || 0);
//     });

//   /* =========================
//      SINGLE ALGORITHM
//   ========================= */

//   const handleManualCheck = async () => {
//     if (!hasValidInput()) {
//       setResult({ error: "Please fill at least one profile detail." });
//       return;
//     }

//     setLoading(true);
//     setResult(null);
//     setComparisonResults(null);
//     setFeedbackStage(null);

//     try {
//       const res = await fetch(
//         `${process.env.REACT_APP_API_URL}/predict`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             dataset,
//             algorithm,
//             features: buildFeatureArray(),
//           }),
//         }
//       );

//       if (!res.ok) throw new Error("Server error");

//       const data = await res.json();
//       setResult(data);
//       setFeedbackStage("ask");
//     } catch (err) {
//       console.error(err);
//       setResult({ error: "Prediction failed. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================
//      COMPARE ALL ALGORITHMS
//   ========================= */

//   const handleCompareAll = async () => {
//     if (!hasValidInput()) {
//       setResult({ error: "Please fill at least one profile detail." });
//       return;
//     }

//     setLoading(true);
//     setResult(null);
//     setComparisonResults(null);
//     setFeedbackStage(null);

//     try {
//       const res = await fetch(
//         `${process.env.REACT_APP_API_URL}/predict-compare`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             dataset,
//             features: buildFeatureArray(),
//           }),
//         }
//       );

//       if (!res.ok) throw new Error("Server error");

//       const data = await res.json();
//       setComparisonResults(data.comparison);
//     } catch (err) {
//       console.error(err);
//       setResult({ error: "Comparison failed. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================
//      SAVE FEEDBACK
//   ========================= */

//   const saveFeedback = async (isSatisfied, userLabel = null) => {
//     try {
//       await addDoc(collection(db, "feedback_samples"), {
//         userId: auth.currentUser.uid,
//         dataset,
//         algorithm,
//         features: buildFeatureArray(),
//         model_prediction: result.prediction,
//         user_feedback: isSatisfied ? result.prediction : userLabel,
//         is_satisfied: isSatisfied,
//         createdAt: serverTimestamp(),
//       });

//       setFeedbackStage(null);
//       alert("✅ Feedback saved. Thank you!");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to save feedback.");
//     }
//   };

//   /* =========================
//      UI
//   ========================= */

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6">
//         Fake Profile Detection (Human-in-the-Loop)
//       </h2>

//       {/* CONTROLS */}
//       <div className="grid md:grid-cols-2 gap-4 mb-6">
//         <select
//           className="border p-2 rounded"
//           value={dataset}
//           onChange={(e) => setDataset(e.target.value)}
//         >
//           <option value="dataset1">Dataset 1</option>
//           <option value="dataset2">Dataset 2</option>
//         </select>

//         <select
//           className="border p-2 rounded"
//           value={algorithm}
//           onChange={(e) => setAlgorithm(e.target.value)}
//         >
//           <option value="RandomForest">Random Forest</option>
//           <option value="LightGBM">LightGBM</option>
//           <option value="XGBoost">XGBoost</option>
//         </select>
//       </div>

//       {/* INPUT FORM */}
//       <div className="bg-white p-6 rounded shadow grid md:grid-cols-2 gap-4">
//         {activeFields.map((field, i) => (
//           <div key={i}>
//             <label className="block text-sm font-medium mb-1">
//               {field.label}
//             </label>

//             {field.type === "boolean" ? (
//               <select
//                 className="w-full border p-2 rounded"
//                 onChange={(e) =>
//                   handleManualChange(field.key, e.target.value === "true")
//                 }
//               >
//                 <option value="">Select</option>
//                 <option value="true">Yes</option>
//                 <option value="false">No</option>
//               </select>
//             ) : (
//               <input
//                 type="number"
//                 className="w-full border p-2 rounded"
//                 onChange={(e) =>
//                   handleManualChange(field.key, e.target.value)
//                 }
//               />
//             )}
//           </div>
//         ))}

//         <div className="col-span-full mt-4 flex gap-4">
//           <button
//             onClick={handleManualCheck}
//             disabled={loading}
//             className="bg-blue-600 text-white px-6 py-2 rounded"
//           >
//             Single Algorithm
//           </button>

//           <button
//             onClick={handleCompareAll}
//             disabled={loading}
//             className="bg-purple-600 text-white px-6 py-2 rounded"
//           >
//             Compare All Algorithms
//           </button>
//         </div>
//       </div>

//       {loading && (
//         <p className="mt-4 text-blue-600 font-semibold text-center">
//           Processing, please wait...
//         </p>
//       )}

//       {/* SINGLE RESULT */}
//       {result && !result.error && (
//         <div className="mt-6 p-6 rounded shadow bg-green-100">
//           <p><b>Status:</b> {result.prediction}</p>
//           <p><b>Algorithm:</b> {result.algorithm}</p>
//           <p><b>Accuracy:</b> {result.accuracy}%</p>
//         </div>
//       )}

//       {result?.error && (
//         <div className="mt-6 p-4 bg-red-100 text-red-800 rounded">
//           ⚠️ {result.error}
//         </div>
//       )}

//       {/* COMPARISON TABLE */}
//       {comparisonResults && (
//         <div className="mt-8 bg-white p-6 rounded shadow">
//           <h3 className="text-xl font-bold mb-4">
//             Algorithm Comparison
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
//               {Object.entries(comparisonResults).map(([algo, info]) => (
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

//       {/* FEEDBACK STEP 1 */}
//       {feedbackStage === "ask" && (
//         <div className="mt-6 p-6 bg-white rounded shadow">
//           <h3 className="font-bold mb-3">
//             Are you satisfied with this result?
//           </h3>

//           <div className="flex gap-4">
//             <button
//               onClick={() => saveFeedback(true)}
//               className="bg-green-600 text-white px-4 py-2 rounded"
//             >
//               Yes, correct
//             </button>

//             <button
//               onClick={() => setFeedbackStage("label")}
//               className="bg-red-600 text-white px-4 py-2 rounded"
//             >
//               No, incorrect
//             </button>
//           </div>
//         </div>
//       )}

//       {/* FEEDBACK STEP 2 */}
//       {feedbackStage === "label" && (
//         <div className="mt-6 p-6 bg-yellow-50 rounded shadow">
//           <h3 className="font-bold mb-3">
//             What is the correct label?
//           </h3>

//           <div className="flex gap-4">
//             <button
//               onClick={() => saveFeedback(false, "Fake Account")}
//               className="bg-red-600 text-white px-4 py-2 rounded"
//             >
//               Fake Account
//             </button>

//             <button
//               onClick={() => saveFeedback(false, "Real Account")}
//               className="bg-green-600 text-white px-4 py-2 rounded"
//             >
//               Real Account
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

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
  { label: "Has External URL?", key: "has_external_url", type: "boolean" },
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
  { label: "Following Count", key: "follows", type: "number" },
];

export default function CheckProfile() {

  const [dataset, setDataset] = useState("dataset1");
  const [algorithm, setAlgorithm] = useState("XGBoost");
  const [manualInput, setManualInput] = useState({});
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);
  const [trustResult, setTrustResult] = useState(null); // NEW
  const [comparisonResults, setComparisonResults] = useState(null);

  const [feedbackStage, setFeedbackStage] = useState(null);

  const activeFields =
    dataset === "dataset1" ? DATASET1_FIELDS : DATASET2_FIELDS;

  const handleManualChange = (key, value) => {
    setManualInput((prev) => ({ ...prev, [key]: value }));
  };

  const hasValidInput = () =>
    activeFields.some((field) => {
      const val = manualInput[field.key];
      return val !== undefined && val !== "" && val !== null;
    });

  const buildFeatureArray = () =>
    activeFields.map((field) => {
      const val = manualInput[field.key];
      if (field.type === "boolean") return val ? 1 : 0;
      return Number(val || 0);
    });

  /* =========================
     SINGLE ALGORITHM
  ========================= */

  const handleManualCheck = async () => {
    if (!hasValidInput()) {
      setResult({ error: "Please fill at least one profile detail." });
      return;
    }

    setLoading(true);
    setResult(null);
    setTrustResult(null);
    setComparisonResults(null);
    setFeedbackStage(null);

    try {

      // OLD PREDICT
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/predict`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dataset,
            algorithm,
            features: buildFeatureArray(),
          }),
        }
      );

      const data = await res.json();
      setResult(data);

      // NEW TRUST CHECK
      const trustRes = await fetch(
        `${process.env.REACT_APP_API_URL}/trust-check`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dataset,
            features: buildFeatureArray(),
          }),
        }
      );

      const trustData = await trustRes.json();
      setTrustResult(trustData);

      setFeedbackStage("ask");

    } catch (err) {
      console.error(err);
      setResult({ error: "Prediction failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UI
  ========================= */

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h2 className="text-3xl font-bold mb-6">
        Fake Profile Detection (Human-in-the-Loop)
      </h2>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={dataset}
          onChange={(e) => setDataset(e.target.value)}
        >
          <option value="dataset1">Dataset 1</option>
          <option value="dataset2">Dataset 2</option>
        </select>

        <select
          className="border p-2 rounded"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="RandomForest">Random Forest</option>
          <option value="LightGBM">LightGBM</option>
          <option value="XGBoost">XGBoost</option>
        </select>
      </div>

      <div className="bg-white p-6 rounded shadow grid md:grid-cols-2 gap-4">
        {activeFields.map((field, i) => (
          <div key={i}>
            <label className="block text-sm font-medium mb-1">
              {field.label}
            </label>

            {field.type === "boolean" ? (
              <select
                className="w-full border p-2 rounded"
                onChange={(e) =>
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
                onChange={(e) =>
                  handleManualChange(field.key, e.target.value)
                }
              />
            )}
          </div>
        ))}

        <div className="col-span-full mt-4 flex gap-4">
          <button
            onClick={handleManualCheck}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Analyze Profile
          </button>
        </div>
      </div>

      {loading && (
        <p className="mt-4 text-blue-600 font-semibold text-center">
          Processing...
        </p>
      )}

      {result && !result.error && (
        <div className="mt-6 p-6 rounded shadow bg-green-100">
          <p><b>Status:</b> {result.prediction}</p>
          <p><b>Algorithm:</b> {result.algorithm}</p>
          <p><b>Accuracy:</b> {result.accuracy}%</p>
        </div>
      )}

      {/* TRUST RESULT */}
      {trustResult && (
        <div className="mt-4 p-4 rounded shadow bg-blue-100">
          <p><b>Trust Level:</b> {trustResult.risk_level}</p>
          <p><b>Fake Risk:</b> {trustResult.fake_risk}</p>
          <p><b>Trust Score:</b> {trustResult.trust_score}</p>
        </div>
      )}

      {result?.error && (
        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded">
          ⚠️ {result.error}
        </div>
      )}

    </div>
  );
}

