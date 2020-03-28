import React, { Component } from 'react'
import InformationCoordonnees from '../components/forms/informations-coordonnees'
import ChildrenForm from '../components/forms/children-form'
import PreviousIcon from '@material-ui/icons/NavigateBeforeRounded'
import NextIcon from '@material-ui/icons/NavigateNextRounded'
import IconButton from '@material-ui/core/IconButton'
import Fetch from '../utilities/fetch-datas'
import '../styles/_register.scss'
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
class RegisterContainer extends Component {
    constructor () {
        super()
        this.state = {
            step: 1,
            showPrev: false,
            showNext: true,
            fields1: {
                sex: null,

                email: null,
                address: null,
                birthday: null,
                last_name: null,
                first_name: null,

                contacts_home: null,
                contacts_work: null,
                contacts_personal: null,
                contacts_emergency: null,

                is_subscribed: null,
                has_child: null,

                membership: null,
                membership_becomeMember_memberCard: null,
                membership_becomeMember_discountCard: null,
                membership_becomeMember_paymentMethod: null,

                participation: null,
                participation_jmc: null,
                participation_repas: null,
                participation_cuisine: null,
                participation_viecomm: null,
                participation_atelier: null,
                participation_diverses: null,
                participation_debrouille: null,

                participation_diverses_options: null,

                volunteering: null,
                volunteering_repas: null,
                volunteering_devoirs: null,
                volunteering_accueil: null,
                volunteering_diverses: null,
                volunteering_citoyenne: null,
                volunteering_diverses_options: null
            },
            errors1: {
                sex: false,
                birthday: false,
                last_name: false,
                first_name: false,
                email: false,
                address: false,
                contacts: false,
                membership: false
            },
            enableSubmit: false,
            loading: false
        }

        this.onInputChange = this.onInputChange.bind(this)
        this.handleStepClick = this.handleStepClick.bind(this)
    }

    hasError () {
        const errors = {
            sex: this.state.fields1.sex === null,
            birthday: this.state.fields1.birthday === null,
            last_name: this.state.fields1.last_name === null,
            first_name: this.state.fields1.first_name === null,
            address: this.state.fields1.address === null,
            email: ((this.state.fields1.email === null) || !Fetch.validateEmail(this.state.fields1.email)),
            membership: this.state.fields1.membership === null,
            contacts: ((this.state.fields1.contacts_personal === null) && (this.state.fields1.contacts_home === null) &&
                        (this.state.fields1.contacts_work === null) && (this.state.fields1.contacts_emergency === null))
        }
        this.setState({ errors1: errors })
        const value = Object.values(errors).filter(val => val === true)
        return value.length !== 0
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/register.json') }

    onInputChange (event, name, type) {
        let newValue = null
        if (type === types.date) {
            newValue = event._d
        } else if (type === types.checkBox) {
            newValue = event.target.checked
        } else {
            newValue = event.target.value === '' ? null : event.target.value
        }

        this.setState(state => {
            const oldFields = state.fields1
            const oldErrors = state.errors1
            oldFields[name] = newValue

            if (newValue !== null && oldErrors[name]) oldErrors[name] = false

            return {
                fields1: oldFields,
                errors1: oldErrors
            }
        })
    }

    handleStepClick () {
        const currentElement = event.target.tagName === 'path' ? event.target.parentElement : event.target
        if (currentElement.id === 'prev') {
            this.setState(state => {
                return {
                    step: state.step > 1 ? --state.step : state.step,
                    showPrev: state.step > 1,
                    showNext: state.step < 4
                }
            })
        } else if (currentElement.id === 'next') {
            if (!this.hasError()) {
                this.setState(state => {
                    return {
                        step: state.step < 4 ? ++state.step : state.step,
                        showPrev: state.step > 1,
                        showNext: state.step < 4
                    }
                })
            }
        }
    }

    render () {
        const lang = this.getLangFile()
        return (
            <div className='register-container'>
                <div onClick={this.props.onShowLoginForm}>{lang.back}</div>
                <div className='form-container'>
                    <IconButton className={!this.state.showPrev ? 'disable-level-button' : ''} onClick={this.handleStepClick} aria-label='delete'>
                        <PreviousIcon id='prev' fontSize='large' />
                    </IconButton>
                    <div className='forms'>
                        <div>
                            {this.state.step === 1 && (
                                <InformationCoordonnees lang={this.props.lang} fields={this.state.fields1} errors={this.state.errors1} inputEvent={this.onInputChange} />
                            )}
                            {this.state.step === 2 && (<ChildrenForm lang={this.props.lang} />)}
                            {this.state.step === 3 && (<div>FORMULAIRE 3</div>)}
                            {this.state.step === 4 && (<div>FORMULAIRE 4</div>)}
                        </div>
                    </div>
                    <IconButton className={!this.state.showNext ? 'disable-level-button' : ''} onClick={this.handleStepClick} aria-label='delete'>
                        <NextIcon id='next' fontSize='large' />
                    </IconButton>
                </div>
            </div>
        )
    }
}

export default RegisterContainer
