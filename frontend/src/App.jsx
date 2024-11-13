import { useState } from 'react'
import { Routes, Route, useLocation } from "react-router-dom"
import HomePage from './pages/HomePage/HomePage'
import Navbar from './components/Navbar/Navbar'
import Footer from "./components/Footer/Footer"
import JobPage from "./pages/JobPage/JobPage"
import EmployerPage from "./pages/EmployerPage/EmployerPage"
import LoginPage from './pages/LoginPage/LoginPage'
import SignupPage from "./pages/SignupPage/SignupPage"
import ProfileForm from "./pages/ProfileForm/ProfileForm"
function App() {
  const location = useLocation();

  // Check if the current path is "/login" or "/signup"
  const hideNavbarFooter = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/jobs" element={<JobPage />}></Route>
        <Route path="/employers" element={<EmployerPage />}></Route>
        <Route path="/profile" element={<ProfileForm />}></Route>
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  )
}

export default App
