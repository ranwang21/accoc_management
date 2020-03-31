import React, { Component } from 'react'
import InformationCoordonnees from '../components/forms/informations-coordonnees'
import ChildCount from '../components/child-count'
import ChildrenInscription from '../components/forms/children-inscription'
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
    volunteering: 'volunteeringField',
    textAreaField: 'textAreaField',
    phoneField: 'phoneField'
}
const actorsIds = require('../utilities/variables').variables.id.registerStart.check
const closeId = require('../utilities/variables').variables.id.loginRegister.showLogin
class RegisterContainer extends Component {
    constructor () {
        super()
        this.state = {
            step: 1,
            nbrChild: 0,
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
            fieldsChild: {
                step1: {
                    lastName: null,
                    firstName: null,
                    birthday: null,
                    garde: null,
                    gardeParentOption: null,
                    gardeOtherOption: null,

                    school: null,
                    schoolLevel: null,
                    adlRegister: null,
                    redouble: null,
                    redoubleYesOption: null,
                    registerReason: null,
                    evaluation: null,
                    daycareService: null,
                    daycareServiceYesName: null,
                    daycareServiceYesPhone: null,

                    ramq: null,
                    expiration: null,
                    allergies: null,
                    drug: null,
                    othersInfos: null,

                    autorisationPapper: null,
                    autorisationInternet: null
                },
                step2: {
                    lastName: null,
                    firstName: null,
                    birthday: null,
                    garde: null,
                    gardeParentOption: null,
                    gardeOtherOption: null,

                    school: null,
                    schoolLevel: null,
                    adlRegister: null,
                    redouble: null,
                    redoubleYesOption: null,
                    registerReason: null,
                    evaluation: null,
                    daycareService: null,
                    daycareServiceYesName: null,
                    daycareServiceYesPhone: null,

                    ramq: null,
                    expiration: null,
                    allergies: null,
                    drug: null,
                    othersInfos: null,

                    autorisationPapper: null,
                    autorisationInternet: null
                },
                step3: {
                    lastName: null,
                    firstName: null,
                    birthday: null,
                    garde: null,
                    gardeParentOption: null,
                    gardeOtherOption: null,

                    school: null,
                    schoolLevel: null,
                    adlRegister: null,
                    redouble: null,
                    redoubleYesOption: null,
                    registerReason: null,
                    evaluation: null,
                    daycareService: null,
                    daycareServiceYesName: null,
                    daycareServiceYesPhone: null,

                    ramq: null,
                    expiration: null,
                    allergies: null,
                    drug: null,
                    othersInfos: null,

                    autorisationPapper: null,
                    autorisationInternet: null
                },
                step4: {
                    lastName: null,
                    firstName: null,
                    birthday: null,
                    garde: null,
                    gardeParentOption: null,
                    gardeOtherOption: null,

                    school: null,
                    schoolLevel: null,
                    adlRegister: null,
                    redouble: null,
                    redoubleYesOption: null,
                    registerReason: null,
                    evaluation: null,
                    daycareService: null,
                    daycareServiceYesName: null,
                    daycareServiceYesPhone: null,

                    ramq: null,
                    expiration: null,
                    allergies: null,
                    drug: null,
                    othersInfos: null,

                    autorisationPapper: null,
                    autorisationInternet: null
                },
                step5: {
                    lastName: null,
                    firstName: null,
                    birthday: null,
                    garde: null,
                    gardeParentOption: null,
                    gardeOtherOption: null,

                    school: null,
                    schoolLevel: null,
                    adlRegister: null,
                    redouble: null,
                    redoubleYesOption: null,
                    registerReason: null,
                    evaluation: null,
                    daycareService: null,
                    daycareServiceYesName: null,
                    daycareServiceYesPhone: null,

                    ramq: null,
                    expiration: null,
                    allergies: null,
                    drug: null,
                    othersInfos: null,

                    autorisationPapper: null,
                    autorisationInternet: null
                }
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
            childsErrors: {
                step1: {
                    lastName: false,
                    firstName: false,
                    birthday: false,
                    garde: false,

                    school: false,
                    schoolLevel: false,
                    redouble: false,
                    registerReason: false,
                    evaluation: false
                },
                step2: {
                    lastName: false,
                    firstName: false,
                    birthday: false,
                    garde: false,

                    school: false,
                    schoolLevel: false,
                    redouble: false,
                    registerReason: false,
                    evaluation: false
                },
                step3: {
                    lastName: false,
                    firstName: false,
                    birthday: false,
                    garde: false,

                    school: false,
                    schoolLevel: false,
                    redouble: false,
                    registerReason: false,
                    evaluation: false
                },
                step4: {
                    lastName: false,
                    firstName: false,
                    birthday: false,
                    garde: false,

                    school: false,
                    schoolLevel: false,
                    redouble: false,
                    registerReason: false,
                    evaluation: false
                },
                step5: {
                    lastName: false,
                    firstName: false,
                    birthday: false,
                    garde: false,

                    school: false,
                    schoolLevel: false,
                    redouble: false,
                    registerReason: false,
                    evaluation: false
                }
            },
            childCountError: false,
            enableSubmit: false,
            loading: false
        }
        this.number = '0123456789'
        this.patt = /[^0-9]/g

        this.onStep1InputChange = this.onStep1InputChange.bind(this)
        this.onChildInputChange = this.onChildInputChange.bind(this)
        this.handleStepClick = this.handleStepClick.bind(this)
        this.handleChildCount = this.handleChildCount.bind(this)
        this.handleRessetStepAndRedirect = this.handleRessetStepAndRedirect.bind(this)
    }

    componentDidMount () {
    }

    step1AllHasErrors (currentStep) {
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

    step2AllHasErrors (currentStep) {
        if (this.state.nbrChild === 0) {
            this.setState({ childCountError: true })
            setTimeout(() => { this.setState({ childCountError: false }) }, 1500)
            return true
        } else return false
    }

    stepChildHasErrors (currentStep) {
        const fields = this.state.fieldsChild['step' + (currentStep - 2)]
        const errors = {
            lastName: fields.lastName === null,
            firstName: fields.firstName === null,
            birthday: fields.birthday === null,
            garde: (fields.garde === null ||
                ((fields.garde === 'gardeMother' || fields.garde === 'gardeFather') && fields.gardeParentOption === null)),

            school: fields.school === null,
            schoolLevel: fields.schoolLevel === null,
            redouble: (fields.redouble === null || (fields.garde === 'redoubleYes' && fields.redoubleYesOption === null)),
            registerReason: fields.registerReason === null,
            evaluation: fields.evaluation === null
        }
        this.setState(state => {
            const errs = state.childsErrors
            errs['step' + (currentStep - 2)] = errors
            return {
                childsErrors: errs
            }
        })
        const value = Object.values(errors).filter(val => val === true)
        return value.length !== 0
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/register.json') }

    onStep1InputChange (event, name, type) {
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

    onChildInputChange (event, name, type) {
        let newValue = null
        if (type === types.date) {
            newValue = event._d
        } else if (type === types.checkBox) {
            newValue = event.target.checked
        } else {
            newValue = event.target.value === '' ? null : event.target.value
        }

        this.setState(state => {
            const currentStep = state.step - 2
            const oldFields = state.fieldsChild
            const oldErrors = state.childsErrors
            oldFields['step' + currentStep][name] = newValue
            if (newValue !== null && oldErrors['step' + currentStep][name]) oldErrors['step' + currentStep][name] = false
            return {
                fieldsChild: oldFields,
                childsErrors: oldErrors
            }
        })
    }

    handleStepClick (event, currentStep, maxStep) {
        const currentElement = event.target.tagName === 'path' ? event.target.parentElement : event.target
        if (currentElement.id === 'prev') {
            this.setState({
                step: currentStep > 1 ? --currentStep : 1,
                showPrev: currentStep > 1,
                showNext: currentStep < maxStep
            })
        } else if (currentElement.id === 'next') {
            const functionName = (currentStep > 2 && currentStep < (maxStep - 1)) ? 'stepChildHasErrors' : 'step' + currentStep + 'AllHasErrors'
            !this[functionName](currentStep) && (
                this.setState({
                    step: currentStep < maxStep ? ++currentStep : maxStep,
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

    formatPhoneInput (newValue) {
        const value = null
        const phoneTemplate = '+1 (XXX) XXX - XXXX'
        // console.log(phoneTemplate.replace('X', value))
        let result = '+1 ('
        if (value !== null) {
            if (value.length === 0) result = null
            if (value.length === 1) result += value
            if (value.length === 5) result += value
            if (value.length === 6) result += value
            if (value.length === 7) result += value
        } else {
            result += newValue
        }

        console.log(result)
    }

    render () {
        const lang = this.getLangFile()
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
                                <InformationCoordonnees lang={this.props.lang} fields={this.state.fields1} errors={this.state.errors1} inputEvent={this.onStep1InputChange} />
                            )}
                            {(this.props.currentActor !== actorsIds.collaborator && this.state.nbrChild >= 0 && this.state.step === 2) && (
                                <ChildCount
                                    lang={this.props.lang}
                                    childCount={this.state.nbrChild}
                                    onChildCount={this.handleChildCount}
                                    childCountError={this.state.childCountError}
                                />
                            )}
                            {[...Array(this.state.nbrChild).keys()].map(x => (
                                this.props.currentActor !== actorsIds.collaborator && this.state.nbrChild >= (x + 1) && this.state.step === (x + 3) && (
                                    (
                                        <ChildrenInscription
                                            key={this.state.nbrChild + x}
                                            lang={this.props.lang}
                                            nbre={this.state.step - 2}
                                            nbreChild={this.state.nbrChild}
                                            fields={this.state.fieldsChild['step' + (x + 1)]}
                                            errors={this.state.childsErrors['step' + (x + 1)]}
                                            inputEvent={this.onChildInputChange}
                                        />)
                                ))
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
