import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClipLoader } from "react-spinners";

// Importing pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";

// React Lazy
const Signup = lazy(() => import("./pages/Signup"));

// Importing components
import Footer from "./components/Footer";

// Importing contexts
import User from "./contexts/User";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const override = {
  borderColor: "white",
  margin: "0",
  padding: "0",
};

function App() {
  return (
    <div className="App bg-cyan-500 min-h-screen pb-14">
      <BrowserRouter>
        <User>
          <Suspense
            fallback={
              <div className="h-screen w-screen flex justify-center items-center">
                <ClipLoader size={50} loading={true} cssOverride={override} />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Suspense>
        </User>
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose="5000"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        ></ToastContainer>
      </BrowserRouter>
    </div>
  );
}

export default App;
