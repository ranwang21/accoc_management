import React, { Component } from 'react'
import ChildCount from '../components/child-count'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import NextIcon from '@material-ui/icons/NavigateNextRounded'
import PreviousIcon from '@material-ui/icons/NavigateBeforeRounded'
import ChildrenInscription from '../components/forms/children-inscription'
import CollaboratorBenevoles from '../components/forms/collaborator-benevoles'
import InformationCoordonnees from '../components/forms/informations-coordonnees'
import ComplementaryInformations from '../components/forms/complementary-informations'
import { IconButton, Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core'
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

const passwordIds = require('../utilities/variables').variables.id.registerPassword
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
            parent: {
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
                    lessons: false
                }
            },
            collaborator: {
                fields: {
                    monday: null,
                    tuesday: null,
                    wednesday: null,
                    thursday: null,
                    magicJournal: null,
                    serveSnack: null,
                    animationPreparation: null,
                    accompanyWorkshop: null,
                    prepareSnack: null,
                    accompanyInternet: null,

                    motivation: null,
                    experience: null,
                    comment: null,
                    heard: null
                },
                errors: {
                    availability: false,
                    interest: false,
                    motivation: false,
                    experience: false
                }
            },
            childCountError: false,
            enableSubmit: false,
            loading: false,
            password: '',
            confirmPassword: '',
            errorPassword: false,
            showPassword: false,
            successRegister: false
        }
        this.handleStepClick = this.handleStepClick.bind(this)
        this.handleSaveRegister = this.handleSaveRegister.bind(this)
        this.onParentInputChange = this.onParentInputChange.bind(this)
        this.onChildrenInputChange = this.onChildrenInputChange.bind(this)
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this)
        this.handleChildrenFirstCount = this.handleChildrenFirstCount.bind(this)
        this.onInformationsInputChange = this.onInformationsInputChange.bind(this)
        this.onCollaboratorInputChange = this.onCollaboratorInputChange.bind(this)
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this)
        this.handleRessetStepAndRedirect = this.handleRessetStepAndRedirect.bind(this)
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/register.json') }

    //#region Functions To check Errors By Step

        stepInformationsHasErrors () {
            const fields = this.state.informationsCoordonnees.fields
            let contactsError = true
            if ((fields.contacts_personal !== null && fields.contacts_personal.replace(/\u2000/gi, '').length === 14) ||
            (fields.contacts_home !== null && fields.contacts_home.replace(/\u2000/gi, '').length === 14) ||
            (fields.contacts_work !== null && fields.contacts_work.replace(/\u2000/gi, '').length === 14) ||
            (fields.contacts_emergency !== null && fields.contacts_emergency.replace(/\u2000/gi, '').length === 14)) {
                contactsError = false
            }

            const newErrors = {
                sex: fields.sex === null,
                birthday: fields.birthday === null,
                last_name: fields.last_name === null,
                first_name: fields.first_name === null,
                address: fields.address === null,
                email: ((fields.email === null) || !Fetch.validateEmail(fields.email)),
                membership: fields.membership === null,
                contacts: contactsError
            }
            this.setState({
                informationsCoordonnees: {
                    ...this.state.informationsCoordonnees,
                    errors: {
                        ...this.state.informationsCoordonnees.errors,
                        ...newErrors
                    }
                }
            })
            const value = Object.values(newErrors).filter(val => val === true)
            return value.length !== 0
        }

        stepChildrenFirstHasErrors () {
            if (this.state.nbrChild === 0) {
                this.setState({ childCountError: true })
                setTimeout(() => { this.setState({ childCountError: false }) }, 1500)
                return true
            } else return false
        }

        stepChildrenHasErrors () {
            const currentStep = this.state.step
            const fields = this.state.childrenInscription.fields['step' + (currentStep - 2)]
            const newErrors = {
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
                oldInformations.errors['step' + (currentStep - 2)] = newErrors
                return {
                    childrenInscription: oldInformations
                }
            })
            const value = Object.values(newErrors).filter(val => val === true)
            return value.length !== 0
        }

        stepParentHasErrors () {
            const fields = this.state.parent.fields
            const newErrors = {
                lessons: fields.lessons === null
            }
            this.setState({
                    parent: {
                        ...this.state.parent,
                        errors: {
                            ...this.state.parent.errors,
                            ...newErrors
                        }
                    }
            })
            const value = Object.values(newErrors).filter(val => val === true)
            return value.length !== 0
        }

        stepCollaboratorHasErrors () {
            const fields = this.state.collaborator.fields
            const newErrors = {
                availability: (fields.monday === null &&
                    fields.tuesday === null &&
                    fields.wednesday === null &&
                    fields.thursday === null),
                interest: (fields.magicJournal === null &&
                    fields.serveSnack === null &&
                    fields.animationPreparation === null &&
                    fields.accompanyWorkshop === null &&
                    fields.prepareSnack === null &&
                    fields.accompanyInternet === null),
                motivation: fields.motivation === null,
                experience: fields.experience === null
            }
            this.setState({
                    collaborator: {
                        ...this.state.collaborator,
                        errors: {
                            ...this.state.collaborator.errors,
                            ...newErrors
                        }
                }
            })
            const value = Object.values(newErrors).filter(val => val === true)
            return value.length !== 0
        }

    //#endregion

    //#region Functions Events

    //#region Forms Input Change

        onInformationsInputChange (event, name, type) {
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

        onChildrenInputChange (event, name, type) {
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

        onParentInputChange (event, name, type) {
            let newValue = null
            if (type === types.checkBox) {
                newValue = event.target.checked
            } else {
                newValue = event.target.value === '' ? null : event.target.value
            }

            this.setState(state => {
                const oldInformations = state.parent
                oldInformations.fields[name] = newValue
                if (newValue !== null && oldInformations.errors[name]) oldInformations.errors[name] = false
                return {
                    parent: oldInformations
                }
            })
        }

        onCollaboratorInputChange (event, name, type) {
            let newValue = null
            if (type === types.checkBox) {
                newValue = event.target.checked
            } else {
                newValue = event.target.value === '' ? null : event.target.value
            }

            this.setState(state => {
                const oldInformations = state.collaborator
                oldInformations.fields[name] = newValue
                if (newValue !== null && oldInformations.errors[name]) oldInformations.errors[name] = false
                return {
                    collaborator: oldInformations
                }
            })
        }

    //#endregion

        handleChildrenFirstCount (event, newValue) {
            this.setState({ nbrChild: newValue })
        }

        handleStepClick (event, maxStep) {
            let currentStep = this.state.step
            const currentElement = event.target.tagName === 'path' ? event.target.parentElement : event.target
            if (currentElement.id === 'prev') {
                this.setState({
                    step: currentStep > 1 ? --currentStep : 1,
                    showPrev: currentStep > 1,
                    showNext: true
                })
            } else if (currentElement.id === 'next') {
                if(currentStep <= maxStep){
                    !this[this.getFunctionErrorName(maxStep)]() && (
                        this.setState({
                            step: ++currentStep,
                            showPrev: true,
                            showNext: currentStep < maxStep
                        })
                    )
                }else{
                    this.setState({
                        step: maxStep,
                        showPrev: true,
                        showNext: false
                    })
                }
            }
        }

        handlePasswordInputChange(event, fieldsName) {
            this.setState({[fieldsName]: event.target.value})
        }

        handleClickShowPassword(){
            this.setState({ showPassword: !this.state.showPassword })
        }

        handleMouseDownPassword(event){
            event.preventDefault()
        }

        handleRessetStepAndRedirect () {
            this.setState({
                step: 1,
                showPrev: false,
                showNext: true,
                informationsCoordonnees: {
                    ...this.state.informationsCoordonnees,
                    errors: {
                        ...this.state.informationsCoordonnees.errors,
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
                nbrChild: 0
            })
            this.props.onShowLoginForm()
        }

        handleSaveRegister () {
            if((this.state.password !== '' && this.state.confirmPassword !== '') && (this.state.password === this.state.confirmPassword)){
                this.setState({errorPassword: false, successRegister: true})
            }else{
                this.setState({errorPassword: true, successRegister: false})
            }
            /*
            const allFields = this.state.informationsCoordonnees.fields
            const user = require('../utilities/variables').variables.templateUser
            user.first_name = allFields.first_name
            user.last_name = allFields.last_name
            user.birthday = allFields.birthday
            console.log(user)
            */
        }

    //#endregion

    //#region Utilities

        getMaxStep () {
            switch (this.props.currentActor) {
            case actorsIds.collaborator:
                return 3
            case actorsIds.parent:
                return this.state.nbrChild + 4
            case actorsIds.both:
                return this.state.nbrChild + 5
            default:
                return 0
            }
        }

        getFunctionErrorName (maxStep) {
            let funcName = ''
            if (this.state.step <= 1) {
                funcName = 'Informations'
            } else {
                if (this.props.currentActor === actorsIds.collaborator) {
                    funcName = 'Collaborator'
                } else if (this.props.currentActor === actorsIds.parent) {
                    funcName = this.state.step <= 2 ? 'ChildrenFirst' : (
                        this.state.step < (maxStep - 1) ? 'Children' : 'Parent'
                    )
                } else {
                    funcName = this.state.step <= 2 ? 'ChildrenFirst' : (
                        this.state.step < (maxStep - 2) ? 'Children' : (
                            this.state.step < (maxStep - 1) ? 'Parent' : 'Collaborator'
                        )
                    )
                }
            }
            return 'step' + funcName + 'HasErrors'
        }

        buildPasswordFields (lang, name) {
            return (
                    <FormControl variant="outlined">
                        <InputLabel>{lang[name].label}</InputLabel>
                        <OutlinedInput
                            label={lang[name].label}
                            error={this.state.errorPassword}
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state[name]}
                            onChange={event => this.handlePasswordInputChange(event, name)}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    onClick={this.handleClickShowPassword}
                                    onMouseDown={this.handleMouseDownPassword}
                                    edge="end"
                                >
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
            )
        }

    //#endregion


    render () {
        const lang = this.getLangFile()
        const max = this.getMaxStep()
        return (
            <div className={this.state.successRegister ? 'register-container registered' : 'register-container'}>
                <div id={closeId} onClick={this.handleRessetStepAndRedirect}>{lang.back}</div>
                <div className='form-container'>
                    {!this.state.successRegister && (
                        <IconButton className={!this.state.showPrev ? 'disable-level-button' : ''} onClick={event => this.handleStepClick(event, max)}>
                            <PreviousIcon id='prev' fontSize='large' />
                        </IconButton>
                    )}
                    <div className='forms'>
                                {this.state.step === 1 && (
                                    <div>
                                        <InformationCoordonnees
                                            lang={this.props.lang}
                                            fields={this.state.informationsCoordonnees.fields}
                                            errors={this.state.informationsCoordonnees.errors}
                                            inputEvent={this.onInformationsInputChange}
                                        />
                                    </div>
                                )}
                                {(this.props.currentActor !== actorsIds.collaborator && this.state.nbrChild >= 0 && this.state.step === 2) && (
                                    <div>
                                        <ChildCount
                                            lang={this.props.lang}
                                            childCount={this.state.nbrChild}
                                            onChildCount={this.handleChildrenFirstCount}
                                            childCountError={this.state.childCountError}
                                        />
                                    </div>
                                )}
                                {[...Array(this.state.nbrChild).keys()].map(x => (
                                    this.props.currentActor !== actorsIds.collaborator && this.state.nbrChild >= (x + 1) && this.state.step === (x + 3) && (
                                        (<div key={this.state.nbrChild + x}>
                                            <ChildrenInscription
                                                lang={this.props.lang}
                                                nbre={this.state.step - 2}
                                                nbreChild={this.state.nbrChild}
                                                fields={this.state.childrenInscription.fields['step' + (x + 1)]}
                                                errors={this.state.childrenInscription.errors['step' + (x + 1)]}
                                                inputEvent={this.onChildrenInputChange}
                                            />
                                        </div>
                                    ))
                                ))}
                                {((this.props.currentActor === actorsIds.parent && this.state.step === (max - 1)) ||
                                    (this.props.currentActor === actorsIds.both && this.state.step === (max - 2))) && (
                                        <div>
                                            <ComplementaryInformations
                                                lang={this.props.lang}
                                                fields={this.state.parent.fields}
                                                errors={this.state.parent.errors}
                                                inputEvent={this.onParentInputChange}
                                            />
                                        </div>
                                )}
                                {((this.props.currentActor === actorsIds.collaborator && this.state.step === (max - 1)) ||
                                    (this.props.currentActor === actorsIds.both && this.state.step === (max - 1))) && (
                                        <div>
                                            <CollaboratorBenevoles
                                                lang={this.props.lang}
                                                fields={this.state.collaborator.fields}
                                                errors={this.state.collaborator.errors}
                                                inputEvent={this.onCollaboratorInputChange}
                                            />
                                        </div>
                                )}
                            {this.state.step === max && (
                                <div className='final-div'>
                                    {!this.state.successRegister
                                    ? (
                                        <div className='div-before-success'>
                                            <div className='fields'>
                                                <p>{lang.finalStep.registerPassword.label}</p>
                                                {this.state.errorPassword && (<p className='p-error'>{lang.finalStep.registerPassword.labelError}</p>)}
                                                {this.buildPasswordFields(lang.finalStep.registerPassword, 'password')}
                                                {this.buildPasswordFields(lang.finalStep.registerPassword, 'confirmPassword')}
                                                <Button
                                                    variant='outlined'
                                                    onClick={this.handleSaveRegister}
                                                >
                                                    {lang.finalStep.registerPassword.save}
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                    : (
                                        <div className='div-success'>
                                            <div>
                                                <p>Enregistrement effectué avec succès </p>
                                                <DoneAllIcon className='svg-done' />
                                            </div>
                                            <p>Votre inscription est en attente de validation.
                                                Vous recevrez un message de confirmation dans un bref delai.</p>
                                            <p>Merci pour l'intérêt que vous portez à la Maison d'Aurore.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                    </div>
                    {!this.state.successRegister && (
                    <IconButton className={!this.state.showNext ? 'disable-level-button' : ''} onClick={event => this.handleStepClick(event, max)}>
                        <NextIcon id='next' fontSize='large' />
                    </IconButton>
                    )}
                </div>
            </div>
        )
    }
}

export default RegisterContainer
