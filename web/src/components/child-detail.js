import moment from 'moment'
import React, { Component } from 'react'
import { Button, FormControl, InputLabel, Select, MenuItem, TextField, FormControlLabel, Checkbox, ListSubheader, TextareaAutosize } from '@material-ui/core'
import { withCookies } from 'react-cookie'
import { Autocomplete } from '@material-ui/lab'
import Fetch from '../utilities/fetch-datas'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

const variables = require('../utilities/variables').variables

const getAgeLimit = (age) => {
    const date = new Date()
    return new Date((date.getFullYear() - age) + '-' + (date.getMonth() + 1) + '-' + date.getDate())
}

class ChildDetail extends Component {
    constructor () {
        super()
        this.state = {
            classRoomSelected: '',
            showUpdateBtn: false
        }
    }

    getClassRoom (child) {
        let retour = 'Indefini'
        if (this.props.classRooms.length > 0 && child.id_classroom) {
            const room = this.props.classRooms.filter(classRoom => classRoom._id === child.id_classroom)[0]
            retour = room ? room.title : 'Indefini'
        }
        return retour
    }

    getCollaborater () {
        const child = this.props.child
        const collaboraters = this.props.collaboraters
        let retour = 'Indefini'
        if (collaboraters.length > 0 && child.id_collaborater) {
            const collaborater = collaboraters.filter(collaborater => collaborater._id === child.id_collaborater)[0]
            retour = collaborater ? (collaborater.first_name + ' ' + collaborater.last_name) : 'Indefini'
        }
        return retour
    }

    getParents () {
        const child = this.props.child
        const parents = this.props.parents
        const retour = []
        if (parents.length > 0 && child.id_parent !== null) {
            child.id_parent.map(id => {
                const parent = parents.filter(parent => parent._id === id)
                if (parent[0]) retour.push(parent[0])
            })
        }
        return retour
    }

    getCurrentUserRole () {
        const currentUser = this.props.cookies.get(variables.cookies.user)
        return Fetch.decodeData(currentUser).role
    }

