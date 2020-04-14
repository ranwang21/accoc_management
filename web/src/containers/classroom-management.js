import React, { Component } from 'react'
import Fetch from '../utilities/fetch-datas'
import { Button, Dialog, DialogTitle, DialogContent, Typography, DialogActions, TextField, FormControl, InputLabel, Input } from '@material-ui/core'
import EditIcon from '@material-ui/icons/EditOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import { withCookies } from 'react-cookie'
import '../styles/_classroom-management.scss'
import PhoneMask from '../components/forms/builds'

const variables = require('../utilities/variables').variables

class ClassRoomManagement extends Component {
    constructor () {
        super()
        this.state = {
            classRooms: [],
            classroomSelected: null,
            showDialog: false
        }
        this.setClassRoom = this.setClassRoom.bind(this)
        this.handleEditClick = this.handleEditClick.bind(this)
        this.handleCloseDialog = this.handleCloseDialog.bind(this)
        this.handleUpdateClassRoom = this.handleUpdateClassRoom.bind(this)
        this.fecthClassroom = this.fecthClassroom.bind(this)
    }

    setClassRoom (data) {
        this.setState({ classRooms: data })
    }

    fecthClassroom(){
        Fetch.classRoom.get(this.props.cookies.get(variables.cookies.token), this.setClassRoom)
    }

    componentDidMount () {
        // Fecth ClassRooms
        this.fecthClassroom()
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/classroom-management.json') }

    renderClassroom (classRoom) {
        return (
            <div key={classRoom._id}>
                <h2>{classRoom.title}</h2>
                <p><span>Total des eleves</span><span>: 80</span></p>
                <p><span>Nombre de place</span><span>: {classRoom.seat}</span></p>
                <p><span>Contact</span><span>: {classRoom.phone}</span></p>
                <div>
                    <Button
                        onClick={event => this.handleEditClick(event, classRoom)}
                        variant='contained'
                        color='secondary'
                        fullWidth
                        startIcon={<EditIcon />}
                    >
                        Edit
                    </Button>
                </div>
            </div>
        )
    }

    handleEditClick (event, classroom) {
        if(!(this.state.classroomSelected !== null && classroom._id === this.state.classroomSelected._id)){
            this.setState({ classroomSelected: {...classroom} })
        }
        this.setState({ showDialog: true })
    }

    handleCloseDialog () {
        this.setState({ showDialog: false })
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

    handleUpdateClassRoom(){
        this.setState({showDialog: false})
        Fetch.classRoom.update(this.props.cookies.get(variables.cookies.token), this.state.classroomSelected, this.fecthClassroom)
    }

    render () {
        const lang = this.getLangFile()
        return (
            <div className='classroom-management'>
                <Button variant='contained' className='btn-add-classroom' color='primary'>
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
                        Modification ({this.state.classroomSelected !== null && this.state.classroomSelected.title})
                    </DialogTitle>
                    <DialogContent dividers className='div-dialog-edit-classroom'>
                        {this.state.classroomSelected !== null && (
                            <>
                                <TextField
                                    className='edit-input'
                                    type='text'
                                    color='primary'
                                    variant='filled'
                                    label='Nom de la classe'
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
                        <Button fullWidth onClick={this.handleUpdateClassRoom} color='primary'>
                            Save changes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withCookies(ClassRoomManagement)
