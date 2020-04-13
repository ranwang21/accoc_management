import moment from 'moment'
import MomentUtils from '@date-io/moment'
import React, { Component } from 'react'
import { Button, DialogTitle, DialogContent, Dialog, DialogActions, IconButton, TextField } from '@material-ui/core'
import PrintIcon from '@material-ui/icons/Print'
import EditIcon from '@material-ui/icons/EditOutlined'
import SaveIcon from '@material-ui/icons/SaveAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import { withCookies } from 'react-cookie'
import ChildDetail from './child-detail'
import AdminDetail from './admin-detail'
import ParentCollabDetail from './parent-collab-detail'
import PrintDetail from 'react-to-print'
import Fetch from '../utilities/fetch-datas'
import Loading from './loading'
import '../styles/_detail-user.scss'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'

const variables = require('../utilities/variables').variables
const getAgeLimit = (age) => {
    const date = new Date()
    return new Date((date.getFullYear() - age) + '-' + (date.getMonth() + 1) + '-' + date.getDate())
}
class DetailUser extends Component {
    constructor () {
        super()
        this.state = {
            fileUploadedSuccess: false,
            fileUploadedError: false,
            showLoading: false,
            showEditLoading: false,
            userEdited: {}
        }
        this.divToPrint = React.createRef()
        this.time = 3000
        this.handleImageChange = this.handleImageChange.bind(this)
        this.setImage = this.setImage.bind(this)
        this.updateImage = this.updateImage.bind(this)
        this.handleEditClick = this.handleEditClick.bind(this)
        this.onEditFieldsChange = this.onEditFieldsChange.bind(this)
    }

    componentDidMount () {
        this.setState({ userEdited: this.props.userSelected })
    }

    onEditFieldsChange (event, value, name, subName) {
        this.setState(state => {
            const userEdited = state.userEdited
            subName === null
                ? userEdited[name] = value
                : userEdited[name][0][subName] = value

            return {
                userEdited: userEdited
            }
        })
    }

    updateImage (dataImage) {
        this.props.onChangeImage(this.props.userSelected, dataImage.data)
    }

    setImage (dataImage) {
        if (!dataImage.success) {
            this.setState({ fileUploadedError: true })
            setTimeout(() => {
                this.setState({ fileUploadedError: false, showLoading: false })
            }, this.time)
        } else {
            this.setState({ fileUploadedSuccess: true })
            setTimeout(() => {
                this.setState({ fileUploadedSuccess: false, showLoading: false })
            }, this.time)
            Fetch.image.get(this.props.cookies.get(variables.cookies.token), this.props.userSelected._id, this.updateImage)
        }
    }

    handleImageChange () {
        this.setState({ showLoading: true })
        Fetch.image.update(this.props.cookies.get(variables.cookies.token), this.props.userSelected, event.target.files, this.setImage)
    }

    handleEditClick () {
        this.props.onEditMode()
        if (this.props.allowEditable) {
            this.setState({ showEditLoading: true })
            console.log('SAVE EDIT')
        }
    }

