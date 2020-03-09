import React, { Component } from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import { AppBar } from '@material-ui/core'

import '../styles/_footer.scss'

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
            <AppBar position='static'>
                <List className='table' aria-label='main mailbox folders'>
                    <ButtonGroup color='primary' aria-label='outlined primary button group'>
                        {this.renderUserButtons(userType)}
                    </ButtonGroup>
                    <InputBase
                        placeholder={placecholders.searchbar}
                    />
                    <IconButton type='submit' aria-label='search'>
                        <SearchIcon />
                    </IconButton>
                </List>
            </AppBar>
        )
    }
}

export default Table
