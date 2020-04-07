import React, { Component } from 'react'
import { Button, ButtonGroup, Switch, FormControl, InputLabel, Select, MenuItem, ListSubheader } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ListTable from '../components/list-table'
import Fetch from '../utilities/fetch-datas'
import { withCookies } from 'react-cookie'
import '../styles/_child-detail.scss'
const variables = require('../utilities/variables').variables

class ChildDetail extends Component {
    constructor () {
        super()
        this.state = {
            classRooms: [],
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

    render () {
        return (
            <div className='child-detail'>
                <fieldset className='child-classroom'>
                    <legend>Classroom</legend>
                    <div>
                        <p className='text'>Pas definis</p>
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

                <fieldset className='child-school'>
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
