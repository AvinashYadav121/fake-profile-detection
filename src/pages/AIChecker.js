// import { useState } from "react";

// export default function AIChecker() {

//   const [username, setUsername] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [showCorrection, setShowCorrection] = useState(false);
//   const [message, setMessage] = useState("");

//   const API = process.env.REACT_APP_API_URL;

//   /* FETCH PROFILE */
//   const handleCheck = async () => {

//     if (!username) {
//       setError("Enter Instagram username");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setResult(null);
//     setShowCorrection(false);
//     setMessage("");

//     try {

//       const res = await fetch(`${API}/ai-detect/${username}`);
//       const data = await res.json();

//       if (data.error) {
//         setError(data.error);
//       } else {
//         setResult(data);
//       }

//     } catch (err) {

//       console.error(err);
//       setError("Failed to fetch profile");

//     }

//     setLoading(false);
//   };

//   /* SAVE FEEDBACK TO BACKEND */
//   const saveFeedback = async (label) => {

//     console.log("User selected:", label);

//     try {

//       const res = await fetch(`${API}/save-feedback`, {

//         method: "POST",

//         headers: {
//           "Content-Type": "application/json"
//         },

//         body: JSON.stringify({

//           username: result.username,

//           followers: result.followers,
//           following: result.following,
//           posts: result.posts,

//           followers_following_ratio: result.followers_following_ratio,

//           bio_length: result.bio_length,
//           bio_has_link: result.bio_has_link,
//           username_digit_count: result.username_digit_count,

//           is_private: result.is_private,
//           highlight_count: result.highlight_count,

//           has_profile_pic: result.has_profile_pic,
//           profile_image_face_detected:
//             result.profile_image_face_detected,

//           model_prediction: result.result,
//           user_feedback: label,

//           image_url: result.profile_pic

//         })

//       });

//       const data = await res.json();

//       console.log("Saved:", data);

//       setMessage("Feedback saved successfully!");
//       setShowCorrection(false);

//     } catch (err) {

//       console.error(err);
//       setMessage("Error saving feedback");

//     }

//   };

//   return (

//     <div className="max-w-xl mx-auto px-4 py-10">

//       <h2 className="text-3xl font-bold mb-6 text-center">
//         AI Fake Profile Detector
//       </h2>

//       {/* INPUT */}
//       <div className="flex flex-col sm:flex-row gap-2 mb-4">

//         <input
//           type="text"
//           placeholder="Enter Instagram username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="flex-1 border p-3 rounded"
//         />

//         <button
//           onClick={handleCheck}
//           className="bg-pink-500 text-white px-6 py-3 rounded hover:bg-pink-600"
//         >
//           Check
//         </button>

//       </div>

//       {/* LOADING */}
//       {loading && (
//         <p className="text-center text-blue-600 font-semibold">
//           Checking profile...
//         </p>
//       )}

//       {/* ERROR */}
//       {error && (
//         <div className="bg-red-100 text-red-700 p-3 rounded mt-4">
//           {error}
//         </div>
//       )}

//       {/* MESSAGE */}
//       {message && (
//         <div className="bg-green-100 text-green-700 p-3 rounded mt-4">
//           {message}
//         </div>
//       )}

//       {/* RESULT */}
//       {result && (

//         <div className="bg-white shadow-lg rounded-xl p-6 mt-6 text-center">

//           {/* PROFILE IMAGE */}
//           {result.profile_pic && (
//             <img
//               src={result.profile_pic}
//               alt="Profile"
//               className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
//             />
//           )}

//           <h3 className="text-xl font-bold">@{result.username}</h3>

//           <div className="flex flex-col sm:flex-row justify-center gap-4 mt-2 text-gray-600">

//             <p><b>{result.followers}</b> Followers</p>
//             <p><b>{result.posts}</b> Posts</p>

//           </div>

//           <div className="mt-4">

//             <p>
//               <b>Behaviour Score:</b>{" "}
//               {(result.tabular_score * 100).toFixed(1)}%
//             </p>

//             <p>
//               <b>Image Score:</b>{" "}
//               {(result.image_score * 100).toFixed(1)}%
//             </p>

//             <p className="mt-2 text-lg font-semibold">
//               Fake Risk: {(result.final_score * 100).toFixed(1)}%
//             </p>

//             <p
//               className={`mt-2 text-xl font-bold ${
//                 result.result === "Fake"
//                   ? "text-red-500"
//                   : "text-green-600"
//               }`}
//             >
//               {result.result}
//             </p>

//           </div>

//           {/* FEEDBACK */}
//           <div className="mt-6">

//             <p className="font-semibold">
//               Are you satisfied with this prediction?
//             </p>

//             <div className="flex justify-center gap-4 mt-3">

