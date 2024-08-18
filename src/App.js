import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import LandingPage from "./components/LandingPage";
import { UserAuthContextProvider } from "./context/UserAuthContext";
// import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import NavigationBar from "./components/Navbar";
import Calendar from "./components/CalendarView";
import ConfirmationPage from "./components/ConfirmationPage";
import Info from "./components/Info";

function App() {
  return (
    <div>
      <UserAuthContextProvider>
        <NavigationBar />
        <Routes>
          {/* <Route
            path="/CalendarView"
            element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="/ConfirmationPage"
            element={
              <ProtectedRoute>
                <ConfirmationPage />
              </ProtectedRoute>
            }
          /> */}
          <Route path="/ConfirmationPage" element={<ConfirmationPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/Info" element={<Info />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/CalendarView" element={<Calendar />} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
