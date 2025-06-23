import SignInPage from "./SignInPage";
import SignUpPage from "./Signup";
import DashboardPage from "./DashboardPage";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Error from "./Error";

//  Toastify imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      {/* Your routes */}
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>

      {/*  Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
