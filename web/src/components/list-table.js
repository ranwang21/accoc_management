import React, { Component } from 'react'
import {
    TableContainer, Table, TableHead, TableBody, TableRow, TableCell,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Button, Avatar
} from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import IsValidIcon from '@material-ui/icons/CheckTwoTone'
import IsNotValidIcon from '@material-ui/icons/CloseTwoTone'
import InfoIcon from '@material-ui/icons/InfoOutlined'
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

    getValidationValue (actor) { return actor._id + ',' + Boolean(actor.isValid) }

    buildHeader (lang) {
        const headers = [
            { id: 'avatar', label: lang.head.avatar, minWidth: 50, maxWidth: 50, align: 'center' },
            { id: 'nom', label: lang.head.lastName, minWidth: 170 },
            { id: 'prenom', label: lang.head.firstName, minWidth: 170 }
        ]
        this.props.actorSelected === variables.role.child && headers.push({ id: 'allergies', label: lang.head.allergies, minWidth: 170 })
        this.props.actorSelected === variables.role.child && headers.push({ id: 'salle', label: lang.head.classRoom, minWidth: 170 })
        this.props.menuSelected === variables.menus.validation && headers.push({ id: 'validation', label: lang.head.optionValidation, minWidth: 70, align: 'right' })

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

    buildRow (lang, actor) {
        const classRoomTitle = this.props.classRooms.filter(cl => cl._id === actor.id_classroom)
        let allergies = actor.medical_info[2] ? actor.medical_info[2].response : "Pas d'allergies"
        allergies = allergies.length > 20 ? (allergies.substring(0, 17) + '...') : allergies
        return (
            <TableRow onClick={(even) => this.handleShowDetail(even, actor._id)} hover role='checkbox' className='table-row' tabIndex={-1} key={actor._id}>
                <TableCell> <Avatar alt='Avatar' src={actor.img} /> </TableCell>
                <TableCell> {actor.last_name} </TableCell>
                <TableCell> {actor.first_name} </TableCell>
                {this.props.actorSelected === variables.role.child && (
                    <>
                        <TableCell> {allergies} </TableCell>
                        <TableCell> {classRoomTitle[0].title} </TableCell>
                    </>
                )}
                {this.props.menuSelected === variables.menus.validation && (
                    <TableCell align='right'>
                        <ToggleButtonGroup
                            size='small'
                            value={this.getValidationValue(actor)}
                            exclusive
                            onChange={this.props.handleValidationChange}
                            aria-label='text alignment'
                        >
                            <ToggleButton className='isValid' value={actor._id + ',' + true} aria-label='left'>
                                <IsValidIcon color='primary' />
                            </ToggleButton>
                            <ToggleButton className='isNotValid' value={actor._id + ',' + false} aria-label='right'>
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
                            maxWidth='sm'
                        >
                            <DialogTitle className='title'>{this.state.userSelected.last_name + ' ' + this.state.userSelected.first_name}</DialogTitle>
                            <DialogContent>
                                <DetailUser lang={this.props.lang} userSelected={this.state.userSelected} onChangeImage={this.props.onChangeImage} />
                            </DialogContent>
                            <DialogActions>
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
