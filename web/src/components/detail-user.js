import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { withCookies } from 'react-cookie'
import Fetch from '../utilities/fetch-datas'
import '../styles/_detail-user.scss'

const variables = require('../utilities/variables').variables

class DetailUser extends Component {
    constructor () {
        super()
        this.state = {
            image: null
        }

        this.handleImageChange = this.handleImageChange.bind(this)
        this.setImage = this.setImage.bind(this)
        this.updateImage = this.updateImage.bind(this)
    }

    updateImage (dataImage) {
        this.setState({ image: dataImage.data })
    }

    setImage (dataImage) {
        if (!dataImage.success) {
            console.log("erreur lors du chargement de l'image")
        } else {
            Fetch.image.get(this.props.cookies.get(variables.cookies.token), this.props.userSelected._id, this.updateImage)
        }
    }

    handleImageChange () {
        Fetch.image.update(this.props.cookies.get(variables.cookies.token), this.props.userSelected, event.target.files, this.setImage)
        this.props.onChangeImage()
    }

    render () {
        const src = this.state.image === null ? this.props.userSelected.img : this.state.image
        return (
            <div className='detail-user'>
                <div className='image'>
                    <Button
                        variant='text'
                        component='label'
                    >
                        <img src={src} alt='avatar' />
                        <p><span>Cliquer pour changer</span></p>
                        <input
                            onChange={this.handleImageChange}
                            accept='.png, .jpg, .jpeg'
                            type='file'
                            style={{ display: 'none' }}
                        />
                    </Button>
                </div>
                {[...new Array(2)]
                    .map(
                        () => `Cras mattis consectetur purus sit amet fermentum.
                        Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                        Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
                    )
                    .join('\n')}
            </div>
        )
    }
}

export default withCookies(DetailUser)
