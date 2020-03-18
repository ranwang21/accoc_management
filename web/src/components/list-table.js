import React, { Component } from 'react'
import {
    TableContainer, Table, TableHead, TableBody, TableRow, TableCell,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Button
} from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import IsValidIcon from '@material-ui/icons/CheckTwoTone'
import IsNotValidIcon from '@material-ui/icons/CloseTwoTone'
import InfoIcon from '@material-ui/icons/InfoOutlined'

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
        const user = this.props.allActors.filter(actor => actor.idUser === id)
        this.setState({
            showDetail: true,
            userSelected: user && user[0]
        })
    }

    handleCloseDetail () { this.setState({ showDetail: false }) }

    getValidationValue (actor) { return actor.idUser + ',' + Boolean(actor.isValid) }

    buildHeader (lang) {
        const headers = [
            { id: 'role', label: 'ROLE', minWidth: 170 },
            { id: 'nom', label: lang.head.lastName, minWidth: 170 },
            { id: 'prenom', label: lang.head.firstName, minWidth: 170 },
            { id: 'details', label: lang.head.optionDetail, minWidth: 170 }
        ]
        const validHead = { id: 'validation', label: lang.head.optionValidation, minWidth: 70, align: 'right' }
        this.props.menuSelected === variables.menus.validation && headers.push(validHead)

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
        return (
            <TableRow hover role='checkbox' tabIndex={-1} key={actor.idUser}>
                <TableCell> {actor.roleLabel} </TableCell>
                <TableCell> {actor.lastName} </TableCell>
                <TableCell> {actor.firstName} </TableCell>
                <TableCell>
                    <Button
                        variant='outlined'
                        startIcon={<InfoIcon />}
                        onClick={(even) => this.handleShowDetail(even, actor.idUser)}
                    >
                        {lang.body.btnDetail}
                    </Button>
                </TableCell>
                {this.props.menuSelected === variables.menus.validation && (
                    <TableCell align='right'>
                        <ToggleButtonGroup
                            size='small'
                            value={this.getValidationValue(actor)}
                            exclusive
                            onChange={this.props.handleValidationChange}
                            aria-label='text alignment'
                        >
                            <ToggleButton className='isValid' value={actor.idUser + ',' + true} aria-label='left'>
                                <IsValidIcon color='primary' />
                            </ToggleButton>
                            <ToggleButton className='isNotValid' value={actor.idUser + ',' + false} aria-label='right'>
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
                            <DialogTitle className='title'>{this.state.userSelected.lastName + ' ' + this.state.userSelected.firstName}</DialogTitle>
                            <DialogContent>
                                <DialogContentText
                                    id='scroll-dialog-description'
                                    tabIndex={-1}
                                >
                                    {[...new Array(2)]
                                        .map(
                                            () => `Cras mattis consectetur purus sit amet fermentum.
                                                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                                                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
                                        )
                                        .join('\n')}
                                </DialogContentText>
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

export default TableListContainer
