import React, { Component } from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import ListIcon from '@material-ui/icons/FormatListBulleted'
import ValidationIcon from '@material-ui/icons/PlaylistAddCheck'
import CreateIcon from '@material-ui/icons/AddBoxOutlined'
import ClassroomIcon from '@material-ui/icons/HomeWork'
import DetailsIcon from '@material-ui/icons/Details'
import ScheduleIcon from '@material-ui/icons/Schedule'
import PrintIcon from '@material-ui/icons/Print'
import LogOutIcon from '@material-ui/icons/PowerSettingsNew'

import '../styles/_side-menu.scss'

const variables = require('../utilities/variables.json')

function getMenuIcon (menu) {
    switch (menu) {
    case variables.menus.allUsers:
        return (<ListIcon />)
    case variables.menus.validation:
        return (<ValidationIcon />)
    case variables.menus.createAccount:
        return (<CreateIcon />)
    case variables.menus.classroomManagement:
        return (<ClassroomIcon />)
    case variables.menus.prints:
        return (<PrintIcon />)
    case variables.menus.childList:
        return (<ListIcon />)
    case variables.menus.profile:
        return (<DetailsIcon />)
    case variables.menus.schedule:
        return (<ScheduleIcon />)
    case variables.menus.logOut:
        return (<LogOutIcon />)
    }
}

function getMenuItemsByRole (lang, role) {
    let items = {}
    switch (role) {
    case 'high_admin':
        items = lang.highAdmin
        break
    case 'admin':
        items = lang.admin
        break
    case 'both':
        items = lang.both
        break
    case 'only_parent':
        items = lang.parent
        break
    case 'only_collaborator':
        items = lang.collaborator
        break
    }
    return items
}

class SideMenu extends Component {
    getLangFile () {
        return require('../lang/' + this.props.lang + '/side-menu.json')
    }

    render () {
        const lang = this.getLangFile()
        const items = getMenuItemsByRole(lang, this.props.userRole)
        return (
            <div className='side-menu'>
                <List>
                    {Object.keys(items).map((item, index) =>
                        <ListItem
                            key={index}
                            button
                            onClick={event => this.props.handleClickMenu(event, variables.menus[item])}
                            selected={this.props.menuItemSelected === variables.menus[item]}
                        >
                            <ListItemIcon>
                                {getMenuIcon(variables.menus[item])}
                            </ListItemIcon>
                            <ListItemText primary={items[item]} />
                        </ListItem>)}
                </List>
            </div>
        )
    }
}

export default SideMenu
