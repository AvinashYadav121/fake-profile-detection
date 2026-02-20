import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Awareness from "./pages/Awareness";
import DatasetModels from "./pages/DatasetModels";
import AlgorithmComparison from "./pages/AlgorithmComparison";
import CheckProfile from "./pages/CheckProfile";
import Quiz from "./pages/Quiz";
import Report from "./pages/Report";
import AIChecker from "./pages/AIChecker";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminExport from "./pages/AdminExport";



import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* ALWAYS VISIBLE */}
        <Navbar />

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/awareness" element={<Awareness />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/dataset"
            element={
              <ProtectedRoute>
                <DatasetModels />
              </ProtectedRoute>
            }
          />

          <Route
            path="/compare"
            element={
              <ProtectedRoute>
                <AlgorithmComparison />
              </ProtectedRoute>
            }
          />

          <Route
            path="/check"
            element={
              <ProtectedRoute>
                <CheckProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-check"
            element={
              <ProtectedRoute>
                <AIChecker />
              </ProtectedRoute>
            }
          />

          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            }
          />

          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            }
          />

          {/* ADMIN ROUTE (FIXED) */}
          <Route
            path="/admin/export"
            element={
              <ProtectedRoute>
                <AdminExport />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* ALWAYS VISIBLE */}
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
