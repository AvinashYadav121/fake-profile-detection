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
  const [comparison, setComparison] = useState(null);

  const activeFields =
    dataset === "dataset1" ? DATASET1_FIELDS : DATASET2_FIELDS;

  /* =========================
     HELPERS
  ========================= */

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
     SINGLE PREDICTION
  ========================= */

  const handleManualCheck = async () => {
    if (!hasValidInput()) {
      setResult({ error: "Please fill at least one profile detail." });
      setComparison(null);
      return;
    }

    setLoading(true);
    setResult(null);
    setComparison(null);

    try {
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

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Prediction failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     COMPARE ALL ALGORITHMS
  ========================= */

  const handleCompareManual = async () => {
    if (!hasValidInput()) {
      setComparison({ error: "Please fill at least one profile detail." });
      setResult(null);
      return;
    }

    setLoading(true);
    setResult(null);
    setComparison(null);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/predict-compare`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dataset,
            features: buildFeatureArray(),
          }),
        }
      );

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setComparison({ results: data.comparison });
    } catch (err) {
      console.error(err);
      setComparison({ error: "Comparison failed. Try again." });
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
        Fake Profile Detection & Algorithm Comparison
      </h2>

      {/* CONTROLS */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <select
          className="border p-2 rounded"
          onChange={(e) => setDataset(e.target.value)}
        >
          <option value="dataset1">Dataset 1</option>
          <option value="dataset2">Dataset 2</option>
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) => setAlgorithm(e.target.value)}
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

        <div className="col-span-full flex gap-4 mt-4">
          <button
            disabled={loading}
            onClick={handleManualCheck}
            className={`px-4 py-2 rounded text-white ${
              loading ? "bg-gray-400" : "bg-blue-600"
            }`}
          >
            Single Algorithm
          </button>

          <button
            disabled={loading}
            onClick={handleCompareManual}
            className={`px-4 py-2 rounded text-white ${
              loading ? "bg-gray-400" : "bg-purple-600"
            }`}
          >
            Compare All Algorithms
          </button>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded h-3">
            <div className="bg-blue-600 h-3 animate-pulse w-3/4"></div>
          </div>
          <p className="text-sm text-blue-600 mt-2 text-center">
            Analyzing profile...
          </p>
        </div>
      )}

      {/* RESULT */}
      {result && result.error && (
        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded">
          ⚠️ {result.error}
          <button
            onClick={handleManualCheck}
            className="ml-4 bg-red-600 text-white px-3 py-1 rounded"
          >
            Retry
          </button>
        </div>
      )}

      {result && !result.error && (
        <div
          className={`mt-6 p-6 rounded shadow ${
            result.prediction === "Fake Account"
              ? "bg-red-100"
              : "bg-green-100"
          }`}
        >
          <h3 className="text-xl font-bold mb-2">Result</h3>
          <p><b>Status:</b> {result.prediction}</p>
          <p><b>Algorithm:</b> {result.algorithm}</p>
          <p><b>Accuracy:</b> {result.accuracy}%</p>
        </div>
      )}

      {/* COMPARISON */}
      {comparison?.results && (
        <div className="mt-8 bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-4">Algorithm Comparison</h3>
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Algorithm</th>
                <th className="border p-2">Accuracy (%)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(comparison.results).map(([algo, acc]) => (
                <tr key={algo}>
                  <td className="border p-2">{algo}</td>
                  <td className="border p-2">{acc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
