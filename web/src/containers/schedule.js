import moment from 'moment'
import React, { Component } from 'react'
import MomentUtils from '@date-io/moment'
import { withCookies } from 'react-cookie'
import Fetch from '../utilities/fetch-datas'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import '../styles/_schedule.scss'

const variables = require('../utilities/variables').variables

class Schedule extends Component {
    constructor () {
        super()
        this.state = {
            schedules: [],
            users: [],
            classrooms: [],
            generation: {
                startDate: '2020/04/07',
                endDate: '2020/04/14'
            }
        }
        this.setSchedules = this.setSchedules.bind(this)
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/schedule.json') }

    componentDidMount () {
        Fetch.schedule.get(this.props.cookies.get(variables.cookies.token), this.setSchedules)
        Fetch.schedule.user(this.props.cookies.get(variables.cookies.token), data => this.setState({ users: [...data] }))
        Fetch.classroom.getAll(this.props.cookies.get(variables.cookies.token), data => this.setState({ classrooms: [...data] }))
    }

    setSchedules (dataSchedules) {
        this.setState({
            schedules: [...dataSchedules].sort((a, b) => (a.id_user > b.id_user ? 1 : -1))
        })
    }

    buildHeader (lang) {
        const headers = [
            { id: 'nom', label: lang.head.lastName },
            { id: 'prenom', label: lang.head.firstName },
            { id: 'id_classroom', label: lang.head.firstName },
            { id: 'date', label: lang.head.date, align: 'right' },
            { id: 'is_absent', label: lang.head.isAbsent, align: 'center' }
        ]

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

    buildRow (lang, schedule) {
        const dateFormat = new Date(schedule.date)
        const user = this.state.users.filter(x => x._id === schedule.id_user)[0]
        const classroom = this.state.classrooms.filter(x => x._id === schedule.id_classroom)[0]
        return (
            <TableRow hover role='checkbox' className='table-row' tabIndex={-1} key={schedule._id}>
                <TableCell> {user.last_name} </TableCell>
                <TableCell> {user.first_name} </TableCell>
                <TableCell> {classroom && classroom.title} </TableCell>
                <TableCell align='right'> {dateFormat.toLocaleDateString()} </TableCell>
                <TableCell align='center'> {schedule.is_absent ? 'OUI' : 'NON'} </TableCell>
            </TableRow>
        )
    }

    render () {
        const lang = this.getLangFile()
        return (
            <div className='schedule'>
                <div className='generate-container'>
                    <MuiPickersUtilsProvider
                        libInstance={moment} utils={MomentUtils}
                        locale={this.props.lang}
                    >
                        <KeyboardDatePicker
                            margin='normal'
                            id='date-picker-dialog'
                            label='Date picker dialog'
                            format='MM/dd/yyyy'
                            value={new Date()}
                            onChange={null}
                            KeyboardButtonProps={{
                                'aria-label': 'change date'
                            }}
                        />
                        <KeyboardDatePicker
                            margin='normal'
                            id='date-picker-dialog'
                            label='Date picker dialog'
                            format='MM/dd/yyyy'
                            value={new Date()}
                            onChange={null}
                            KeyboardButtonProps={{
                                'aria-label': 'change date'
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div className='search-container'>
                    <TextField
                        size='small' variant='filled'
                        value={this.state.lastNameInput}
                        onChange={event => this.handleSearchInputChange(event, 'lastNameInput')} label={lang.searchLastName}
                    />
                    <TextField
                        size='small' variant='filled'
                        value={this.state.firstNameInput}
                        onChange={event => this.handleSearchInputChange(event, 'firstNameInput')} label={lang.searchFirstName}
                    />
                    <FormControl variant='filled'>
                        <InputLabel color='primary'>par salle</InputLabel>
                        <Select
                            value={this.state.classRoomSelected}
                            onChange={event => this.handleSearchInputChange(event, 'classRoomSelected')}
                        >
                            <MenuItem value=''>
                                <em>Toutes les salles</em>
                            </MenuItem>
                            {this.state.classrooms.map(classRoom => (
                                <MenuItem key={classRoom._id} value={classRoom.title}>{classRoom.title}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <TableContainer className='list-container table-list'>
                    <Table stickyHeader aria-label='sticky table'>
                        {this.buildHeader(lang)}
                        {(this.state.schedules.length > 0 && this.state.users.length > 0 && this.state.classrooms.length > 0) && (
                            <TableBody>{this.state.schedules.map(schedule => this.buildRow(lang, schedule))}</TableBody>
                        )}
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default withCookies(Schedule)