    render () {
        const user = this.props.userSelected
        const allergies = (user.medical_info.length > 0 && user.medical_info[0].allergies !== null) ? user.medical_info[0].allergies : "Pas d'allergies"
        const date = (user && user.birthday !== null) ? new Date(user.birthday).toLocaleDateString() : 'Pas defini'

        return (
            <Dialog
                className='dialog'
                open={this.props.open}
                onClose={this.props.onClose}
                scroll='paper'
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
                maxWidth='md'
                fullWidth
            >
                <DialogTitle id='scroll-dialog-title' className='title'>Fiche d'Informations {this.state.allowEditable && '(Modification en cour)'}</DialogTitle>
                <DialogContent id='details-print' className='div-dialog' ref={el => (this.divToPrint = el)}>
                    <div className='detail-head to-be-print'>LA MAISON D'AURORE</div>
                    <div className={this.state.showEditLoading ? 'detail-user loading-effect' : 'detail-user'}>
                        <div className='image'>
                            <Button
                                variant='text'
                                component='label'
                            >
                                <img src={user.img} alt='avatar' />
                                {(this.props.menuSelected !== variables.menus.validation) && (
                                    <>
                                        <p><span>Cliquer pour changer</span></p>
                                        <input
                                            className='print-to-remove'
                                            onChange={this.handleImageChange}
                                            accept='.png, .jpg, .jpeg'
                                            type='file'
                                            style={{ display: 'none' }}
                                        />
                                    </>
                                )}
                            </Button>
                            {this.state.showLoading && (
                                <div className='img-loading'>
                                    <Loading lang={this.props.lang} />
                                </div>
                            )}
                            {this.state.fileUploadedSuccess && (
                                <p className='upload-success'>Avatar mis a jour !!!</p>
                            )}
                            {this.state.fileUploadedError && (
                                <p className='upload-error'>Erreur lors du telechargement de l'image</p>
                            )}
                        </div>
                        <div className='details-personnelles'>
                            <div className='text-name'>
                                <p>{user.first_name + ' ' + user.last_name.toUpperCase()}</p>
                            </div>
                            {user.roleTitle !== variables.role.admin && (
                                <div>
                                    <p>Date de naissance:</p>
                                    <p>{date}</p>
                                </div>
                            )}
                            {user.roleTitle === variables.role.child && (
                                <div>
                                    <p>Allergies:</p>
                                    <p>{allergies === null ? "Pas d'allergies" : allergies}</p>
                                </div>
                            )}
                        </div>
                        <div className='details'>
                            {this.props.allowEditable && (
                                <div className='first'>
                                    <div>
                                        <TextField
                                            type='text'
                                            color='primary'
                                            variant='filled'
                                            label='Last name'
                                            onChange={event => this.onEditFieldsChange(event, event.target.value, 'last_name', null)}
                                            value={this.state.userEdited.last_name !== null ? this.state.userEdited.last_name : ''}
                                        />
                                        <TextField
                                            type='text'
                                            color='primary'
                                            variant='filled'
                                            label='First name'
                                            onChange={event => this.onEditFieldsChange(event, event.target.value, 'first_name', null)}
                                            value={this.state.userEdited.first_name !== null ? this.state.userEdited.first_name : ''}
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
                                                value={this.state.userEdited.birthday !== null ? this.state.userEdited.birthday : new Date()}
                                                onChange={event => this.onEditFieldsChange(event, event._d, 'birthday', null)}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </div>
                            )}
                            {this.props.userSelected.roleTitle === variables.role.child && (
                                <ChildDetail
                                    lang={this.props.lang}
                                    child={user}
                                    classRooms={this.props.classRooms}
                                    collaboraters={this.props.collabList}
                                    parents={this.props.parentList}
                                    editable={this.props.allowEditable}
                                    userEdited={this.state.userEdited}
                                    handleEditChange={this.onEditFieldsChange}
                                />
                            )}
                            {(user.roleTitle !== variables.role.child && user.roleTitle !== variables.role.admin) && (
                                <ParentCollabDetail
                                    lang={this.props.lang}
                                    both={user}
                                    editable={this.props.allowEditable}
                                    days={this.props.days}
                                />
                            )}
                            {(user.roleTitle === variables.role.admin) && (
                                <AdminDetail
                                    lang={this.props.lang}
                                    admin={user}
                                />
                            )}
                        </div>
                    </div>
                    <div className='detail-footer to-be-print' />
                </DialogContent>
                <DialogActions className='dialog-footer'>
                    <div>
                        {(user.roleTitle !== variables.role.admin) && (
                        <>
                            <Button
                                onClick={this.handleEditClick}
                                variant='contained'
                                color='secondary'
                                className='btn-edit'
                                startIcon={this.props.allowEditable ? <SaveIcon /> : <EditIcon />}
                            >
                                {this.props.allowEditable ? 'Save ' : 'Edit '} Profil
                            </Button>
                        </>
                        )}
                        <Button
                            onClick={this.props.onDeleteUser}
                            variant='contained'
                            color='secondary'
                            className='btn-delete'
                            startIcon={<DeleteIcon />}
                        >
                            Delete Actor
                        </Button>
                    </div>

                    <div>
                        <PrintDetail
                            trigger={() => <IconButton><PrintIcon fontSize='large' /></IconButton>}
                            content={() => this.divToPrint}
                        />
                    </div>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withCookies(DetailUser)
