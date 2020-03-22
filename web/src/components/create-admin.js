import React, { Component } from 'react'
import { TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core'
import '../styles/_create-admin.scss'
import Fetch from '../utilities/fetch-datas'
import { withCookies } from 'react-cookie'
import Loading from '../components/loading'
import LockIcon from '@material-ui/icons/LockRounded'
const CreateAdminConfig = require('../forms-files/admin.json').create
const variables = require('../utilities/variables').variables

class CreateAdmin extends Component {
    constructor () {
        super()
        this.state = {
            errorEmail: false,
            errorPassword: false,
            enableSubmit: false,
            loading: false
        }

        this.firstName = ''
        this.lastName = ''
        this.email = ''
        this.password = ''
        this.confirmPassword = ''
        this.validation = true
        this.handleBtnClick = this.handleBtnClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.saveAdmin = this.saveAdmin.bind(this)
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/create-admin.json') }

    handleInputChange (event) {
        switch (event.target.id) {
        case variables.id.createAdmin.lastName:
            this.lastName = event.target.value
            break
        case variables.id.createAdmin.firstName:
            this.firstName = event.target.value
            break
        case variables.id.createAdmin.email:
            this.email = event.target.value.toLowerCase()
            break
        case variables.id.createAdmin.password:
            this.password = event.target.value
            break
        case variables.id.createAdmin.confirmPassword:
            this.confirmPassword = event.target.value
            break
        case variables.id.createAdmin.checkValidation:
            this.validation = event.target.checked
            break
        }
        this.checkEmptyInput()
    }

    checkEmptyInput () {
        (this.email.length === 0 || this.password.length === 0 || this.confirmPassword.length === 0)
            ? this.setState({ enableSubmit: false })
            : this.setState({ enableSubmit: true })
    }

    handleBtnClick () {
        this.setState({ loading: true })
        if (!Fetch.validateEmail(this.email)) {
            this.setState({
                errorEmail: true,
                errorPassword: false,
                loading: false
            })
        } else if (this.password !== this.confirmPassword) {
            this.setState({
                errorEmail: false,
                errorPassword: true,
                loading: false
            })
        } else {
            const params = {
                token: this.props.cookies.get(variables.cookies.token),
                role_title: 'admin',
                first_name: this.firstName,
                last_name: this.lastName,
                email: this.email,
                password: this.password,
                is_active: this.validation
            }
            Fetch.addUser(params, this.saveAdmin)
        }
    }

    saveAdmin (success) {
        if (success) {
            console.log('Successful !!!')
            this.setState({
                errorEmail: false,
                errorPassword: false,
                loading: false
            })
        } else {
            this.setState({
                errorEmail: false,
                errorPassword: false
            })
            console.log('Something wrong !!!')
        }
    }

    buildField (id, lang) {
        if (id !== variables.id.createAdmin.checkValidation) {
            let state = false
            let config = null
            let value = ''
            let labels = ''
            switch (id) {
            case variables.id.createAdmin.lastName:
                config = CreateAdminConfig.lastName
                labels = lang.lastName
                value = this.lastName
                break
            case variables.id.createAdmin.firstName:
                config = CreateAdminConfig.firstName
                labels = lang.firstName
                value = this.firstName
                break
            case variables.id.createAdmin.email:
                state = this.state.errorEmail
                config = CreateAdminConfig.email
                labels = lang.email
                value = this.email
                break
            case variables.id.createAdmin.password:
                state = this.state.errorPassword
                config = CreateAdminConfig.password
                labels = lang.password
                value = this.password
                break
            case variables.id.createAdmin.confirmPassword:
                state = this.state.errorPassword
                config = CreateAdminConfig.password
                labels = lang.confirmPassword
                value = this.confirmPassword
                break
            }
            return (
                <TextField
                    error={state}
                    id={id}
                    label={labels.label}
                    type={config.type}
                    color='primary'
                    helperText={state && labels.labelError}
                    variant='outlined'
                    onChange={this.handleInputChange}
                    required={config.required}
                    value={value}
                />
            )
        } else {
            return (
                <FormControlLabel
                    control={
                        <Checkbox
                            id={id}
                            checked={this.validation}
                            onChange={this.handleInputChange}
                            required={CreateAdminConfig.validation.required}
                        />
                    }
                    label={lang.validation.label}
                />

            )
        }
    }

    render () {
        const lang = this.getLangFile()
        return (
            <div className='create-admin'>
                <form className='' noValidate autoComplete='off'>
                    <h2>{lang.title}</h2>
                    <div className='fields'>
                        {this.buildField(variables.id.createAdmin.email, lang)}
                        {this.buildField(variables.id.createAdmin.lastName, lang)}
                        {this.buildField(variables.id.createAdmin.firstName, lang)}
                        {this.buildField(variables.id.createAdmin.password, lang)}
                        {this.buildField(variables.id.createAdmin.confirmPassword, lang)}
                        {this.buildField(variables.id.createAdmin.checkValidation, lang)}
                        {this.state.enableSubmit && (
                            <div className='div-button'>
                                <Button
                                    onClick={this.handleBtnClick}
                                    variant='contained'
                                    color='secondary'
                                    size='small'
                                    fullWidth={false}
                                    startIcon={<LockIcon />}
                                >
                                    {lang.buttonLabel}
                                </Button>
                            </div>
                        )}
                        {this.state.loading && (<Loading lang={this.props.lang} />)}
                    </div>
                </form>
            </div>
        )
    }
}

export default withCookies(CreateAdmin)
