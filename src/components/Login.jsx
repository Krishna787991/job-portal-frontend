import axios from 'axios';
import React, { useState } from 'react';
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AlertComponent from "./AlertComponent"

function Login({ isloggedIn, setIsLoggedIn }) {
  // console.log(props)
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // error or success
  const [Error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [content, setContent] = useState("");


  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.post("http://localhost:3000/api/v1/user/login", { email, password }, { withCredentials: true })
      console.log(response)
      if (response.status != 201) {
        // window.alert(response.data.Error)
        setError(true)
        setContent(response.data.Error)
        console.log(response)
      }
      else {
        setIsLoggedIn(true)
        setSuccess(true)
        setContent(response.data.Message + " you will be redirect to home page please wait")
        setTimeout(() => {
          navigate("/")
        }, 500)
      }
    }
    catch (err) {
      // navigate("/login")
      window.alert(err)
    }
  };

  const LoginWithGoogle = () => {
    window.open("http://localhost:3000/auth/google/callback", "_self")
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

        <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
          <div>
          {Error ? <AlertComponent   severity={"error"} content={content} Error={Error} setError={setError} success={success} setSuccess={setSuccess} /> : ""}
          {success ? <AlertComponent severity={"success"} content={content} Error={Error} setError={setError} success={success} setSuccess={setSuccess} /> : ""}

            <h2 className="text-center text-3xl font-extrabold text-gray-900">Log in</h2>
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
              <div className="mb-4">
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Link to="/forgotpassword"
                className="mx-1 relative block w-full placeholder-blue-500 text-blue  -900  sm:text-sm"

              >Forgot password ?</Link>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log in
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Or log in with</p>
            <div className="mt-2 flex justify-center space-x-2">
              <button className="bg-blue-500 px-4 py-2 rounded-md" onClick={LoginWithGoogle}><FcGoogle className="size-8" /></button>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default Login;
