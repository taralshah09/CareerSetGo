import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import HomePage from './pages/HomePage/HomePage'
import Navbar from './components/Navbar/Navbar'
import Footer from "./components/Footer/Footer"
import JobPage from "./pages/JobPage/JobPage"
import EmployerPage from "./pages/EmployerPage/EmployerPage"
import LoginPage from './pages/LoginPage/LoginPage'
import SignupPage from "./pages/SignupPage/SignupPage"
import FindJob from './pages/FindJob/FindJob'
import Dashboard from './pages/Dashboard/Dashboard'
import FindEmployer from './components/FindEmployers/FindEmployer'
import BrowseCandidate from './pages/BrowseCandidatePage/BrowseCandidatePage'
import ResumeBuilder from './pages/ResumeBuilder/ResumeBuilder'
import SkillsVerficationPage from './pages/SkillsVerificationPage/SkillsVerificationPage'
import PostJobForm from './pages/PostJobForm/PostJobForm'
import ChoicesGame from './pages/ChoicesGame/ChoicesGame'
import DashboardEmployer from './pages/DashboardEmployer/DashboardEmployer'
import WordToCV from './pages/WordToCV/WordToCV'

function App() {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === "/login" || location.pathname === "/signup";

  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    fullname: '',
    title: '',
    experience: '',
    education: '',
    personal_website: '',
  });

  // Fetch existing profile data
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        return;
      }
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user/profile/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData({
            fullname: data.fullname || '',
            title: data.title || '',
            experience: data.experience || '',
            education: data.education || '',
            personal_website: data.personal_website || '',
            role: data.role || ''
          });
          console.log(profileData)
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [navigate]);


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
        <Route path="/dashboard" element={profileData.role === "candidate" ? <Dashboard /> : <DashboardEmployer />}></Route>
        <Route path="/resume-builder" element={<ResumeBuilder />}></Route>
        <Route path="/enhance-resume" element={<WordToCV />}></Route>
        <Route path="/verify/:skillName" element={<SkillsVerficationPage />} ></Route>
        <Route path="/post" element={<PostJobForm />}></Route>
        <Route path="/choices-game" element={<ChoicesGame />}></Route>
      </Routes >


      {!hideNavbarFooter && <Footer />
      }
    </>
  )
}

export default App;
