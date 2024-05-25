import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from '../Pages/Loader';
import AlertComponent from './AlertComponent';

function ResetPassword() {
    // console.log(props)
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfrimPassword] = useState("");

    // error or success
    const [Error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [content, setContent] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password == confirmPassword) {
            const response = await axios.post(`http://localhost:3000/api/v1/user/resetpassword/${id}`, { password }, { withCredentials: true })
            console.log(response)
            if (response.data.Status == 201) {
                setSuccess(true)
                setContent(response.data.Message)
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
            else {
                setError(true)
                setContent(response.data.Error)
                setTimeout(() => {
                    navigate("/login")
                }, 1000);
            }
        }
    }

    const verifyToken = async () => {
        setTimeout(() => {
            setLoading(true)
        }, 1000)
    }

    useEffect(() => {
        verifyToken()
    }, [])

    return (
        <>
            {loading ?
                <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
                        <div>
                            {Error ? <AlertComponent severity={"error"} content={content} Error={Error} setError={setError} success={success} setSuccess={setSuccess} /> : ""}
                            {success ? <AlertComponent severity={"success"} content={content} Error={Error} setError={setError} success={success} setSuccess={setSuccess} /> : ""}

                            <h2 className="text-center text-3xl font-extrabold text-gray-900">Set your new password</h2>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit} >
                            <input type="hidden" name="remember" value="true" />
                            <div className="rounded-md shadow-sm">

                                <div className="mb-4">
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="New Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input
                                        id="cpassword"
                                        name="cpassword"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="confirm New Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfrimPassword(e.target.value)}
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
                : <div>
                    <p className='sweet-loading' style={{ position: 'fixed', top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }}>Please wait</p>
                    <Loader /></div>}
        </>
    );
}

export default ResetPassword;
