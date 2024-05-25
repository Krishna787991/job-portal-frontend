import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaBarsStaggered, FaXmark } from "react-icons/fa6"
import profilepic from "../images/aboutpic.png"
import axios from 'axios';
function Navbar({ isloggedIn, setIsLoggedIn, recruiter, setRecruiter }) {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    let addpath = [];
    if (isloggedIn) {
        if (recruiter) {
            addpath.push({ path: "/my-job", title: "My Jobs" })
            addpath.push({ path: "/post-job", title: "Post a job" })
        }
        else {
            addpath.push({ path: "/applied-job", title: "Applied Jobs" })
        }
    }
    // const addpath=recruiter ? { path: "/my-job", title: "My Jobs" }: { path: "/applied-job", title: "Applied Jobs" }
    const navItem = [
        { path: "/", title: "Start a search" },
        ...addpath
    ]


    const getUserInfo = async () => {
        const response = await axios.get("http://localhost:3000/api/v1/user/", { withCredentials: true })
        console.log(response)
        if (response.data.Status == 201) {
            if (response.data.type == 'recruiter') {
                setRecruiter(true)
            } else {
                setRecruiter(false)
            }
            setIsLoggedIn(true)
        }
        else {
            setIsLoggedIn(false)
        }
        console.log(isloggedIn)
    }

    const HandleLogout = async () => {
        const response = await axios.get("http://localhost:3000/api/v1/user/logout", { withCredentials: true })
        if (response.data.Status == 201) {
            setIsLoggedIn(false)
            navigate("/")
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [isloggedIn])

    
    return (
        <header className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>

            <nav className='flex justify-between item-center py-6'>
                <a href='/' className='flex-item-center gap-2 text-2xl text-black'><span>Job Portal</span></a>
                {/* nav items for large devics */}
                <ul className='hidden md:flex gap-12'>

                    {navItem.map(({ path, title }) =>
                        <li key={path}>
                            <NavLink to={path}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""}>
                                {title}</NavLink>
                        </li>
                    )}

                </ul>

                {/* sign up and login btn */}
                {isloggedIn ?
                    <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
                        <Link to="/about" className='py-2 px-5  rounded'>My Profile</Link>
                        <button onClick={HandleLogout} className='py-2 px-5 border rounded bg-blue text-white'>Log out</button>
                    </div> :
                    <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
                        <Link to="/login" className='py-2 px-5 border rounded'>Log in</Link>
                        <Link to="/signup" className='py-2 px-5 border rounded bg-blue text-white'>Sign up</Link>
                    </div>
                }


                {/* mobile menu */}
                <div className='md:hidden block'>
                    <button onClick={handleMenuToggler}>
                        {
                            isMenuOpen ? <FaXmark /> : <FaBarsStaggered className='w-5 h-5 text-primary' />
                        }
                    </button>
                </div>

            </nav >


            {/* nav items for mobile */}
            <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
                <ul>
                    {navItem.map(({ path, title }) =>
                        <li key={path} className='text-base text-white'>
                            <NavLink to={path}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""}>
                                {title}</NavLink>
                        </li>
                    )}
                    <li className='text-white py-1'><Link to="/login">Log in</Link></li>
                </ul>
            </div>

        </header>

    )
}

export default Navbar