import React, { Component } from 'react'
import '../styles/_login.scss'
import LockIcon from '@material-ui/icons/LockRounded'
import LockOpenIcon from '@material-ui/icons/LockOpenRounded'
import { Container, TextField, Button } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Snack from '../components/snack'
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
            success: false,
            error: false,
            showSnack: false
        }
        this.email = null
        this.password = null
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleBtnClick = this.handleBtnClick.bind(this)
    }

    getLangFile () {
        return require('../lang/' + this.props.lang + '/login.json')
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
                success: true,
                showSnack: true
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

    buildInput (field, label, errorMessage) {
        const error = this.state.error
        return (
            <TextField
                error={error}
                key={field.id}
                id={field.id}
                label={label}
                type={field.type}
                color='primary'
                helperText={error && errorMessage}
                variant='outlined'
                onChange={this.handleInputChange}
                required={field.required}
            />
        )
    }

    render () {
        const langFile = this.getLangFile()

        const { loginConfig, success, showSnack } = this.state
        return (
            <div className='login'>
                <Container maxWidth='sm'>
                    <h1>{langFile.title}</h1>
                    <form className='' noValidate autoComplete='off'>

                        <ThemeProvider theme={theme}>
                            {loginConfig !== null && (this.buildInput(loginConfig.email, langFile.emailLabel, langFile.messageErrorLogin))}
                            {loginConfig !== null && (this.buildInput(loginConfig.password, langFile.passwordLabel, langFile.messageErrorLogin))}
                            <Button
                                onClick={this.handleBtnClick}
                                variant='contained'
                                color='secondary'
                                size='medium'
                                fullWidth={false}
                                startIcon={success ? <LockOpenIcon /> : <LockIcon />}
                            >
                                {!success && langFile.buttonLabel}
                            </Button>

                        </ThemeProvider>
                    </form>
                    <Snack show={showSnack} message={langFile.messageSnack} severity='success' />
                </Container>
            </div>
        )
    }
}
export default Application
