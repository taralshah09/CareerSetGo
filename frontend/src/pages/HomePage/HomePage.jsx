import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import "./HomePage.css"; // Import your styles
import HeroSection from '../../components/HeroSection/HeroSection';
import PopularVacanies from '../../components/PopularVacanies/PopularVacanies';
import FlowChart from '../../components/FlowChart/FlowChart';
import PopularCategory from '../../components/PopularCategory/PopularCategory';
import FeaturedJobs from '../../components/FeaturedJobs/FeaturedJobs';
import Users from '../../components/Users/Users';
import ClientTestimonial from '../../components/ClientTestimonialComponents/ClientTestimonial'


const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch user profile when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await fetchWithAuth("http://127.0.0.1:8000/api/user/profile/"); // Updated endpoint
        setUserData(data); // Store user data
      } catch (error) {
        setErrorMessage("Failed to fetch user data: " + error.message);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      <HeroSection />
      <PopularVacanies />
      <FlowChart />
      <PopularCategory />
      <FeaturedJobs />
      <Users />
      <ClientTestimonial />
    
      {userData && (
        <div>
          <h2>Welcome, {userData.fullname}</h2>
          <p>Email: {userData.email}</p>
        </div>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};

export default HomePage;
