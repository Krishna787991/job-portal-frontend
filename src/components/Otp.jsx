import axios from 'axios';
import React, { useState } from 'react';
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AlertComponent from './AlertComponent';
// import showAlert from './Alert';

function Otp() {
  // console.log(props)
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()
  
  // error or success
  const [Error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`http://localhost:3000/api/v1/user/verifyotp/${otp}`, { withCredentials: true })
    console.log(response.data)
    if (response.data.Status == 201) {
      setSuccess(true)
      setContent(response.data.Message)
      setTimeout(() => {
        navigate(`/resetpassword/${response.data.id}`)
      }, 500)
    }
    else {
      setError(true)
      setContent(response.data.Error)
    }
  }


  const handleOtpChange = (e) => {
    const value = e.target.value;

    // Only allow numeric digits and limit to four characters
    const numericValue = value.replace(/\D/g, '').slice(0, 4);
    setOtp(numericValue);

  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <div>
          {Error ? <AlertComponent severity={"error"} content={content} Error={Error} setError={setError} success={success} setSuccess={setSuccess} /> : ""}
          {success ? <AlertComponent severity={"success"} content={content} Error={Error} setError={setError} success={success} setSuccess={setSuccess} /> : ""}

          <h2 className="text-center text-3xl font-extrabold text-gray-900">Enter Otp </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                maxLength={4} // Limit the input to four characters
                pattern="[0-9]*" // Allow only numeric input
                placeholder="Enter OTP"
                className="text-center tracking-wider appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                style={{ letterSpacing: '1rem' }}
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

export default Otp;
