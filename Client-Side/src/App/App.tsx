import { Box } from "@mui/system";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "../Components/UI/Loader";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ProtectProgressRoute,
  ProtectResultRoute,
} from "../guards/RoutedGuard";

// implementing dynamic importing for less initial load time and better performance.
const Welcoming = lazy(() => import("../Pages/Welcoming"));
const Test = lazy(() => import("../Pages/Home"));
const Results = lazy(() => import("../Pages/Result"));
const NotFound = lazy(() => import("../Pages/NotFound"));
       
function App() {
  return (
    <Box>
      <ToastContainer />
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcoming />} />
            <Route path="/home" element={<Welcoming />} />
            <Route
              path="/test"
              element={
                <ProtectProgressRoute>
                  <Test />
                </ProtectProgressRoute>
              }
            />
            <Route
              path="/result"
              element={
                <ProtectResultRoute>
                  <Results />
                </ProtectResultRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </Box>
  );
}

export default App;
