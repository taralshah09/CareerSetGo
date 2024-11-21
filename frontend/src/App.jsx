import { useState } from 'react'
import { Routes, Route, useLocation } from "react-router-dom"
import HomePage from './pages/HomePage/HomePage'
import Navbar from './components/Navbar/Navbar'
import Footer from "./components/Footer/Footer"
import JobPage from "./pages/JobPage/JobPage"
import EmployerPage from "./pages/EmployerPage/EmployerPage"
import LoginPage from './pages/LoginPage/LoginPage'
import SignupPage from "./pages/SignupPage/SignupPage"
import FindJob from './pages/FindJob/FindJob'
import Dashboard from './pages/Dashboard/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder/ResumeBuilder'
import PostJobForm from './pages/PostJobForm/PostJobForm'
import ProfileForm from './pages/ProfileForm/ProfileForm'
import CourseList from './pages/Courses/course'

function App() {
  const location = useLocation();

  const hideNavbarFooter = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route index path="/" element={<HomePage />}></Route>
        <Route path="/find-job" element={<FindJob />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/jobs" element={<JobPage />}></Route>
        <Route path="/employers" element={<EmployerPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/resume-builder" element={<ResumeBuilder />}></Route>
        <Route path="/post" element={<PostJobForm />}></Route>
        <Route path="/me" element={<ProfileForm />}></Route>
        <Route path="/course" element={<CourseList />}></Route>
        
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  )
}

export default App
