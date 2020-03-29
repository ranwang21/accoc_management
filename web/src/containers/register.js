import React, { Component } from 'react'
import InformationCoordonnees from '../components/forms/informations-coordonnees'
import ChildCount from '../components/child-count'
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
const actorsIds = require('../utilities/variables').variables.id.registerStart.check
const closeId = require('../utilities/variables').variables.id.loginRegister.showLogin
class RegisterContainer extends Component {
    constructor () {
        super()
        this.state = {
            step: 2,
            maxStep: 9,
            nbrChild: null,
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
            childCountError: false,
            enableSubmit: false,
            loading: false
        }

        this.onInputChange = this.onInputChange.bind(this)
        this.handleStepClick = this.handleStepClick.bind(this)
        this.handleChildCount = this.handleChildCount.bind(this)
        this.handleRessetStepAndRedirect = this.handleRessetStepAndRedirect.bind(this)
    }

    componentDidMount () {
    }

    step1HasError () {
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

    step2HasError () {
        if (this.state.nbrChild === null) {
            this.setState({ childCountError: true })
            setTimeout(() => { this.setState({ childCountError: false }) }, 1500)
            return true
        } else return false
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

    handleStepClick (event, currentStep, maxStep) {
        const currentElement = event.target.tagName === 'path' ? event.target.parentElement : event.target
        if (currentElement.id === 'prev') {
            this.setState({
                step: currentStep > 1 && --currentStep,
                showPrev: currentStep > 1,
                showNext: currentStep < maxStep
            })
        } else if (currentElement.id === 'next') {
            !this['step' + currentStep + 'HasError']() && (
                this.setState({
                    step: currentStep < maxStep && ++currentStep,
                    showPrev: currentStep > 1,
                    showNext: currentStep < maxStep
                })
            )
        }
    }

    handleRessetStepAndRedirect () {
        this.setState({
            step: 1,
            showPrev: false,
            showNext: true,
            errors1: {
                sex: false,
                birthday: false,
                last_name: false,
                first_name: false,
                email: false,
                address: false,
                contacts: false,
                membership: false
            }
        })
        this.props.onShowLoginForm()
    }

    handleChildCount (event, newValue) {
        this.setState({ nbrChild: newValue })
    }

    render () {
        const lang = this.getLangFile()
        const childCount = (this.props.currentActor !== actorsIds.collaborator) ? this.state.nbrChild : 0
        const max = (this.props.currentActor !== actorsIds.collaborator) ? (this.state.nbrChild + 4) : 3
        return (
            <div className='register-container'>
                <div id={closeId} onClick={this.handleRessetStepAndRedirect}>{lang.back}</div>
                <div className='form-container'>
                    <IconButton className={!this.state.showPrev ? 'disable-level-button' : ''} onClick={event => this.handleStepClick(event, this.state.step, max)}>
                        <PreviousIcon id='prev' fontSize='large' />
                    </IconButton>
                    <div className='forms'>
                        <div>
                            {this.state.step === 1 && (
                                <InformationCoordonnees lang={this.props.lang} fields={this.state.fields1} errors={this.state.errors1} inputEvent={this.onInputChange} />
                            )}
                            {(childCount === null || childCount >= 0) && this.state.step === 2 && (
                                <ChildCount
                                    lang={this.props.lang}
                                    childCount={childCount}
                                    onChildCount={this.handleChildCount}
                                    childCountError={this.state.childCountError}
                                />
                            )}
                            {childCount >= 1 && this.state.step === 3 && (
                                <ChildrenForm lang={this.props.lang} nbre={this.state.step - 2} />
                            )}
                            {childCount >= 2 && this.state.step === 4 && (
                                <ChildrenForm lang={this.props.lang} nbre={this.state.step - 2} />
                            )}
                            {childCount >= 3 && this.state.step === 5 && (
                                <ChildrenForm lang={this.props.lang} nbre={this.state.step - 2} />
                            )}
                            {childCount >= 4 && this.state.step === 6 && (
                                <ChildrenForm lang={this.props.lang} nbre={this.state.step - 2} />
                            )}
                            {childCount >= 5 && this.state.step === 7 && (
                                <ChildrenForm lang={this.props.lang} nbre={this.state.step - 2} />
                            )}
                            {this.state.step === (max - 1) && (<div>FORMULAIRE 3</div>)}
                            {this.state.step === max && (<div>FORMULAIRE 4</div>)}
                        </div>
                    </div>
                    <IconButton className={!this.state.showNext ? 'disable-level-button' : ''} onClick={event => this.handleStepClick(event, this.state.step, max)}>
                        <NextIcon id='next' fontSize='large' />
                    </IconButton>
                </div>
            </div>
        )
    }
}

export default RegisterContainer
