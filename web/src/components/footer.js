import React, { Component } from 'react'
import { Container, Button } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
const theme = createMuiTheme({
    palette: {
        secondary: {
            main: 'rgba(0, 0, 0, 0)'
        }
    }
})
class Footer extends Component {
    render () {
        return (

            <ThemeProvider theme={theme}>
                <Container className='footer' maxWidth={false}>
                    <div className='adresse'>
                        <h2>La maison d'aurore</h2>
                        <div>
                            <h3>Adresse: </h3>
                            <ul>
                                <li>4816, rue Garnier (coin Gilford)</li>
                                <li>H2J 4B4</li>
                                <li>Montreal, Quebec</li>
                                <li>CANADA</li>
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
                        >Nous Contacter
                        </Button>
                        <Button
                            variant='contained'
                            color='secondary'
                            size='medium'
                            fullWidth={false}
                        >A propos de nous
                        </Button>
                    </div>
                </Container>
            </ThemeProvider>
        )
    }
}

export default Footer
