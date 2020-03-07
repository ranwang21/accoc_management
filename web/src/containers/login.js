import React, { Component } from 'react'
import '../styles/_login.scss'
import LockIcon from '@material-ui/icons/LockRounded'
import LockOpenIcon from '@material-ui/icons/LockOpenRounded'
import { Container, TextField, Button } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
const LoginConfig = require('../forms-files/login.json')

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgba(0, 0, 0, 0.8)'
        },
        secondary: {
            main: 'rgb(1, 144, 147)'
        }
    }
})

class Application extends Component {
    constructor () {
        super()

        this.state = {
            loginConfig: null,
            error: false
        }
        this.email = null
        this.password = null
        this.messageError = 'Email ou Mot de pass incorrect'
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentDidMount () {
        this.setState({
            loginConfig: LoginConfig
        })
    }

    validateInput () {
        // Email and password to test
        const trueEmail = 'admin@gmail.com'
        const truePassword = 'abc123...'
        if (this.email !== trueEmail && this.password !== truePassword) {
            this.setState({
                error: true
            })
        }
    }

    handleInputChange (event) {
        (event.target.type === 'text')
            ? this.email = event.target.value
            : this.password = event.target.value
    }

    buildFields ({ id, type, label }) {
        const error = this.state.error
        return (
            <TextField
                error={error}
                key={id}
                id={id}
                label={label}
                type={type}
                color='primary'
                helperText={error && this.messageError}
                variant='outlined'
                onChange={this.handleInputChange}
                required
            />
        )
    }

    render () {
        const loginConfig = this.state.loginConfig
        const error = 'Une erreur est survenu lors du chargement du formulaire'
        return (
            <div className='login'>
                <Container maxWidth='sm'>
                    <h1>Connexion</h1>
                    <form className='' noValidate autoComplete='off'>

                        <ThemeProvider theme={theme}>
                            {
                                loginConfig !== null
                                    ? loginConfig.map((field) => this.buildFields(field))
                                    : <p>{error}</p>
                            }
                            <Button
                                variant='contained'
                                color='secondary'
                                size='medium'
                                fullWidth={false}
                                startIcon={<LockIcon />}
                            >
                                Se connecter
                            </Button>

                        </ThemeProvider>
                    </form>
                </Container>
            </div>
        )
    }
}
export default Application
