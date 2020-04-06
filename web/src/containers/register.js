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

const variables = require('../utilities/variables').variables
const passwordIds = require('../utilities/variables').variables.id.registerPassword
const actorsIds = require('../utilities/variables').variables.id.registerStart.check
const closeId = require('../utilities/variables').variables.id.loginRegister.showLogin
const initialiseState = {
    step: 1,
    nbrChild: 0,
    showPrev: false,
    showNext: true,
    informationsCoordonnees: {
        fields: {
            sex: 'male',

            email: 'imoneparent@gmail.com',
            address: '5217 Av. Trans-Island',
            //birthday: null,
            birthday: new Date('1975-10-06'),
            last_name: 'Toihoun',
            first_name: 'Derrick',

            contacts_home: '(514) 363-7840',
            contacts_work: null,
            contacts_personal: '(514) 820-5545',
            contacts_emergency: null,

            is_subscribed: false,
            has_child: false,

            membership: null,
            membership_becomeMember_memberCard: null,
            membership_becomeMember_discountCard: null,
            membership_becomeMember_paymentMethod: null
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
                last_name: 'Toihoun',
                first_name: 'Melody',
                //birthday: null,
                birthday: new Date('2007-02-15'),
                garde: null,
                gardeParentOption: null,
                gardeOtherOption: null,

                school: 'Ecole cool',
                schoolLevel: null,
                adlRegister: null,
                redouble: null,
                lastRedoubleLevel: null,
                registerReason: 'Améliorer les performances de mon enfant',
                evaluation: null,
                daycareService: null,
                daycareServiceYesName: 'Sandrine H.',
                daycareServiceYesPhone: '(514) 666-8989',

                ramq: null,
                expiration: null,
                allergies: null,
                drug: null,
                othersInfos: null,

                autorisationPapper: null,
                autorisationInternet: null
            },
            step2: {
                last_name: 'Toihoun',
                first_name: 'Claude',
                //birthday: null,
                birthday: new Date('2007-02-15'),
                garde: null,
                gardeParentOption: null,
                gardeOtherOption: null,

                school: 'Ecole cool',
                schoolLevel: null,
                adlRegister: null,
                redouble: null,
                lastRedoubleLevel: null,
                registerReason: 'Améliorer les performances de mon enfant',
                evaluation: null,
                daycareService: null,
                daycareServiceYesName: 'Sandrine H.',
                daycareServiceYesPhone: '(514) 666-8989',

                ramq: null,
                expiration: null,
                allergies: null,
                drug: null,
                othersInfos: null,

                autorisationPapper: null,
                autorisationInternet: null
            },
            step3: {
                last_name: 'Toihoun',
                first_name: 'Marine',
                //birthday: null,
                birthday: new Date('2007-02-15'),
                garde: null,
                gardeParentOption: null,
                gardeOtherOption: null,

                school: 'Ecole cool',
                schoolLevel: null,
                adlRegister: null,
                redouble: null,
                lastRedoubleLevel: null,
                registerReason: 'Améliorer les performances de mon enfant',
                evaluation: null,
                daycareService: null,
                daycareServiceYesName: 'Sandrine H.',
                daycareServiceYesPhone: '(514) 666-8989',

                ramq: null,
                expiration: null,
                allergies: null,
                drug: null,
                othersInfos: null,

                autorisationPapper: null,
                autorisationInternet: null
            },
            step4: {
                last_name: null,
                first_name: null,
                birthday: null,
                garde: null,
                gardeParentOption: null,
                gardeOtherOption: null,

                school: null,
                schoolLevel: null,
                adlRegister: null,
                redouble: null,
                lastRedoubleLevel: null,
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
                last_name: null,
                first_name: null,
                birthday: null,
                garde: null,
                gardeParentOption: null,
                gardeOtherOption: null,

                school: null,
                schoolLevel: null,
                adlRegister: null,
                redouble: null,
                lastRedoubleLevel: null,
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
                last_name: false,
                first_name: false,
                birthday: false,
                garde: false,

                school: false,
                schoolLevel: false,
                redouble: false,
                registerReason: false,
                evaluation: false
            },
            step2: {
                last_name: false,
                first_name: false,
                birthday: false,
                garde: false,

                school: false,
                schoolLevel: false,
                redouble: false,
                registerReason: false,
                evaluation: false
            },
            step3: {
                last_name: false,
                first_name: false,
                birthday: false,
                garde: false,

                school: false,
                schoolLevel: false,
                redouble: false,
                registerReason: false,
                evaluation: false
            },
            step4: {
                last_name: false,
                first_name: false,
                birthday: false,
                garde: false,

                school: false,
                schoolLevel: false,
                redouble: false,
                registerReason: false,
                evaluation: false
            },
            step5: {
                last_name: false,
                first_name: false,
                birthday: false,
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
            expectationsVar: null,
            needsVar: null,
            talents: null,
            snacks: false,
            organization: false,
            support: false,
            otherInvolvement: null
        },
        errors: {
            expectationsVar: false
        }
    },
    collaborator: {
        fields: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            magicJournal: false,
            serveSnack: false,
            animationPreparation: false,
            accompanyWorkshop: false,
            prepareSnack: false,
            accompanyInternet: false,

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

class RegisterContainer extends Component {
    constructor () {
        super()
        this.state = {
            ...initialiseState,
            roles: null,
            days: null
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
        this.funcReg = this.funcReg.bind(this)
        this.savedUser = this.savedUser.bind(this)
    }

    componentDidMount(){
        Fetch.getRolesAndDays(this.funcReg)
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
                expectationsVar: fields.expectationsVar === null
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
                availability: (!fields.monday && !fields.tuesday && !fields.wednesday && !fields.thursday),
                interest: (!fields.magicJournal && !fields.serveSnack && !fields.animationPreparation &&
                            !fields.accompanyWorkshop && !fields.prepareSnack && !fields.accompanyInternet),
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
                ...initialiseState
            })
            this.props.onShowLoginForm()
        }

        handleSaveRegister () {
            if((this.state.password !== '' && this.state.confirmPassword !== '') && (this.state.password === this.state.confirmPassword)){
                this.setState({errorPassword: false, successRegister: true})
            }else{
                this.setState({errorPassword: true, successRegister: false})
            }
            let params = null
            let role = ''
            switch (this.props.currentActor) {
                case actorsIds.parent:
                    params = {...this.state.informationsCoordonnees.fields, ...this.state.parent.fields}
                    role = 'parent'
                    break;
                case actorsIds.collaborator:
                    params = {...this.state.informationsCoordonnees.fields, ...this.state.collaborator.fields}
                    role = 'collaborater'
                    break;
                case actorsIds.both:
                    params = {...this.state.informationsCoordonnees.fields, ...this.state.parent.fields, ...this.state.collaborator.fields}
                    role = 'collab_parent'
                    break;
            }
            const user = this.getUserToSave(params, this.state.roles, role)
            const userLogin = {
                id_user: null,
                email: this.state.informationsCoordonnees.fields.email,
                password: this.state.password !== null ? this.state.password : 'abc123...',
                is_active: false
            }
            Fetch.registerSaveUser(user, userLogin, this.savedUser)
            console.log(user)
        }

        savedUser(success, idUser){
            console.log('success => ', success)
            console.log('idUser => ', idUser)
            const nbrChild = this.state.nbrChild
            if (this.props.currentActor !== actorsIds.collaborator) {
                const childRole = 'children'
                const childFields = this.state.childrenInscription.fields
                const child = { child1 : null, child2 : null, child3 : null, child4 : null, child5 : null }
                /*
                child1 = nbrChild <= 1 ? this.getUserToSave({...childFields.step1, ...{ id_parent: idUser }}, actorsIds.children, this.state.roles, childRole) : null
                child2 = nbrChild <= 2 ? this.getUserToSave({...childFields.step2, ...{ id_parent: idUser }}, actorsIds.children, this.state.roles, childRole) : null
                child3 = nbrChild <= 3 ? this.getUserToSave({...childFields.step3, ...{ id_parent: idUser }}, actorsIds.children, this.state.roles, childRole) : null
                child4 = nbrChild <= 4 ? this.getUserToSave({...childFields.step4, ...{ id_parent: idUser }}, actorsIds.children, this.state.roles, childRole) : null
                child5 = nbrChild <= 5 ? this.getUserToSave({...childFields.step5, ...{ id_parent: idUser }}, actorsIds.children, this.state.roles, childRole) : null
                */
                for (let i = 0; i < nbrChild; i++) {
                    child['child' + i] = this.getUserToSave({...childFields['step' + i], ...{ id_parent: idUser }}, this.state.roles, childRole)
                    Fetch.saveChildren(child['child' + i], this.saveChildren)
                }
            }
        }

        saveChildren(success){
            console.log(success)
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

        getUserToSave (fields, roles, roleTitle) {
            const user = require('../utilities/variables').variables.templateUser
            const findRole = roles.filter(role => role.title === roleTitle)

            user.id_role= findRole[0]._id,
            user.sex= fields.sex ? fields.sex : null,
            user.address= fields.address ? fields.address : null,
            user.birthday = (fields.birthday.getFullYear() + '/' + (fields.birthday.getMonth() + 1) + '/' + fields.birthday.getDate()),
            user.has_child= fields.has_child ? fields.has_child : null,
            user.last_name= fields.last_name,
            user.first_name= fields.first_name,
            user.is_subscribed= fields.is_subscribed ? fields.is_subscribed : null,
            user.contact = [
                {title: 'home', phone: fields.contacts_home ? fields.contacts_home : null},
                {title: 'work', phone: fields.contacts_work ? fields.contacts_work : null},
                {title: 'personal', phone: fields.contacts_personal ? fields.contacts_personal : null},
                {title: 'emergency', phone: fields.contacts_emergency ? fields.contacts_emergency : null},
            ]
            user.membership = [
                {question: 'membership',response: fields.membership ? fields.membership : null},
                {question: 'memberCard',response: fields.membership_becomeMember_memberCard ? fields.membership_becomeMember_memberCard : null},
                {question: 'discountCard',response: fields.membership_becomeMember_discountCard ? fields.membership_becomeMember_discountCard : null},
                {question: 'paymentMethod',response: fields.membership_becomeMember_paymentMethod ? fields.membership_becomeMember_paymentMethod : null},
            ]
            user.photo = 'no-photo.jpg'
            user.garde = [
                {question: 'garde',response: fields.garde ? fields.garde : null},
                {question: 'gardeParentOption', response: fields.gardeParentOption ? fields.gardeParentOption : null},
                {question: 'gardeOtherOption', response: fields.gardeOtherOption ? fields.gardeOtherOption : null}
            ]
            user.id_parent= fields.id_parent ? fields.id_parent : null,
            user.school_info = [
                {question: 'school', response: fields.school ? fields.school : null},
                {question: 'schoolLevel', response: fields.schoolLevel ? fields.schoolLevel : null},
                {question: 'adlRegister',response: fields.adlRegister ? fields.adlRegister : null},
                {question: 'redouble', response: fields.redouble ? fields.redouble : null},
                {question: 'lastRedoubleLevel', response: fields.lastRedoubleLevel ? fields.lastRedoubleLevel : null},
                {question: 'registerReason', response: fields.registerReason ? fields.registerReason : null},
                {question: 'evaluation', response: fields.evaluation ? fields.evaluation : null},
                {question: 'daycareService', response: fields.daycareService ? fields.daycareService : null},
                {question: 'daycareServiceYesName', response: fields.daycareServiceYesName ? fields.daycareServiceYesName : null},
                {question: 'daycareServiceYesPhone', response: fields.daycareServiceYesPhone ? fields.daycareServiceYesPhone : null}
            ]
            user.medical_info = [
                {question: 'ramq', response: fields.ramq ? fields.ramq : null},
                {question: 'expiration', response: fields.expiration ? ((fields.expiration.getMonth() + 1) + '/' + fields.expiration.getFullYear()) : null},
                {question: 'allergies', response: fields.allergies ? fields.allergies : null},
                {question: 'drug', response: fields.drug ? fields.drug : null},
                {question: 'othersInfos', response: fields.othersInfos ? fields.othersInfos : null}
            ]
            user.authorization = [
                {question: 'autorisationPapper', response: fields.autorisationPapper ? fields.autorisationPapper : null},
                {question: 'autorisationInternet', response: fields.autorisationInternet ? fields.autorisationInternet : null}
            ]
            user.involvement = [
                {question: 'snacks',response: fields.snacks ? fields.snacks : null},
                {question: 'talents',response: fields.talents ? fields.talents : null},
                {question: 'support',response: fields.support ? fields.support : null},
                {question: 'organization',response: fields.organization ? fields.organization : null},
                {question: 'otherInvolvement',response: fields.otherInvolvement ? fields.otherInvolvement : null}
            ]
            user.need = fields.needsVar ? fields.needsVar : null
            user.expectation = fields.expectationsVar ? fields.expectationsVar : null
            user.availability = []
            fields.monday && user.availability.push(fields.monday)
            fields.tuesday && user.availability.push(fields.tuesday)
            fields.wednesday && user.availability.push(fields.wednesday)
            fields.thursday && user.availability.push(fields.thursday)
            user.interest = []
            fields.magicJournal && user.interest.push(fields.magicJournal)
            fields.serveSnack && user.interest.push(fields.serveSnack)
            fields.animationPreparation && user.interest.push(fields.animationPreparation)
            fields.accompanyWorkshop && user.interest.push(fields.accompanyWorkshop)
            fields.prepareSnack && user.interest.push(fields.prepareSnack)
            fields.accompanyInternet && user.interest.push(fields.accompanyInternet)
            user.comment = fields.comment ? fields.comment : null
            user.experience = fields.experience ? fields.experience : null
            user.motivation = fields.motivation ? fields.motivation : null
            user.question = [
                {question: 'heard',response: fields.heard ? fields.heard : null}
            ]

            return user
        }

    //#endregion

    testRegister(){
        /*
        let role = ''

        switch (this.props.currentActor) {
            case actorsIds.collaborator:
                role = 'collaborater'
                break
            case actorsIds.parent:
                role = 'collaborater'
                break
            case actorsIds.both:
                role = 'collab_parent'
                break
            }
        Fetch.getIdRole('', 'super_admin', this.funcReg)
        */
    }

    funcReg(roles, days){
        this.setState({roles: roles, days: days})
    }

    render () {
        const lang = this.getLangFile()
        const max = this.getMaxStep()
        //console.log(this.state.roles)
        /*
        console.log(this.state.days)
        */
        return (
            <div className={this.state.successRegister ? 'register-container registered' : 'register-container'}>
                {this.props.onShowLoginForm !== null && (
                    <div className='div-back' id={closeId} onClick={this.handleRessetStepAndRedirect}>{lang.back}</div>
                )}
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
