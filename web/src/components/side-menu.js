import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import '../styles/_header.scss'

class SideMenu extends Component {
    constructor () {
        super()
        this.state = {
            sideMenuSelected: ''
        }
    }

    getLangFile () {
        return require('../lang/' + this.props.lang + '/side-menu.json')
    }

    onClickMenu () {
        // we change side menu selected here
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
            <>
                <List aria-label='main mailbox folders'>
                    {this.renderSideMenuContent(userType)}
                </List>
            </>
        )
    }
}

export default SideMenu
