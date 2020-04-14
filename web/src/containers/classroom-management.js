import React, { Component } from 'react'
import Snack from '../components/snack'
import Fetch from '../utilities/fetch-datas'
import { Button, Dialog, DialogTitle, DialogContent, Typography, DialogActions, TextField, FormControl, InputLabel, Input } from '@material-ui/core'
import EditIcon from '@material-ui/icons/EditOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import { withCookies } from 'react-cookie'
import '../styles/_classroom-management.scss'
import PhoneMask from '../components/forms/builds'

const variables = require('../utilities/variables').variables

const action = {
    delete: 0,
    edit: 1,
    add: 2,
    showList: 3
}

const emptyClassroom = {
    title: '',
    seat: '',
    phone: ''
}
class ClassRoomManagement extends Component {
    constructor () {
        super()
        this.state = {
            classRooms: [],
            classroomSelected: null,
            showDialog: false,
            editMode: false,
            error: false,
            showSnack: false
        }
        this.setClassRoom = this.setClassRoom.bind(this)
        this.handleEditClick = this.handleEditClick.bind(this)
        this.handleCloseDialog = this.handleCloseDialog.bind(this)
        this.handleActionClick = this.handleActionClick.bind(this)
        this.fecthClassroom = this.fecthClassroom.bind(this)
        this.handleAddClick = this.handleAddClick.bind(this)
        this.handleCloseSnack = this.handleCloseSnack.bind(this)
        this.checkDeleteError = this.checkDeleteError.bind(this)
        this.handleListChild = this.handleListChild.bind(this)
    }

    setClassRoom (data) {
        this.setState({ classRooms: data.sort((a, b) => (a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1)) })
    }

    fecthClassroom(){
        Fetch.classRoom.get(this.props.cookies.get(variables.cookies.token), this.setClassRoom)
    }

