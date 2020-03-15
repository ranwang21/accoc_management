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

const variables = require('../utilities/variables.json')

const actors = [
    { idUser: 'dfvdfvg0', roleLabel: 'high_admin', firstName: 'admin', lastName: 'ADMINISTRATEUR', isValid: true },

    { idUser: 'dfvdfvggt1', roleLabel: 'admin', firstName: 'admin1', lastName: 'ADMINISTRATEUR1', isValid: true },
    { idUser: 'dfvdfvggt2', roleLabel: 'admin', firstName: 'admin2', lastName: 'ADMINISTRATEUR2', isValid: true },
    { idUser: 'dfvdfvggt3', roleLabel: 'admin', firstName: 'admin3', lastName: 'ADMINISTRATEUR3', isValid: true },

    { idUser: 'dfvdfvg1', roleLabel: 'only_parent', firstName: 'parent_1', lastName: 'P_NAME_1', isValid: true },
    { idUser: 'dfvdfvg2', roleLabel: 'only_parent', firstName: 'parent_2', lastName: 'P_NAME_2', isValid: false },
    { idUser: 'dfvdfvg3', roleLabel: 'only_parent', firstName: 'parent_3', lastName: 'P_NAME_3', isValid: true },
    { idUser: 'dfvdfvg4', roleLabel: 'only_parent', firstName: 'parent_4', lastName: 'P_NAME_4', isValid: false },

    { idUser: 'dfvdfvg5', roleLabel: 'only_collaborator', firstName: 'colaborateur_1', lastName: 'C_NAME_1', isValid: false },
    { idUser: 'dfvdfvg6', roleLabel: 'only_collaborator', firstName: 'colaborateur_2', lastName: 'C_NAME_1', isValid: true },
    { idUser: 'dfvdfvg7', roleLabel: 'only_collaborator', firstName: 'colaborateur_3', lastName: 'C_NAME_1', isValid: false },
    { idUser: 'dfvdfvg8', roleLabel: 'only_collaborator', firstName: 'colaborateur_4', lastName: 'C_NAME_1', isValid: true },

    { idUser: 'dfvdfvg9', roleLabel: 'both', firstName: 'both_1', lastName: 'B_NAME_1', isValid: true },
    { idUser: 'dfvdfvg10', roleLabel: 'both', firstName: 'both_2', lastName: 'B_NAME_2', isValid: false },
    { idUser: 'dfvdfvg11', roleLabel: 'both', firstName: 'both_3', lastName: 'B_NAME_3', isValid: true },
    { idUser: 'dfvdfvg12', roleLabel: 'both', firstName: 'both_4', lastName: 'B_NAME_4', isValid: false },

    { idUser: 'dfvdfvg13', roleLabel: 'child', firstName: 'children_10', lastName: 'C_NAME_10', isValid: true },
    { idUser: 'dfvdfvg14', roleLabel: 'child', firstName: 'children_1', lastName: 'C_NAME_1', isValid: true },
    { idUser: 'dfvdfvg15', roleLabel: 'child', firstName: 'children_2', lastName: 'C_NAME_2', isValid: true },
    { idUser: 'dfvdfvg16', roleLabel: 'child', firstName: 'children_3', lastName: 'C_NAME_3', isValid: true },
    { idUser: 'dfvdfvg17', roleLabel: 'child', firstName: 'children_4', lastName: 'C_NAME_4', isValid: true },
    { idUser: 'dfvdfvg18', roleLabel: 'child', firstName: 'children_5', lastName: 'C_NAME_5', isValid: true },
    { idUser: 'dfvdfvg19', roleLabel: 'child', firstName: 'children_6', lastName: 'C_NAME_6', isValid: true },
    { idUser: 'dfvdfvg20', roleLabel: 'child', firstName: 'children_7', lastName: 'C_NAME_7', isValid: true },
    { idUser: 'dfvdfvg21', roleLabel: 'child', firstName: 'children_8', lastName: 'C_NAME_8', isValid: true },
    { idUser: 'dfvdfvg22', roleLabel: 'child', firstName: 'children_9', lastName: 'C_NAME_9', isValid: true }
]
const isChild = ({ roleLabel }) => roleLabel === 'child'
const isParent = ({ roleLabel, isValid }) => ((roleLabel === 'only_parent' || roleLabel === 'both') && isValid === true)
const isCollaborator = ({ roleLabel, isValid }) => ((roleLabel === 'only_collaborator' || roleLabel === 'both') && isValid === true)
const isBoth = ({ roleLabel, isValid }) => ((roleLabel === 'only_parent' || roleLabel === 'only_collaborator' || roleLabel === 'both') && isValid === false)
const isAdmin = ({ roleLabel }) => (roleLabel === 'admin')

