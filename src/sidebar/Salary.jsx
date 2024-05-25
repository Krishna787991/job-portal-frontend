import React from 'react'
import Button from './Button'
import InputField from './InputField'
const Salary = ({ handleChange }) => {
    return (
        <div>
            <h4 className='text-lg font-medium mb-2'>Salary</h4>
            <div className='mb-4'>
                <Button value="Monthly" title="Monthly" />
            </div>
            <div>
               
                    <InputField
                        handleChange={handleChange}
                        value=""
                        title="All"
                        name="test2"
                    />
               
                <InputField
                    handleChange={handleChange}
                    value={30}
                    title="< 30k"
                    name="test2"
                />

                <InputField
                    handleChange={handleChange}
                    value={50}
                    title="< 50k"
                    name="test2"
                />
                <InputField
                    handleChange={handleChange}
                    value={80}
                    title="< 80k"
                    name="test2"
                />
                <InputField
                    handleChange={handleChange}
                    value={100}
                    title="< 100k"
                    name="test2"
                />
            </div>
        </div>

    )

}
export default Salary