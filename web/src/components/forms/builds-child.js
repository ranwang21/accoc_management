import moment from 'moment'
import React from 'react'
import { FormControl, InputLabel, MenuItem, ListSubheader, Select, TextareaAutosize, TextField, FormControlLabel, Checkbox, Radio, RadioGroup, Divider } from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

const ids = require('../../utilities/variables').variables.id.childrenRegister
const types = {
    text: 'textField',
    radio: 'radioField',
    checkBox: 'checkboxField',
    date: 'dateField',
    contacts: 'contactField',
    membership: 'membershipField',
    participation: 'participationField',
    volunteering: 'volunteeringField',
    textAreaField: 'textAreaField',
    phoneField: 'phoneField'
}
const getAgeLimit = (limit) => {
    const date = new Date()
    if (limit === 'min') {
        return (date.getFullYear() - 20) + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
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
        autoFocus
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
const selectField = (fieldsConfig, propLang, lang, fields, errors, inputChange) => {
    return (
        <FormControl
            key={ids[fieldsConfig.name]} variant='filled'
        >
            <InputLabel color='secondary'>{lang[fieldsConfig.name].label}</InputLabel>
            <Select
                key={ids[fieldsConfig.name]}
                value={fields[fieldsConfig.name] ? fields[fieldsConfig.name] : ''}
                onChange={event => inputChange(event, fieldsConfig.name, fieldsConfig.type)}
            >
                <MenuItem value='' disabled>
                    <em>{lang[fieldsConfig.name].label}</em>
                </MenuItem>
                {[...Array(fieldsConfig.maxNumber + 1).keys()].map(x => (
                    <MenuItem key={fieldsConfig.name + x} value={x}>{x}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

const selectGroupedField = (fieldsConfig, propLang, lang, fields, errors, inputChange) => {
    return (
        <FormControl
            key={ids[fieldsConfig.name]} variant='filled'
        >
            <InputLabel className={errors[fieldsConfig.name] ? 'label-error1' : ''}>{lang[fieldsConfig.name].label}</InputLabel>
            <Select
                error={errors[fieldsConfig.name] ? errors[fieldsConfig.name] : false}
                key={ids[fieldsConfig.name]}
                value={fields[fieldsConfig.name] ? fields[fieldsConfig.name] : ''}
                onChange={event => inputChange(event, fieldsConfig.name, fieldsConfig.type)}
            >
                <MenuItem value='' disabled>
                    <em>{lang[fieldsConfig.name].label}</em>
                </MenuItem>

                <ListSubheader>{lang[fieldsConfig.name].level[0].label}</ListSubheader>
                {lang[fieldsConfig.name].level[0].options.map(option => (
                    <MenuItem key={lang[fieldsConfig.name].level[0].label + option} value={lang[fieldsConfig.name].level[0].label + option}>{option}</MenuItem>
                ))}

                <ListSubheader>{lang[fieldsConfig.name].level[1].label}</ListSubheader>
                {lang[fieldsConfig.name].level[1].options.map(option => (
                    <MenuItem key={lang[fieldsConfig.name].level[1].label + option} value={lang[fieldsConfig.name].level[1].label + option}>{option}</MenuItem>
                ))}
            </Select>
            {errors[fieldsConfig.name] && (
                <p className='label-error2'>{lang[fieldsConfig.name].labelError}</p>
            )}
        </FormControl>
    )
}

const textAreaField = (fieldsConfig, propLang, lang, fields, errors, inputChange) => {
    return (
        <TextareaAutosize
            className='textarea'
            key={ids[fieldsConfig.name]}
            rowsMin={3}
            placeholder={lang[fieldsConfig.name].label}
            onChange={event => inputChange(event, fieldsConfig.name, fieldsConfig.type)}
            value={fields[fieldsConfig.name] === null ? '' : fields[fieldsConfig.name]}
        />
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
            required={fieldsConfig.name.required}
            onChange={event => inputChange(event, fieldsConfig.name, fieldsConfig.type)}
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
                        value={option.name} control={<Radio />} label={lang[fieldsConfig.name][option.name].label}
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
                    textField(option, propLang, lang, fields, errors, inputChange)
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
                <div className='optional-fields'>
                    {(fields.garde === 'gardeShared' && lang[fieldsConfig.name].gardeShared) && (
                        <p>{lang[fieldsConfig.name].gardeShared.info}</p>
                    )}
                    {((fields.garde === 'gardeMother' || fields.garde === 'gardeFather') && lang[fieldsConfig.name].gardeParentOption) && (
                    <>
                        <RadioGroup
                            className='radio'
                            value={fields[fieldsConfig.gardeParentOption.name]}
                            onChange={event => inputChange(event, fieldsConfig.gardeParentOption.name, fieldsConfig.gardeParentOption.type)}
                            row
                        >
                            <p>{lang[fieldsConfig.name].gardeParentOption.label}</p>
                            {fieldsConfig.gardeParentOption.radioOptions.map(option => (
                                <div key={ids[option.name]}>
                                    <FormControlLabel
                                        key={ids[option.name]}
                                        value={option.name} control={<Radio />} label={lang[fieldsConfig.name].gardeParentOption[option.name].label}
                                    />
                                </div>))}
                        </RadioGroup>
                    </>
                    )}
                    {(fields.garde === 'gardeOther' && lang[fieldsConfig.name].gardeOther) && (
                        textField(fieldsConfig.gardeOtherOption, propLang, lang[fieldsConfig.name], fields, errors, inputChange)
                    )}
                    {(fields.redouble === 'redoubleYes' && lang[fieldsConfig.name].redoubleYesOption) && (
                        selectGroupedField(fieldsConfig.redoubleYesOption, propLang, lang[fieldsConfig.name], fields, errors, inputChange)
                    )}
                    {(fields.daycareService === 'daycareServiceYes' && lang[fieldsConfig.name].daycareServiceYesName) && (
                        textField(fieldsConfig.daycareServiceYesName, propLang, lang[fieldsConfig.name], fields, errors, inputChange)
                    )}
                    {(fields.daycareService === 'daycareServiceYes' && lang[fieldsConfig.name].daycareServiceYesPhone) && (
                        textField(fieldsConfig.daycareServiceYesPhone, propLang, lang[fieldsConfig.name], fields, errors, inputChange)
                    )}
                </div>
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
    selectField,
    selectGroupedField,
    phoneField,
    textField,
    textAreaField,
    radioField,
    dateField,
    checkboxField,
    contactField,
    membershipField,
    participationField,
    volunteeringField
}
