import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {

    if (password === "admin123") {
      localStorage.setItem("admin", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Wrong Password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">

      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

      <input
        type="password"
        placeholder="Enter Admin Password"
        className="border p-2 mb-3"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={handleLogin}
      >
        Login
      </button>

    </div>
  );
}