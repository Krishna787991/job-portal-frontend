import React from 'react'
import InputField from './InputField'

function EmploymentType({handleChange}) {
  return (
    <div>
    <h4 className='text-lg font-medium mb-2'>Type of employment</h4>
    <div>
        <InputField handleChange={handleChange} value="" title="Any" name="test4" />
        <InputField handleChange={handleChange} value="Full-time" title="Full-time" name="test4" />
        <InputField handleChange={handleChange} value="Part-time" title="Part-time" name="test4" />
    </div>
</div>
  )
}

export default EmploymentType