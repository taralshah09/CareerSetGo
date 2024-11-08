import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import HomePage from './pages/HomePage/HomePage'
import LoginPage from "./pages/LoginPage/LoginPage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import Navbar from './components/Navbar/Navbar'
import Footer from "./components/Footer/Footer"


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
