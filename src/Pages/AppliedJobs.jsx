import { Result } from 'postcss';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye } from 'react-icons/fa';
import { FaFilePdf } from 'react-icons/fa';
import Loader from './Loader';

function AppliedJobs() {

    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    // console.log(jobs.length, typeof (jobs.length));
    const [searchText, setSearchText] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    let TotalData = 0;
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 4

    const getDataBasedOnUserDetails = async () => {
        try {
            const apiUrl = 'http://localhost:3000/api/v1/user/appliedjobs';
            const response = await axios.get(apiUrl, { withCredentials: true })
            console.log(response.data.Data)
            if (response.data.Status != 201) {
                window.alert("Something went wrong")
                navigate("/login")
            }
            else {
                const DataIncludingResume = response.data.Data.map(elm => {
                    elm[0].resume = elm[1]
                    return elm[0]
                })
                setJobs(DataIncludingResume);
                setIsLoading(false);
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        // based on user details
        getDataBasedOnUserDetails();
    }, [isLoading])


    const nextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1)
    }

    const DeleteByID = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/v1/user/${id}`, { withCredentials: true })
            console.log(response)
            if (response.data.Status == 201) {
                window.alert("Data deleted SuccessFully");
            }
        }
        catch (err) {
            window.alert(err);
        }
    }

    const handleDelete = (id) => {
        console.log(id);
        DeleteByID(id)
        setIsLoading(true);
    }
    return (
        <>
            <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
                <div className='my-jobs-conatainer'>
                    <h1 className='text-center p-4'>All My Applied Jobs</h1>
                    {/* MyJobs : {jobs.length} */}
                    <div className='search-box p-2 text-center mb-2'>
                        <input type text name="search" id="search"
                            onChange={(e) => setSearchText(e.target.value)}
                            className='py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full' />
                        <button className='bg-blue text-white  font-semibold px-8 py-2 rounded-sm mb-4'> Search</button>
                    </div>
                </div>
                {/* table */}

                <section className="py-1 bg-blueGray-50">
                    <div className="w-full xl:w-12/12 px-4 mx-auto mt-5">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white ">
                            <div className="rounded-t mb-0 px-4 py-3 border-0">
                                <div className="flex flex-wrap items-center">
                                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                        <h3 className="font-semibold text-base text-blueGray-700">
                                            All jobs
                                        </h3>
                                    </div>

                                </div>
                            </div>

                            <div className="block w-full overflow-x-auto">
                                <table className="items-center w-full border-collapse text-blueGray-700  ">
                                    <thead className="thead-light ">
                                        <tr>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                No.
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Job Title
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                                                Company Name
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                                                Salary/month
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                                                View your Resume
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {isLoading ? <Loader /> :
                                            jobs.length ? jobs.slice(itemsPerPage * (currentPage - 1), itemsPerPage * (currentPage - 1) + itemsPerPage).map((jobs, index) => (
                                                <tr key={index}>
                                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                        {itemsPerPage * (currentPage - 1) + index + 1}
                                                    </th>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                        {jobs.jobTitle}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                        {jobs.companyName}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                        {jobs.minPrice}-{jobs.maxPrice}k
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                        <Link to={`${jobs.resume}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-primary font-bold rounded">
                                                            <FaFilePdf className="mr-2" />
                                                            Resume
                                                        </Link>
                                                    </td>
                                                    <div>

                                                    </div>

                                                </tr>
                                            )) : <div className="flex justify-center items-center ">
                                                <p className="text-center text-blue ">You have not posted any job yet</p>
                                            </div>

                                        }
                                    </tbody>

                                </table>

                            </div>
                            {/* pagination here */}
                            {
                                jobs.length > 0 ? (
                                    <div className="flex justify-center mt-4 space-x-8">
                                        <button className='hover:underline' onClick={prevPage} disabled={currentPage == 1}>Previous</button>
                                        <span className='mx-2'>Page {currentPage} of {Math.ceil(jobs.length / itemsPerPage)}</span>
                                        <button className='hover:underline' onClick={nextPage} disabled={currentPage == Math.ceil(jobs.length / itemsPerPage)}>Next</button>
                                    </div>
                                ) : ""
                            }
                        </div>
                    </div>
                </section>
            </div>
        </>

    )
}

export default AppliedJobs