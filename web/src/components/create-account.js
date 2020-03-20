import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import Fetch from '../utilities/fetch-datas'
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
        this.divBtnAdd = React.createRef()
        this.handleActorSelected = this.handleActorSelected.bind(this)
        this.handleRetour = this.handleRetour.bind(this)
    }

    componentDidMount () {
        this.divBtnAdd.current.classList.add('show')
    }

    getCurrentUser () {
        const currentUser = this.props.cookies.get(variables.cookies.user)
        return Fetch.decodeData(currentUser)
    }

    handleActorSelected (event, id) {
        this.setState({ actorSelected: id })
        this.divBtnAdd.current.classList.remove('showDiv')
        this.divBtnAdd.current.classList.add('hideDiv')
        setTimeout(() => {
            this.divBtnAdd.current.classList.remove('show')
        }, 2000)
    }

    handleRetour () {
        this.divBtnAdd.current.classList.remove('hideDiv')
        this.divBtnAdd.current.classList.add('showDiv')
        /* this.setState({ showAddButton: true })
        setTimeout(() => {
            this.setState({ showAddContainer: false })
        }, 2000)
        */
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/create-account.json') }

    buildButton (actor) {
        const role = this.getCurrentUser().role
        if (!(role === 'admin' && actor.title === 'admin')) {
            return (
                <div key={actor.id}>
                    <Button onClick={event => this.handleActorSelected(event, actor.id)}>{actor.label}</Button>
                </div>
            )
        }
    }

    render () {
        const lang = this.getLangFile()
        return (
            <div className='create-account'>
                <div className='choice' ref={this.divBtnAdd}>
                    {lang.actors.map(actor => this.buildButton(actor))}
                </div>
                {this.state.showAddContainer && (
                    <div className='add-container'>
                        <Button className='collapse' variant='contained' onClick={this.handleRetour}>Retour</Button>
                        <div className=''>FORM CONTENT: {this.state.actorSelected}</div>
                    </div>
                )}
            </div>
        )
    }
}

export default withCookies(CreateAccount)
