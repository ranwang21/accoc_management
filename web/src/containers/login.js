import React, { Component } from 'react'
import { Input, Select, Textarea } from '../components/form-options'

class Application extends Component {
    constructor () {
        super()

        this.state = {
            loginConfig: null,
            values: {},
            response: null
        }

        // this.onhandleFieldOnChange = this.onhandleFieldOnChange.bind(this)
        // this.onhandleBtnClickEvent = this.onhandleBtnClickEvent.bind(this)
    }

    componentDidMount () {
        fetch('login.json', { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    loginConfig: response
                })
            })
    }

    onhandleFieldOnChange (event) {
        this.setState({
            values: Object.assign(this.state.values, { [event.target.name]: event.target.value })
        })
    }

    buildFormInfos () {
        const buildFormInfos = {
            fields: this.state.config.forms[this.state.formIndex].fields,
            changeEvent: this.onhandleFieldOnChange,
            clickEvent: this.onhandleBtnClickEvent
        }
        return buildFormInfos
    }

    render () {
        const config = this.state.loginConfig
        const formIndex = this.state.formIndex
        const response = this.state.response
        const title = (config !== null) ? config.title : 'Formulaire Remplie'
        const formTitle = (config !== null) ? ((formIndex + 1) + ': Formulaire ' + config.forms[formIndex].header) : ''
        const formInfos = (config !== null) ? this.buildFormInfos() : null
        return (
            <div className='application'>
                <h1>{title}</h1>
                <h3>{formTitle}</h3>
                {(formIndex === 0 && formInfos !== null) && <Input formsInfos={formInfos} />}
                {(formIndex === 1 && formInfos !== null) && <Select formsInfos={formInfos} />}
                {(formIndex === 2 && formInfos !== null) && <Textarea formsInfos={formInfos} />}
                {(response !== null) && <p>{JSON.stringify(response, null, 4)}</p>}
            </div>
        )
    }
}
export default Application
