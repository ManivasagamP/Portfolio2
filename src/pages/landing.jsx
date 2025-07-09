import React from 'react'
import { Button } from '../components/ui/Button'
import {Link} from "react-router-dom"

function LandingPage() {
  return (
    <div className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
      <section className='text-center text-white flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-extrabold sm:text-6xl lg:text-7xl py-4 '>
          Find Your Dream job{" "}
          <span className='flex items-center justify-center'>and get hirred</span>
        </h1>
        <img src="/logo.png" alt="logo" className='h-30 mt-8 mb-8' />
        <div>
          <p className=' text-xl sm:text-2xl lg:text-3xl'>Explore thousands of job listings or find the perfect candidate</p>
        </div>
      </section>

      <div className='flex  justify-center items-center gap-4'>
        <Link to="/jobs" >
          <Button variant="yellow" size="lg"> Find Jobs</Button>
        </Link>
        <Link to="/post-job">
          <Button variant="red" size="lg"> Post a job</Button>
        </Link>

      </div>
    </div>
  )
}

export default LandingPage 