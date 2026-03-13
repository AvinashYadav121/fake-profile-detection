
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {

  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // Check admin email
  const isAdmin = user?.email === "admin@gmail.com";

  return (

    <nav className="bg-gray-900 text-white px-4 md:px-6 py-4">

      <div className="flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="font-bold text-lg">
          Fake Profile Detection
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-4 items-center">

          <Link to="/">Home</Link>
          <Link to="/awareness">Awareness</Link>

          {/* SHOW ONLY AFTER LOGIN */}
          {user && (
            <>
              <Link to="/dataset">Dataset</Link>
              <Link to="/compare">Comparison</Link>
              <Link to="/ai-check">AI Checker</Link>
              <Link to="/check">Check</Link>
              <Link to="/quiz">Quiz</Link>
              <Link to="/report">Report</Link>
            </>
          )}

          {/* ADMIN PANEL BUTTON */}
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="bg-purple-600 px-3 py-1 rounded"
            >
              Admin
            </Link>
          )}

          {/* AUTH BUTTONS */}
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

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (

        <div className="flex flex-col gap-3 mt-4 md:hidden">

          <Link to="/" onClick={()=>setMenuOpen(false)}>Home</Link>
          <Link to="/awareness" onClick={()=>setMenuOpen(false)}>Awareness</Link>

          {user && (
            <>
              <Link to="/dataset" onClick={()=>setMenuOpen(false)}>Dataset</Link>
              <Link to="/compare" onClick={()=>setMenuOpen(false)}>Comparison</Link>
              <Link to="/ai-check" onClick={()=>setMenuOpen(false)}>AI Checker</Link>
              <Link to="/check" onClick={()=>setMenuOpen(false)}>Check</Link>
              <Link to="/quiz" onClick={()=>setMenuOpen(false)}>Quiz</Link>
              <Link to="/report" onClick={()=>setMenuOpen(false)}>Report</Link>
            </>
          )}

          {/* ADMIN MOBILE BUTTON */}
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="bg-purple-600 px-3 py-1 rounded w-fit"
            >
              Admin
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-blue-600 px-3 py-1 rounded w-fit"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-green-600 px-3 py-1 rounded w-fit"
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
                className="bg-red-600 px-3 py-1 rounded w-fit"
              >
                Logout
              </button>
            </>
          )}

        </div>

      )}

    </nav>
  );
}