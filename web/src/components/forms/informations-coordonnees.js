import React, { Component } from 'react'
import Form from './builds'

import '../../styles/_informations-coordonnees.scss'
const FormConfig = require('../../forms-files/informations-coordonnees.json').fields
const variables = require('../../utilities/variables').variables
const types = {
    text: 'text',
    radio: 'radio',
    checkBox: 'checkbox',
    date: 'date',
    contactsType: 'text-multiple',
    memberShipType: 'memberShip-fields'
}

class InformationsCoordonnees extends Component {
    constructor () {
        super()
        this.state = {
            fields: {
                sex: null,
                birthday: null,
                last_name: null,
                first_name: null,
                address: null,
                personal: null,
                home: null,
                work: null,
                emergency: null,
                toContacted: null,
                email: null,
                is_subscribed: null,
                has_child: null,
                memberShip: null,
                paymentMethod: null,
                memberCard: null,
                discountCard: null
            },
            errors: {
                sex: false,
                birthday: false,
                last_name: false,
                first_name: false,
                address: false,
                contact: false,
                email: false,
                memberShip: false
            },
            enableSubmit: false,
            loading: false
        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    getLangFile () { return require('../../lang/' + this.props.lang + '/informations-coordonnees.json') }

    handleInputChange (event, name, type) {
        let newValue = null
        if (type === types.date) {
            newValue = event._d
        } else if (type === types.checkBox) {
            newValue = event.target.checked
        } else {
            newValue = event.target.value
        }

        this.setState(state => {
            const oldFields = state.fields
            oldFields[name] = newValue
            return {
                fields: oldFields
            }
        })
    }

    render () {
        const lang = this.getLangFile()
        return (
            <>
                <div className='informations-coordonnees'>
                    <h1>{lang.title}</h1>
                    <div className='fields'>
                        {FormConfig.map(field => {
                            let renderingField = null
                            switch (field.type) {
                            case types.text:
                                renderingField = Form.textField(field, lang, this.state.fields, this.state.errors, this.handleInputChange)
                                break
                            case types.radio:
                                renderingField = Form.radioField(field, lang, this.state.fields, this.state.errors, this.handleInputChange)
                                break
                            case types.checkBox:
                                renderingField = Form.checkBoxField(field, lang, this.state.fields, this.state.errors, this.handleInputChange)
                                break
                            case types.date:
                                renderingField = Form.dateField(field, this.props.lang, lang, this.state.fields, this.state.errors, this.handleInputChange)
                                break
                            case types.contactsType:
                                renderingField = Form.contactField(field, lang, this.state.fields, this.state.errors, this.handleInputChange)
                                break
                            case types.memberShipType:
                                renderingField = Form.memberShipField(field, lang, this.state.fields, this.state.errors, this.handleInputChange)
                                break
                            }
                            return (<div key={variables.id.register[field.name]}>{renderingField}</div>)
                        })}
                    </div>

                </div>
            </>
        )
    }
}

export default InformationsCoordonnees
