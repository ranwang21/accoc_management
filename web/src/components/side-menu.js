import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import '../styles/_header.scss'

class SideMenu extends Component {
    getLangFile () {
        return require('../lang/' + this.props.lang + '/side-menu.json')
    }

    renderSideMenuContent (userType) {
        const lang = this.getLangFile()
        let items = {}
        if (userType === 'admin') {
            items = lang.admin
        } else {
            items = lang.others
        }

        return Object.keys(items).map(key => <ListItem button key={key}><ListItemText primary={items[key]} /></ListItem>)
    }

    render () {
        const userType = this.props.userType
        return (
            <div>
                <List className='side-menu' aria-label='main mailbox folders'>
                    {this.renderSideMenuContent(userType)}
                </List>
            </div>
        )
    }
}

export default SideMenu
