import React, { Component } from 'react'
import Cookie from 'react-cookies'
import { Button, ButtonGroup } from '@material-ui/core'
import Switch from '@material-ui/core/Switch'
import Collapse from '@material-ui/core/Collapse'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ListTable from '../components/list-table'
import '../styles/_list.scss'

const variables = require('../utilities/variables').variables

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

    getLangFile () { return require('../lang/' + this.props.lang + '/list.json') }

    buildButton (actor) {
        const role = Cookie.load('userRole')
        if (!(role === 'admin' && actor.title === 'admin')) {
            return (
                <Button
                    key={actor.id}
                    variant={this.state.actorSelected === actor.id ? 'contained' : 'outlined'}
                    onClick={event => this.onActorSelected(event, actor.id)}
                >
                    {actor.label}
                </Button>
            )
        }
    }

    onActorSelected (event, name) {
        this.setState({ actorSelected: name })
    }

    handleSearchChange () {
        this.setState(state => { return { search: !state.search } })
    };

    render () {
        const lang = this.getLangFile()
        const menuSelected = this.props.menuSelected
        return (
            <div className='list'>
                {menuSelected === variables.menus.allUsers && (
                    <div className='list-menu'>
                        <ButtonGroup className='btnGroup' size='medium' color='primary' aria-label='large outlined primary button group'>
                            {lang.actors.map(actor => this.buildButton(actor))}
                        </ButtonGroup>
                        <div className='search-container'>
                            <Collapse className='search-fields' in={this.state.search}>
                                <TextField size='small' label='par nom' variant='outlined' />
                                <TextField size='small' label='par prenom' variant='outlined' />
                            </Collapse>
                            <FormControlLabel
                                control={<Switch checked={this.state.search} onChange={this.handleSearchChange} />} label='Search'
                            />
                        </div>
                    </div>
                )}

                <ListTable lang={this.props.lang} actorSelected={this.state.actorSelected} menuSelected={menuSelected} />

                {menuSelected === variables.menus.validation && (
                    <div className='button-valider'><Button variant='contained' color='secondary'>{lang.btnValidate}</Button></div>
                )}
            </div>
        )
    }
}

export default Table
