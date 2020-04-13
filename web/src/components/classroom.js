import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import {
    TableContainer, Table, Button, TableHead, TableRow, TableCell, TableBody
} from '@material-ui/core'
import ClassroomDetail from '../components/classroom-detail'
import Fetch from '../utilities/fetch-datas'
import '../styles/_classroom.scss'
import '../styles/_detail-user.scss'

const variables = require('../utilities/variables').variables

class ClassRoom extends Component {
    constructor () {
        super()
        this.state = {
            startDate: null,
            endDate: null,
            onSearch: false,
            showDetail: false,
            matchedSchedules: [],
            classroomSelected: null
        }
        this.handleStartDateChange = this.handleStartDateChange.bind(this)
        this.handleEndDateChange = this.handleEndDateChange.bind(this)
        this.renderClassRooms = this.renderClassRooms.bind(this)
        this.handleShowDetail = this.handleShowDetail.bind(this)
        this.handleCloseDetail = this.handleCloseDetail.bind(this)
        this.handleStartDateChange = this.handleStartDateChange.bind(this)
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

    handleSearch (startDate, endDate) {
        if (this.state.startDate !== null & this.state.endDate !== null) {
            this.setState({
                matchedSchedules: this.filterScheduleByDate(startDate, endDate),
                onSearch: true
            })
        }
    }

    filterScheduleByDate (startDate, endDate) {
        const schedules = this.props.schedules
        const formattedStartDate = new Date(startDate + ' 00:00:00')
        const formattedEndDate = new Date(endDate + ' 23:59:59')
        // find the schedules between start and end date
        const matchedSchedules = schedules.filter(schedule => new Date(schedule.date) >= formattedStartDate && new Date(schedule.date) <= formattedEndDate)
        return matchedSchedules
    }

    filterActors (userId) {
        // TODO: filter actors by userId
        // const actors = this.props.actors
        // const matchedSchedules = this.state.matchedSchedules
        // const userIdsInMatchedSchedules = []
        // matchedSchedules.map(schedule => userIdsInMatchedSchedules.push(schedule.id_user))
        // actors.map(actor => {
        //     if (userIdsInMatchedSchedules.includes(actor._id)) {
        //         console.log('includes: ', actor._id)
        //     } else { console.log(actor._id) }
        // })
        console.log('all actors: ', this.props.actors)
        console.log('matchedSchedules: ', this.state.matchedSchedules)
    }

    renderClassRooms () {
        const classRooms = this.props.classRooms
        if (classRooms.length > 0) {
            return (<TableBody>{classRooms.map(classRoom => this.renderRow(classRoom))}</TableBody>)
        }
    }

    componentDidMount () {
        // console.log(this.props.schedules)
    }

    renderRow (classRoom) {
        return (
            <TableRow hover role='checkbox' className='table-row' tabIndex={-1} key={classRoom._id} onClick={() => this.handleShowDetail(classRoom)}>
                <TableCell> {classRoom.title} </TableCell>
                <TableCell> {classRoom.phone} </TableCell>
                <TableCell> {classRoom.seat} </TableCell>
            </TableRow>
        )
    }

    handleShowDetail (classRoom) {
        // put showdetail in the callback to make sure classroomSelected state is set before showing detail page
        this.setState({ classroomSelected: classRoom }, () => this.filterActors(), () => this.setState({ showDetail: true }))
    }

    handleCloseDetail () {
        this.setState({
            showDetail: false,
            classroomSelected: null
        })
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
                                    <Button variant='contained' color='primary' onClick={() => this.handleSearch(this.state.startDate, this.state.endDate)}>
                                        {lang.search}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {this.state.onSearch ? this.renderClassRooms() : null}
                    </Table>
                    {this.state.classroomSelected !== null && (
                        <ClassroomDetail
                            open={this.state.showDetail}
                            onClose={this.handleCloseDetail}
                            classRoom={this.state.classroomSelected}
                            lang={this.props.lang}
                        />
                    )}
                </TableContainer>
            </form>
        )
    }
}

export default ClassRoom
