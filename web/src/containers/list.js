import React, { Component } from 'react'
import { Button, ButtonGroup } from '@material-ui/core'
import Switch from '@material-ui/core/Switch'
import Collapse from '@material-ui/core/Collapse'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ListTable from '../components/list-table'
import '../styles/_list.scss'

const variables = require('../utilities/variables').variables

const isChild = ({ roleLabel }) => roleLabel === 'child'
const isParent = ({ roleLabel }) => ((roleLabel === 'only_parent' || roleLabel === 'both'))
const isCollaborator = ({ roleLabel }) => ((roleLabel === 'only_collaborator' || roleLabel === 'both'))
const isAdmin = ({ roleLabel }) => (roleLabel === 'admin')

function getRoleFunction (role) {
    switch (role) {
    case variables.role.child:
        return isChild
    case variables.role.parent:
        return isParent
    case variables.role.collab:
        return isCollaborator
    case variables.role.admin:
        return isAdmin
    }
}
class Table extends Component {
    constructor () {
        super()
        this.state = {
            actorSelected: variables.actors.children,
            search: false,
            lastNameInput: '',
            firstNameInput: ''
        }
        this.onActorSelected = this.onActorSelected.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this)
    }

    componentDidMount () {
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/list.json') }

    buildButton (actor) {
        const role = this.props.currentUser.role
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
    }

    handleSearchInputChange (event) {
        (event.target.id === 'lastName')
            ? this.setState({ lastNameInput: event.target.value })
            : this.setState({ firstNameInput: event.target.value })
    }

    getActorSelected () {
        let actorSelected = ''
        switch (this.state.actorSelected) {
        case variables.actors.children:
            actorSelected = variables.role.child
            break
        case variables.actors.parent:
            actorSelected = variables.role.parent
            break
        case variables.actors.collaborator:
            actorSelected = variables.role.collab
            break
        case variables.actors.admin:
            actorSelected = variables.role.admin
            break
        }
        return actorSelected
    }

    updateNewActorsList () {
        if (this.props.menuSelected === variables.menus.validation) {
            return this.props.actorsForValidations
        } else {
            const isRole = getRoleFunction(this.getActorSelected())
            const newList = this.props.actors !== null ? this.props.actors.filter(isRole) : []
            const lastList = []
            if (newList !== null) {
                newList.map(row => {
                    const ch1 = row.firstName.toLowerCase().search(this.state.firstNameInput.toLowerCase())
                    const ch2 = row.lastName.toLowerCase().search(this.state.lastNameInput.toLowerCase());
                    (ch1 !== -1 && ch2 !== -1) && lastList.push(row)
                })
            }
            return lastList
        }
    }

    render () {
        const lang = this.getLangFile()
        const allActors = this.updateNewActorsList()
        const menuSelected = this.props.menuSelected
        const validationsChange = this.props.actorsForValidations !== null && this.props.actorsForValidations.filter(actor => (actor.isValid === true))

        return (
            <div className='list'>
                {menuSelected === variables.menus.allUsers && (
                    <div className='list-menu'>
                        <ButtonGroup className='btnGroup' size='medium' color='primary' aria-label='large outlined primary button group'>
                            {lang.actors.map(actor => this.buildButton(actor))}
                        </ButtonGroup>
                        <div className='search-container'>
                            <Collapse className='search-fields' in={this.state.search}>
                                <TextField
                                    size='small' variant='outlined' id='lastName'
                                    value={this.state.lastNameInput}
                                    onChange={this.handleSearchInputChange} label={lang.searchLastName}
                                />
                                <TextField
                                    size='small' id='firstName' variant='outlined'
                                    value={this.state.firstNameInput}
                                    onChange={this.handleSearchInputChange} label={lang.searchFirstName}
                                />
                            </Collapse>
                            <FormControlLabel
                                control={<Switch checked={this.state.search} onChange={this.handleSearchChange} />} label={lang.search}
                            />
                        </div>
                    </div>
                )}

                <ListTable
                    lang={this.props.lang}
                    menuSelected={menuSelected}
                    handleValidationChange={this.props.validationChange}
                    allActors={allActors}
                />

                {(menuSelected === variables.menus.validation && validationsChange.length > 0) && (
                    <div className='button-valider'><Button variant='contained' color='secondary' onClick={this.props.handleBtnValidSave}>{lang.btnValidate}</Button></div>
                )}
            </div>
        )
    }
}

export default Table
