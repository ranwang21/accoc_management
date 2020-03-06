import React, { Component } from 'react'
import { Input, Select, Textarea } from '../components/form-options'
const LoginConfig = require('../forms-files/login.json')

class Application extends Component {
    constructor () {
        super()

        this.state = {
            loginConfig: null
        }
        this.onInputChange = this.onInputChange.bind(this)
    }

    componentDidMount () {
        this.fetchUsers()
    }

    fetchUsers () {
        this.setState({
            loginConfig: LoginConfig
        })
    }

    onInputChange (event) {
        console.log(event.target.value)
    }

    buildFields ({ id, attributes, type, label, required }) {
        let field = null
        switch (attributes) {
        case 'input':
            field = <Input label={label} type={type} id={id} changeEvent={this.onInputChange} />
            break
        case 'select':
            field = <Select />
            break
        case 'textarea':
            field = <Textarea />
            break
        }

        return field
    }

    render () {
        const loginConfig = this.state.loginConfig
        const error = 'Une erreur est survenu lors du chargement du formulaire'
        return (
            <div className='login'>
                {loginConfig !== null ? (
                    loginConfig.map(loginConfig => {
                        const { attributes, type, label, required } = loginConfig
                        return (
                            <div key={label}>
                                <p>Label: {label}</p>
                                <p>Attributes: {attributes}</p>
                                <p>Type: {type}</p>
                                <p>Required: {required ? 'true' : 'false'}</p>
                                <hr />
                            </div>
                        )
                    })
                ) : (
                    <p>{error}</p>
                )}
            </div>
        )
    }
}
export default Application
