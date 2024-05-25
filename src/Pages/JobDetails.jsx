import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AlertComponent from '../components/AlertComponent';

const JobDetails = ({  recruiter, isloggedIn }) => {
    const { id } = useParams();
    console.log(id)
    const [isApplied, setIsApplied] = useState(false)

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

    const { companyName, jobTitle, companyLogo, minPrice, maxPrice, salaryType, jobLocation, employmentType,
        postingDate, description, skills } = JobDetailsData;

    // error or success
    const [Error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [content, setContent] = useState("");

    let resume = ""
    let jobId = JobDetailsData.id
    const sendResumeToBackend = async (jobId, resume) => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/apply", { jobId, resume }, { withCredentials: true })
            console.log(response.data)
            if (response.data.Status == 201) {

                return { "Status": 201, "Mesaage": "Resume sent successfully" }
            }
            else {

                return { "Status": 401, "Error": response.data.Error }
            }

        }
        catch (err) {
            setError(true)
            setContent("Something went wrong please apply again")
            return { "Status": 401, "Error": "Something went wrong please apply again" }
        }
    }


    const handleApply = async () => {
        if (isloggedIn && !isApplied && !recruiter) {
            resume = window.prompt("Please give link of your resume")
            const response = await sendResumeToBackend(jobId, resume)

            if (response.Status == 201) {
                setIsApplied(true)
                setSuccess(true)
                setContent("Your application has been send to recruiter")
            }
            else {
                setError(true)
                setContent(response.Error)
            }
        }
        else if (recruiter) {
            setError(true)
            setContent("You are recruiter you can not apply on the job")
        }
        else {
            if (isApplied) {
                setError(true)
                setContent("You have already applied on this job")
            }
            else {
                setError(true)
                setContent("You are not logged in ")
            }
        }
    }

    const getDataBasedOnJobID = async (id) => {
        try {   
            const response = await axios.get(`http://localhost:3000/api/v1/jobs/${id}`, { withCredentials: true })
            console.log(response)
            if(response.data.Status==201){
                setJobDetailsData({
                    id: response.data.Data._id,
                    companyName: response.data.Data.companyName,
                    jobTitle: response.data.Data.jobTitle,
                    companyLogo: response.data.Data.companyLogo,
                    minPrice: response.data.Data.minPrice,
                    maxPrice: response.data.Data.maxPrice,
                    salaryType: response.data.Data.salaryType,
                    jobLocation: response.data.Data.jobLocation,
                    postingDate: response.data.Data.postingDate,
                    experienceLevel: response.data.Data.experienceLevel,
                    employmentType: response.data.Data.employmentType,
                    description: response.data.Data.description,
                    postedEmail: response.data.Data.postedEmail,
                    skills: [...response.data.Data.skills]
                  })
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const getLoggedInUser=async(id)=>{
        try{
            const response=await axios.get("http://localhost:3000/api/v1/user/",{withCredentials:true})
            console.log(response)
            if(response.data.Status==201){
                const user=response.data.user;
                const AppliedJobs=user.appliedJobs
                AppliedJobs.forEach(element => {
                    if(element.jobId===id){
                        setIsApplied(true);
                    }
                });
            }
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        getDataBasedOnJobID(id)
        getLoggedInUser(id);
    },[id])

    return (
        <div className="container mx-auto mt-10 mb-10">
            {Error ? <AlertComponent severity={"error"} content={content} Error={Error} setError={setError} success={success} setSuccess={setSuccess} /> : ""}
            {success ? <AlertComponent severity={"success"} content={content} Error={Error} setError={setError} success={success} setSuccess={setSuccess} /> : ""}

            <div className="max-w-xl mx-auto bg-white shadow-md rounded overflow-hidden">

                <div className="px-6 py-4">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Software Engineer</h2>
                        <p className="text-gray-600">{companyName}</p>
                        <img src={companyLogo} className="w-100 h-20 " alt="" />
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                        <p className="text-gray-700">
                            {description}
                        </p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                        <ul className="list-disc ml-6 text-gray-700">
                            <li>Experience with  {...skills}</li>
                            <li>Proficiency in JavaScript</li>
                            <li>Strong problem-solving skills</li>
                        </ul>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Location</h3>
                        <p className="text-gray-700">{jobLocation}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Salary</h3>
                        <p className="text-gray-700">{minPrice} - {maxPrice}k per month</p>
                    </div>
                    <div>
                        {
                            <Link className='py-2 px-5 border rounded bg-blue  text-white' onClick={handleApply}>{isApplied ? "Applied" : "Apply"}</Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