//               <button
//                 className="bg-green-600 text-white px-4 py-2 rounded"
//                 onClick={() => saveFeedback(result.result)}
//               >
//                 Yes
//               </button>

//               <button
//                 className="bg-red-600 text-white px-4 py-2 rounded"
//                 onClick={() => setShowCorrection(true)}
//               >
//                 No
//               </button>

//             </div>

//           </div>

//           {/* CORRECTION */}
//           {showCorrection && (

//             <div className="mt-4">

//               <p className="mb-2">Select correct label:</p>

//               <div className="flex justify-center gap-4">

//                 <button
//                   className="bg-blue-600 text-white px-4 py-2 rounded"
//                   onClick={() => saveFeedback("Real")}
//                 >
//                   Real
//                 </button>

//                 <button
//                   className="bg-gray-700 text-white px-4 py-2 rounded"
//                   onClick={() => saveFeedback("Fake")}
//                 >
//                   Fake
//                 </button>

//               </div>

//             </div>

//           )}

//         </div>

//       )}

//     </div>

//   );

// }



import { useState } from "react";

export default function AIChecker() {

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showCorrection, setShowCorrection] = useState(false);
  const [message, setMessage] = useState("");

  const API = process.env.REACT_APP_API_URL;

  /* FETCH PROFILE */
  const handleCheck = async () => {

    if (!username) {
      setError("Enter Instagram username");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setMessage("");

    try {

      const res = await fetch(`${API}/ai-detect/${username}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }

    } catch (err) {

      console.error(err);
      setError("Failed to fetch profile");

    }

    setLoading(false);
  };


  /* SAVE FEEDBACK */
  const saveFeedback = async (label) => {

    try {

      const res = await fetch(`${API}/save-feedback`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          username: result.username,

          followers: result.followers,
          following: result.following,
          posts: result.posts,

          followers_following_ratio:
            result.followers_following_ratio,

          bio_length: result.bio_length,
          bio_has_link: result.bio_has_link,
          username_digit_count:
            result.username_digit_count,

          is_private: result.is_private,
          highlight_count: result.highlight_count,

          has_profile_pic: result.has_profile_pic,
          profile_image_face_detected:
            result.profile_image_face_detected,

          model_prediction: result.result,
          user_feedback: label,

          image_path: result.profile_pic

        })

      });

      const data = await res.json();

      console.log(data);

      setMessage("Feedback saved successfully!");
      setShowModal(false);
      setShowCorrection(false);

    } catch (err) {

      console.error(err);
      setMessage("Error saving feedback");

    }

  };



  return (

    <div className="max-w-xl mx-auto px-4 py-10">

      <h2 className="text-3xl font-bold mb-6 text-center">
        AI Fake Profile Detector
      </h2>

      {/* INPUT */}

      <div className="flex flex-col sm:flex-row gap-2 mb-4">

        <input
          type="text"
          placeholder="Enter Instagram username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 border p-3 rounded"
        />

        <button
          onClick={handleCheck}
          className="bg-pink-500 text-white px-6 py-3 rounded hover:bg-pink-600"
        >
          Check
        </button>

      </div>


      {/* LOADING */}

      {loading && (
        <p className="text-center text-blue-600 font-semibold">
          Checking profile...
        </p>
      )}


      {/* ERROR */}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mt-4">
          {error}
        </div>
      )}


      {/* SUCCESS MESSAGE */}

      {message && (
        <div className="bg-green-100 text-green-700 p-3 rounded mt-4">
          {message}
        </div>
      )}



      {/* RESULT */}

      {result && (

        <div className="bg-white shadow-lg rounded-xl p-6 mt-6 text-center">

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


          {/* OPEN FEEDBACK MODAL */}

          <button
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={() => setShowModal(true)}
          >
            Give Feedback
          </button>

        </div>

      )}



      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">

            <button
              className="absolute top-3 right-3"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-center mb-4">
              Feedback
            </h3>

            <p className="text-center mb-4">
              Was the prediction correct?
            </p>

            <div className="flex justify-center gap-4 mb-4">

              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={() => saveFeedback(result.result)}
              >
                Yes
              </button>

              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => setShowCorrection(true)}
              >
                No
              </button>

            </div>

            {showCorrection && (

              <div className="text-center">

                <p className="mb-2 font-semibold">
                  Select correct label
                </p>

                <div className="flex justify-center gap-4">

                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => saveFeedback("Real")}
                  >
                    Real
                  </button>

                  <button
                    className="bg-gray-700 text-white px-4 py-2 rounded"
                    onClick={() => saveFeedback("Fake")}
                  >
                    Fake
                  </button>

                </div>

              </div>

            )}

          </div>

        </div>

      )}

    </div>

  );

}