import React, { Component } from 'react'
import Snack from '../components/snack'
import Fetch from '../utilities/fetch-datas'
import { Button, Dialog, DialogTitle, DialogContent, Typography, DialogActions, TextField, FormControl, InputLabel, Input, List, Avatar, ListItemText, ListItemAvatar, ListItem } from '@material-ui/core'
import EditIcon from '@material-ui/icons/EditOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import PersonIcon from '@material-ui/icons/Person'
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
            childrens: [],
            childSelectedList: [],
            showDialog: false,
            showListDialog: false,
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
    }

    setClassRoom (dataClassroom, dataChildren) {
        dataClassroom.map(x => {
            const childLength = dataChildren.filter(child => child.id_classroom === x._id).length
            x.childLength = childLength
        })
        this.setState({
            classRooms: dataClassroom.sort((a, b) => (a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1)),
            childrens: dataChildren.sort((a, b) => (a.last_name.toUpperCase() > b.last_name.toUpperCase() ? 1 : -1))
        })
    }

    fecthClassroom(){
        Fetch.classRoom.get(this.props.cookies.get(variables.cookies.token), this.setClassRoom)
        //Fetch.user.onlyChild(this.props.cookies.get(variables.cookies.token), this.setChildren)
    }

    componentDidMount () {
        // Fecth ClassRooms and Children
        this.fecthClassroom()
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/classroom-management.json') }


    handleEditClick (event, classroom, btnAction) {
        if(!(this.state.classroomSelected !== null && classroom._id === this.state.classroomSelected._id)){
            this.setState({ classroomSelected: { ...classroom } })
        }
        if(btnAction === action.showList) {
            console.log('SHOW CHILD OF THIS CLASSROOM')
            this.setState({
                childSelectedList: this.state.childrens.filter(child => child.id_classroom === classroom._id),
                showListDialog: true
            })
        } else {
            this.setState({ showDialog: true, editMode: true })
        }
    }

    handleCloseDialog () {
        this.setState({ showDialog: false, showListDialog: false, error: false })
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

    handleActionClick(event, btnAction, classroom) {
        if (btnAction === action.add){
            this.checkEmptyInput()
                ? this.setState({error: true})
                : (
                    Fetch.classRoom.add(this.props.cookies.get(variables.cookies.token), classroom, this.fecthClassroom),
                    this.setState({error: false, showDialog: false})
                )
        } else if (btnAction === action.edit){
            this.checkEmptyInput()
                ? this.setState({error: true})
                : (
                    Fetch.classRoom.update(this.props.cookies.get(variables.cookies.token), classroom, this.fecthClassroom),
                    this.setState({error: false, showDialog: false})
                )
        } else if (btnAction === action.delete){
            classroom.childLength === 0
                ? Fetch.classRoom.delete(this.props.cookies.get(variables.cookies.token), classroom, this.fecthClassroom)
                : this.setState({ showSnack: true })
        }
    }

    handleAddClick(){
        this.setState({
            classroomSelected: { ...emptyClassroom },
            showDialog: true,
            editMode: false
        })
    }

    renderClassroom (classRoom) {
        const childLength = this.state.childrens.filter(child => child.id_classroom === classRoom._id).length
        return (
            <div className='div-salle' key={classRoom._id}>
                <h2 onClick={event => this.handleEditClick(event, classRoom, action.showList)}>{classRoom.title}</h2>
                <p onClick={event => this.handleEditClick(event, classRoom, action.showList)}><span>Total des eleves</span><span>: {classRoom.childLength}</span></p>
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
                    onClick={event => this.handleActionClick(event, action.delete, classRoom)}
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
                        <Button fullWidth onClick={event => this.handleActionClick(event, action.edit, this.state.classroomSelected)} color='primary'>
                            Save changes
                        </Button>
                        )}
                        {!this.state.editMode && (
                        <Button fullWidth onClick={event => this.handleActionClick(event, action.add, this.state.classroomSelected)} color='primary'>
                            Ajouter
                        </Button>
                        )}
                    </DialogActions>
                </Dialog>


                <Dialog
                    className='dialog'
                    onClose={this.handleCloseDialog}
                    aria-labelledby='customized-dialog-title'
                    open={this.state.showListDialog}
                >
                {this.state.childSelectedList.length === 0 && (
                    <DialogTitle id="simple-dialog-title">Cette salle ne contient pas d'enfant</DialogTitle>
                )}

                {this.state.childSelectedList.length > 0 && (
                    <>
                    <DialogTitle id="simple-dialog-title">Liste des enfants</DialogTitle>
                    <List>
                        {this.state.childSelectedList.map(child => (
                            <ListItem key={child._id} button onClick={() => console.log(child)}>
                                <ListItemAvatar>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={child.first_name + ' ' + child.last_name} />
                            </ListItem>
                        ))}
                    </List>
                    </>
                )}
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
