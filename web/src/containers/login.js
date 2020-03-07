import React, { Component } from 'react'
import '../styles/_login.scss'
import LockIcon from '@material-ui/icons/LockRounded'
import LockOpenIcon from '@material-ui/icons/LockOpenRounded'
import { Container, TextField, Button } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
const LoginConfig = require('../forms-files/login.json')

function Alert (props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />
}
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
            error: false,
            success: false
        }
        this.email = null
        this.password = null
        this.messageError = 'Email ou Mot de pass incorrect'
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleBtnClick = this.handleBtnClick.bind(this)
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
        const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        if (!mailformat.test(this.email)) return false
        else if (this.email !== trueEmail || this.password !== truePassword) return false
        else return true
    }

    handleBtnClick () {
        if (this.validateInput()) {
            this.setState({
                error: false,
                success: true
            })
        } else {
            this.setState({
                error: true,
                success: false
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
                                onClick={this.handleBtnClick}
                                variant='contained'
                                color='secondary'
                                size='medium'
                                fullWidth={false}
                                startIcon={this.state.success ? <LockOpenIcon /> : <LockIcon />}
                            >
                                {!this.state.success && 'Se connecter'}
                            </Button>

                        </ThemeProvider>
                    </form>
                    <Snackbar open={this.state.success} autoHideDuration={6000}>
                        <Alert severity='success'>
                            This is a success message!
                        </Alert>
                    </Snackbar>
                </Container>
            </div>
        )
    }
}
export default Application
