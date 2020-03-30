import React, { Component } from 'react'
import Form from './builds'

import '../../styles/_children-inscription.scss'
const FormConfig = require('../../forms-files/children-inscription.json').fields
const variables = require('../../utilities/variables').variables

class ChildrenInscription extends Component {
    getLangFile () { return require('../../lang/' + this.props.lang + '/children-inscription.json') }

    render () {
        const lang = this.getLangFile()
        return (
            <>
                <div className='children-inscription'>
                    <h1>{lang.title} / {this.props.nbre}</h1>
                    <div className='fields'>
                        {/* FormConfig.map(field => {
                            return (
                                <div key={variables.id.register[field.name]}>
                                    { Form[field.type](field, this.props.lang, lang, this.props.fields, this.props.errors, this.props.inputEvent) }
                                </div>)
                        }) */}
                    </div>

                </div>
            </>
        )
    }
}

export default ChildrenInscription
