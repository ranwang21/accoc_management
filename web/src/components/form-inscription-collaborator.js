import React, { Component } from 'react'
import { FormControl, Input, InputLabel, FormGroup, TextareaAutosize, Button, Checkbox, TextField } from '@material-ui/core'
import '../styles/_form.scss'

class FormInscriptionCollaborator extends Component {
    getLang () {
        return require('../lang/' + this.props.lang + '/form-general.json')
    }

    getLabels () {
        return require('../lang/' + this.props.lang + '/form-collaborator.json')
    }

    getFields () {
        return require('../forms-files/collaborator.json')
    }

    renderItemType (type, id, required, value) {
        switch (type) {
        case 'textarea':
            return <TextareaAutosize id={id} required={required} className='textarea' />
        case 'checkbox':
            return <Checkbox value={value} />
        case 'date':
            return <TextField id={id} type={type} required={required} />
        default:
            return <Input id={id} type={type} required={required} />
        }
    }

    // currying function, first level returns form steps, second returns fields of each step
    renderSteps (labels, fields) {
        return Object.keys(labels).map((key, index) =>
            <FormGroup key={index}>
                {Object.keys(labels[key]).map((label, index) => {
                    if (label === 'label') {
                        return <legend className='form-legend' key={index}>{labels[key][label]}</legend>
                    } else {
                        const { type, id, required, value } = fields[key].fields[label]
                        return (
                            <FormGroup key={index} className='form-group'>
                                <InputLabel className='form-label'>{labels[key][label]}</InputLabel>
                                {this.renderItemType(type, id, required, value)}
                            </FormGroup>
                        )
                    }
                })}
            </FormGroup>
        )
    }

    render () {
        const labels = this.getLabels()
        const fields = this.getFields()
        const lang = this.getLang()
        return (
            <div>
                <form noValidate autoComplete='off' className='form'>
                    {this.renderSteps(labels, fields)}
                    <div className='form-group'>
                        <Button className='form-button' variant='contained' color='primary' href='#contained-buttons'>
                            {lang.cancel}
                        </Button>
                        <Button className='form-button' variant='contained' color='secondary' href='#contained-buttons'>
                            {lang.submit}
                        </Button>
                    </div>
                </form>

            </div>
        )
    }
}

export default FormInscriptionCollaborator
