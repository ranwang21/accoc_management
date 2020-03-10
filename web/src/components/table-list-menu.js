import React, { Component } from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { AppBar } from '@material-ui/core'

import '../styles/_table-list-menu.scss'

class Table extends Component {
    getLangFile () {
        return require('../lang/' + this.props.lang + '/user-buttons.json')
    }

    renderUserButtons (userType) {
        const lang = this.getLangFile()
        let buttons = {}
        if (userType === 'admin') {
            buttons = lang
            return Object.keys(buttons).map((key, index) => <Button key={key}>{buttons[key]}</Button>)
        }
        return null
    }

    renderSearchBarPlaceHolder () {
        return require('../lang/' + this.props.lang + '/form-placeholders.json')
    }

    render () {
        const lang = this.getLangFile()
        const userType = this.props.userType
        const placecholders = this.renderSearchBarPlaceHolder()

        return (
            <div className='table-menu'>
                <div>
                    {this.renderUserButtons(userType)}
                </div>
                <div className='search-container'>
                    <input className='search-input' type='text' placeholder={this.renderSearchBarPlaceHolder().searchbar} />
                    <SearchIcon className='search-icon' />
                </div>
            </div>
        )
    }
}

export default Table
