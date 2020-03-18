import React, { Component } from 'react'
import Fetch from '../utilities/fetch-datas'
import '../styles/_login.scss'
import Loading from '../components/loading'
import LockIcon from '@material-ui/icons/LockRounded'
import { Container, TextField, Button } from '@material-ui/core'
const LoginConfig = require('../forms-files/login.json')

class Login extends Component {
    constructor () {
        super()
        this.state = {
            loginConfig: null,
            error: false,
            enableSubmit: false,
            userToken: null,
            loading: false
        }
        this.email = ''
        this.password = ''
        this.userRole = null
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleBtnClick = this.handleBtnClick.bind(this)
        this.validateUser = this.validateUser.bind(this)
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/login.json') }

    componentDidMount () {
        this.setState({ loginConfig: LoginConfig })
    }

    validateUser (datas) {
        if (datas.success) {
            this.setState({ error: false, loading: false })
            this.props.handleConnectedEvent(event, datas.token)
        } else this.setState({ error: true, loading: false })
    }

    validateEmail () {
        const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        return !!mailformat.test(this.email)
    }

    handleBtnClick () {
        this.setState({ loading: true })
        this.validateEmail()
            ? Fetch.authLogin(this.email, this.password, this.validateUser)
            : this.setState({ error: true, loading: false })
    }

    handleInputChange (event) {
        (event.target.type === 'text'
            ? this.email = event.target.value
            : this.password = event.target.value)

        this.checkEmptyInput()
    }

    checkEmptyInput () {
        (this.email.length === 0 || this.password.length === 0)
            ? this.setState({ enableSubmit: false })
            : this.setState({ enableSubmit: true })
    }

    buildFields (lang) {
        const error = this.state.error
        const fields = this.state.loginConfig
        this.state.userToken !== null && console.log(this.state.userToken)
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
                    value={this.email}
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
        const { loginConfig } = this.state
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
                                {langFile.buttonLabel}
                            </Button>
                        )}
                    </form>
                    {this.state.loading && (<Loading lang={this.props.lang} />)}
                </Container>
            </div>
        )
    }
}
export default Login
