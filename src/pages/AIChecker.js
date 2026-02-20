// import { useState } from "react";

// export default function AIChecker() {

//   const [username, setUsername] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleCheck = async () => {

//     if (!username) {
//       alert("Enter Instagram username");
//       return;
//     }

//     setLoading(true);
//     setResult(null);

//     try {
//       const res = await fetch(
//         `${process.env.REACT_APP_API_URL}/ai-detect/${username}`
//       );

//       const data = await res.json();

//       if (data.error) {
//         setResult({ error: data.error });
//       } else {
//         setResult(data);
//       }

//     } catch (err) {
//       setResult({ error: "Server Error" });
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">

//       <h2 className="text-3xl font-bold mb-6 text-center">
//         🤖 AI Instagram Profile Check
//       </h2>

//       <div className="flex gap-3">
//         <input
//           type="text"
//           placeholder="Enter Instagram username"
//           className="flex-1 border p-3 rounded"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />

//         <button
//           onClick={handleCheck}
//           className="bg-pink-600 text-white px-6 py-2 rounded"
//         >
//           Check
//         </button>
//       </div>

//       {loading && (
//         <p className="text-center mt-4 text-blue-500">
//           Analyzing profile...
//         </p>
//       )}

//       {result?.error && (
//         <div className="mt-6 bg-red-100 p-4 rounded">
//           {result.error}
//         </div>
//       )}

//       {result && !result.error && (
//         <div className="mt-6 bg-white p-6 rounded shadow">

//           <h3 className="text-xl font-bold mb-3">
//             @{result.username}
//           </h3>

//           <p>Followers: {result.followers}</p>
//           <p>Posts: {result.posts}</p>

//           <hr className="my-4"/>

//           <p>
//             Behaviour Score: <b>{(result.tabular_score * 100).toFixed(1)}%</b>
//           </p>

//           <p>
//             Image Risk: <b>{(result.image_score * 100).toFixed(1)}%</b>
//           </p>

//           <p>
//             Final Fake Risk:
//             <b className="ml-2">
//               {(result.final_score * 100).toFixed(1)}%
//             </b>
//           </p>

//           <h3 className={`mt-4 text-2xl font-bold ${
//             result.result === "Fake" ? "text-red-600" : "text-green-600"
//           }`}>
//             {result.result}
//           </h3>

//         </div>
//       )}

//     </div>
//   );
// }
import { useState } from "react";

export default function AIDetect() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    if (!username) {
      setError("Enter Instagram username");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/ai-detect/${username}`
      );

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Failed to fetch profile");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6">

      <h2 className="text-3xl font-bold mb-6 text-center">
        AI Fake Profile Detector
      </h2>

      {/* INPUT */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Instagram username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 border p-3 rounded"
        />
        <button
          onClick={handleCheck}
          className="bg-pink-500 text-white px-6 rounded"
        >
          Check
        </button>
      </div>

      {loading && (
        <p className="text-center text-blue-600 font-semibold">
          Checking profile...
        </p>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mt-4">
          {error}
        </div>
      )}

      {/* RESULT */}
      {result && (
        <div className="bg-white shadow-lg rounded p-6 mt-6 text-center">

          {/* PROFILE IMAGE */}
          {result.profile_pic && (
            <img
              src={result.profile_pic}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
            />
          )}

          <h3 className="text-xl font-bold">@{result.username}</h3>

          <div className="flex justify-center gap-6 mt-2 text-gray-600">
            <p><b>{result.followers}</b> Followers</p>
            <p><b>{result.posts}</b> Posts</p>
          </div>

          <div className="mt-4">

            <p>
              <b>Behaviour Score:</b>{" "}
              {(result.tabular_score * 100).toFixed(1)}%
            </p>

            <p>
              <b>Image Score:</b>{" "}
              {(result.image_score * 100).toFixed(1)}%
            </p>

            <p className="mt-2 text-lg font-semibold">
              Fake Risk: {(result.final_score * 100).toFixed(1)}%
            </p>

            <p
              className={`mt-2 text-xl font-bold ${
                result.result === "Fake"
                  ? "text-red-500"
                  : "text-green-600"
              }`}
            >
              {result.result}
            </p>

          </div>

        </div>
      )}
    </div>
  );
}
