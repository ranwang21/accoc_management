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
                        <h2>{langFile.adresseHead}</h2>
                        <div>
                            <h3>{langFile.adresseTitle} </h3>
                            <ul>
                                <li>{langFile.adresseRoad}</li>
                                <li>{langFile.adresseCp}</li>
                                <li>{langFile.adresseCityState}</li>
                                <li>{langFile.adresseCountry}</li>
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
                        >{langFile.contactUs}
                        </Button>
                        <Button
                            variant='contained'
                            color='secondary'
                            size='medium'
                            fullWidth={false}
                        >{langFile.aboutUs}
                        </Button>
                    </div>
                </Container>
            </ThemeProvider>
        )
    }
}

export default Footer
