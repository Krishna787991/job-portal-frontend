import React, { useEffect, useState } from 'react';
import profilepic from "../images/aboutpic.png"
import axios from 'axios';
import { FaLocationArrow } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { SiLeetcode } from "react-icons/si";
import Loader from './Loader';

const About = () => {
  const [user, setUser] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const getUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/user/", { withCredentials: true })
      setUser(response.data.user)
      console.log(response.data.user)
      setIsLoading(false)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUserDetails()

  }, [])

  const userData = { name: user.name, email: user.email, phone: 9828915835, role: user.role }
  return (
    <div className="mx-auto w-4/5 mt-10">
      <div className="flex">
        {/* Left side */}
        <div className="w-1/3 pr-8 shadow-md">
          {/* Profile photo */}
          <div className="profile-img flex justify-center mb-8">
            <img src={userData.name === "VKrishna" ? thapapic : profilepic} alt="Profile" className="w-32 h-32 rounded-full" />
          </div>
          {/* Field of your details */}
          <div className=" mx-10 profile-work">
            <ul className="list-disc pl-4">
              <li> <button className="bg-blue-500 hover:bg-blue-700 text-primary font-bold py-2 px-4 rounded">Personal details</button></li>
              {
                userData.role === 'applicant' ? <li> <button className="bg-blue-500 hover:bg-blue-700 text-primary font-bold py-2 px-4 rounded">Resume</button></li> : ""
              }
              <li> <button className="bg-blue-500 hover:bg-blue-700 text-primary font-bold py-2 px-4 rounded">Update Profile</button></li>
              <li> <button className="bg-blue-500 hover:bg-blue-700 text-primary font-bold py-2 px-4 rounded"><Link to={userData.role === 'recruiter' ? "/my-job" : "/applied-job"} >{userData.role === 'recruiter' ? "My Jobs" : "Applied Jobs"} </Link></button></li>
            </ul>
          </div>
        </div>
        {/* Right side */}
        {isLoading ? <Loader /> :
          <div className="w-3/5 pl-5 about-info shadow-md">
            <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
            <div className="tab-content profile-tab">
              <div className="tab-pane fade show active" id="home" role="tabpanel">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2"><span className="font-semibold">Name:</span> {userData.name}</p>
                    <p className="mb-2"><span className="font-semibold">Email:</span> {userData.email}</p>
                  </div>
                  <div>
                    <p className="mb-2"><span className="font-semibold">Phone:</span> {userData.phone}</p>
                    <p className="mb-2"><span className="font-semibold">Role:</span>{userData.role}</p>

                  </div>
                </div>
              </div>
              <div className="profile-work mt-5">
                <h2 className="text-lg font-semibold mb-1">Works Links</h2>
                <ul className="list-disc pl-4">
                  <li><Link to="https://leetcode.com/krishna7879/" target='_blank' className="text-blue-500 hover:text-blue-700 font-semibold py-1 px-2  rounded-md hover:bg-blue-50"  >Leetcode </Link></li>
                  <li><Link to="https://github.com/Krishna7879" target='_blank' className="text-blue-500 hover:text-blue-700 font-semibold py-1 px-2  rounded-md hover:bg-blue-50">Github</Link></li>
                  <li><Link to="https://www.linkedin.com/in/krishna-patel-b50946242/" target='_blank' className="text-blue-500 hover:text-blue-700 font-semibold py-1 px-2  rounded-md hover:bg-blue-50">LinkedIn</Link></li>
                </ul>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default About;
