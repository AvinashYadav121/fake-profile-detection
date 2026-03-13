import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SocialAuthButtons from "../components/SocialAuthButtons";

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) navigate(from, { replace: true });

  const login = async () => {
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-md">

        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
          Welcome to <span className="text-blue-600">Fake Profile Detection</span>
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-sm text-center">
            {error}
          </div>
        )}

        <input
          className="border w-full p-2 sm:p-3 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border w-full p-2 sm:p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <div className="text-center my-4 text-gray-400 text-sm">OR</div>

        <SocialAuthButtons
          setError={setError}
          setLoading={setLoading}
          navigate={navigate}
          from={from}
        />

        <p className="text-center text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}