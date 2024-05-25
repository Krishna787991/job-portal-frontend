import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate,useParams,useLocation } from 'react-router-dom';

function Role({isloggedIn,setIsLoggedIn}) {
  const navigate = useNavigate()
  const location = useLocation();

  const [role, setRole] = useState('');
  const [isPresent,setIsPresent]=useState(false)

  let name,email,params;
  params = new URLSearchParams(location.search); 
  name = params.get('name');
  email = params.get('email');

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(name,email)
    try{
      const response=await axios.post("http://localhost:3000/api/v1/user/google/role",{role,name,email},{withCredentials:true})
      console.log(response)
      if(response.data.Status==409){
        setRole(response.data.role)
        setIsLoggedIn(true)
        setIsPresent(true);
        navigate("/")
      }
      else if(response.data.Status==201){
        setIsLoggedIn(true)
        navigate("/")
      }
    }catch(err){
      window.alert(err)
    }
  };


  const checkRole=async(email)=>{
    const response=await axios.post("http://localhost:3000/api/v1/user/google/role",{role,name,email},{withCredentials:true})
    if(response.data.Status==409){
      setRole(response.data.role)
      setIsPresent(true)
    }
  }

  useEffect(()=>{
    checkRole(email);
  })

 

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">You are almost done Please select role to continue </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm">
              <div className='mb-2'>
                <label htmlFor="role" className="sr-only">Role</label>
                <select
                  disabled={isPresent}
                  id="role"
                  name="role"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={role}
                  onChange={(e) => setRole(e.target.value)
                  }
                >
                  <option value="" >Select Role</option>
                  <option value="applicant">Job applicant</option>
                  <option value="recruiter">Recruiter</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                submit
              </button>
            </div>
          </form>


        </div>
      </div>
    </>
  );
}

export default Role;
