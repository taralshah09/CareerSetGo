import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import HomePage from './pages/HomePage/HomePage'
import LoginPage from "./pages/LoginPage/LoginPage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import Navbar from './components/Navbar/Navbar'
import Footer from "./components/Footer/Footer"
import JobPage from './pages/JobPage/JobPage.jsx';
import EmployerPage from './pages/EmployerPage/EmployerPage.jsx'
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage.jsx'
import BrowseCandidatePage from './pages/BrowseCandidatePage/BrowseCandidatePage.jsx'


function App() {

  return (
    <>
      {/* <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
      <Footer /> */}
      {/* <JobPage></JobPage> */}
      {/* <ResetPasswordPage></ResetPasswordPage> */}
      <BrowseCandidatePage></BrowseCandidatePage>
      {/* <EmployerPage></EmployerPage> */}
      
      {/* biju kayu hatu page signup login job and employer wait hu karu import  */}
    </>
  )
}

export default App
