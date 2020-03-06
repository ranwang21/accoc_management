import React from 'react'
import TextField from '@material-ui/core/TextField'

const Input = ({ label, type, id, changeEvent }) => (
    <input
        type={type}
        id={id}
        name={id}
        onChange={changeEvent}
        placeholder={label}
    />
)
const InputField = ({ label, type, id, changeEvent }) => (
    <TextField id={id} label={label} variant='outlined' />
)
const InputWithLabel = ({ label, type, id, changeEvent }) => (
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

export {
    Input,
    InputWithLabel,
    Select,
    Textarea
}
