import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse'
import TextField from '@material-ui/core/TextField'
import '../styles/_create-account.scss'

class CreateAccount extends Component {
    constructor () {
        super()
        this.state = {
            actorSelected: null,
            addClick: true,
            showAddButton: true
        }
        this.divBtnAdd = React.createRef()
        this.handleActorSelected = this.handleActorSelected.bind(this)
    }

    handleActorSelected (event, id) {
        this.setState({ actorSelected: id })
        this.divBtnAdd.current.classList.add('hideDiv')
        setTimeout(() => {
            this.setState({ showAddButton: false })
        }, 2000)
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/create-account.json') }

    buildButton (actor) {
        const role = this.props.currentUser.role
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
                {this.state.showAddButton && (
                    <div className='choice' ref={this.divBtnAdd}>
                        {lang.actors.map(actor => this.buildButton(actor))}
                    </div>
                )}
                <div className='add-container'>
                    <Collapse className='search-fields' in={this.state.addClick}>
                        <TextField
                            size='medium' variant='outlined' id='lastName'
                            label='ghfghj'
                        />
                        <TextField
                            size='medium' id='firstName' variant='outlined'
                            label='ghfghj'
                        />
                    </Collapse>
                </div>
            </div>
        )
    }
}

export default CreateAccount
