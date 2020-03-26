import moment from 'moment'
import React, { Component } from 'react'
import { TextField, FormControlLabel, Checkbox, Radio, RadioGroup, FormControl, FormLabel, Button, Divider } from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

import '../../styles/_informations-coordonnees.scss'
const FormConfig = require('../../forms-files/informations-coordonnees.json').fields
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

    buildMultipleInputField (fieldsConfig, lang, ids) {
        const options = FormConfig.coordonnees.filter(field => field.from === fieldsConfig.name)
        return (
            <div key={ids[fieldsConfig.name]}>
                <fieldset>
                    <legend>{lang[fieldsConfig.name].label}</legend>
                    <div>
                        {options.map(option => (this.buildTextField(option, lang, ids)))}
                    </div>
                </fieldset>
            </div>
        )
    }

    buildTextField (fieldsConfig, lang, ids) {
        return (
            <div key={ids[fieldsConfig.name]}>
                <TextField
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

    buildCheckField (fieldsConfig, lang, ids) {
        return (
            <div key={ids[fieldsConfig.name]}>
                <FormControlLabel
                    control={
                        <Checkbox
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

    buildRadioField (fieldsConfig, lang, ids) {
        const options = FormConfig.coordonnees.filter(field => field.from === fieldsConfig.name)
        return (
            <div key={ids[fieldsConfig.name]}>
                <fieldset>
                    <legend>{lang[fieldsConfig.name].label}</legend>
                    <RadioGroup
                        value={this.state.fields[fieldsConfig.name]}
                        onChange={event => this.handleInputChange(event, fieldsConfig.name, fieldsConfig.type)}
                    >
                        {options.map(option => (
                            <FormControlLabel
                                key={ids[option.name]}
                                value={option.name} control={<Radio />} label={lang[option.name].label}
                            />))}
                    </RadioGroup>
                </fieldset>
            </div>
        )
    }

    buildDateField (fieldsConfig, lang, ids) {
        return (
            <MuiPickersUtilsProvider
                key={ids[fieldsConfig.name]}
                libInstance={moment} utils={MomentUtils}
                locale={this.props.lang}
            >
                <DatePicker
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

    buildMemberShipFields (fieldsConfig, lang, ids) {
        const options = FormConfig.membership.filter(field => field.from === fieldsConfig.name)
        return (
            <div key={ids[fieldsConfig.name]}>
                <fieldset>
                    <legend>{lang[fieldsConfig.name].label}</legend>
                    <RadioGroup
                        value={this.state.fields[fieldsConfig.name]}
                        onChange={event => this.handleInputChange(event, fieldsConfig.name, fieldsConfig.type)}
                    >
                        {options.map(option => (
                            <FormControlLabel
                                key={ids[option.name]}
                                value={option.name} control={<Radio />} label={lang[option.name].label}
                            />))}
                    </RadioGroup>
                </fieldset>
            </div>
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
        const CoordonneesFields = FormConfig.coordonnees.filter(field => !field.from)
        const MemberShipFields = FormConfig.membership.filter(field => !field.from)
        return (
            <>
                <div className='informations-coordonnees'>
                    <h1>{lang.title}</h1>
                    <div className='fields'>
                        <div className='coordonnees'>
                            {CoordonneesFields.map(field => {
                                let renderingField = null
                                switch (field.type) {
                                case types.text:
                                    renderingField = this.buildTextField(field, lang, variables.id.infosCoordonnees)
                                    break
                                case types.radio:
                                    renderingField = this.buildRadioField(field, lang, variables.id.infosCoordonnees)
                                    break
                                case types.checkBox:
                                    renderingField = this.buildCheckField(field, lang, variables.id.infosCoordonnees)
                                    break
                                case types.date:
                                    renderingField = this.buildDateField(field, lang, variables.id.infosCoordonnees)
                                    break
                                case types.inputMultiple:
                                    renderingField = this.buildMultipleInputField(field, lang, variables.id.infosCoordonnees)
                                    break
                                }
                                return renderingField
                            })}
                        </div>
                        <Divider variant='fullWidth' />
                        <div className='membership'>
                            {this.buildMemberShipFields(MemberShipFields[0], lang, variables.id.infosCoordonnees)}
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default InformationsCoordonnees
