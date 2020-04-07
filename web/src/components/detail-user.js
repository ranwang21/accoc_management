import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { withCookies } from 'react-cookie'
import ChildDetail from './child-detail'
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
                <div className='div'>
                    {this.props.userSelected.roleTitle === variables.role.child && (
                        <ChildDetail lang={this.props.lang} child={this.props.userSelected} />
                    )}
                </div>
            </div>
        )
    }
}

export default withCookies(DetailUser)
