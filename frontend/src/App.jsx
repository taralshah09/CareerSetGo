import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import Footer from "./components/Footer/Footer";
import JobPage from "./pages/JobPage/JobPage";
import EmployerPage from "./pages/EmployerPage/EmployerPage";
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from "./pages/SignupPage/SignupPage";
import FindJob from './pages/FindJob/FindJob';
import Dashboard from './pages/Dashboard/Dashboard';
import FindEmployer from './components/FindEmployers/FindEmployer';
import BrowseCandidate from './pages/BrowseCandidatePage/BrowseCandidatePage';
import ResumeBuilder from './pages/ResumeBuilder/ResumeBuilder';
import SkillsVerificationPage from './pages/SkillsVerificationPage/SkillsVerificationPage';
import PostJobForm from './pages/PostJobForm/PostJobForm';
import Courses from './pages/Courses/Courses';
import ChoicesGame from './pages/ChoicesGame/ChoicesGame';
import DashboardEmployer from './pages/DashboardEmployer/DashboardEmployer';
import WordToCV from './pages/WordToCV/WordToCV';
import Roadmap from './pages/Roadmap/Roadmap';
import Profile from './components/Profile/Profile';
import LoginSuccess from './components/LoginSuccess'; // Import the new component
import { useAuth } from './auth/AuthProvider'; // Ensure this is imported
import { fetchWithAuth } from './utils/fetchWithAuth';

function App() {
  const location = useLocation();
  const { user, setUser: loginUser, logoutUser } = useAuth(); // Use loginUser instead of setUser
  const navigate = useNavigate();
  const hideNavbarFooter = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/login-success";

  const [profileData, setProfileData] = useState({
    fullname: '',
    title: '',
    experience: '',
    education: '',
    personal_website: '',
    role: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      try {
        const data = await fetchWithAuth('/api/user/profile/');
        setProfileData({
          fullname: data.fullname || '',
          title: data.title || '',
          experience: data.experience || '',
          education: data.education || '',
          personal_website: data.personal_website || '',
          role: data.role || ''
        });
        // loginUser({ ...data, role: data.role }); // Update user in Auth context
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error.message === "Session expired. Please log in again.") {
          logoutUser();
          navigate('/login');
        }
      }
    };

    fetchProfile();
  }, [navigate, loginUser, logoutUser]);
  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/find-job" element={<FindJob />} />
        <Route path="/login" element={<LoginPage />} /> {/* No need to pass setUser, useAuth handles it */}
        <Route path="/login-success" element={<LoginSuccess />} /> {/* New route */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/employers" element={<EmployerPage />} />
        <Route path="/dashboard" element={user?.role === "candidate" ? <Dashboard /> : <DashboardEmployer />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/enhance-resume" element={<WordToCV />} />
        <Route path="/verify/:skillName" element={<SkillsVerificationPage />} />
        <Route path="/post" element={<PostJobForm />} />
        <Route path="/course" element={<Courses />} />
        <Route path="/job/:id" element={<JobPage />} />
        <Route path="/choices-game" element={<ChoicesGame />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default App;