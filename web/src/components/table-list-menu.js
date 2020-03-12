import React, { Component } from 'react'
import { Button, ButtonGroup } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import '../styles/_table-list-menu.scss'

const variables = require('../utilities/variables.json')

class Table extends Component {
    getLangFile () {
        return require('../lang/' + this.props.lang + '/table-list-menu.json')
    }

    buildButton (name, key) {
        return (
            <Button
                variant={this.props.selected === key ? 'contained' : 'outlined'}
                onClick={event => this.props.handleActorSelected(event, key)}
            >
                {name}
            </Button>
        )
    }

    render () {
        const lang = this.getLangFile()
        return (
            <div className='table-menu'>
                <div>
                    <ButtonGroup size='medium' color='primary' aria-label='large outlined primary button group'>
                        {this.buildButton(lang.children, variables.actors.children)}
                        {this.buildButton(lang.parent, variables.actors.parent)}
                        {this.buildButton(lang.collaborator, variables.actors.collaborator)}
                    </ButtonGroup>
                </div>
                <div className='search-container'>
                    <input className='search-input' type='text' placeholder={lang.searchbar} />
                    <SearchIcon className='search-icon' />
                </div>
            </div>
        )
    }
}

export default Table
