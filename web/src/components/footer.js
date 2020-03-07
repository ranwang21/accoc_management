import React, { Component } from 'react'
import { Container, Button } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import '../styles/_footer.scss'

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: 'rgba(0, 0, 0, 0)'
        }
    }
})
class Footer extends Component {
    getLangFile () {
        return require('../lang/' + this.props.lang + '/footer.json')
    }

    render () {
        const lang = this.props.lang
        const langFile = this.getLangFile()
        return (
            <ThemeProvider theme={theme}>
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
                            variant='contained'
                            color='secondary'
                            size='medium'
                            fullWidth={false}
                        >{langFile.contact.contactUs}
                        </Button>
                        <Button
                            variant='contained'
                            color='secondary'
                            size='medium'
                            fullWidth={false}
                        >{langFile.contact.aboutUs}
                        </Button>
                    </div>
                </Container>
            </ThemeProvider>
        )
    }
}

export default Footer