function getRoleFunction (role, menuSelected) {
    if (menuSelected === variables.menus.validation) {
        return isBoth
    } else {
        switch (role) {
        case 'child':
            return isChild
        case 'only_parent':
            return isParent
        case 'only_collaborator':
            return isCollaborator
        case 'admin':
            return isAdmin
        }
    }
}

class TableListContainer extends Component {
    constructor () {
        super()
        this.state = {
            actors: null,
            actorsToShow: null
        }
        this.handleHeadClick = this.handleHeadClick.bind(this)
    }

    getLangFile () {
        return require('../lang/' + this.props.lang + '/list-table.json')
    }

    componentDidMount () {
        this.setState({
            actors: [...actors],
            showDetail: false
        })
        this.handleValidationChange = this.handleValidationChange.bind(this)
        this.handleShowDetail = this.handleShowDetail.bind(this)
        this.handleCloseDetail = this.handleCloseDetail.bind(this)
    }

    handleValidationChange (event, newValue) {
        if (newValue !== null) {
            const values = newValue.split(',')
            this.setState(state => {
                const list = state.actors
                const index = list.map(e => e.idUser).indexOf(values[0])
                list[index].isValid = !(list[index].isValid)
                return {
                    list
                }
            })
        }
    }

    handleShowDetail () {
        this.setState({
            showDetail: true
        })
    };

    handleCloseDetail () {
        this.setState({
            showDetail: false
        })
    }

    getValidationValue (actor) {
        return actor.idUser + ',' + Boolean(actor.isValid)
    }

    handleHeadClick () {
        console.log(event.target.textContent)
    }

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
                            onClick={this.handleHeadClick}

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

    buildRow (actor) {
        return (
            <TableRow hover role='checkbox' tabIndex={-1} key={actor.idUser}>
                <TableCell> {actor.roleLabel} </TableCell>
                <TableCell> {actor.firstName} </TableCell>
                <TableCell> {actor.lastName} </TableCell>
                <TableCell>
                    <Button
                        variant='outlined'
                        startIcon={<InfoIcon />}
                        onClick={this.handleShowDetail}
                    >
                        Voir details
                    </Button>
                </TableCell>
                {this.props.menuSelected === variables.menus.validation && (
                    <TableCell align='right'>
                        <ToggleButtonGroup
                            size='small'
                            value={this.getValidationValue(actor)}
                            exclusive
                            onChange={this.handleValidationChange}
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

    buildBody (allActors) {
        return (<TableBody>{allActors.map(actor => this.buildRow(actor))}</TableBody>)
    }

    getActorSelected () {
        let actorSelected = ''
        switch (this.props.actorSelected) {
        case variables.actors.children:
            actorSelected = 'child'
            break
        case variables.actors.parent:
            actorSelected = 'only_parent'
            break
        case variables.actors.collaborator:
            actorSelected = 'only_collaborator'
            break
        case variables.actors.admin:
            actorSelected = 'admin'
            break
        }
        return actorSelected
    }

    updateNewActorsList () {
        const isRole = getRoleFunction(this.getActorSelected(), this.props.menuSelected)
        return this.state.actors !== null ? this.state.actors.filter(isRole) : null
    }

    render () {
        const lang = this.getLangFile()
        const allActors = this.updateNewActorsList()
        return (allActors !== null
            ? (
                <TableContainer className='table-list'>
                    <Table stickyHeader aria-label='sticky table'>
                        {this.buildHeader(lang)}
                        {this.buildBody(allActors)}
                    </Table>
                    <Dialog
                        open={this.state.showDetail}
                        onClose={this.handleCloseDetail}
                        scroll='paper'
                        aria-labelledby='scroll-dialog-title'
                        aria-describedby='scroll-dialog-description'
                        maxWidth='sm'
                    >
                        <DialogTitle id='scroll-dialog-title'>Subscribe</DialogTitle>
                        <DialogContent>
                            <DialogContentText
                                id='scroll-dialog-description'
                                tabIndex={-1}
                            >
                                {[...new Array(50)]
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
