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

const actors = [
    { idUser: 'dfvdfvg0', roleLabel: 'high_admin', firstName: 'admin', lastName: 'ADMINISTRATEUR', isValid: true },

    { idUser: 'dfvdfvggt1', roleLabel: 'admin', firstName: 'admin1', lastName: 'ADMINISTRATEUR1', isValid: true },
    { idUser: 'dfvdfvggt2', roleLabel: 'admin', firstName: 'admin2', lastName: 'ADMINISTRATEUR2', isValid: true },
    { idUser: 'dfvdfvggt3', roleLabel: 'admin', firstName: 'admin3', lastName: 'ADMINISTRATEUR3', isValid: true },

    { idUser: 'dfvdfvg1', roleLabel: 'only_parent', firstName: 'parent_1', lastName: 'P_NAME_1', isValid: true },
    { idUser: 'dfvdfvg2', roleLabel: 'only_parent', firstName: 'parent_2', lastName: 'P_NAME_2', isValid: false },
    { idUser: 'dfvdfvg3', roleLabel: 'only_parent', firstName: 'parent_3', lastName: 'P_NAME_3', isValid: true },
    { idUser: 'dfvdfvg4', roleLabel: 'only_parent', firstName: 'parent_4', lastName: 'P_NAME_4', isValid: false },

    { idUser: 'dfvdfvg5', roleLabel: 'only_collaborator', firstName: 'colaborateur_1', lastName: 'C_NAME_1', isValid: false },
    { idUser: 'dfvdfvg6', roleLabel: 'only_collaborator', firstName: 'colaborateur_2', lastName: 'C_NAME_1', isValid: true },
    { idUser: 'dfvdfvg7', roleLabel: 'only_collaborator', firstName: 'colaborateur_3', lastName: 'C_NAME_1', isValid: false },
    { idUser: 'dfvdfvg8', roleLabel: 'only_collaborator', firstName: 'colaborateur_4', lastName: 'C_NAME_1', isValid: true },

    { idUser: 'dfvdfvg9', roleLabel: 'both', firstName: 'both_1', lastName: 'B_NAME_1', isValid: true },
    { idUser: 'dfvdfvg10', roleLabel: 'both', firstName: 'both_2', lastName: 'B_NAME_2', isValid: false },
    { idUser: 'dfvdfvg11', roleLabel: 'both', firstName: 'both_3', lastName: 'B_NAME_3', isValid: true },
    { idUser: 'dfvdfvg12', roleLabel: 'both', firstName: 'both_4', lastName: 'B_NAME_4', isValid: false },

    { idUser: 'dfvdfvg13', roleLabel: 'child', firstName: 'children_ab', lastName: 'C_NAME_10', isValid: true },
    { idUser: 'dfvdfvg14', roleLabel: 'child', firstName: 'children_qf', lastName: 'C_NAME_1', isValid: true },
    { idUser: 'dfvdfvg15', roleLabel: 'child', firstName: 'children_lf', lastName: 'C_NAME_2', isValid: true },
    { idUser: 'dfvdfvg16', roleLabel: 'child', firstName: 'children_gh', lastName: 'C_NAME_3', isValid: true },
    { idUser: 'dfvdfvg17', roleLabel: 'child', firstName: 'children_af', lastName: 'C_NAME_4', isValid: true },
    { idUser: 'dfvdfvg18', roleLabel: 'child', firstName: 'children_lo', lastName: 'C_NAME_5', isValid: true },
    { idUser: 'dfvdfvg19', roleLabel: 'child', firstName: 'children_sg', lastName: 'C_NAME_6', isValid: true },
    { idUser: 'dfvdfvg20', roleLabel: 'child', firstName: 'children_pl', lastName: 'C_NAME_7', isValid: true },
    { idUser: 'dfvdfvg21', roleLabel: 'child', firstName: 'children_et', lastName: 'C_NAME_8', isValid: true },
    { idUser: 'dfvdfvg22', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_9', isValid: true },
    { idUser: 'dfvdfvg23', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_11', isValid: true },
    { idUser: 'dfvdfvg24', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_12', isValid: true },
    { idUser: 'dfvdfvg25', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_13', isValid: true },
    { idUser: 'dfvdfvg26', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_14', isValid: true },
    { idUser: 'dfvdfvg27', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_15', isValid: true },
    { idUser: 'dfvdfvg28', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_16', isValid: true },
    { idUser: 'dfvdfvg29', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_17', isValid: true },
    { idUser: 'dfvdfvg30', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_18', isValid: true },
    { idUser: 'dfvdfvg31', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_19', isValid: true },
    { idUser: 'dfvdfvg32', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_20', isValid: true },
    { idUser: 'dfvdfvg33', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_21', isValid: true },
    { idUser: 'dfvdfvg34', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_22', isValid: true },
    { idUser: 'dfvdfvg35', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_23', isValid: true },
    { idUser: 'dfvdfvg36', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_24', isValid: true },
    { idUser: 'dfvdfvg37', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_25', isValid: true },
    { idUser: 'dfvdfvg38', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_26', isValid: true },
    { idUser: 'dfvdfvg39', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_27', isValid: true },
    { idUser: 'dfvdfvg40', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_28', isValid: true },
    { idUser: 'dfvdfvg41', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_29', isValid: true },
    { idUser: 'dfvdfvg42', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_30', isValid: true },
    { idUser: 'dfvdfvg43', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_31', isValid: true },
    { idUser: 'dfvdfvg44', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_32', isValid: true },
    { idUser: 'dfvdfvg45', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_33', isValid: true },
    { idUser: 'dfvdfvg46', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_34', isValid: true },
    { idUser: 'dfvdfvg47', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_35', isValid: true },
    { idUser: 'dfvdfvg48', roleLabel: 'child', firstName: 'children_pp', lastName: 'C_NAME_36', isValid: true }
]

const isValid = ({ isValid }) => isValid === true
const isNotValid = ({ isValid }) => isValid === false
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
            actors: null,
            actorsForValidations: null,
            actorSelected: variables.actors.children,
            search: false,
            lastNameInput: '',
            firstNameInput: ''
        }
        this.onActorSelected = this.onActorSelected.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this)
        this.onValidationChange = this.onValidationChange.bind(this)
    }

    componentDidMount () {
        this.setState({
            actors: actors.filter(isValid),
            actorsForValidations: actors.filter(isNotValid)
        })
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
    }

    handleSearchInputChange (event) {
        (event.target.id === 'lastName')
            ? this.setState({ lastNameInput: event.target.value })
            : this.setState({ firstNameInput: event.target.value })
    }

    onValidationChange (event, newValue) {
        if (newValue !== null) {
            const values = newValue.split(',')
            this.setState(state => {
                const list = state.actorsForValidations
                const index = list.map(e => e.idUser).indexOf(values[0])
                list[index].isValid = !(list[index].isValid)
                return { list }
            })
        }
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
            return this.state.actorsForValidations
        } else {
            const isRole = getRoleFunction(this.getActorSelected())
            const newList = this.state.actors !== null ? this.state.actors.filter(isRole) : []
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

        const validationsChange = this.state.actorsForValidations !== null && this.state.actorsForValidations.filter(actor => (actor.isValid === true))

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
                    handleValidationChange={this.onValidationChange}
                    allActors={allActors}
                />

                {(menuSelected === variables.menus.validation && validationsChange.length > 0) && (
                    <div className='button-valider'><Button variant='contained' color='secondary'>{lang.btnValidate}</Button></div>
                )}
            </div>
        )
    }
}

export default Table
