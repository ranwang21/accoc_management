import React, { Component } from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'
import CalendarSchedule from '../components/calendar-schedule'
import SideMenu from '../components/side-menu'
import ClassRoom from '../components/classroom'
import CreateAccount from '../components/create-account'
import Profile from '../components/profile'
import Schedule from '../components/schedule'
import Print from '../components/print'
import Snack from '../components/snack'
import List from './list'
import Fetch from '../utilities/fetch-datas'
import { withCookies } from 'react-cookie'
import '../styles/_dashbord.scss'
const variables = require('../utilities/variables').variables

/* function formatDate (date) {
    const month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return date.getFullYear() + '-' + month + '-' + day
} */

const actors = [
    { idUser: 'dfvdfvg0', roleLabel: 'high_admin', firstName: 'admin', lastName: 'ADMINISTRATEUR', isValid: true },

    { idUser: 'dfvdfvggt1', roleLabel: 'admin', firstName: 'admin1', lastName: 'ADMINISTRATEUR1', isValid: true },
    { idUser: 'dfvdfvggt2', roleLabel: 'admin', firstName: 'admin2', lastName: 'ADMINISTRATEUR2', isValid: true },
    { idUser: 'dfvdfvggt3', roleLabel: 'admin', firstName: 'admin3', lastName: 'ADMINISTRATEUR3', isValid: true },

    { idUser: 'dfvdfvg1', roleLabel: 'only_parent', firstName: 'parent_1', lastName: 'P_NAME_1', isValid: true },
    { idUser: 'dfvdfvg2', roleLabel: 'only_parent', firstName: 'parent_2', lastName: 'P_NAME_2', isValid: false },
    { idUser: 'dfvdfvg3', roleLabel: 'only_parent', firstName: 'parent_3', lastName: 'P_NAME_3', isValid: true },
    { idUser: 'dfvdfvg4', roleLabel: 'only_parent', firstName: 'parent_4', lastName: 'P_NAME_4', isValid: false },

    { idUser: 'dfvdfvg5', roleLabel: 'only_collaborator', firstName: 'colaborateur_1', lastName: 'C_NAME_1', isValid: false },
    { idUser: 'dfvdfvg6', roleLabel: 'only_collaborator', firstName: 'colaborateur_2', lastName: 'C_NAME_1', isValid: true },
    { idUser: 'dfvdfvg7', roleLabel: 'only_collaborator', firstName: 'colaborateur_3', lastName: 'C_NAME_1', isValid: false },
    { idUser: 'dfvdfvg8', roleLabel: 'only_collaborator', firstName: 'colaborateur_4', lastName: 'C_NAME_1', isValid: true },

    { idUser: 'dfvdfvg9', roleLabel: 'both', firstName: 'both_1', lastName: 'B_NAME_1', isValid: true },
    { idUser: 'dfvdfvg10', roleLabel: 'both', firstName: 'both_2', lastName: 'B_NAME_2', isValid: false },
    { idUser: 'dfvdfvg11', roleLabel: 'both', firstName: 'both_3', lastName: 'B_NAME_3', isValid: true },
    { idUser: 'dfvdfvg12', roleLabel: 'both', firstName: 'both_4', lastName: 'B_NAME_4', isValid: false },

    { idUser: 'dfvdfvg13', roleLabel: 'child', firstName: 'children_ab', lastName: 'C_NAME_10', isValid: true },
    { idUser: 'dfvdfvg14', roleLabel: 'child', firstName: 'children_qf', lastName: 'C_NAME_1', isValid: true },
    { idUser: 'dfvdfvg15', roleLabel: 'child', firstName: 'children_lf', lastName: 'C_NAME_2', isValid: true },
    { idUser: 'dfvdfvg16', roleLabel: 'child', firstName: 'children_gh', lastName: 'C_NAME_3', isValid: true },
    { idUser: 'dfvdfvg17', roleLabel: 'child', firstName: 'children_af', lastName: 'C_NAME_4', isValid: true },
    { idUser: 'dfvdfvg18', roleLabel: 'child', firstName: 'children_lo', lastName: 'C_NAME_5', isValid: true },
    { idUser: 'dfvdfvg19', roleLabel: 'child', firstName: 'children_sg', lastName: 'C_NAME_6', isValid: true },
    { idUser: 'dfvdfvg20', roleLabel: 'child', firstName: 'children_pl', lastName: 'C_NAME_7', isValid: true },
    { idUser: 'dfvdfvg21', roleLabel: 'child', firstName: 'children_et', lastName: 'C_NAME_8', isValid: true },
    { idUser: 'dfvdfvg22', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_9', isValid: true },
    { idUser: 'dfvdfvg23', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_11', isValid: true },
    { idUser: 'dfvdfvg24', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_12', isValid: true },
    { idUser: 'dfvdfvg25', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_13', isValid: true },
    { idUser: 'dfvdfvg26', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_14', isValid: true },
    { idUser: 'dfvdfvg27', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_15', isValid: true },
    { idUser: 'dfvdfvg28', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_16', isValid: true },
    { idUser: 'dfvdfvg29', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_17', isValid: true },
    { idUser: 'dfvdfvg30', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_18', isValid: true },
    { idUser: 'dfvdfvg31', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_19', isValid: true },
    { idUser: 'dfvdfvg32', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_20', isValid: true },
    { idUser: 'dfvdfvg33', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_21', isValid: true },
    { idUser: 'dfvdfvg34', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_22', isValid: true },
    { idUser: 'dfvdfvg35', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_23', isValid: true },
    { idUser: 'dfvdfvg36', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_24', isValid: true },
    { idUser: 'dfvdfvg37', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_25', isValid: true },
    { idUser: 'dfvdfvg38', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_26', isValid: true },
    { idUser: 'dfvdfvg39', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_27', isValid: true },
    { idUser: 'dfvdfvg40', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_28', isValid: true },
    { idUser: 'dfvdfvg41', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_29', isValid: true },
    { idUser: 'dfvdfvg42', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_30', isValid: true },
    { idUser: 'dfvdfvg43', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_31', isValid: true },
    { idUser: 'dfvdfvg44', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_32', isValid: true },
    { idUser: 'dfvdfvg45', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_33', isValid: true },
    { idUser: 'dfvdfvg46', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_34', isValid: true },
    { idUser: 'dfvdfvg47', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_35', isValid: true },
    { idUser: 'dfvdfvg48', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_36', isValid: true }
]

const isValid = ({ isValid }) => isValid === true
const isNotValid = ({ isValid }) => isValid === false

const upadteMenuSelectedByRole = (role) => {
    let select = null
    switch (role) {
    case variables.role.highAdmin:
    case variables.role.admin:
        select = variables.menus.allUsers
        break
    case variables.role.both:
    case variables.role.parent:
        select = variables.menus.childList
        break
    case variables.role.collab:
        select = variables.menus.schedule
        break
    }
    return select
}

class Dashbord extends Component {
    constructor () {
        super()
        this.state = {
            date: new Date(),
            actors: null,
            actorsForValidations: null,
            menuItemSelected: variables.menus.allUsers,
            showLogOutModal: false,
            requiredSaveValidationChange: false,
            showSnack: false
        }
        this.currentUser = null
        this.onhandleDateChange = this.onhandleDateChange.bind(this)
        this.onClickMenu = this.onClickMenu.bind(this)
        this.handleCloseLogOut = this.handleCloseLogOut.bind(this)
        this.handleConfirmLogOut = this.handleConfirmLogOut.bind(this)
        this.handleCloseSnack = this.handleCloseSnack.bind(this)
        this.onValidationChange = this.onValidationChange.bind(this)
        this.onBtnValidSave = this.onBtnValidSave.bind(this)
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/dashbord.json') }

    getCurrentUser () {
        const currentUser = this.props.cookies.get(variables.cookies.user)
        return Fetch.decodeData(currentUser)
    }

    componentDidMount () {
        this.setState({
            menuItemSelected: upadteMenuSelectedByRole(this.getCurrentUser().role),
            actors: actors.filter(isValid),
            actorsForValidations: actors.filter(isNotValid)
        })
        // Fetch all users in actors
    }

    onhandleDateChange (newDate) { this.setState({ date: newDate }) }

    onClickMenu (event, index) {
        if (!this.state.requiredSaveValidationChange) {
            index === variables.menus.logOut
                ? this.setState({ showLogOutModal: true })
                : this.setState({ menuItemSelected: index })
        } else {
            this.setState({ showSnack: true })
        }
    }

    handleCloseLogOut () { this.setState({ showLogOutModal: false }) }

    handleConfirmLogOut () {
        this.setState({ showLogOutModal: false })
        this.props.handleLogOutEvent()
    }

    onValidationChange (event, newValue) {
        if (newValue !== null) {
            const values = newValue.split(',')
            const index = this.state.actorsForValidations.map(e => e.idUser).indexOf(values[0])
            if (index !== -1) {
                this.setState(state => {
                    const actorsForValidations = state.actorsForValidations
                    actorsForValidations[index].isValid = !(actorsForValidations[index].isValid)
                    const list = actorsForValidations.filter(e => e.isValid === true)
                    return {
                        actorsForValidations,
                        requiredSaveValidationChange: list.length !== 0
                    }
                })
            }
        }
    }

    onBtnValidSave () {
        // Fetch To update all users where there isValid become true
        // Fetch all users in actors
        this.setState({
            actors: actors.filter(isValid),
            actorsForValidations: actors.filter(isNotValid)
        })
        this.setState({ requiredSaveValidationChange: false })
    }

    switchToMenuSelected (lang) {
        switch (this.state.menuItemSelected) {
        case variables.menus.allUsers:
            return (
                <List
                    lang={lang}
                    actors={this.state.actors}
                    actorsForValidations={this.state.actorsForValidations}
                    menuSelected={this.state.menuItemSelected}
                    validationChange={this.onValidationChange}
                    handleBtnValidSave={this.onBtnValidSave}
                />)
        case variables.menus.validation:
            return (
                <List
                    lang={lang}
                    actors={this.state.actors}
                    actorsForValidations={this.state.actorsForValidations}
                    menuSelected={this.state.menuItemSelected}
                    validationChange={this.onValidationChange}
                    handleBtnValidSave={this.onBtnValidSave}
                />)
        case variables.menus.createAccount:
            return (<CreateAccount lang={lang} />)
        case variables.menus.classroomManagement:
            return (<ClassRoom lang={lang} />)
        case variables.menus.prints:
            return (<Print lang={lang} />)
        case variables.menus.childList:
            return (<List lang={lang} />)
        case variables.menus.profile:
            return (<Profile lang={lang} />)
        case variables.menus.schedule:
            return (<Schedule lang={lang} />)
        default:
            return (<div className='table' />)
        }
    }

    handleCloseSnack () { this.setState({ showSnack: false }) }

    render () {
        const lang = this.getLangFile()
        return (
            <div className='dashbord'>
                <Snack show={this.state.showSnack} duration={5000} message={lang.messageRequiredSaveChangeSnack} onClose={this.handleCloseSnack} severity='warning' />
                <SideMenu
                    lang={this.props.lang}
                    menuItemSelected={this.state.menuItemSelected}
                    handleClickMenu={this.onClickMenu}
                    validationLength={this.state.actorsForValidations && this.state.actorsForValidations.length}
                />

                {(this.state.menuItemSelected === variables.menus.classroomManagement || this.state.menuItemSelected === variables.menus.schedule) &&
                    (<CalendarSchedule lang={this.props.lang} date={this.state.date} handleDateChange={this.onhandleDateChange} />)}

                <div className='content'>
                    {this.switchToMenuSelected(this.props.lang)}
                </div>

                <Dialog open={this.state.showLogOutModal} onClose={this.handleCloseLogOut} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
                    <DialogTitle id='alert-dialog-title'>{lang.modal.title}</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleCloseLogOut} color='primary'> {lang.modal.cancel} </Button>
                        <Button onClick={this.handleConfirmLogOut} color='primary' autoFocus> {lang.modal.confirm} </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default withCookies(Dashbord)
