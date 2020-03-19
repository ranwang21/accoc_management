import React, { Component } from 'react'
import { FormControl, FormHelperText, Input, InputLabel, FormGroup, TextField } from '@material-ui/core'

class FormInscriptionCollaborator extends Component {
    getLabels () {
        return require('../lang/' + this.props.lang + '/form-collaborator.json')
    }

    getFields () {
        return require('../forms-files/collaborator.json')
    }

    renderSteps (labels, fields) {
        return Object.keys(labels).map((key, index) =>
            <FormGroup key={index}>
                {Object.keys(labels[key]).map((label, index) => {
                    if (label === 'label') {
                        return <legend key={index}>{labels[key][label]}</legend>
                    } else {
                        return <InputLabel>{labels[key][label]}</InputLabel>
                    }
                })}
            </FormGroup>
        )
    }

    // renderSingleField (key, labels, fields) {
    //     Object.keys(labels[key]).map(label => {
    //         return <label>{label}</label>
    //     })
    // }

    render () {
        const labels = this.getLabels()
        const fields = this.getFields()
        return (
            <div>
                <form noValidate autoComplete='off'>
                    {this.renderSteps(labels, fields)}
                </form>
            </div>
        )
    }
}

export default FormInscriptionCollaborator
