import React from 'react'

function backup() {

    const [query, setQuery] = useState("");
    const handleInputChange = (event => {
      setQuery(event.target.value)
    })
    console.log(query)
  
    // filter jobs by title
    const filteredItems = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    console.log(filteredItems)
  
    const handleChange = (event) => {
      setSelectCategory(event.target.value)
    }
  
    const handleClick = (event) => {
      setSelectCategory(event.target.value)
  
    }
    // calculate the index range
    const calculatePageRang = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return { startIndex, endIndex }
    }
  
    // function for the next page
  
    const nextPage = () => {
      if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
        setCurrentPage(currentPage + 1);
      }
    }
  
    // function for the previous page
  
    const prevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    }
  
  
  
    // main funtion
    const filteredData = (jobs, selected, query) => {
      let filteredJobs = jobs;
  
      // filtering Input items
      if (query) {
        filteredJobs = filteredItems;
      }
  
      // category filtering
      if (selected) {
        filteredJobs = filteredJobs.filter(({ jobLocation, maxPrice, experienceLevel, salaryType,
          employmentType, postingDate }) => (
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) <= parseInt(selected) ||
          experienceLevel.toLowerCase()===selected.toLowerCase() ||
          postingDate>=selected || 
          salaryType.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase()
        ));
        console.log(filteredJobs);
      }
      // slice the data based on current page
      const { startIndex, endIndex } = calculatePageRang();
      filteredJobs = filteredJobs.slice(startIndex, endIndex)
      return filteredJobs.map((data, i) => <Card key={i} data={data} />)
  
  
    }
  
  
    const result = filteredData(jobs, selectCategory, query)
    console.log(result)
  
  return (
    
  )
}

export default backup