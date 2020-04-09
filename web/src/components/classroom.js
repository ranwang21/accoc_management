import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import {
    TableContainer, Table, Button, TableHead, TableRow, TableCell, TableBody
} from '@material-ui/core'
import Fetch from '../utilities/fetch-datas'
import '../styles/_classroom.scss'

class ClassRoom extends Component {
    constructor () {
        super()
        this.state = {
            startDate: '',
            endDate: '',
            onSearch: false
        }
        this.handleStartDateChange = this.handleStartDateChange.bind(this)
        this.handleEndDateChange = this.handleEndDateChange.bind(this)
        this.renderClassRooms = this.renderClassRooms.bind(this)
    }

    componentDidMount () {
        this.renderClassRooms()
    }

    getLangFile () {
        return require('../lang/' + this.props.lang + '/classroom.json')
    }

    handleStartDateChange (event) {
        this.setState({ startDate: event.target.value })
    }

    handleEndDateChange (event) {
        this.setState({ endDate: event.target.value })
    }

    handleSearch () {
        if (this.state.startDate !== '' & this.state.endDate !== '') {
            this.setState({ onSearch: true })
        }
    }

    renderClassRooms () {
        const classRooms = this.props.classRooms
        if (classRooms.length > 0) {
            return (<TableBody>{classRooms.map(classRoom => this.renderRow(classRoom))}</TableBody>)
        }
    }

    renderRow (classRoom, index) {
        return (
            <TableRow hover role='checkbox' className='table-row' tabIndex={-1} key={classRoom._id}>
                <TableCell> {classRoom.title} </TableCell>
                <TableCell> {classRoom.phone} </TableCell>
                <TableCell> {classRoom.seat} </TableCell>
            </TableRow>
        )
    }

    render () {
        const lang = this.getLangFile()

        return (
            <form noValidate>
                <TableContainer className='table-list'>
                    <Table stickyHeader aria-label='sticky table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        id='date-start'
                                        onChange={event => this.handleStartDateChange(event)}
                                        label={lang.from}
                                        type='date'
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        id='date-end'
                                        onChange={event => this.handleEndDateChange(event)}
                                        label={lang.to}
                                        type='date'
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button variant='contained' color='primary' onClick={() => this.handleSearch()}>
                                        {lang.search}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {this.state.onSearch ? this.renderClassRooms() : null}
                    </Table>
                </TableContainer>
            </form>
        )
    }
}

export default ClassRoom
