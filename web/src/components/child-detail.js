import React, { Component } from 'react'
import { Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core'
import Fetch from '../utilities/fetch-datas'
import { withCookies } from 'react-cookie'
import '../styles/_child-detail.scss'
import { Autocomplete } from '@material-ui/lab'
const variables = require('../utilities/variables').variables

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

    handleSearchInputChange (event, name) {
        (event.target.value !== undefined) && this.setState({ [name]: event.target.value })
    }

    getClassRoom (child) {
        let retour = 'Pas definis'
        if (this.props.classRooms.length > 0 && child.id_classroom) {
            const room = this.props.classRooms.filter(classRoom => classRoom._id === child.id_classroom)[0]
            retour = room ? room.title : 'Pas definis'
        }
        return retour
    }

    render () {
        const child = this.props.child
        const classRooms = (this.props.classRooms && this.props.classRooms !== null) ? this.props.classRooms : []
        const collabList = (this.props.collabList && this.props.collabList !== null) ? this.props.collabList : []
        const collab = classRooms.id_collaborater ? classRooms.id_collaborater : 'Pas defini'
        return (
            <div className='child-detail'>
                <div className='test'>
                    <fieldset className='child-classroom'>
                        <div>
                            <div>
                                <p className='text'>{this.getClassRoom(child)}</p>
                                <FormControl className='select' variant='filled'>
                                    <InputLabel color='primary'>SALLES</InputLabel>
                                    <Select
                                        value={this.state.classRoomSelected}
                                        onChange={event => this.handleSearchInputChange(event, 'classRoomSelected')}
                                    >
                                        {classRooms.map(classRoom => (
                                            <MenuItem key={classRoom._id} value={classRoom.title}>{classRoom.title}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <p className='text'>{collab}</p>
                                <Autocomplete
                                    onChange={(event, newValue) => this.setState({ collabSelected: newValue })}
                                    options={collabList}
                                    getOptionLabel={(collaborater) => collaborater.first_name + ' ' + collaborater.last_name}
                                    renderInput={(params) => <TextField {...params} label='COLLABORATEURS' variant='filled' />}
                                />
                            </div>
                            <div>
                                <Button variant='outlined'>
                                    Modifier
                                </Button>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div>
                    <fieldset className='child-school'>
                        <legend>School Informations</legend>
                        <div>
                            <div className='text'>
                                <p>Nom Ecole</p>
                            </div>
                            <div>
                                <p>Niveau</p>
                                <p>Secondaire 2</p>
                            </div>
                            <div>
                                <p>Inscription a ADL</p>
                                <p>OUI</p>
                            </div>
                            <div>
                                <p>Redouble une annee</p>
                                <p>NON</p>
                            </div>
                            <div>
                                <p>Derniere annee reprise</p>
                                <p>Neant</p>
                            </div>
                            <div>
                                <p>Evaluation</p>
                                <p>NON</p>
                            </div>
                            <div>
                                <p>Service de garde</p>
                                <p>OUI</p>
                            </div>
                            <div>
                                <p>Raison de l'inscription</p>
                                <p>texte texte texte texte texte texte texte texte texte</p>
                            </div>
                            <div>
                                <p>Educatrice</p>
                                <p><span>Nom prenom</span> <span>(514) 820-5545</span></p>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <fieldset className='child-classroom'>
                    <legend>Classroom</legend>
                    <div>
                        <p className='text'>{this.getClassRoom(child)}</p>
                        <Button variant='outlined'>
                            Modifier
                        </Button>
                        <FormControl className='select' variant='filled'>
                            <InputLabel color='primary'>par salle</InputLabel>
                            <Select
                                value={this.state.classRoomSelected}
                                onChange={event => this.handleSearchInputChange(event, 'classRoomSelected')}
                            >
                                {classRooms.map(classRoom => (
                                    <MenuItem key={classRoom._id} value={classRoom.title}>{classRoom.title}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </fieldset>

                <fieldset className='child-collab'>
                    <legend>Collaborateur</legend>
                    <div>
                        <p className='text'>Nom Prenom</p>
                        <Button variant='outlined'>
                            Modifier
                        </Button>
                        <FormControl className='select' variant='filled'>
                            <InputLabel color='primary'>par salle</InputLabel>
                            <Select
                                value={this.state.classRoomSelected}
                                onChange={event => this.handleSearchInputChange(event, 'classRoomSelected')}
                            >
                                {classRooms.map(classRoom => (
                                    <MenuItem key={classRoom._id} value={classRoom.title}>{classRoom.title}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className='phone'>
                            <p>Personal</p>
                            <p>(514) 820-5545</p>
                        </div>
                        <div className='phone'>
                            <p>Work</p>
                            <p>(514) 820-5545</p>
                        </div>
                        <div className='phone'>
                            <p>Home</p>
                            <p>(514) 820-5545</p>
                        </div>
                        <div className='phone'>
                            <p>Emergency</p>
                            <p>(514) 820-5545</p>
                        </div>
                    </div>
                </fieldset>

                <fieldset className='child-collab'>
                    <legend>Collaborateur</legend>
                    <div>
                        <p className='text'>Nom Prenom</p>
                        <div className='phone'>
                            <p>Personal</p>
                            <p>(514) 820-5545</p>
                        </div>
                        <div className='phone'>
                            <p>Work</p>
                            <p>(514) 820-5545</p>
                        </div>
                        <div className='phone'>
                            <p>Home</p>
                            <p>(514) 820-5545</p>
                        </div>
                        <div className='phone'>
                            <p>Emergency</p>
                            <p>(514) 820-5545</p>
                        </div>
                    </div>
                </fieldset>
            </div>
        )
    }
}

export default withCookies(ChildDetail)
