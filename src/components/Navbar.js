
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";

// export default function Navbar() {
//   const { user } = useAuth();

//   return (
//     <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
//       <Link to="/" className="font-bold text-lg">
//         Fake Profile Detection
//       </Link>

//       <div className="flex gap-4 items-center">
//         <Link to="/awareness">Awareness</Link>
//         <Link to="/dataset">Dataset</Link>
//         <Link to="/compare">Compare</Link>

//         {user ? (
//           <>
//             <span className="text-sm">
//               {user.displayName || user.email}
//             </span>
//             <button
//               onClick={() => signOut(auth)}
//               className="bg-red-500 px-3 py-1 rounded"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/register">Register</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }


import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      {/* LOGO */}
      <Link to="/" className="font-bold text-lg">
        Fake Profile Detection
      </Link>

      {/* LINKS */}
      <div className="flex gap-4 items-center">
        <Link to="/">Home</Link>
        <Link to="/awareness">Awareness</Link>
        <Link to="/dataset">Dataset</Link>
        <Link to="/compare">Comparison</Link>
        <Link to="/check">Check</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/report">Report</Link>

        {/* AUTH SECTION */}
        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-blue-600 px-3 py-1 rounded"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-600 px-3 py-1 rounded"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-sm opacity-80">
              {user.displayName || user.email}
            </span>
            <button
              onClick={() => signOut(auth)}
              className="bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
