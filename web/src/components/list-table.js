import React, { Component } from 'react'
import {
    TableContainer, Table, TableHead, TableBody, TableRow, TableCell,
    Dialog, DialogActions, DialogContent, Button, Avatar, DialogTitle
} from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import IsValidIcon from '@material-ui/icons/CheckTwoTone'
import IsNotValidIcon from '@material-ui/icons/CloseTwoTone'
import DetailUser from './detail-user'
import { withCookies } from 'react-cookie'

import Loading from './loading'
import '../styles/_list-table.scss'

const variables = require('../utilities/variables').variables

class TableListContainer extends Component {
    constructor () {
        super()
        this.state = {
            showDetail: false,
            userSelected: null
        }
        this.handleShowDetail = this.handleShowDetail.bind(this)
        this.handleCloseDetail = this.handleCloseDetail.bind(this)
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/list-table.json') }

    componentDidMount () {
    }

    handleShowDetail (event, id) {
        const user = this.props.allActors.filter(actor => actor._id === id)
        this.setState({
            showDetail: true,
            userSelected: user && user[0]
        })
    }

    handleCloseDetail () { this.setState({ showDetail: false }) }

    getValidationValue (actor) { return actor._id + ',' + Boolean(actor.isValid) + ',' + actor.roleTitle }

    buildHeader (lang) {
        const headers = [
            { id: 'avatar', label: lang.head.avatar, minWidth: 50, maxWidth: 50, align: 'center' },
            { id: 'nom', label: lang.head.lastName, minWidth: 170 },
            { id: 'prenom', label: lang.head.firstName, minWidth: 170 }
        ]
        if (this.props.actorSelected === variables.role.child) {
            headers.push({ id: 'allergies', label: lang.head.allergies, minWidth: 170 })
            headers.push({ id: 'ecole', label: lang.head.school, minWidth: 170 })
            headers.push({ id: 'salle', label: lang.head.classRoom, minWidth: 170 })
        }

        if (this.props.actorSelected !== variables.role.child) {
            headers.push({ id: 'salle', label: lang.head.classRoom, minWidth: 170 })
            headers.push({ id: 'phone', label: lang.head.phone, minWidth: 170 })
            headers.push({ id: 'courriel', label: lang.head.courriel, minWidth: 170 })
        }

        if (this.props.menuSelected === variables.menus.validation || this.props.actorSelected === variables.role.admin) {
            headers.push({ id: 'validation', label: lang.head.optionValidation, minWidth: 70, align: 'right' })
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

    getPhoneNumberByPriority (actor) {
        if (this.props.actorSelected !== variables.role.child) {
            const personal = (actor.contact.filter(ct => ct.title === 'personal'))[0]
            const work = (actor.contact.filter(ct => ct.title === 'work'))[0]
            const home = (actor.contact.filter(ct => ct.title === 'home'))[0]
            const emergency = (actor.contact.filter(ct => ct.title === 'emergency'))[0]

            return personal && personal.phone !== null
                ? personal.phone
                : (work && work.phone !== null
                    ? work.phone
                    : (home && home.phone !== null
                        ? home.phone
                        : (emergency && emergency.phone !== null
                            ? emergency.phone
                            : 'Pas de contact')))
        }
    }

    getChildAllergies (child) {
        let allergies = (child.medical_info[2] && child.medical_info[2].response !== '') ? child.medical_info[2].response : "Pas d'allergies"
        allergies = allergies.length > 20 ? (allergies.substring(0, 17) + '...') : allergies

        return allergies
    }

    getSchoolName (child) {
        return child.school_info[0] ? child.school_info[0].response : ''
    }

    buildRow (lang, actor) {
        const classRoomTitle = this.props.classRooms.filter(cl => cl._id === actor.id_classroom)
        const allergies = this.getChildAllergies(actor)
        const school = this.getSchoolName(actor)
        const getPhoneNumber = this.getPhoneNumberByPriority(actor)

        return (
            <TableRow hover role='checkbox' className='table-row' tabIndex={-1} key={actor._id}>
                <TableCell onClick={(even) => this.handleShowDetail(even, actor._id)}> <Avatar alt='Avatar' src={actor.img} /> </TableCell>
                <TableCell onClick={(even) => this.handleShowDetail(even, actor._id)}> {actor.last_name} </TableCell>
                <TableCell onClick={(even) => this.handleShowDetail(even, actor._id)}> {actor.first_name} </TableCell>
                {this.props.actorSelected === variables.role.child && (
                    <>
                        <TableCell onClick={(even) => this.handleShowDetail(even, actor._id)}> {allergies} </TableCell>
                        <TableCell onClick={(even) => this.handleShowDetail(even, actor._id)}> {school} </TableCell>
                        <TableCell onClick={(even) => this.handleShowDetail(even, actor._id)}> {classRoomTitle[0].title} </TableCell>
                    </>
                )}
                {this.props.actorSelected !== variables.role.child && (
                    <>
                        <TableCell onClick={(even) => this.handleShowDetail(even, actor._id)}> {classRoomTitle[0].title} </TableCell>
                        <TableCell onClick={(even) => this.handleShowDetail(even, actor._id)}> {getPhoneNumber} </TableCell>
                        <TableCell onClick={(even) => this.handleShowDetail(even, actor._id)}> {actor.email} </TableCell>
                    </>
                )}
                {(this.props.menuSelected === variables.menus.validation || this.props.actorSelected === variables.role.admin) && (
                    <TableCell align='right' className='td-validation'>
                        <ToggleButtonGroup
                            size='small'
                            value={this.getValidationValue(actor)}
                            exclusive
                            onChange={this.props.handleValidationChange}
                            aria-label='text alignment'
                        >
                            <ToggleButton className='isValid' value={actor._id + ',' + true + ',' + actor.roleTitle} aria-label='left'>
                                <IsValidIcon color='primary' />
                            </ToggleButton>
                            <ToggleButton className='isNotValid' value={actor._id + ',' + false + ',' + actor.roleTitle} aria-label='right'>
                                <IsNotValidIcon color='error' />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </TableCell>
                )}
            </TableRow>
        )
    }

    buildBody (lang, allActors) {
        return (<TableBody>{allActors.map(actor => this.buildRow(lang, actor))}</TableBody>)
    }

    render () {
        const lang = this.getLangFile()
        const allActors = this.props.allActors
        return (allActors !== null
            ? (
                <TableContainer className='table-list'>
                    <Table stickyHeader aria-label='sticky table'>
                        {this.buildHeader(lang)}
                        {this.buildBody(lang, allActors)}
                    </Table>
                    {this.state.userSelected !== null && (
                        <Dialog
                            className='dialog'
                            open={this.state.showDetail}
                            onClose={this.handleCloseDetail}
                            scroll='paper'
                            aria-labelledby='scroll-dialog-title'
                            aria-describedby='scroll-dialog-description'
                            maxWidth='lg'
                            fullWidth
                        >
                            <DialogTitle id='scroll-dialog-title' className='title'>DETAILS</DialogTitle>
                            <DialogContent>
                                <DetailUser lang={this.props.lang} userSelected={this.state.userSelected} menuSelected={this.props.menuSelected} onChangeImage={this.props.onChangeImage} />
                            </DialogContent>
                            <DialogActions className='dialog-footer'>
                                <Button onClick={this.handleCloseDetail} color='primary'>
                                    Cancel
                                </Button>
                                <Button onClick={this.handleCloseDetail} color='primary'>
                                    Subscribe
                                </Button>
                            </DialogActions>
                        </Dialog>
                    )}
                </TableContainer>)
            : (
                <div className='table-loading'>
                    <Loading lang={this.props.lang} />
                </div>
            )
        )
    }
}

export default withCookies(TableListContainer)
