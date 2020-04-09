import React, { Component } from 'react'
import { Button, DialogTitle, DialogContent, Dialog, DialogActions, IconButton } from '@material-ui/core'
import PrintIcon from '@material-ui/icons/Print'
import { withCookies } from 'react-cookie'
import ChildDetail from './child-detail'
import AdminDetail from './admin-detail'
import ParentCollabDetail from './parent-collab-detail'
import PrintDetail from 'react-to-print'
import Fetch from '../utilities/fetch-datas'
import Loading from './loading'
import '../styles/_detail-user.scss'

const variables = require('../utilities/variables').variables

class DetailUser extends Component {
    constructor () {
        super()
        this.state = {
            fileUploadedSuccess: false,
            fileUploadedError: false,
            showLoading: false
        }
        this.divToPrint = React.createRef()
        this.time = 3000
        this.handleImageChange = this.handleImageChange.bind(this)
        this.setImage = this.setImage.bind(this)
        this.updateImage = this.updateImage.bind(this)
    }

    updateImage (dataImage) {
        this.props.onChangeImage(this.props.userSelected._id, dataImage.data)
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

    render () {
        const allergies = (this.props.userSelected.medical_info &&
            this.props.userSelected.medical_info[2] &&
            this.props.userSelected.medical_info[2].response)
            ? this.props.userSelected.medical_info[2].response
            : "Pas d'allergies"

        const date = this.props.userSelected.birthday ? new Date(this.props.userSelected.birthday).toLocaleDateString() : 'Pas defini'

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
                <DialogTitle id='scroll-dialog-title' className='title'>Fiche d'Informations</DialogTitle>
                <DialogContent id='details-print' ref={el => (this.divToPrint = el)}>
                    <div className='detail-head to-be-print'>LA MAISON D'AURORE</div>
                    <div className='detail-user'>
                        <div className='image'>
                            <Button
                                variant='text'
                                component='label'
                            >
                                <img src={this.props.userSelected.img} alt='avatar' />
                                {this.props.menuSelected !== variables.menus.validation && (
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
                                <p>{this.props.userSelected.first_name + ' ' + this.props.userSelected.last_name.toUpperCase()}</p>
                            </div>
                            <div>
                                <p>Date de naissance:</p>
                                <p>{date}</p>
                            </div>
                            {this.props.userSelected.roleTitle === variables.role.child && (
                                <div>
                                    <p>Allergies:</p>
                                    <p>{allergies}</p>
                                </div>
                            )}
                        </div>
                        <div className='details'>
                            {this.props.userSelected.roleTitle === variables.role.child && (
                                <ChildDetail
                                    lang={this.props.lang}
                                    child={this.props.userSelected}
                                    classRooms={this.props.classRooms}
                                    collabList={this.props.collabList}
                                />
                            )}
                            {(this.props.userSelected.roleTitle !== variables.role.child && this.props.userSelected.roleTitle !== variables.role.admin) && (
                                <ParentCollabDetail
                                    lang={this.props.lang}
                                    both={this.props.userSelected}
                                />
                            )}
                            {(this.props.userSelected.roleTitle === variables.role.admin) && (
                                <AdminDetail
                                    lang={this.props.lang}
                                    admin={this.props.userSelected}
                                />
                            )}
                        </div>
                    </div>
                    <div className='detail-footer to-be-print' />
                </DialogContent>
                <DialogActions className='dialog-footer'>
                    <PrintDetail
                        trigger={() => <IconButton><PrintIcon fontSize='large' /></IconButton>}
                        content={() => this.divToPrint}
                    />
                </DialogActions>
            </Dialog>
        )
    }
}

export default withCookies(DetailUser)
