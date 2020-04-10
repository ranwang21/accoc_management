import React, { Component } from 'react'
import { Button, FormControl, InputLabel, Select, MenuItem, TextField, FormControlLabel, Checkbox, ListSubheader } from '@material-ui/core'
import { withCookies } from 'react-cookie'
import { Autocomplete } from '@material-ui/lab'

class ChildDetail extends Component {
    constructor () {
        super()
        this.state = {
            classRoomSelected: '',
            collabSelected: '',
            showUpdateBtn: false
        }
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this)
    }

    componentDidMount () {
    }

    handleSearchInputChange (event, value, name) {
        console.log(value)
        this.setState({ [name]: value })
    }

    getClassRoom (child) {
        let retour = 'Pas definis'
        if (this.props.classRooms.length > 0 && child.id_classroom) {
            const room = this.props.classRooms.filter(classRoom => classRoom._id === child.id_classroom)[0]
            retour = room ? room.title : 'Pas definis'
        }
        return retour
    }

    getCollaborater (child) {
        let retour = 'Pas definis'
        if (this.props.collaboraters.length > 0 && child.id_collaborater) {
            const collaborater = this.props.collaboraters.filter(collaborater => collaborater._id === child.id_collaborater)[0]
            retour = collaborater ? (collaborater.first_name + ' ' + collaborater.last_name) : 'Pas definis'
        }
        return retour
    }

    render () {
        const edit = this.props.editable
        const child = this.props.child
        const classRooms = (this.props.classRooms && this.props.classRooms !== null) ? this.props.classRooms : []
        const collaboraters = (this.props.collaboraters && this.props.collaboraters !== null) ? this.props.collaboraters : []
        const collab = this.getClassRoom(child)
        return (
            <div className='child-detail'>
                <div>
                    <div>
                        <p className='text'>{this.getClassRoom(child)}</p>
                        {edit && (
                            <FormControl className='select print-to-remove' variant='filled'>
                                <InputLabel color='primary'>SALLES</InputLabel>
                                <Select
                                    value={this.state.classRoomSelected}
                                    onChange={event => this.handleSearchInputChange(event, event.target.value, 'classRoomSelected')}
                                >
                                    {classRooms.map(classRoom => (
                                        <MenuItem key={classRoom._id} value={classRoom}>{classRoom.title}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                        <p className='text'>{collab}</p>
                        {edit && (
                            <Autocomplete
                                className='select  print-to-remove'
                                onChange={(event, newValue) => this.handleSearchInputChange(event, newValue, 'collabSelected')}
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
                            {edit ? (
                                <TextField
                                    type='text'
                                    color='primary'
                                    variant='filled'
                                    onChange={/* event => inputChange(event, fieldsConfig.name, fieldsConfig.type) */null}
                                    value='Saint Pierre Claver'
                                />
                            ) : (
                                <p>{child.school_info.name === null ? 'Pas defini' : child.school_info.name}</p>
                            )}
                        </div>
                        <div>
                            <p>Niveau</p>
                            {edit
                                ? (
                                    <FormControl variant='filled'>
                                        <Select
                                            value='Secondaire 2'
                                            onChange={event => this.handleSearchInputChange(event, 'levelSelected')}
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
                                )
                                : (
                                    <p>{child.school_info.level === null ? 'Pas defini' : child.school_info.level}</p>
                                )}
                        </div>
                        <div>
                            <p>Inscription a ADL</p>
                            {edit ? (
                                <FormControlLabel control={<Checkbox defaultChecked={!!child.school_info.adl} />} />
                            ) : (
                                <p>{child.school_info.adl ? 'OUI' : 'NON'}</p>
                            )}
                        </div>
                        <div>
                            <p>Derniere annee reprise (redouble)</p>
                            {edit ? (
                                <FormControl variant='filled'>
                                    <Select
                                        value={child.school_info.redouble === null ? '' : child.school_info.redouble}
                                        onChange={event => this.handleSearchInputChange(event, 'levelSelected')}
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
                                        onChange={/* event => inputChange(event, fieldsConfig.name, fieldsConfig.type) */null}
                                        value={child.school_info.educatorName !== null ? child.school_info.educatorName : "N'en a pas"}
                                    />
                                    <TextField
                                        type='text'
                                        color='primary'
                                        variant='filled'
                                        onChange={/* event => inputChange(event, fieldsConfig.name, fieldsConfig.type) */null}
                                        value={child.school_info.educatorName !== null ? child.school_info.educatorName : ''}
                                    />
                                </>
                            ) : (
                                <p><span>{child.school_info.educatorName !== null ? child.school_info.educatorName : "N'en a pas"}</span> <span>{child.school_info.educatorPhone !== null ? child.school_info.educatorPhone : ''}</span></p>
                            )}
                        </div>
                        <div className='max'>
                            <p>Raison de l'inscription</p>
                            <p>{child.school_info.reason === null ? 'Pas defini' : child.school_info.reason}</p>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Informations du parent</legend>
                    <div>
                        <div>
                            <p>Nom</p>
                            <p>last_name_parent</p>
                        </div>
                        <div>
                            <p>Prenom</p>
                            <p>first_name_parent</p>
                        </div>
                        <div className='row'>
                            <p>Adresse</p>
                            <p>9999 Av. Trans-Island A1A A1A</p>
                        </div>
                        <div>
                            <p>Personal</p>
                            <p>(514) 820-5545</p>
                        </div>
                        <div>
                            <p>Work</p>
                            <p>(514) 820-5545</p>
                        </div>
                        <div>
                            <p>Home</p>
                            <p>(514) 820-5545</p>
                        </div>
                        <div>
                            <p>Emergency</p>
                            <p>(514) 820-5545</p>
                        </div>
                    </div>
                </fieldset>
                <fieldset className='print-to-remove'>
                    <legend>Medical Informations</legend>
                    <div>
                        <div>
                            <p>RAMQ</p>
                            <p>YES / NO</p>
                        </div>
                        <div>
                            <p>Expiration</p>
                            <p>AAAA - MM</p>
                        </div>
                        <div className='max'>
                            <p>Allergies</p>
                            <p>texte texte texte texte texte texte texte texte texte</p>
                        </div>
                        <div className='max'>
                            <p>Medicaments</p>
                            <p>texte texte texte texte texte texte texte texte texte</p>
                        </div>
                        <div className='max'>
                            <p>Autres informations</p>
                            <p>texte texte texte texte texte texte texte texte texte</p>
                        </div>
                    </div>
                </fieldset>
                <fieldset className='print-to-remove'>
                    <legend>Autorisations</legend>
                    <div>
                        <div className='row'>
                            <p>Publications de photos en version papier</p>
                            <p>OUI / NON</p>
                        </div>
                        <div className='row'>
                            <p>Publications de photos sur le site internet</p>
                            <p>OUI / NON</p>
                        </div>
                    </div>
                </fieldset>
            </div>
        )
    }
}

export default withCookies(ChildDetail)
