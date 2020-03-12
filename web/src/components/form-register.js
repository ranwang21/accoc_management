import React, { Component } from 'react'

class FormRegister extends Component {
    getLangFile () {
        return require('../lang/' + this.props.lang + '/form-register.json')
    }

    render () {
        return (
            <div />
        )
    }
}

export default FormRegister
