import React, { Component } from 'react'
import { Button, ButtonGroup, Switch, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ListTable from '../components/list-table'
import Fetch from '../utilities/fetch-datas'
import { withCookies } from 'react-cookie'
import '../styles/_list.scss'

const variables = require('../utilities/variables').variables

const isChild = ({ roleTitle }) => roleTitle === 'children'
const isParent = ({ roleTitle, isValid }) => ((roleTitle === 'parent' || roleTitle === 'collab_parent') && isValid === true)
const isCollaborator = ({ roleTitle, isValid }) => ((roleTitle === 'collaborater' || roleTitle === 'collab_parent') && isValid === true)
const isAdmin = ({ roleTitle, isValid }) => (roleTitle === 'admin' && isValid === true)

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
            search: true,
            lastNameInput: '',
            firstNameInput: '',
            classRoomSelected: ''
        }
        this.onActorSelected = this.onActorSelected.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this)
    }

    componentDidMount () {
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/list.json') }

    getCurrentUser () {
        const currentUser = this.props.cookies.get(variables.cookies.user)
        return Fetch.decodeData(currentUser)
    }

    buildButton (actor) {
        const role = this.getCurrentUser().role
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

    handleSearchInputChange (event, name) {
        this.setState({ [name]: event.target.value })
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
            return this.props.inValidActors
        } else {
            let getIdClassRoom = this.props.classRooms.filter(classRoom => classRoom.title === this.state.classRoomSelected)
            getIdClassRoom = getIdClassRoom[0] ? getIdClassRoom[0] : this.props.classRooms[0]
            const isRole = getRoleFunction(this.getActorSelected())
            const newList = this.props.actors !== null ? this.props.actors.filter(isRole) : []
            const lastList = []
            if (newList !== null) {
                newList.map(row => {
                    const ch1 = row.first_name.toLowerCase().search(this.state.firstNameInput.toLowerCase())
                    const ch2 = row.last_name.toLowerCase().search(this.state.lastNameInput.toLowerCase())
                    if (this.getActorSelected() === variables.role.child) {
                        const ch3 = row.id_classroom && row.id_classroom.search(getIdClassRoom._id);
                        (ch1 !== -1 && ch2 !== -1 && ch3 !== -1) && lastList.push(row)
                    } else {
                        (ch1 !== -1 && ch2 !== -1) && lastList.push(row)
                    }
                })
            }
            return lastList
        }
    }

    render () {
        const lang = this.getLangFile()
        const allActors = this.updateNewActorsList()
        const menuSelected = this.props.menuSelected
        const validationsChange = this.props.inValidActors && this.props.inValidActors.filter(actor => (actor.isValid === true))

        return (
            <div className='list'>
                {menuSelected === variables.menus.allUsers && (
                    <div className='list-menu'>
                        <ButtonGroup className='btnGroup' size='medium' color='primary' aria-label='large outlined primary button group'>
                            {lang.actors.map(actor => this.buildButton(actor))}
                        </ButtonGroup>
                        <div className='search-button'>
                            <FormControlLabel
                                control={<Switch checked={this.state.search} onChange={this.handleSearchChange} />} label={lang.search}
                            />
                        </div>
                    </div>
                )}

                <div className='search-container'>
                    <Collapse className='search-fields' in={this.state.search}>
                        <TextField
                            size='small' variant='filled'
                            value={this.state.lastNameInput}
                            onChange={event => this.handleSearchInputChange(event, 'lastNameInput')} label={lang.searchLastName}
                        />
                        <TextField
                            size='small' variant='filled'
                            value={this.state.firstNameInput}
                            onChange={event => this.handleSearchInputChange(event, 'firstNameInput')} label={lang.searchFirstName}
                        />
                        {this.getActorSelected() === variables.role.child && (
                            <FormControl variant='filled'>
                                <InputLabel color='primary'>par salle</InputLabel>
                                <Select
                                    value={this.state.classRoomSelected}
                                    onChange={event => this.handleSearchInputChange(event, 'classRoomSelected')}
                                >
                                    {this.props.classRooms.map(classRoom => (
                                        <MenuItem key={classRoom._id} value={classRoom.title}>{classRoom.title}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </Collapse>
                </div>

                <ListTable
                    lang={this.props.lang}
                    menuSelected={menuSelected}
                    handleValidationChange={this.props.validationChange}
                    allActors={allActors}
                    actorSelected={this.getActorSelected()}
                    classRooms={this.props.classRooms}
                    onChangeImage={this.props.handleImageChange}
                />

                {(menuSelected === variables.menus.validation && validationsChange.length > 0) && (
                    <div className='button-valider'><Button variant='contained' color='secondary' onClick={this.props.handleBtnValidSave}>{lang.btnValidate}</Button></div>
                )}
            </div>
        )
    }
}

export default withCookies(Table)
