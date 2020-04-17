import React, { Component } from 'react'
import { FormControlLabel, FormGroup, Checkbox, TableContainer, Table, TableHead, TableRow, TableCell } from '@material-ui/core'
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import '../styles/_print.scss'

class Print extends Component {
    constructor () {
        super()
        this.state = {
            listSelected: 0
        }
        this.handleListSelected = this.handleListSelected.bind(this)
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/print.json') }

    handleListSelected (event, value) {
        this.setState({ listSelected: value })
    }

    buildHeader (lang) {
        const headers = [
            { id: 'nom', label: lang.head.lastName, minWidth: 170 },
            { id: 'prenom', label: lang.head.firstName, minWidth: 170 }
        ]
        if (this.state.listSelected === lang.list.ofChild.value) {

        }
        if (this.state.listSelected === lang.list.ofCollaborater.value) {
            headers.push({ id: 'phone', label: lang.head.phone, minWidth: 170 })
            headers.push({ id: 'courriel', label: lang.head.courriel, minWidth: 170 })
        }
        if (this.state.listSelected === lang.list.ofParent.value) {
            headers.push({ id: 'phone', label: lang.head.phone, minWidth: 170 })
            headers.push({ id: 'courriel', label: lang.head.courriel, minWidth: 170 })
        }
        return (
            <TableHead>
                <TableRow>
                    {headers.map(header => (
                        <TableCell
                            key={header.id}
                            padding='default'
                            align={header.align}
                            style={{ minWidth: header.minWidth }}
                        >
                            {header.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        )
    }

    render () {
        const lang = this.getLangFile()
        const allActors = []
        return (
            <div className='print'>
                <h1>{lang.title}</h1>
                <div className='div-titles'>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.listSelected === lang.list.ofChild.value}
                                    onChange={event => this.handleListSelected(event, lang.list.ofChild.value)}
                                    icon={<CheckBoxOutlineBlankRoundedIcon />}
                                    checkedIcon={<VerifiedUserRoundedIcon />}
                                />
                            }
                            label={lang.list.ofChild.label}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.listSelected === lang.list.ofCollaborater.value}
                                    onChange={event => this.handleListSelected(event, lang.list.ofCollaborater.value)}
                                    icon={<CheckBoxOutlineBlankRoundedIcon />}
                                    checkedIcon={<VerifiedUserRoundedIcon />}
                                />
                            }
                            label={lang.list.ofCollaborater.label}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.listSelected === lang.list.ofParent.value}
                                    onChange={event => this.handleListSelected(event, lang.list.ofParent.value)}
                                    icon={<CheckBoxOutlineBlankRoundedIcon />}
                                    checkedIcon={<VerifiedUserRoundedIcon />}
                                />
                            }
                            label={lang.list.ofParent.label}
                        />
                    </FormGroup>
                </div>
                <div className='div-lists to-print' />
            </div>
        )
    }
}

export default Print
