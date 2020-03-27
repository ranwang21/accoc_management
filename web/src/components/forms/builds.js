import moment from 'moment'
import React from 'react'
import { TextField, FormControlLabel, Checkbox, Radio, RadioGroup, Divider } from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

const ids = require('../../utilities/variables').variables.id.register

const getAgeLimit = (limit) => {
    const date = new Date()
    if (limit === 'min') {
        return (date.getFullYear() - 100) + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else {
        return (date.getFullYear() - 18) + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
}

const types = {
    text: 'text',
    radio: 'radio',
    checkBox: 'checkbox',
    date: 'date',
    contactsType: 'text-multiple',
    memberShipType: 'memberShip-fields'
}

const contactField = (fieldsConfig, lang, fields, errors, inputChange) => {
    return (
        <fieldset>
            <legend>{lang[fieldsConfig.name].label}</legend>
            <div>
                {fieldsConfig.options.map(option => (<div key={ids[option.name]}>{textField(option, lang, fields, errors, inputChange)}</div>))}

            </div>
        </fieldset>
    )
}

const textField = (fieldsConfig, lang, fields, errors, inputChange) => {
    return (
        <TextField
            error={errors[name] ? errors[fieldsConfig.name] : false}
            label={lang[fieldsConfig.name].label}
            type={fieldsConfig.name.type}
            color='primary'
            helperText={errors[name] && lang[fieldsConfig.name].labelError}
            variant='filled'
            onChange={event => inputChange(event, fieldsConfig.name, fieldsConfig.type)}
            required={fieldsConfig.name.required}
            value={fields[fieldsConfig.name] === null ? '' : fields[fieldsConfig.name]}
        />
    )
}

const checkBoxField = (fieldsConfig, lang, fields, errors, inputChange) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={fields[fieldsConfig.name] !== null && fields[fieldsConfig.name]}
                    onChange={event => inputChange(event, fieldsConfig.name, fieldsConfig.type)}
                    required={fieldsConfig.name.required}
                />
            }
            label={lang[fieldsConfig.name].label}
        />
    )
}

const radioField = (fieldsConfig, lang, fields, errors, inputChange) => {
    return (
        <fieldset>
            <legend>{lang[fieldsConfig.name].label}</legend>
            <RadioGroup
                value={fields[fieldsConfig.name]}
                onChange={event => inputChange(event, fieldsConfig.name, fieldsConfig.type)}
            >
                {fieldsConfig.options.map(option => (
                    <div key={ids[option.name]}>
                        <FormControlLabel
                            key={ids[option.name]}
                            value={option.name} control={<Radio />} label={lang[option.name].label}
                        />
                    </div>))}
            </RadioGroup>
        </fieldset>
    )
}

const dateField = (fieldsConfig, lang, langFile, fields, errors, inputChange) => {
    return (
        <MuiPickersUtilsProvider
            libInstance={moment} utils={MomentUtils}
            locale={lang}
        >
            <DatePicker
                format='DD MMMM YYYY'
                openTo='year'
                views={['year', 'month', 'date']}
                label={langFile[fieldsConfig.name].label}
                minDate={new Date(getAgeLimit('min'))}
                maxDate={new Date(getAgeLimit('max'))}
                value={fields[fieldsConfig.name]}
                onChange={event => inputChange(event, fieldsConfig.name, fieldsConfig.type)}
            />
        </MuiPickersUtilsProvider>
    )
}

const memberShipField = (fieldsConfig, lang, fields, errors, inputChange) => {
    return (
        <div>
            <Divider variant='fullWidth' />
            <fieldset>
                <legend>{lang[fieldsConfig.name].label}</legend>
                <RadioGroup
                    value={fields[fieldsConfig.name]}
                    onChange={event => inputChange(event, fieldsConfig.name, fieldsConfig.type)}
                >
                    {fieldsConfig.options1.map(option => (
                        <FormControlLabel
                            key={ids[option.name]}
                            value={option.name} control={<Radio />} label={lang[option.name].label}
                        />))}
                </RadioGroup>
                {fields.memberShip === 'becomeMember' && (
                    <div className='optional-fields'>
                        {fieldsConfig.options2.map(option => {
                            if (option.type === types.text) {
                                return (<div key={ids[name]}>{textField(option, lang, ids)}</div>)
                            } else if (option.type === types.checkBox) {
                                return (<div key={ids[option.name]}>{checkBoxField(option, lang, ids)}</div>)
                            }
                        })}
                    </div>
                )}
            </fieldset>
        </div>
    )
}

export default {
    textField,
    radioField,
    dateField,
    checkBoxField,
    contactField,
    memberShipField
}
