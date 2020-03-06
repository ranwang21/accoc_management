import React from 'react'

const Input = ({ label, type, id, changeEvent }) => (
    <div>
        <label htmlFor={id}>{label}</label>
        <input
            type={type}
            id={id}
            name={id}
            onChange={changeEvent}
        />
    </div>
)
const Select = ({ label, id, options, changeEvent }) => (
    <div>
        <label htmlFor={id}>{label}</label>
        <select
            id={id}
            name={id}
            onChange={changeEvent}
        >
            {options.map((option) => (
                <option key={option.value} value={option.label}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
)

const Textarea = ({ label, id, changeEvent }) => (
    <div>
        <label htmlFor={id}>{label}</label>
        <textarea
            id={id}
            name={id}
            onChange={changeEvent}
        />
    </div>
)

export { Input, Select, Textarea }
