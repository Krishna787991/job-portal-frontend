import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import CreateJob from './Pages/CreateJob'
import Login from './components/Login'
import Signup from './components/Signup'
import MyJobs from './Pages/MyJobs'
import JobDetails from './Pages/JobDetails'
import EditJob from './Pages/EditJob'
import Home from './Pages/Home'
import About from './Pages/About'
import AppliedJobs from './Pages/AppliedJobs'
import Applicant from './Pages/Applicant'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Role from './components/Role'
import Otp from './components/Otp'

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [recruiter, setRecruiter] = useState(false)
  const [JobDetailsData, setJobDetailsData] = useState({
    id: "",
    companyName: "",
    jobTitle: "",
    companyLogo: "",
    minPrice: "",
    maxPrice: "",
    salaryType: "",
    jobLocation: "",
    postingDate: "",
    experienceLevel: "",
    employmentType: "",
    description: "",
    postedEmail: "",
    skills: []
  })


  const getDataForJobDetails = (data) => {
    // console.log(data._id)
    setJobDetailsData({
      id: data._id,
      companyName: data.companyName,
      jobTitle: data.jobTitle,
      companyLogo: data.companyLogo,
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
      salaryType: data.salaryType,
      jobLocation: data.jobLocation,
      postingDate: data.postingDate,
      experienceLevel: data.experienceLevel,
      employmentType: data.employmentType,
      description: data.description,
      postedEmail: data.postedEmail,
      skills: [...data.skills]
    })
  }

  return (
    <>
      <Navbar isloggedIn={isloggedIn} setIsLoggedIn={setIsLoggedIn} recruiter={recruiter} setRecruiter={setRecruiter} />

      <Routes>
        <Route exact path="/" element={<Home getDataForJobDetails={getDataForJobDetails} />} />
        <Route exact path="/post-job" element={<CreateJob />} />
        <Route exact path="/login" element={<Login isloggedIn={isloggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route exact path="/signup" element={<Signup isloggedIn={isloggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/my-job' element={<MyJobs />} />
        <Route exact path="/job-details/:id" element={JobDetailsData ? <JobDetails JobDetailsData={JobDetailsData} recruiter={recruiter} isloggedIn={isloggedIn} /> : "loading"} />

        <Route exact path="/edit-jobs/:jobs_id" element={<EditJob />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/applied-job" element={<AppliedJobs />} />
        <Route exact path="/applicant/:jobID" element={<Applicant />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/resetpassword/:id" element={<ResetPassword />} />
        <Route exact path="/role" element={<Role isloggedIn={isloggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route exact path="/otp" element={<Otp />} />

      </Routes>
    </>
  )
}
export default App

