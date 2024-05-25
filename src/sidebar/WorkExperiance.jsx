import React from 'react'
import InputField from './InputField'

function WorkExperiance({handleChange}) {
  return (
    <div>
    <h4 className='text-lg font-medium mb-2'>Work Experiance</h4>
    <div>
        <InputField handleChange={handleChange} value="" title="Any Experience" name="test3" />
        <InputField handleChange={handleChange} value="Entry-Level" title="Entry Level" name="test3" />
        <InputField handleChange={handleChange} value="Mid-Level" title="Mid Level" name="test3" />
    </div>
</div>
  )
}

export default WorkExperiance