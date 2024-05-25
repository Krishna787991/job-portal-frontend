import React from 'react'
import Card from '../components/Card'
function Jobs({ result,currentPage,itemsPerPage,getDataForJobDetails }) {
  
  return (
    <>
      <div>
        <h3 className='text-lg font-bold mb-2'>{result.length} jobs</h3>
      </div>
      <selection >
        {result.slice(itemsPerPage*(currentPage-1),itemsPerPage*(currentPage-1)+itemsPerPage).map(elm=> <Card getDataForJobDetails={getDataForJobDetails} data={elm}/>)}
      </selection>
    </>
  )
}

export default Jobs

