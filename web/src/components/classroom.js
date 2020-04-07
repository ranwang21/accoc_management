import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

import '../styles/_classroom.scss'

class ClassRoom extends Component {
    getLangFile () {
        return require('../lang/' + this.props.lang + '/classroom.json')
    }

    render () {
        const lang = this.getLangFile()

        return (
            <form noValidate>
                <TextField
                    id='date-start'
                    label={lang.from}
                    type='date'
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <TextField
                    id='date-end'
                    label={lang.to}
                    type='date'
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </form>
        )
    }
}

export default ClassRoom
