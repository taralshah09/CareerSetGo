import React from 'react'
import "./HomePage.css"
import HeroSection from '../../components/HeroSection/HeroSection'
import PopularVacanies from '../../components/PopularVacanies/PopularVacanies'
import FlowChart from '../../components/FlowChart/FlowChart'
import PopularCategory from '../../components/PopularCategory/PopularCategory'
import FeaturedJobs from '../../components/FeaturedJobs/FeaturedJobs'
import Users from '../../components/Users/Users'

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <PopularVacanies />
      <FlowChart />
      <PopularCategory />
      <FeaturedJobs />
      <Users/>

    </>
  )
}

export default HomePage
