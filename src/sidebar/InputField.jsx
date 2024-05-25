import React from 'react'

function InputField({handleChange, value, title, name,category }) {
    const handleClick=(event)=>{
        handleChange(event.target)
    }
    return (
        <label className="sidebar-label-container">
            <input
                type="radio"
                name={name}
                value={value}
                onChange={handleClick}
                />
            <span className="checkmark"></span> {title }
        </label>
    )
}

export default InputField