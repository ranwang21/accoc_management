import moment from 'moment'
import React from 'react'

import MaskedInput from 'react-text-mask'
import { TextField, FormControlLabel, Checkbox, Radio, RadioGroup, Divider } from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MomentUtils from '@date-io/moment'

const ids = require('../../utilities/variables').variables.id.register
const types = {
    text: 'textField',
    radio: 'radioField',
    checkBox: 'checkboxField',
    date: 'dateField',
    contacts: 'contactField',
    membership: 'membershipField',
    participation: 'participationField',
    volunteering: 'volunteeringField'
}
const getAgeLimit = (limit) => {
    const date = new Date()
    if (limit === 'min') {
        return (date.getFullYear() - 100) + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else {
        return (date.getFullYear() - 18) + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
}

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }

const phoneField = (fieldsConfig, propLang, lang, fields, errors, inputChange) => {
    return (
        <FormControl key={ids[fieldsConfig.name]}>
            <InputLabel>{lang[fieldsConfig.name].label}</InputLabel>
            <Input
                error={errors[fieldsConfig.name] ? errors[fieldsConfig.name] : false}
                onChange={event => inputChange(event, fieldsConfig.name, fieldsConfig.type)}
                value={fields[fieldsConfig.name] === null ? '' : fields[fieldsConfig.name]}
                required={fieldsConfig.name.required}
                inputComponent={TextMaskCustom}
            />
        </FormControl>
    )
}

const textField = (fieldsConfig, propLang, lang, fields, errors, inputChange) => {
    return (
        <TextField
            key={ids[fieldsConfig.name]}
            error={errors[fieldsConfig.name] ? errors[fieldsConfig.name] : false}
            label={lang[fieldsConfig.name].label}
            type='text'
            color='primary'
            helperText={errors[fieldsConfig.name] && lang[fieldsConfig.name].labelError}
            variant='filled'
            onChange={event => inputChange(event, fieldsConfig.name, fieldsConfig.type)}
            required={fieldsConfig.name.required}
            value={fields[fieldsConfig.name] === null ? '' : fields[fieldsConfig.name]}
        />
    )
}

const checkboxField = (fieldsConfig, propLang, lang, fields, errors, inputChange) => {
    return (
        <FormControlLabel
            key={ids[fieldsConfig.name]}
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

const radio = (fieldsConfig, propLang, lang, fields, errors, inputChange) => {
    return (
        <RadioGroup
            value={fields[fieldsConfig.name]}
            onChange={event => inputChange(event, fieldsConfig.name, fieldsConfig.type)}
        >
            {fieldsConfig.radioOptions.map(option => (
                <div key={ids[option.name]}>
                    <FormControlLabel
                        key={ids[option.name]}
                        value={option.name} control={<Radio />} label={lang[option.name].label}
                    />
                </div>))}
        </RadioGroup>
    )
}

const radioField = (fieldsConfig, propLang, lang, fields, errors, inputChange) => {
    return (
        <div className='fieldset sex'>
            <div className='head'>
                <p>{lang[fieldsConfig.name].label}</p>
                <p>{errors[fieldsConfig.name] && lang[fieldsConfig.name].labelError}</p>
            </div>
            <div className='body'>
                {radio(fieldsConfig, propLang, lang, fields, errors, inputChange)}
            </div>
        </div>
    )
}

const dateField = (fieldsConfig, propLang, lang, fields, errors, inputChange) => {
    return (
        <MuiPickersUtilsProvider
            libInstance={moment} utils={MomentUtils}
            locale={propLang}
        >
            <DatePicker
                error={errors[fieldsConfig.name] ? errors[fieldsConfig.name] : false}
                format='DD MMMM YYYY'
                openTo='year'
                views={['year', 'month', 'date']}
                label={lang[fieldsConfig.name].label}
                minDate={new Date(getAgeLimit('min'))}
                maxDate={new Date(getAgeLimit('max'))}
                value={fields[fieldsConfig.name]}
                helperText={errors[fieldsConfig.name] && lang[fieldsConfig.name].labelError}
                onChange={event => inputChange(event, fieldsConfig.name, fieldsConfig.type)}
            />
        </MuiPickersUtilsProvider>
    )
}

const contactField = (fieldsConfig, propLang, lang, fields, errors, inputChange) => {
    return (
        <div className='fieldset contacts'>
            <div className='head'>
                <p>{lang[fieldsConfig.name].label}</p>
                <p>{errors[fieldsConfig.name] && lang[fieldsConfig.name].labelError}</p>
            </div>
            <div className='body'>
                {fieldsConfig.textOptions.map(option => (
                    phoneField(option, propLang, lang, fields, errors, inputChange)
                ))}
            </div>
        </div>
    )
}

const membershipField = (fieldsConfig, propLang, lang, fields, errors, inputChange) => {
    return (
        <div className='fieldset membership'>
            <div className='head'>
                <p>{lang[fieldsConfig.name].label}</p>
                <p>{errors[fieldsConfig.name] && lang[fieldsConfig.name].labelError}</p>
            </div>
            <div className='body'>
                <p>{lang[fieldsConfig.name].title1}</p>
                <p>{lang[fieldsConfig.name].title2}</p>
                {radio(fieldsConfig, propLang, lang, fields, errors, inputChange)}
                {fields.membership === 'membership_becomeMember' && (
                    <div className='optional-fields'>
                        {fieldsConfig.options2.map(option => {
                            if (option.type === types.text) {
                                return (textField(option, propLang, lang, fields, errors, inputChange))
                            } else if (option.type === types.checkBox) {
                                return (checkboxField(option, propLang, lang, fields, errors, inputChange))
                            }
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

const participationField = (fieldsConfig, propLang, lang, fields, errors, inputChange) => {
    return (
        <div className='fieldset participation'>
            <div className='head'>
                <p>{lang[fieldsConfig.name].label}</p>
            </div>
            <div className='body'>
                <div>
                    {fieldsConfig.checkboxOptions1.map(option => (
                        checkboxField(option, propLang, lang, fields, errors, inputChange)
                    ))}
                </div>
                <Divider orientation='vertical' flexItem />
                <div>
                    {fieldsConfig.checkboxOptions2.map(option => (
                        checkboxField(option, propLang, lang, fields, errors, inputChange)
                    ))}
                </div>
                <div>
                    {checkboxField(fieldsConfig.others[0], propLang, lang, fields, errors, inputChange)}
                    {fields.participation_diverses && (
                        textField(fieldsConfig.others[1], propLang, lang, fields, errors, inputChange)
                    )}
                </div>
            </div>
        </div>
    )
}
const volunteeringField = (fieldsConfig, propLang, lang, fields, errors, inputChange) => {
    return (
        <div className='fieldset benevolat'>
            <div className='head'>
                <p>{lang[fieldsConfig.name].label}</p>
            </div>
            <div className='body'>
                <div>
                    {fieldsConfig.checkboxOptions1.map(option => (
                        checkboxField(option, propLang, lang, fields, errors, inputChange)
                    ))}
                </div>
                <Divider orientation='vertical' flexItem />
                <div>
                    {fieldsConfig.checkboxOptions2.map(option => (
                        checkboxField(option, propLang, lang, fields, errors, inputChange)
                    ))}
                </div>
                <div>
                    {checkboxField(fieldsConfig.others[0], propLang, lang, fields, errors, inputChange)}
                    {fields.volunteering_diverses && (
                        textField(fieldsConfig.others[1], propLang, lang, fields, errors, inputChange)
                    )}
                </div>
            </div>
        </div>
    )
}

export default {
    textField,
    phoneField,
    radioField,
    dateField,
    checkboxField,
    contactField,
    membershipField,
    participationField,
    volunteeringField
}
