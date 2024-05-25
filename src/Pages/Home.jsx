import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Card from '../components/Card';
import Jobs from './Jobs';
import Sidebar from '../sidebar/Sidebar';
import Newsletter from '../components/Newsletter';
import axios from 'axios';
import Loader from './Loader';
function Home({getDataForJobDetails}) {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [location, setlocation] = useState("")
  let [salary, setSalary] = useState("");
  let [experienceLevel, setExperienceLevel] = useState("");
  let [employment, setEmployment] = useState("");
  let TotalData = 0;


  const handleChange = (inputData) => {
    if (inputData.name === "test1") {
      setlocation(inputData.value)
    }
    else if (inputData.name == "test2") {
      setSalary(inputData.value)
    }
    else if (inputData.name == "test3") {
      setExperienceLevel(inputData.value)
    }
    else {
      setEmployment(inputData.value)
    }
  }

  const getDataBasedOnLocation = async (category) => {
    try {
      const apiUrl = 'http://localhost:3000/api/v1/jobs';
      // Construct the URL with query parameters
      const urlWithParams = `${apiUrl}?${Object.entries(category)
        .filter(([key, value]) => value !== "") // Filter out empty values
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')}`;

      const response = await axios.get(urlWithParams)
      const DataBasedOnFilter = response.data.Data;
      // console.log(DataBasedOnLocation)
      TotalData = response.data.length;
      setResult(DataBasedOnFilter)
      setIsLoading(false)
    }
    catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    const category = {
      "location": location,
      "salary": salary,
      "experienceLevel": experienceLevel,
      "employment": employment
    }

    getDataBasedOnLocation(category);
  }, [location, salary, experienceLevel, employment])



  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    setCurrentPage(currentPage - 1)
  }


  const HandleBannerFilter = async(BannerFormData) => {
      const response=await axios.post("http://localhost:3000/api/v1/jobs/search",BannerFormData)
      const DataBasedOnFilter = response.data.Data;
      TotalData = response.data.length;
      setResult(DataBasedOnFilter)
      setIsLoading(false)
  }


  return (
    <div>

      <Banner HandleBannerFilter={HandleBannerFilter} />

      {/* main content */}
      <div className="bg-[#FAFAFA] md: grid grid-cols-4 gap-8 lg:px-24 px-4 py-12 ">
        {/* left side */}
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} />
        </div>

        {/* job cards */}
        <div className="col-span-2 bg-white p-4 rounded-sm">
          {
            isLoading ? (<Loader/>) : result.length > 0 ? (<Jobs result={result} getDataForJobDetails={getDataForJobDetails} currentPage={currentPage} itemsPerPage={itemsPerPage} />) : <>
              <h3 className='text-lg font-bold mb-2'>{result.length} jobs</h3>
              <p>No data Found !</p>
            </>
          }
          {/* pagination here */}
          {
            result.length > 0 ? (
              <div className="flex justify-center mt-4 space-x-8">
                <button className='hover:underline' onClick={prevPage} disabled={currentPage == 1}>Previous</button>
                <span className='mx-2'>Page {currentPage} of {Math.ceil(result.length / itemsPerPage)}</span>
                <button className='hover:underline' onClick={nextPage} disabled={currentPage == Math.ceil(result.length / itemsPerPage)}>Next</button>
              </div>
            ) : ""
          }
        </div>
        {/* right side */}
        <div className="bg-white p-4 rounded"><Newsletter /></div>
      </div>
    </div>
  )
}

export default Home