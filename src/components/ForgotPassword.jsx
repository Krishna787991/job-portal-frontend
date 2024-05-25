import axios from 'axios';
import React, { useState } from 'react';
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AlertComponent from './AlertComponent';

function ForgotPassword() {
  // console.log(props)
  const navigate = useNavigate()
  const [email, setEmail] = useState('');

    // error or success
  const [Error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [content, setContent] = useState("");


  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response=await axios.post("http://localhost:3000/api/v1/user/forgotpassword",{email},{withCredentials:true})
    console.log(response.data)
    if(response.data.Status==201){
      setSuccess(true)
      setContent(response.data.message)
      setTimeout(()=>{
        navigate("/otp")
      },1000)
    }
    else{
      setError(true)
      setContent(response.data.Error)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <div>
        {Error ? <AlertComponent   severity={"error"} content={content} Error={Error} setError={setError} success={success} setSuccess={setSuccess} /> : ""}
          {success ? <AlertComponent severity={"success"} content={content} Error={Error} setError={setError} success={success} setSuccess={setSuccess} /> : ""}

          <h2 className="text-center text-3xl font-extrabold text-gray-900">Forgot Password </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>         
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>

 
      </div>
    </div>
  );
}

export default ForgotPassword;
