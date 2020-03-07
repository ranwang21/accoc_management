import React, { Component } from 'react'
import '../styles/_login.scss'
import LockIcon from '@material-ui/icons/LockRounded'
import { Container, TextField, Button } from '@material-ui/core'
import Snack from '../components/snack'
const LoginConfig = require('../forms-files/login.json')

class Application extends Component {
    constructor () {
        super()
        this.state = {
            loginConfig: null,
            success: false,
            error: false,
            showSnack: false
        }
        this.email = ''
        this.password = ''
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
                showSnack: true,
                enableSubmit: false
            })
            this.props.handleConnectedEvent()
        } else {
            this.setState({
                error: true,
                success: false
            })
        }
    }

    handleInputChange (event) {
        ((event.target.type === 'text')
            ? this.email = event.target.value
            : this.password = event.target.value)

        this.checkEmptyInput()
    }

    checkEmptyInput () {
        if (this.email.length === 0 || this.password.length === 0) {
            this.setState({
                enableSubmit: false
            })
        } else {
            this.setState({
                enableSubmit: true
            })
        }
    }

    buildFields (lang) {
        const error = this.state.error
        const fields = this.state.loginConfig
        return (
            <>
                <TextField
                    error={error}
                    key={fields.email.id}
                    id={fields.email.id}
                    label={lang.emailLabel}
                    type={fields.email.type}
                    color='primary'
                    helperText={error && lang.messageErrorLogin}
                    variant='outlined'
                    onChange={this.handleInputChange}
                    required={fields.email.required}
                />
                <TextField
                    error={error}
                    key={fields.password.id}
                    id={fields.password.id}
                    label={lang.passwordLabel}
                    type={fields.password.type}
                    color='primary'
                    helperText={error && lang.messageErrorLogin}
                    variant='outlined'
                    onChange={this.handleInputChange}
                    required={fields.password.required}
                />
            </>
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
                        {loginConfig !== null && (this.buildFields(langFile))}
                        {this.state.enableSubmit && (
                            <Button
                                onClick={this.handleBtnClick}
                                variant='contained'
                                color='secondary'
                                size='medium'
                                fullWidth={false}
                                startIcon={<LockIcon />}
                            >
                                {!success && langFile.buttonLabel}
                            </Button>
                        )}
                    </form>
                    <Snack show={showSnack} message={langFile.messageSnack} severity='success' />
                </Container>
            </div>
        )
    }
}
export default Application
