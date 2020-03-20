import React, { Component } from 'react'
import { Container, TextField, Button } from '@material-ui/core'
import '../styles/_create-admin.scss'
import Fetch from '../utilities/fetch-datas'
import Loading from '../components/loading'
import LockIcon from '@material-ui/icons/LockRounded'
const CreateAdminConfig = require('../forms-files/admin.json').create

class createAdmin extends Component {
    constructor () {
        super()
        this.state = {
            error: false,
            enableSubmit: false,
            loading: false
        }

        this.email = ''
        this.password = ''
        this.confirmPassword = ''
        this.handleBtnClick = this.handleBtnClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/create-admin.json') }

    handleInputChange (event) {
        switch (event.target.id) {
        case 'createAdminEmail':
            this.email = event.target.value.toLowerCase()
            break
        case 'createAdminPassword':
            this.password = event.target.value
            break
        case 'createAdminConfirmPassword':
            this.confirmPassword = event.target.value
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
        Fetch.validateEmail(this.email) && this.setState({ error: true, loading: false })
    }

    buildFields (lang) {
        const error = this.state.error
        const fields = CreateAdminConfig
        return (
            <>
                <TextField
                    error={error}
                    key={fields.email.id}
                    id={fields.email.id}
                    label={lang.emailLabel}
                    type={fields.email.type}
                    color='primary'
                    helperText={error && lang.messageError}
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
                    helperText={error && lang.messageError}
                    variant='outlined'
                    onChange={this.handleInputChange}
                    required={fields.password.required}
                />
                <TextField
                    error={error}
                    key={fields.confirmPassword.id}
                    id={fields.confirmPassword.id}
                    label={lang.confirmPasswordLabel}
                    type={fields.confirmPassword.type}
                    color='primary'
                    helperText={error && lang.messageError}
                    variant='outlined'
                    onChange={this.handleInputChange}
                    required={fields.confirmPassword.required}
                />
            </>
        )
    }

    render () {
        const langFile = this.getLangFile()
        return (
            <div className='create-admin'>
                <Container maxWidth='sm'>
                    <h1>{langFile.title}</h1>
                    <form className='' noValidate autoComplete='off'>
                        {CreateAdminConfig !== null && (this.buildFields(langFile))}
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

export default createAdmin
