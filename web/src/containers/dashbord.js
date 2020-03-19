import React, { Component } from 'react'
import { Container, Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'
import CalendarSchedule from '../components/calendar-schedule'
import SideMenu from '../components/side-menu'
import ClassRoom from '../components/classroom'
import CreateAccount from '../components/create-account'
import Profile from '../components/profile'
import Schedule from '../components/schedule'
import Print from '../components/print'
import Snack from '../components/snack'
import List from './list'
import '../styles/_dashbord.scss'
const variables = require('../utilities/variables').variables

/* function formatDate (date) {
    const month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return date.getFullYear() + '-' + month + '-' + day
} */

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
            menuItemSelected: variables.menus.allUsers,
            showLogOutModal: false,
            requiredSaveValidationChange: false,
            showSnack: false
        }
        this.onhandleDateChange = this.onhandleDateChange.bind(this)
        this.onClickMenu = this.onClickMenu.bind(this)
        this.handleCloseLogOut = this.handleCloseLogOut.bind(this)
        this.handleConfirmLogOut = this.handleConfirmLogOut.bind(this)
        this.handleUpdateRequiredValidation = this.handleUpdateRequiredValidation.bind(this)
        this.handleCloseSnack = this.handleCloseSnack.bind(this)
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/dashbord.json') }

    componentDidMount () { this.setState({ menuItemSelected: upadteMenuSelectedByRole('super_admin') }) }

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

    handleUpdateRequiredValidation (value) {
        this.setState({ requiredSaveValidationChange: value })
    }

    handleCloseLogOut () { this.setState({ showLogOutModal: false }) }

    handleConfirmLogOut () {
        this.setState({ showLogOutModal: false })
        this.props.handleLogOutEvent()
    }

    switchToMenuSelected (lang) {
        switch (this.state.menuItemSelected) {
        case variables.menus.allUsers:
            return (<List lang={lang} menuSelected={this.state.menuItemSelected} onRequiredValidation={this.handleUpdateRequiredValidation} />)
        case variables.menus.validation:
            return (<List lang={lang} menuSelected={this.state.menuItemSelected} onRequiredValidation={this.handleUpdateRequiredValidation} />)
        case variables.menus.createAccount:
            return (<CreateAccount />)
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
            <Container className='dashbord' maxWidth={false}>
                <Snack show={this.state.showSnack} duration={5000} message={lang.messageRequiredSaveChangeSnack} onClose={this.handleCloseSnack} severity='warning' />
                <SideMenu lang={this.props.lang} menuItemSelected={this.state.menuItemSelected} handleClickMenu={this.onClickMenu} />

                {(this.state.menuItemSelected === variables.menus.classroomManagement || this.state.menuItemSelected === variables.menus.schedule) &&
                    (<CalendarSchedule lang={this.props.lang} date={this.state.date} handleDateChange={this.onhandleDateChange} />)}

                {this.switchToMenuSelected(this.props.lang)}

                <Dialog open={this.state.showLogOutModal} onClose={this.handleCloseLogOut} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
                    <DialogTitle id='alert-dialog-title'>{lang.modal.title}</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleCloseLogOut} color='primary'> {lang.modal.cancel} </Button>
                        <Button onClick={this.handleConfirmLogOut} color='primary' autoFocus> {lang.modal.confirm} </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        )
    }
}
export default Dashbord
