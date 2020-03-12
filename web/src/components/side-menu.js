import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import '../styles/_side-menu.scss'

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

        return Object.keys(items).map((item, index) =>
            <ListItem
                key={index}
                button
                onClick={event => this.props.handleClickMenu(event, index)}
                selected={this.props.menuItemSelected === index}
            >
                <ListItemText primary={items[item]} />
            </ListItem>)
    }

    render () {
        const userType = this.props.userType
        return (
            <div className='side-menu'>
                <List>
                    {this.renderSideMenuContent(userType)}
                </List>
            </div>
        )
    }
}

export default SideMenu