    componentDidMount () {
        // Fecth ClassRooms
        this.fecthClassroom()
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/classroom-management.json') }


    handleEditClick (event, classroom, btnAction) {
        if(!(this.state.classroomSelected !== null && classroom._id === this.state.classroomSelected._id)){
            this.setState({ classroomSelected: {...classroom} })
        }
        if(btnAction === action.delete) {
            Fetch.classRoom.delete(this.props.cookies.get(variables.cookies.token), classroom, this.checkDeleteError)
        } else if(btnAction === action.showList) {
            console.log('SHOW CHILD OF THIS CLASSROOM')
        } else {
            this.setState({ showDialog: true, editMode: true })
        }
    }

    checkDeleteError(retour) {
        if(retour){
            this.fecthClassroom()
        }else{
            this.setState({ showSnack: true })
        }
    }

    handleCloseDialog () {
        this.setState({ showDialog: false, error: false })
    }

    handleEditInputChange (event, name) {
        const newValue = event.target.value
        this.setState(state => {
            const classroomSelected = state.classroomSelected
            classroomSelected[name] = newValue
            return {
                classroomSelected: classroomSelected
            }
        })
    }

    checkEmptyInput(){
        let error = true
        if(this.state.classroomSelected.title !== '' & this.state.classroomSelected.seat !== '' && this.state.classroomSelected.phone !== ''){
            error = false
        }
        return error
    }

    handleActionClick(event, btnAction) {
            if(this.checkEmptyInput() === true) {
                this.setState({error: true})
            } else {
                this.setState({error: false})
                if(btnAction === action.edit) {
                    Fetch.classRoom.update(this.props.cookies.get(variables.cookies.token), this.state.classroomSelected, this.fecthClassroom)
                } else if(btnAction === action.add) {
                    Fetch.classRoom.add(this.props.cookies.get(variables.cookies.token), this.state.classroomSelected, this.fecthClassroom)
                }
                this.setState({showDialog: false})
            }
    }

    handleAddClick(){
        this.setState({
            classroomSelected: { ...emptyClassroom },
            showDialog: true,
            editMode: false
        })
    }

    handleListChild(){
        event.preventDefault()
    }

    renderClassroom (classRoom) {
        return (
            <div className='div-salle' key={classRoom._id}>
                <h2 onClick={event => this.handleEditClick(event, classRoom, action.showList)}>{classRoom.title}</h2>
                <p onClick={event => this.handleEditClick(event, classRoom, action.showList)}><span>Total des eleves</span><span>: 80</span></p>
                <p onClick={event => this.handleEditClick(event, classRoom, action.showList)}><span>Nombre de place</span><span>: {classRoom.seat}</span></p>
                <p onClick={event => this.handleEditClick(event, classRoom, action.showList)}><span>Contact</span><span>: {classRoom.phone}</span></p>
                <div>
                    <Button
                        onClick={event => this.handleEditClick(event, classRoom, null)}
                        variant='contained'
                        color='secondary'
                        startIcon={<EditIcon />}
                    >
                        Edit
                    </Button>
                    <Button
                    className='btn-delete'
                        onClick={event => this.handleEditClick(event, classRoom, action.delete)}
                        variant='contained'
                        color='secondary'
                        startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        )
    }


    handleCloseSnack () {
        this.setState({ showSnack: false })
    }

    render () {
        const lang = this.getLangFile()
        return (
            <>
            <div className='classroom-management'>
                <Button variant='contained' className='btn-add-classroom' onClick={this.handleAddClick} color='primary'>
                    Ajouter une nouvelle salle
                </Button>
                <div>
                    {this.state.classRooms.map(classroom => this.renderClassroom(classroom))}
                </div>

                <Dialog
                    className='dialog'
                    onClose={this.handleCloseDialog}
                    aria-labelledby='customized-dialog-title'
                    open={this.state.showDialog}
                >
                    <DialogTitle className='title' id='customized-dialog-title' onClose={this.handleCloseDialog}>
                    {this.state.editMode && (
                        <>Modification {this.state.classroomSelected !== null && '('+this.state.classroomSelected.title+')'}</>
                    )}
                    {!this.state.editMode && (
                        <>Ajout {this.state.classroomSelected !== null && '('+this.state.classroomSelected.title+')'}</>
                    )}
                    </DialogTitle>
                    <DialogContent dividers className='div-dialog-edit-classroom'>
                        {this.state.error && (
                            <p className='error-classroom'>Veuillez renseigner tous les champs</p>
                        )}
                        {this.state.classroomSelected !== null && (
                            <>
                                <TextField
                                    className='edit-input'
                                    type='text'
                                    color='primary'
                                    variant='filled'
                                    label='Nom de la classe'
                                    autoFocus
                                    onChange={event => this.handleEditInputChange(event, 'title')}
                                    value={this.state.classroomSelected.title}
                                />
                                <TextField
                                    type='number'
                                    color='primary'
                                    variant='filled'
                                    label='Nombre de place'
                                    onChange={event => this.handleEditInputChange(event, 'seat')}
                                    value={this.state.classroomSelected.seat}
                                />

                                <FormControl>
                                    <InputLabel>Contact</InputLabel>
                                    <Input
                                        onChange={event => this.handleEditInputChange(event, 'phone')}
                                        value={this.state.classroomSelected.phone}
                                        inputComponent={PhoneMask.phoneMaskCustom}
                                    />
                                </FormControl>
                            </>
                        )}
                    </DialogContent>
                    <DialogActions className='dialog-footer'>
                        {this.state.editMode && (
                        <Button fullWidth onClick={event => this.handleActionClick(event, action.edit)} color='primary'>
                            Save changes
                        </Button>
                        )}
                        {!this.state.editMode && (
                        <Button fullWidth onClick={event => this.handleActionClick(event, action.add)} color='primary'>
                            Ajouter
                        </Button>
                        )}
                    </DialogActions>
                </Dialog>
            </div>
                <Snack
                    show={this.state.showSnack}
                    duration={5000}
                    message={'Suppression invalide: cette salle est associee a un ou plusieurs enfants'}
                    onClose={this.handleCloseSnack}
                    severity='error'
                />
            </>
        )
    }
}

export default withCookies(ClassRoomManagement)
