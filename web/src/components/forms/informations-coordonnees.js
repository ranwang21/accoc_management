import moment from 'moment'
import React, { Component } from 'react'
import { TextField, FormControlLabel, Checkbox, Radio, RadioGroup, FormControl, FormLabel, Button } from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker, KeyboardDatePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

import '../../styles/_informations-coordonnees.scss'
const FormConfig = require('../../forms-files/informations-coordonnees.json')
const variables = require('../../utilities/variables').variables
const types = {
    text: 'text',
    radio: 'radio',
    checkBox: 'checkbox',
    date: 'date',
    inputMultiple: 'text-multiple'
}
class InformationsCoordonnees extends Component {
    constructor () {
        super()
        this.state = {
            fields: {
                sex: null,
                birthday: null,
                last_name: null,
                first_name: null,
                address: null,
                personal: null,
                home: null,
                work: null,
                emergency: null,
                toContacted: null,
                email: null,
                is_subscribed: null,
                has_child: null
            },
            errors: {
                sex: false,
                birthday: false,
                last_name: false,
                first_name: false,
                address: false,
                contact: false,
                email: false
            },
            enableSubmit: false,
            loading: false
        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    getLangFile () { return require('../../lang/' + this.props.lang + '/informations-coordonnees.json') }

    handleInputChange (event, name, type) {
        let newValue = null
        if (type === types.date) {
            newValue = event._d
        } else if (type === types.checkBox) {
            newValue = event.target.checked
        } else {
            newValue = event.target.value
        }

        this.setState(state => {
            const oldFields = state.fields
            oldFields[name] = newValue
            return {
                fields: oldFields
            }
        })
    }

    buildMultipleInputField (fieldsConfig, lang) {
        const options = FormConfig.fields.filter(field => field.from === fieldsConfig.name)
        return (
            <div key={variables.id.informationsCoordonnees[fieldsConfig.name]}>
                <fieldset>
                    <legend>Contacts</legend>
                    <div>
                        {options.map(option => (this.buildTextField(option, lang)))}
                    </div>
                </fieldset>
            </div>
        )
    }

    buildTextField (fieldsConfig, lang) {
        return (
            <div key={variables.id.informationsCoordonnees[fieldsConfig.name]}>
                <TextField
                    id={variables.id.informationsCoordonnees[fieldsConfig.name]}
                    error={this.state.errors[name] ? this.state.errors[fieldsConfig.name] : false}
                    label={lang[fieldsConfig.name].label}
                    type={fieldsConfig.name.type}
                    color='primary'
                    helperText={this.state.errors[name] && lang[fieldsConfig.name].labelError}
                    variant='filled'
                    onChange={event => this.handleInputChange(event, fieldsConfig.name, fieldsConfig.type)}
                    required={fieldsConfig.name.required}
                    value={this.state.fields[fieldsConfig.name] === null ? '' : this.state.fields[fieldsConfig.name]}
                />
            </div>
        )
    }

    buildCheckField (fieldsConfig, lang) {
        return (
            <div key={variables.id.informationsCoordonnees[fieldsConfig.name]}>
                <FormControlLabel
                    control={
                        <Checkbox
                            id={variables.id.informationsCoordonnees[fieldsConfig.name]}
                            checked={this.state.fields[fieldsConfig.name] !== null && this.state.fields[fieldsConfig.name]}
                            onChange={event => this.handleInputChange(event, fieldsConfig.name, fieldsConfig.type)}
                            required={fieldsConfig.name.required}
                        />
                    }
                    label={lang[fieldsConfig.name].label}
                />
            </div>
        )
    }

    buildRadioField (fieldsConfig, lang) {
        const options = FormConfig.fields.filter(field => field.from === fieldsConfig.name)
        return (
            <div key={variables.id.informationsCoordonnees[fieldsConfig.name]}>
                <fieldset>
                    <legend>{lang[fieldsConfig.name].label}</legend>
                    <RadioGroup
                        value={this.state.fields[fieldsConfig.name]}
                        onChange={event => this.handleInputChange(event, fieldsConfig.name, fieldsConfig.type)}
                        id={variables.id.informationsCoordonnees[fieldsConfig.name]}
                    >
                        {options.map(option => (
                            <FormControlLabel
                                key={variables.id.informationsCoordonnees[option.name]}
                                value={option.name} control={<Radio />} label={lang[option.name].label}
                            />))}
                    </RadioGroup>
                </fieldset>
            </div>
        )
    }

    buildDateField (fieldsConfig, lang) {
        return (
            <MuiPickersUtilsProvider
                key={variables.id.informationsCoordonnees[fieldsConfig.name]}
                libInstance={moment} utils={MomentUtils}
                locale={this.props.lang}
            >
                <DatePicker
                    id={variables.id.informationsCoordonnees[fieldsConfig.name]}
                    format='DD MMMM YYYY'
                    openTo='year'
                    views={['year', 'month', 'date']}
                    label={lang[fieldsConfig.name].label}
                    minDate={new Date(this.getAgeLimit('min'))}
                    maxDate={new Date(this.getAgeLimit('max'))}
                    value={this.state.fields[fieldsConfig.name]}
                    onChange={event => this.handleInputChange(event, fieldsConfig.name, fieldsConfig.type)}
                />
            </MuiPickersUtilsProvider>
        )
    }

    getAgeLimit (limit) {
        const date = new Date()
        if (limit === 'min') {
            return (date.getFullYear() - 100) + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        } else {
            return (date.getFullYear() - 18) + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        }
    }

    render () {
        const lang = this.getLangFile()
        const fieldsList = FormConfig.fields.filter(field => !field.from)
        return (
            <>
                <div className='informations-coordonnees'>
                    <h1>{lang.title}</h1>
                    <div className='fields'>
                        {fieldsList.map(field => {
                            let renderingField = null
                            switch (field.type) {
                            case types.text:
                                renderingField = this.buildTextField(field, lang)
                                break
                            case types.radio:
                                renderingField = this.buildRadioField(field, lang)
                                break
                            case types.checkBox:
                                renderingField = this.buildCheckField(field, lang)
                                break
                            case types.date:
                                renderingField = this.buildDateField(field, lang)
                                break
                            case types.inputMultiple:
                                renderingField = this.buildMultipleInputField(field, lang)
                                break
                            }
                            return renderingField
                        })}
                    </div>

                </div>
            </>
        )
    }
}

export default InformationsCoordonnees
