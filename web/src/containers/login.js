import React, { Component } from 'react'
import Crypto from 'simple-crypto-js'
import '../styles/_login.scss'
import LockIcon from '@material-ui/icons/LockRounded'
import { Container, TextField, Button } from '@material-ui/core'
import Snack from '../components/snack'
const LoginConfig = require('../forms-files/login.json')

const role = require('../utilities/variables').variables.role

class Application extends Component {
    constructor () {
        super()
        this.state = {
            loginConfig: null,
            success: false,
            error: false,
            showSnack: false,
            users: null
        }
        this.email = ''
        this.password = ''
        this.userRole = null
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

    validateUser () {
        const userToSend = {
            email: 'admin@gmail.com',
            password: 'abc123...'
        }
        let response = null
        fetch('http://localhost:8080/auth/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userToSend)
        })
            .then(response => response.json())
            .then(data => (
                response = data
            ))
            .catch(error => console.log('error is', error))
        console.log(response)
    }

    validateInput () {
        // Email and password to test
        const trueEmail = 'admin@gmail.com'
        const truePassword = 'abc123...'
        const trueRole = 'high_admin'
        const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        let retour = false
        if (!mailformat.test(this.email)) retour = false
        else if (this.email !== trueEmail || this.password !== truePassword) retour = false
        else if (trueRole === role.child) retour = false
        else retour = true
        // d'ont forget to update userRole here
        this.userRole = role.highAdmin
        return retour
    }

    handleBtnClick (event) {
        if (this.validateInput()) {
            const userToken = {

            }
            this.setState({
                error: false,
                success: true,
                showSnack: true,
                enableSubmit: false
            })
            this.props.handleConnectedEvent(event, this.userRole)
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
        // this.validateUser()
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
