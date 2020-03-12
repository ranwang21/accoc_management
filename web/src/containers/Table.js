import React, { Component } from 'react'
import { Button, ButtonGroup } from '@material-ui/core'
import Switch from '@material-ui/core/Switch'
import Collapse from '@material-ui/core/Collapse'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TableListContainer from '../components/table-list-container'
import '../styles/_table.scss'

const variables = require('../utilities/variables.json')

class Table extends Component {
    constructor () {
        super()
        this.state = {
            actorSelected: variables.actors.children,
            search: false
        }
        this.onActorSelected = this.onActorSelected.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
    }

    getLangFile () {
        return require('../lang/' + this.props.lang + '/table.json')
    }

    buildButton (name, key) {
        return (
            <Button
                variant={this.state.actorSelected === key ? 'contained' : 'outlined'}
                onClick={event => this.onActorSelected(event, key)}
            >
                {name}
            </Button>
        )
    }

    onActorSelected (event, name) {
        this.setState({
            actorSelected: name
        })
    }

    handleSearchChange () {
        this.setState(state => {
            return {
                search: !state.search
            }
        })
    };

    render () {
        const lang = this.getLangFile()
        return (
            <div className='table'>
                <div className='table-menu'>
                    <ButtonGroup className='btnGroup' size='medium' color='primary' aria-label='large outlined primary button group'>
                        {this.buildButton(lang.children, variables.actors.children)}
                        {this.buildButton(lang.parent, variables.actors.parent)}
                        {this.buildButton(lang.collaborator, variables.actors.collaborator)}
                    </ButtonGroup>
                    <div className='search-container'>
                        <Collapse className='search-fields' in={this.state.search}>
                            <TextField size='small' label='par nom' variant='outlined' />
                            <TextField size='small' label='par prenom' variant='outlined' />
                        </Collapse>
                        <FormControlLabel
                            control={<Switch checked={this.state.search} onChange={this.handleSearchChange} />}
                            label='Search'
                        />
                    </div>
                </div>
                <TableListContainer lang={this.props.lang} />
                <div className='button-valider'>
                    <Button
                        variant='contained'
                        color='secondary'
                    >
                        VALIDER
                    </Button>
                </div>
            </div>
        )
    }
}

export default Table
