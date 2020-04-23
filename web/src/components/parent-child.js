import React, { Component } from 'react'
import Fetch from '../utilities/fetch-datas'
import { withCookies } from 'react-cookie'
import '../styles/_parent-child.scss'
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Divider, ExpansionPanelActions, Button, TextareaAutosize } from '@material-ui/core'
import EditIcon from '@material-ui/icons/EditOutlined'
const variables = require('../utilities/variables').variables

class ParentChild extends Component {
    constructor () {
        super()
        this.state = {
            childList: [],
            childSelected: null,
            expanded: null
        }
        this._isMounted = false
        this.setChildList = this.setChildList.bind(this)
        this.handleEditChild = this.handleEditChild.bind(this)
        this.handleEditChange = this.handleEditChange.bind(this)
        this.childEdited = this.childEdited.bind(this)
    }

    setChildList (datas) {
        if (this._isMounted) {
            const idParent = this.getCurrentUser()._id
            const newChildList = []
            datas.map(x => { x.id_parent.map(y => { y === idParent && newChildList.push(x) }) })
            this.setState({ childList: newChildList.sort((a, b) => (a.last_name.toUpperCase() > b.last_name.toUpperCase() ? 1 : -1)) })
        }
    }

    fetchChild () {
        Fetch.user.children(this.props.cookies.get(variables.cookies.token), this.setChildList)
    }

    componentDidMount () {
        this._isMounted = true
        this.fetchChild()
        this.setState({ childSelected: null })
    }

    componentWillUnmount () {
        this._isMounted = false
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/parent-child.json') }

    getCurrentUser () {
        const currentUser = this.props.cookies.get(variables.cookies.user)
        return Fetch.decodeData(currentUser)
    }

    handleEditChild () {
        this.state.childSelected !== null && Fetch.user.update(this.props.cookies.get(variables.cookies.token), this.state.childSelected, this.childEdited)
    }

    childEdited (data) {
        if (data.success) {
            this.fetchChild()
        }
    }

    handleChange (event, newChild) {
        this.setState({ childSelected: newChild })
    }

    handleEditChange (event, newValue, name) {
        this.setState(state => {
            const childSelected = state.childSelected
            childSelected.medical_info[0][name] = newValue !== '' ? newValue : null
            return {
                childSelected: childSelected
            }
        })
    }

    buildChildList (lang, child) {
        const childSelected = this.state.childSelected
        return (
            <ExpansionPanel
                className='childs'
                TransitionProps={{ unmountOnExit: true }}
                key={child._id}
                expanded={childSelected !== null && childSelected._id === child._id}
                onChange={event => this.handleChange(event, child)}
            >
                <ExpansionPanelSummary className='head' aria-controls='panel1d-content'>
                    <Typography>{child.last_name + ' ' + child.first_name}</Typography>
                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelDetails className='details'>
                    <div>
                        <p>{lang.allergieLabel}</p>
                        <TextareaAutosize
                            className='textarea'
                            rowsMin={2}
                            onChange={(event) => this.handleEditChange(event, event.target.value, 'allergies')}
                            value={childSelected !== null && childSelected.medical_info[0].allergies !== null ? childSelected.medical_info[0].allergies : ''}
                        />
                    </div>
                    <div>
                        <p>{lang.drugLabel}</p>
                        <TextareaAutosize
                            className='textarea'
                            rowsMin={2}
                            onChange={(event) => this.handleEditChange(event, event.target.value, 'drugs')}
                            value={childSelected !== null && childSelected.medical_info[0].drugs !== null ? childSelected.medical_info[0].drugs : ''}
                        />
                    </div>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    <Button
                        className='btn-edit'
                        onClick={this.handleEditChild()}
                        variant='contained'
                        color='secondary'
                        startIcon={<EditIcon />}
                    >
                        {lang.btnEdit}
                    </Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        )
    }

    render () {
        const lang = this.getLangFile()
        return (
            <div className='parent-child'>
                {this.state.childList.length > 0 && this.state.childList.map(child => this.buildChildList(lang, child))}
            </div>
        )
    }
}

export default withCookies(ParentChild)
