import React from 'react'
import InputField from './InputField'
const Location = ({ handleChange }) => {

    return (
        <div>
            <h4 className='text-lg font-medium mb-2'>Location</h4>
            <div>
            
                <InputField handleChange={handleChange} value="" title="All" name="test1" />
                <InputField handleChange={handleChange} value="Bangalore" title="Bangalore" name="test1" />
                <InputField handleChange={handleChange} value="Mumbai" title="Mumbai" name="test1" />
                <InputField handleChange={handleChange} value="Chennai" title="Chennai" name="test1" />
                <InputField handleChange={handleChange} value="New Delhi" title="New Delhi" name="test1" />
                <InputField handleChange={handleChange} value="Pune" title="Pune" name="test1" />
            </div>
        </div>
    )
}
export default Location