    render () {
        const currentUserRole = this.getCurrentUserRole()
        const child = this.props.child
        const childParents = this.getParents()
        const edit = this.props.editable
        const classRooms = (this.props.classRooms && this.props.classRooms !== null) ? this.props.classRooms : []
        const collaboraters = (this.props.collaboraters && this.props.collaboraters !== null) ? this.props.collaboraters : []
        const collab = this.getClassRoom(child)
        return (
            <div className='child-detail'>
                {edit && (
                    <div>
                        <div>
                            <TextField
                                type='text'
                                color='primary'
                                variant='filled'
                                onChange={event => this.props.handleEditChange(event, event.target.value, 'last_name', null)}
                                value={this.props.userEdited.last_name !== null ? this.props.userEdited.last_name : ''}
                            />
                            <TextField
                                type='text'
                                color='primary'
                                variant='filled'
                                onChange={event => this.props.handleEditChange(event, event.target.value, 'first_name', null)}
                                value={this.props.userEdited.first_name !== null ? this.props.userEdited.first_name : ''}
                            />

                            <MuiPickersUtilsProvider
                                libInstance={moment} utils={MomentUtils}
                                locale={this.props.lang}
                            >
                                <DatePicker
                                    format='DD MMMM YYYY'
                                    openTo='year'
                                    views={['year', 'month', 'date']}
                                    label='Birthday'
                                    minDate={getAgeLimit(30)}
                                    maxDate={getAgeLimit(5)}
                                    value={this.props.userEdited.birthday !== null ? this.props.userEdited.birthday : new Date()}
                                    onChange={event => this.props.handleEditChange(event, event._d, 'birthday', null)}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                    </div>
                )}
                <div>
                    <div>
                        <p className='text'>{this.getClassRoom(child)}</p>
                        {(edit && (currentUserRole === 'super_admin' || currentUserRole === 'admin')) && (
                            <FormControl className='select print-to-remove' variant='filled'>
                                <InputLabel color='primary'>SALLES</InputLabel>
                                <Select
                                    value={this.state.classRoomSelected === null ? '' : this.state.classRoomSelected}
                                    onChange={event => this.props.handleEditChange(event, event.target.value._id, 'id_classroom', null)}
                                >
                                    <MenuItem value='' disabled>
                                        <em>Salle</em>
                                    </MenuItem>
                                    {classRooms.map(classRoom => (
                                        <MenuItem key={classRoom._id} value={classRoom}>{classRoom.title}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                        <p className='text'>{collab}</p>
                        {(edit && (currentUserRole === 'super_admin' || currentUserRole === 'admin')) && (
                            <Autocomplete
                                className='select  print-to-remove'
                                onChange={(event, newValue) => this.props.handleEditChange(event, (newValue !== null ? newValue._id : null), 'id_collaborater', null)}
                                options={collaboraters}
                                getOptionLabel={(collaborater) => collaborater.first_name + ' ' + collaborater.last_name}
                                renderInput={(params) => <TextField {...params} label='COLLABORATEURS' variant='filled' />}
                            />
                        )}
                    </div>
                </div>
                <fieldset>
                    <legend>School Informations</legend>
                    <div>
                        <div className='row'>
                            <p>Nom</p>
                            {(edit && (currentUserRole === 'super_admin' || currentUserRole === 'admin')) ? (
                                <TextField
                                    type='text'
                                    color='primary'
                                    variant='filled'
                                    onChange={(event) => this.props.handleEditChange(event, event.target.value, 'school_info', 'name')}
                                    value={this.props.userEdited.school_info.name !== null ? this.props.userEdited.school_info.name : ''}
                                />
                            ) : (
                                <p>{child.school_info.name === null ? 'Indefini' : child.school_info.name}</p>
                            )}
                        </div>
                        <div>
                            <p>Niveau</p>
                            {(edit && (currentUserRole === 'super_admin' || currentUserRole === 'admin'))
                                ? (
                                    <FormControl variant='filled'>
                                        <Select
                                            value={this.props.userEdited.school_info.level === null ? '' : this.props.userEdited.school_info.level}
                                            onChange={(event) => this.props.handleEditChange(event, event.target.value, 'school_info', 'level')}
                                        >
                                            <MenuItem value='' disabled>
                                                <em>Niveau Scolaire</em>
                                            </MenuItem>
                                            <MenuItem value='Primaire 1'>Primaire 1er</MenuItem>
                                            <MenuItem value='Primaire 2'>Primaire 2e</MenuItem>
                                            <MenuItem value='Primaire 3'>Primaire 3e</MenuItem>
                                            <MenuItem value='Primaire 4'>Primaire 4e</MenuItem>
                                            <MenuItem value='Primaire 5'>Primaire 5e</MenuItem>
                                            <MenuItem value='Primaire 6'>Primaire 6e</MenuItem>
                                            <MenuItem value='Secondaire 1'>Secondaire I</MenuItem>
                                            <MenuItem value='Secondaire 2'>Secondaire II</MenuItem>
                                            <MenuItem value='Secondaire 3'>Secondaire III</MenuItem>
                                            <MenuItem value='Secondaire 4'>Secondaire IV</MenuItem>
                                            <MenuItem value='Secondaire 5'>Secondaire V</MenuItem>

                                        </Select>
                                    </FormControl>
                                )
                                : (
                                    <p>{child.school_info.level === null ? 'Indefini' : child.school_info.level}</p>
                                )}
                        </div>
                        <div>
                            <p>Inscription a ADL</p>
                            {edit ? (
                                <FormControlLabel control={
                                    <Checkbox
                                        onChange={(event) => this.props.handleEditChange(event, event.target.checked, 'school_info', 'adl')}
                                        value={!!this.props.userEdited.school_info.adl}
                                    />
                                }
                                />
                            ) : (
                                <p>{child.school_info.adl ? 'OUI' : 'NON'}</p>
                            )}
                        </div>
                        <div className='row'>
                            <p>Derniere annee reprise (redouble)</p>
                            {edit ? (
                                <FormControl variant='filled'>
                                    <Select
                                        fullWidth
                                        value={this.props.userEdited.school_info.redouble === null ? '' : this.props.userEdited.school_info.redouble}
                                        onChange={(event) => this.props.handleEditChange(event, event.target.value, 'school_info', 'redouble')}
                                    >
                                        <MenuItem value='Primaire 1'>Primaire 1er</MenuItem>
                                        <MenuItem value='Primaire 2'>Primaire 2e</MenuItem>
                                        <MenuItem value='Primaire 3'>Primaire 3e</MenuItem>
                                        <MenuItem value='Primaire 4'>Primaire 4e</MenuItem>
                                        <MenuItem value='Primaire 5'>Primaire 5e</MenuItem>
                                        <MenuItem value='Primaire 6'>Primaire 6e</MenuItem>
                                        <MenuItem value='Secondaire 1'>Secondaire I</MenuItem>
                                        <MenuItem value='Secondaire 2'>Secondaire II</MenuItem>
                                        <MenuItem value='Secondaire 3'>Secondaire III</MenuItem>
                                        <MenuItem value='Secondaire 4'>Secondaire IV</MenuItem>
                                        <MenuItem value='Secondaire 5'>Secondaire V</MenuItem>

                                    </Select>
                                </FormControl>
                            ) : (
                                <p>{child.school_info.redouble === null ? 'NON' : child.school_info.redouble}</p>
                            )}

                        </div>
                        <div className='row'>
                            <p>Educatrice</p>
                            {edit ? (
                                <>
                                    <TextField
                                        type='text'
                                        color='primary'
                                        variant='filled'
                                        onChange={(event) => this.props.handleEditChange(event, event.target.value, 'school_info', 'educatorName')}
                                        value={this.props.userEdited.school_info.educatorName !== null ? this.props.userEdited.school_info.educatorName : ''}
                                        label='Nom et prenom'
                                    />
                                    <TextField
                                        type='text'
                                        color='primary'
                                        variant='filled'
                                        onChange={(event) => this.props.handleEditChange(event, event.target.value, 'school_info', 'educatorPhone')}
                                        value={this.props.userEdited.school_info.educatorPhone !== null ? this.props.userEdited.school_info.educatorPhone : ''}
                                        label='Contact'
                                    />
                                </>
                            ) : (
                                <p><span>{child.school_info.educatorName !== null ? child.school_info.educatorName : "N'en a pas"}</span> <span>{child.school_info.educatorPhone !== null ? child.school_info.educatorPhone : ''}</span></p>
                            )}
                        </div>
                        <div className='max'>
                            <p>Raison de l'inscription</p>
                            <p>{child.school_info.reason === null ? 'Indefini' : child.school_info.reason}</p>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Informations {childParents.length > 1 ? ' des parents' : ' du parent'}</legend>
                    {(childParents.length > 0 && (
                        childParents.map(parent => (
                            <div key={parent._id}>
                                <div>
                                    <p>Nom</p>
                                    <p>{parent.last_name}</p>
                                </div>
                                <div>
                                    <p>Prenom</p>
                                    <p>{parent.first_name}</p>
                                </div>
                                <div className='row'>
                                    <p>Adresse</p>
                                    <p>{parent.address}</p>
                                </div>
                                {parent.contact.personal && (
                                    <div>
                                        <p>Personal</p>
                                        <p>{parent.contact.personal}</p>
                                    </div>
                                )}
                                {parent.contact.work && (
                                    <div>
                                        <p>Work</p>
                                        <p>{parent.contact.work}</p>
                                    </div>
                                )}
                                {parent.contact.home && (
                                    <div>
                                        <p>Home</p>
                                        <p>{parent.contact.home}</p>
                                    </div>
                                )}
                                {parent.contact.emergency && (
                                    <div>
                                        <p>Emergency</p>
                                        <p>{parent.contact.emergency}</p>
                                    </div>
                                )}
                            </div>
                        ))
                    ))}
                </fieldset>
                <fieldset className='print-to-remove'>
                    <legend>Medical Informations</legend>
                    <div>
                        <div className={child.medical_info.ramq === null ? 'row' : ''}>
                            <p>RAMQ</p>
                            <p>{child.medical_info.ramq === null ? 'NON' : child.medical_info.ramq}</p>
                        </div>
                        {child.medical_info.ramq !== null && (
                            <div>
                                <p>Expiration</p>
                                <p>{child.medical_info.ramqExpiration === null ? 'Indefini' : child.medical_info.ramqExpiration}</p>
                            </div>
                        )}
                        <div className='max'>
                            <p>Allergies</p>
                            {edit ? (
                                <TextareaAutosize
                                    className='textarea'
                                    rowsMin={2}
                                    onChange={(event) => this.props.handleEditChange(event, event.target.value, 'medical_info', 'alleriges')}
                                    value={this.props.userEdited.medical_info.allergies !== null ? this.props.userEdited.medical_info.allergies : ''}
                                />
                            ) : (
                                <p>{child.medical_info.allergies}</p>
                            )}
                        </div>
                        <div className='max'>
                            <p>Medicaments</p>
                            {edit ? (
                                <TextareaAutosize
                                    className='textarea'
                                    rowsMin={2}
                                    onChange={(event) => this.props.handleEditChange(event, event.target.value, 'medical_info', 'drugs')}
                                    value={this.props.userEdited.medical_info.drugs !== null ? this.props.userEdited.medical_info.drugs : ''}
                                />
                            ) : (
                                <p>{child.medical_info.drugs}</p>
                            )}
                        </div>
                        <div className='max'>
                            <p>Autres informations</p>
                            {edit ? (
                                <TextareaAutosize
                                    className='textarea'
                                    rowsMin={2}
                                    onChange={(event) => this.props.handleEditChange(event, event.target.value, 'medical_info', 'othersInformations')}
                                    value={this.props.userEdited.medical_info.othersInformations !== null ? this.props.userEdited.medical_info.othersInformations : ''}
                                />
                            ) : (
                                <p>{child.medical_info.othersInformations}</p>
                            )}
                        </div>
                    </div>
                </fieldset>
                <fieldset className='print-to-remove'>
                    <legend>Autorisations</legend>
                    <div>
                        <div className='row'>
                            <p>Publications de photos en version papier</p>
                            {edit ? (
                                <FormControlLabel control={
                                    <Checkbox
                                        onChange={(event) => this.props.handleEditChange(event, event.target.checked, 'authorization', 'paper')}
                                        value={!!this.props.userEdited.authorization.paper}
                                    />
                                }
                                />
                            ) : (
                                <p>{child.authorization.paper ? 'OUI' : 'NON'}</p>
                            )}
                        </div>
                        <div className='row'>
                            <p>Publications de photos sur le site internet</p>
                            {edit ? (
                                <FormControlLabel control={
                                    <Checkbox
                                        onChange={(event) => this.props.handleEditChange(event, event.target.checked, 'authorization', 'internet')}
                                        value={!!this.props.userEdited.authorization.internet}
                                    />
                                }
                                />

                            ) : (
                                <p>{child.authorization.internet ? 'OUI' : 'NON'}</p>
                            )}
                        </div>
                    </div>
                </fieldset>
            </div>
        )
    }
}

export default withCookies(ChildDetail)
