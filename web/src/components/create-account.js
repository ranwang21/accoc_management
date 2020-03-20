import React, { Component } from 'react'
import Fetch from '../utilities/fetch-datas'
import FormCollaborator from './form-inscription-collaborator'
import { withCookies } from 'react-cookie'
import '../styles/_create-account.scss'

const variables = require('../utilities/variables').variables

class CreateAccount extends Component {
    constructor () {
        super()
        this.state = {
            actorSelected: null,
            addClick: true,
            showAddButton: true,
            showAddContainer: true
        }
        this.addDiv = React.createRef()
        this.handleActorSelected = this.handleActorSelected.bind(this)
        this.handleRetour = this.handleRetour.bind(this)
    }

    componentDidMount () {
    }

    getCurrentUser () {
        const currentUser = this.props.cookies.get(variables.cookies.user)
        return Fetch.decodeData(currentUser)
    }

    handleActorSelected (event, id) {
        this.setState({ actorSelected: id })
        this.addDiv.current.classList.remove('showAddDiv')
        this.addDiv.current.classList.add('hideAddDiv')
        const parentDiv = this.addDiv.current.parentElement
        parentDiv.classList.add('fullSize')
    }

    handleRetour () {
        this.addDiv.current.classList.remove('hideAddDiv')
        this.addDiv.current.classList.add('showAddDiv')
        const parentDiv = this.addDiv.current.parentElement
        parentDiv.classList.remove('fullSize')
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/create-account.json') }

    buildButton (lang, actor) {
        return (
            <div key={actor.id} onClick={event => this.handleActorSelected(event, actor.id)}>
                <div />
                <div>
                    <p>{actor.label}</p>
                    {actor.label.includes('parent') && (
                        <span>{lang.required}</span>
                    )}
                </div>
            </div>
        )
    }

    getAddList (lang) {
        const list = lang.actorsDefault
        const role = this.getCurrentUser().role
        role === variables.role.highAdmin && list.length === 3 && list.push(lang.addAdmin)
        return list
    }

    switchToAddOption () {
        switch (this.state.actorSelected) {
        case variables.actors.collaborator:
            return (<FormCollaborator lang={this.props.lang} />)
        }
    }

    render () {
        const lang = this.getLangFile()
        return (
            <div className='create-account'>
                <div className='showAddDiv' ref={this.addDiv}>
                    <div className='choice'>
                        {this.getAddList(lang).map(actor => this.buildButton(lang, actor))}
                    </div>
                    {this.state.showAddContainer && (
                        <div className='add-container'>
                            <div className='retour' onClick={this.handleRetour} />
                            {this.switchToAddOption()}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default withCookies(CreateAccount)
