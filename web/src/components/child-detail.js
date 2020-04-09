import React, { Component } from 'react'
import { Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core'
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
                <div>
                    <div>
                        <p className='text'>{this.getClassRoom(child)}</p>
                        <FormControl className='select print-to-remove' variant='filled'>
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
                        <p className='text'>{collab}</p>
                        <Autocomplete
                            className='select  print-to-remove'
                            onChange={(event, newValue) => this.setState({ collabSelected: newValue })}
                            options={collabList}
                            getOptionLabel={(collaborater) => collaborater.first_name + ' ' + collaborater.last_name}
                            renderInput={(params) => <TextField {...params} label='COLLABORATEURS' variant='filled' />}
                        />
                        <Button variant='outlined' className='print-to-remove'>
                            Modifier
                        </Button>
                    </div>
                </div>
                <fieldset>
                    <legend>School Informations</legend>
                    <div>
                        <div className='row'>
                            <p>Nom</p>
                            <p>Saint Pierre Claver</p>
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
                        <div className='max'>
                            <p>Raison de l'inscription</p>
                            <p>texte texte texte texte texte texte texte texte texte</p>
                        </div>
                        <div className='row'>
                            <p>Educatrice</p>
                            <p><span>Nom prenom</span> <span>(514) 820-5545</span></p>
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
