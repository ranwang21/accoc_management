import React, { Component } from 'react'
import Loading from '../components/loading'
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined'

import CalendarSchedule from '../components/calendar-schedule'
import SideMenu from '../components/side-menu'
import ClassRoom from '../components/classroom'
import CreateAccount from '../components/create-account'
import ScheduleManagement from '../components/schedule-management'
import Profile from '../components/profile'
import Schedule from '../components/schedule'
import Print from '../components/print'
import Snack from '../components/snack'
import Lists from './list'
import Fetch from '../utilities/fetch-datas'
import { withCookies } from 'react-cookie'
import '../styles/_dashbord.scss'
const variables = require('../utilities/variables').variables

/* function formatDate (date) {
    const month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return date.getFullYear() + '-' + month + '-' + day
} */

const isValidActor = ({ roleTitle, isValid }) => (roleTitle !== 'children' && isValid === true)
const isInValidActor = ({ roleTitle, isValid }) => (roleTitle !== 'children' && isValid === false)
const isChildren = ({ roleTitle }) => roleTitle === 'children'

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
            actors: [],
            childrens: [],
            validActors: [],
            inValidActors: [],
            classRooms: [],
            menuItemSelected: variables.menus.allUsers,
            showLogOutModal: false,
            requiredSaveValidationChange: false,
            showSnack: false,
            left: false,
            image: '',
            showLoading: true
        }
        this.currentUser = null
        this.onhandleDateChange = this.onhandleDateChange.bind(this)
        this.onClickMenu = this.onClickMenu.bind(this)
        this.handleCloseLogOut = this.handleCloseLogOut.bind(this)
        this.handleConfirmLogOut = this.handleConfirmLogOut.bind(this)
        this.handleCloseSnack = this.handleCloseSnack.bind(this)
        this.onValidationChange = this.onValidationChange.bind(this)
        this.onBtnValidSave = this.onBtnValidSave.bind(this)
        this.toggleDrawer = this.toggleDrawer.bind(this)
        this.setActorLists = this.setActorLists.bind(this)
        this.setClassRoom = this.setClassRoom.bind(this)
        this.onUsersListChange = this.onUsersListChange.bind(this)
        this.onImageChange = this.onImageChange.bind(this)
    }

    setActorLists (list) {
        this.setState({ showLoading: true })
        const sortIds = (list.map(us => us._id)).sort()
        const sortUser = (sortIds.map(id => (list.filter(user => user._id === id))[0]))
        this.setState({
            actors: [...sortUser],
            validActors: [...sortUser.filter(isValidActor)],
            inValidActors: [...sortUser.filter(isInValidActor)],
            childrens: [...sortUser.filter(isChildren)]
        })
        setTimeout(() => {
            this.setState({ showLoading: false })
        }, 1000)
    }

    setClassRoom (classRoomsList) {
        this.setState({ classRooms: [{ _id: '12345', title: 'Non défini' }, ...classRoomsList] })
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/dashbord.json') }

    getCurrentUser () {
        const currentUser = this.props.cookies.get(variables.cookies.user)
        return Fetch.decodeData(currentUser)
    }

    componentDidMount () {
        this.setState({
            menuItemSelected: upadteMenuSelectedByRole(this.getCurrentUser().role)
        })
        // Fetch all users in actors
        Fetch.getAllUsers(this.props.cookies.get(variables.cookies.token), this.setActorLists)
        Fetch.classRoom.get(this.props.cookies.get(variables.cookies.token), this.setClassRoom)
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
            if (values[2] === 'admin' && this.state.menuItemSelected === variables.menus.allUsers) {
                const usersToUpdate = this.state.actors.filter(user => user._id === values[0])
                usersToUpdate[0].isValid = values[1]
                Fetch.updateUserValidities(this.props.cookies.get(variables.cookies.token), usersToUpdate, this.setActorLists)
            } else {
                const index = this.state.inValidActors.map(e => e._id).indexOf(values[0])
                if (index !== -1) {
                    this.setState(state => {
                        const inValidActors = state.inValidActors
                        inValidActors[index].isValid = !(inValidActors[index].isValid)
                        const list = inValidActors.filter(e => e.isValid === true)
                        return {
                            inValidActors,
                            requiredSaveValidationChange: list.length !== 0
                        }
                    })
                }
            }
        }
    }

    onBtnValidSave () {
        const usersToUpdate = this.state.inValidActors.filter(user => user.isValid === true)
        Fetch.updateUserValidities(this.props.cookies.get(variables.cookies.token), usersToUpdate, this.setActorLists)
        this.setState({ requiredSaveValidationChange: false })
    }

    onUsersListChange (event) {
        Fetch.getAllUsers(this.props.cookies.get(variables.cookies.token), this.setActorLists)
    }

    onImageChange (idUser, img) {
        this.setState(state => {
            const actors = state.actors
            const index = actors.findIndex(x => x._id === idUser)
            if (index !== -1) actors[index].img = img
            return { actors: actors }
        })
    }

    switchToMenuSelected (lang) {
        switch (this.state.menuItemSelected) {
        case variables.menus.allUsers:
            return (
                <Lists
                    lang={lang}
                    actors={this.state.actors}
                    inValidActors={this.state.inValidActors}
                    classRooms={this.state.classRooms}
                    menuSelected={this.state.menuItemSelected}
                    validationChange={this.onValidationChange}
                    handleBtnValidSave={this.onBtnValidSave}
                    handleImageChange={this.onImageChange}
                />)
        case variables.menus.validation:
            return (
                <Lists
                    lang={lang}
                    actors={this.state.actors}
                    inValidActors={this.state.inValidActors}
                    classRooms={this.state.classRooms}
                    menuSelected={this.state.menuItemSelected}
                    validationChange={this.onValidationChange}
                    handleBtnValidSave={this.onBtnValidSave}
                    handleImageChange={this.onImageChange}
                />)
        case variables.menus.createAccount:
            return (<CreateAccount lang={lang} updateUsers={this.onUsersListChange} />)
        case variables.menus.classroomManagement:
            return (<ClassRoom lang={lang} classRooms={this.state.classRooms} />)
        case variables.menus.scheduleManagement:
            return (<CreateAccount lang={lang} updateUsers={this.onUsersListChange} />)
        case variables.menus.prints:
            return (<Print lang={lang} />)
        case variables.menus.childList:
            return (<Lists lang={lang} />)
        case variables.menus.profile:
            return (<Profile lang={lang} />)
        case variables.menus.schedule:
            return (<Schedule lang={lang} />)
        default:
            return (<div className='table' />)
        }
    }

    handleCloseSnack () { this.setState({ showSnack: false }) }

    toggleDrawer (event, open) {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }

        this.setState({ left: open })
    }

    imageGetted (data) {
        console.log(data.data)
        this.setState({ image: data.data })
    }

    render () {
        const lang = this.getLangFile()
        return (
            <div className='dashbord'>
                <Snack show={this.state.showSnack} duration={5000} message={lang.messageRequiredSaveChangeSnack} onClose={this.handleCloseSnack} severity='warning' />
                <div className='menu-mobile'>
                    <Button
                        variant='outlined'
                        size='medium'
                        color='primary'
                        onClick={event => this.toggleDrawer(event, true)}
                        startIcon={<MenuOutlinedIcon />}
                    >
                        {lang.menuTitle}
                    </Button>

                    <SwipeableDrawer
                        anchor='right'
                        open={this.state.left}
                        onClose={event => this.toggleDrawer(event, false)}
                        onOpen={event => this.toggleDrawer(event, true)}
                    >
                        <div
                            role='presentation'
                            onClick={event => this.toggleDrawer(event, false)}
                            onKeyDown={event => this.toggleDrawer(event, false)}
                        >
                            <SideMenu
                                lang={this.props.lang}
                                menuItemSelected={this.state.menuItemSelected}
                                handleClickMenu={this.onClickMenu}
                                validationLength={this.state.inValidActors && this.state.inValidActors.length}
                            />
                        </div>
                    </SwipeableDrawer>

                </div>
                <SideMenu
                    className='menu-desktop'
                    lang={this.props.lang}
                    menuItemSelected={this.state.menuItemSelected}
                    handleClickMenu={this.onClickMenu}
                    validationLength={this.state.inValidActors && this.state.inValidActors.length}
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

                {this.state.showLoading && <Loading className='loading' lang={this.props.lang} />}
            </div>
        )
    }
}
export default withCookies(Dashbord)
