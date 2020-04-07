import React, { Component } from 'react'
import { Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import Fetch from '../utilities/fetch-datas'
import { withCookies } from 'react-cookie'
import '../styles/_child-detail.scss'
const variables = require('../utilities/variables').variables

class ChildDetail extends Component {
    constructor () {
        super()
        this.state = {
            classRooms: [],
            collaboraters: [],
            classRoomSelected: ''
        }
        this.setClassRooms = this.setClassRooms.bind(this)
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this)
    }

    setClassRooms (data) {
        this.setState({ classRooms: [...data] })
    }

    componentDidMount () {
        Fetch.classRoom.get(this.props.cookies.get(variables.cookies.token), this.setClassRooms)
    }

    handleSearchInputChange (event, name) {
        if (name !== 'levelSelected' && name !== 'classRoomSelected') {
            this.setState({ [name]: event.target.value })
        } else {
            (event.target.value !== undefined) && this.setState({ [name]: event.target.value })
        }
    }

    getClassRoom (child) {
        let retour = 'Pas definis'
        if (this.state.classRooms.length > 0 && child.id_classroom) {
            const room = this.state.classRooms.filter(classRoom => classRoom._id === child.id_classroom)[0]
            retour = room ? room.title : 'Pas definis'
        }
        return retour
    }

    render () {
        const child = this.props.child
        console.log(child.school_info)
        // const schoolName = child.school_info ? child.id_classroom : 'Pas definis'
        return (
            <div className='child-detail'>
                <div className='test'>
                    <fieldset className='child-classroom'>
                        <legend>Classroom</legend>
                        <div>
                            <div>
                                <p className='text'>{this.getClassRoom(child)}</p>
                                <FormControl className='select' variant='filled'>
                                    <InputLabel color='primary'>SALLES</InputLabel>
                                    <Select
                                        value={this.state.classRoomSelected}
                                        onChange={event => this.handleSearchInputChange(event, 'classRoomSelected')}
                                    >
                                        {this.state.classRooms.map(classRoom => (
                                            <MenuItem key={classRoom._id} value={classRoom.title}>{classRoom.title}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <p className='text'>{this.getClassRoom(child)}</p>
                                <FormControl className='select' variant='filled'>
                                    <InputLabel color='primary'>COLLABORATEURS</InputLabel>
                                    <Select
                                        value={this.state.classRoomSelected}
                                        onChange={event => this.handleSearchInputChange(event, 'classRoomSelected')}
                                    >
                                        {this.state.classRooms.map(classRoom => (
                                            <MenuItem key={classRoom._id} value={classRoom.title}>{classRoom.title}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <Button variant='outlined'>
                                    Modifier
                                </Button>
                            </div>
                        </div>
                    </fieldset>
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
                                    {this.state.classRooms.map(classRoom => (
                                        <MenuItem key={classRoom._id} value={classRoom.title}>{classRoom.title}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
                                <p>Nom prenom (514) 820-5545</p>
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
                                {this.state.classRooms.map(classRoom => (
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
                                {this.state.classRooms.map(classRoom => (
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
