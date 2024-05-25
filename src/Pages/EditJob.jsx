import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
function EditJob() {
    const { jobs_id } = useParams();
    const navigate=useNavigate();
    const [selectedOption, setSelectedoption] = useState(null);
    const options = [
        { value: "Javascript", label: "javaScript", name: "skills" },
        { value: "C++", label: "C++" },
        { value: "HTML", label: "HTML" },
        { value: "CSS", label: "CSS" },
        { value: "React", label: "React" },
        { value: "Node", label: "Node" },
        { value: "MongoDB", label: "MongoDB" },
        { value: "Redux", label: "Redux" },
    ]

    const [formData, setFormData] = useState({
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(formData)
    };

    const handleSkillsChange = (selectedOptions) => {
        setFormData({
            ...formData,
            skills: selectedOptions
        });
    };

    const sendDataToBackend = async (formData) => {
        const response = await axios.put(`http://localhost:3000/api/v1/jobs/${jobs_id}`, formData,{withCredentials:true})
        console.log(response)
        
        if(response.data.Status==201){
            window.alert(response.data.Message)
            navigate("/my-job")
        }
        else{
            window.alert("Something went wrong")
        }
    }

    const handleFormData = (event) => {
        event.preventDefault()
        const data = formData.skills.map(elm => elm.value)
        delete formData.skills
        formData.skills = data;
        sendDataToBackend(formData)
    }

    useEffect(() => {
        const GetDataBasedOnJobID = async () => {
            try {
                const apiUrl = `http://localhost:3000/api/v1/jobs/my-jobs/edit-jobs/${jobs_id}`;
                const response = await axios.get(apiUrl, { withCredentials: true })
                setDataIntoForm(response.data.Data[0])
            }
            catch (err) {
                console.log(err)
            }
        }
        GetDataBasedOnJobID()
    }, [jobs_id])

    let setDataIntoForm;
    useEffect(() => {
        setDataIntoForm = (data) => {
            setFormData(data)
        }
    }, [formData])

    return (
        <div className="max-w-screen-2x1 container mx-auto xl:px-24 px-4">
            {/* form */}
            <div className="bg-[#FAFAFA] py-10 px-4 1g:px-16">
                <form className='space-y-5' onSubmit={handleFormData}>
                    {/* first row */}
                    <div className="create-job-flex">
                        <div className="1g:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Job Title</label>
                            <input type="text" placeholder='Ex-Web developer' name='jobTitle' value={formData.jobTitle} onChange={handleChange}
                                className="create-job-input" required />
                        </div>

                        <div className="1g:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Company Name</label>
                            <input type="text" placeholder='Ex-Microsoft'
                                className="create-job-input" name='companyName' value={formData.companyName} onChange={handleChange} required />
                        </div>
                    </div>

                    {/* second row */}
                    <div className="create-job-flex">
                        <div className="1g:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Minimum Salary</label>
                            <input type="text" placeholder='$20k'
                                className="create-job-input" name='minPrice' value={formData.minPrice} onChange={handleChange} required />
                        </div>

                        <div className="1g:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Maximun Price</label>
                            <input type="text" placeholder='$120k'
                                className="create-job-input" name='maxPrice' value={formData.maxPrice} onChange={handleChange} required />
                        </div>
                    </div>


                    {/* 3rd row */}

                    <div className="create-job-flex">

                        <div className="1g:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Salary Type</label>
                            <select className="create-job-input" name="salaryType" value={formData.salaryType} onChange={handleChange}>
                                <option value="">Choose your salary</option>
                                <option value="Monthly">Monthly</option>

                            </select>
                        </div>

                        <div className="1g:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Job Locations</label>
                            <input type="text" placeholder='Ex:New York'
                                className="create-job-input" name='jobLocation' value={formData.jobLocation} onChange={handleChange} required />
                        </div>
                    </div>


                    {/* 4th row */}

                    <div className="create-job-flex">

                        <div className="1g:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Job Posting Date</label>
                            <input type="date" placeholder='Ex:2023-11-03'
                                className="create-job-input" name='postingDate' value={formData.postingDate} onChange={handleChange} required />
                        </div>
                        <div className="1g:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Experience Level</label>
                            <select className="create-job-input" name='experienceLevel' value={formData.experienceLevel} onChange={handleChange}>
                                <option value="">Choose your Experience</option>
                                <option value="NoExperience">No Experience</option>
                                <option value="Internship">Internship</option>
                                <option value="Work remotely">Work remotely</option>
                            </select>
                        </div>
                    </div>

                    {/* 5th row */}
                    <div>
                        <label className='block mb-2 text-lg'>
                            Required skill set:
                        </label>
                        <Select
                            name='skills'
                            isMulti={true}
                            defaultValue={selectedOption}
                            onChange={handleSkillsChange}
                            options={options}
                        />
                    </div>


                    {/* 6th row */}

                    <div className="create-job-flex">

                        <div className="1g:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Company Logo</label>
                            <input type="url" placeholder='Paste your company logo url : https://wetransfer.com/img1'
                                className="create-job-input" name='companyLogo' value={formData.companyLogo} onChange={handleChange} required />
                        </div>
                        <div className="1g:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Employement Type</label>

                            <select className="create-job-input" name='employmentType' value={formData.employmentType} onChange={handleChange}>
                                <option value="">Choose your Experience</option>
                                <option value="Full-time">Full time</option>
                                <option value="Part-time">Part time</option>
                                <option value="Temporary">Temporary</option>
                            </select>
                        </div>
                    </div>

                    {/* 7th row */}

                    <div className=' w-full'>
                        <label className='block mb-2  text-lg '>Job Description</label>
                        <textarea className='w-full pl-3 py-1.5 focus:outline-none'
                            rows={6}
                            placeholder='Job Description'
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    {/* last row */}
                    <div className=' w-full'>
                        <label className='block mb-2 text-lg'> Job Posted By</label>
                        <input type="text" placeholder='your email'
                            className="create-job-input" name='postedEmail' value={formData.postedEmail} onChange={handleChange} required />
                    </div>

                    <input type="submit" className=" block mt-12  bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer" />
                </form>
            </div>
        </div>
    );
}

export default EditJob