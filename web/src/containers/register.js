import React, { Component } from 'react'
import InformationCoordonnees from '../components/forms/informations-coordonnees'
import ChildrenInscription from '../components/forms/children-inscription'
import ComplementaryInformations from '../components/forms/complementary-informations'
import ChildCount from '../components/child-count'
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
            informationsCoordonnees: {
                fields: {
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
                errors: {
                    sex: false,
                    birthday: false,
                    last_name: false,
                    first_name: false,
                    email: false,
                    address: false,
                    contacts: false,
                    membership: false
                }
            },
            childrenInscription: {
                fields: {
                    step1: {
                        lastName: null,
                        firstName: null,
                        birthdayChild: null,
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
                        birthdayChild: null,
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
                        birthdayChild: null,
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
                        birthdayChild: null,
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
                        birthdayChild: null,
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
                errors: {
                    step1: {
                        lastName: false,
                        firstName: false,
                        birthdayChild: false,
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
                        birthdayChild: false,
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
                        birthdayChild: false,
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
                        birthdayChild: false,
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
                        birthdayChild: false,
                        garde: false,

                        school: false,
                        schoolLevel: false,
                        redouble: false,
                        registerReason: false,
                        evaluation: false
                    }
                }
            },
            complementaryInformations: {
                fields: {
                    lessons: null,
                    help: null,
                    talents: null,
                    snacks: null,
                    organization: null,
                    support: null,
                    participation: null
                },
                errors: {
                    lessons: true
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
        this.onComplementaryInfoInputChange = this.onComplementaryInfoInputChange.bind(this)
        this.handleStepClick = this.handleStepClick.bind(this)
        this.handleChildCount = this.handleChildCount.bind(this)
        this.handleRessetStepAndRedirect = this.handleRessetStepAndRedirect.bind(this)
    }

    componentDidMount () {
    }

    step1AllHasErrors (currentStep) {
        const fields = this.state.informationsCoordonnees.fields
        let contactsError = true
        if ((fields.contacts_personal !== null && fields.contacts_personal.replace(/\u2000/gi, '').length === 14) ||
        (fields.contacts_home !== null && fields.contacts_home.replace(/\u2000/gi, '').length === 14) ||
        (fields.contacts_work !== null && fields.contacts_work.replace(/\u2000/gi, '').length === 14) ||
        (fields.contacts_emergency !== null && fields.contacts_emergency.replace(/\u2000/gi, '').length === 14)) {
            contactsError = false
        }

        const errors = {
            sex: fields.sex === null,
            birthday: fields.birthday === null,
            last_name: fields.last_name === null,
            first_name: fields.first_name === null,
            address: fields.address === null,
            email: ((fields.email === null) || !Fetch.validateEmail(fields.email)),
            membership: fields.membership === null,
            contacts: contactsError
        }
        this.setState(state => {
            const oldInformations = state.informationsCoordonnees
            oldInformations.errors = errors
            return {
                informationsCoordonnees: oldInformations
            }
        })
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
        const fields = this.state.childrenInscription.fields['step' + (currentStep - 2)]
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
            const oldInformations = state.childrenInscription
            oldInformations.errors['step' + (currentStep - 2)] = errors
            return {
                childrenInscription: oldInformations
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
            const oldInformations = state.informationsCoordonnees
            oldInformations.fields[name] = newValue
            if (newValue !== null && oldInformations.errors[name]) oldInformations.errors[name] = false
            return {
                informationsCoordonnees: oldInformations
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
            const oldInformations = state.childrenInscription
            const currentStep = state.step - 2
            oldInformations.fields['step' + currentStep][name] = newValue
            if (newValue !== null && oldInformations.errors['step' + currentStep][name]) oldInformations.errors['step' + currentStep][name] = false
            return {
                childrenInscription: oldInformations
            }
        })
    }

    onComplementaryInfoInputChange (event, name, type) {
        let newValue = null
        if (type === types.checkBox) {
            newValue = event.target.checked
        } else {
            newValue = event.target.value === '' ? null : event.target.value
        }

        this.setState(state => {
            const oldInformations = state.complementaryInformations
            oldInformations.fields[name] = newValue
            if (newValue !== null && oldInformations.errors[name]) oldInformations.errors[name] = false
            return {
                complementaryInformations: oldInformations
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
            informationsCoordonnees: {
                errors: {
                    sex: false,
                    birthday: false,
                    last_name: false,
                    first_name: false,
                    email: false,
                    address: false,
                    contacts: false,
                    membership: false
                }
            }
        })
        this.props.onShowLoginForm()
    }

    handleChildCount (event, newValue) {
        this.setState({ nbrChild: newValue })
    }

    render () {
        const lang = this.getLangFile()
        const max = (this.props.currentActor === actorsIds.both || this.props.currentActor === actorsIds.parent) ? (this.state.nbrChild + 4) : 3
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
                                <InformationCoordonnees
                                    lang={this.props.lang}
                                    fields={this.state.informationsCoordonnees.fields}
                                    errors={this.state.informationsCoordonnees.errors}
                                    inputEvent={this.onStep1InputChange}
                                />
                            )}
                            {((this.props.currentActor === actorsIds.both || this.props.currentActor === actorsIds.parent) && this.state.nbrChild >= 0 && this.state.step === 2) && (
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
                                            fields={this.state.childrenInscription.fields['step' + (x + 1)]}
                                            errors={this.state.childrenInscription.errors['step' + (x + 1)]}
                                            inputEvent={this.onChildInputChange}
                                        />)
                                ))
                            )}
                            {this.state.step === (max - 1) &&
                            (
                                <ComplementaryInformations
                                    lang={this.props.lang}
                                    fields={this.state.complementaryInformations.fields}
                                    errors={this.state.complementaryInformations.errors}
                                    inputEvent={this.onComplementaryInfoInputChange}
                                />)}
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
