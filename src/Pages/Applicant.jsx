// ApplicantPage.jsx
import React, { useEffect, useState } from 'react';
import { FaFilePdf } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';
import axios from "axios"
import Loader from './Loader';
const Applicant = () => {
  const { jobID } = useParams()
  const [applicantList, setApplicantList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  let [company,setCompany]=useState("")

  const getApplicantList = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/jobs/applicant", { jobID: jobID }, { withCredentials: true })
      console.log(response.data.Company)
      setCompany(response.data.Company)
      setApplicantList(response.data.Data)
      setIsLoading(false)
    }
    catch (err) {
      console.log(err)
    }

  }
  useEffect(() => {
    getApplicantList(jobID)
  }, [])

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    setCurrentPage(currentPage - 1)
  }

  const ResumeHandler = async(applicant,Company) => {
 
    try{
      const response=await axios.post("http://localhost:3000/api/v1/user/sendmail",{applicant,Company},{withCredentials:true})
      console.log(response.data)
    }
    catch(err){
      console.log(err)
    }
  }



  return (<>
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-12/12 px-4 mx-auto mt-5">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    All Applicant of jobID
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

                    <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                      Applicant Name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                      Applicant Email
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                      View Applicant Resume
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading ?
                    applicantList.length ? applicantList.slice(itemsPerPage * (currentPage - 1), itemsPerPage * (currentPage - 1) + itemsPerPage).map((applicant, index) => (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          {itemsPerPage * (currentPage - 1) + index + 1}

                        </th>

                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {applicant[0].name}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {applicant[0].email}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          <Link to={`/${applicant[1]}`} rel="noopener noreferrer"
                            onClick={() => ResumeHandler(applicant[0],company)}
                            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-primary font-bold rounded">
                            <FaFilePdf className="mr-2" />
                            Resume
                          </Link>
                        </td>
                        <div>
                        </div>

                      </tr>
                    )) : <div className="flex justify-center items-center ">
                      <p className="text-center text-blue ">Applicants have not applied yet</p>
                    </div>:<Loader/>
                    }
                </tbody>

              </table>

            </div>
            {/* pagination here */}
            {
              applicantList.length > 0 ? (
                <div className="flex justify-center mt-4 space-x-8">
                  <button className='hover:underline' onClick={prevPage} disabled={currentPage == 1}>Previous</button>
                  <span className='mx-2'>Page {currentPage} of {Math.ceil(applicantList.length / itemsPerPage)}</span>
                  <button className='hover:underline' onClick={nextPage} disabled={currentPage == Math.ceil(applicantList.length / itemsPerPage)}>Next</button>
                </div>
              ) : ""
            }
          </div>
        </div>
      </section>
    </div>
  </>

  );
};

export default Applicant;
