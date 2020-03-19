import React, { Component } from 'react'
import { Container, Button } from '@material-ui/core'
import '../styles/_footer.scss'

class Footer extends Component {
    constructor () {
        super()
        this.handleAboutClick = this.handleAboutClick.bind(this)
    }

    getLangFile () {
        return require('../lang/' + this.props.lang + '/footer.json')
    }

    handleAboutClick () {
        console.log('not available')
    }

    render () {
        const langFile = this.getLangFile()

        return (
            <Container className='footer' maxWidth={false}>
                <div className='adresse'>
                    <h2>{langFile.adresse.head}</h2>
                    <div>
                        <h3>{langFile.adresse.title} </h3>
                        <ul>
                            <li>{langFile.adresse.road}</li>
                            <li>{langFile.adresse.cp}</li>
                            <li>{langFile.adresse.cityState}</li>
                            <li>{langFile.adresse.country}</li>
                        </ul>
                    </div>
                </div>
                <div className='map' />
                <div className='contact'>
                    <Button
                        onClick={this.handleAboutClick}
                        variant='contained'
                        color='secondary'
                        size='medium'
                        fullWidth={false}
                    >{langFile.contact.contactUs}
                    </Button>
                    <Button
                        onClick={this.handleAboutClick}
                        variant='contained'
                        color='secondary'
                        size='medium'
                        fullWidth={false}
                    >{langFile.contact.aboutUs}
                    </Button>
                </div>
            </Container>
        )
    }
}

export default Footer
