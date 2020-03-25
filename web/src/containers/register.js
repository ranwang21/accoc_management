import React, { Component } from 'react'
import InformationCoordonnees from '../components/forms/informations-coordonnees'
import ChildrenForm from '../components/forms/children-form'
import PreviousIcon from '@material-ui/icons/NavigateBeforeRounded'
import NextIcon from '@material-ui/icons/NavigateNextRounded'
import IconButton from '@material-ui/core/IconButton'
import '../styles/_register.scss'

class RegisterContainer extends Component {
    constructor () {
        super()
        this.state = {
            step: 1,
            showPrev: false,
            showNext: true
        }
        this.handleStepClick = this.handleStepClick.bind(this)
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/register.json') }

    handleStepClick () {
        const currentElement = event.target.tagName === 'path' ? event.target.parentElement : event.target
        if (currentElement.id === 'prev') {
            this.setState(state => {
                return {
                    step: state.step > 1 ? --state.step : state.step,
                    showPrev: state.step > 1,
                    showNext: state.step < 4
                }
            })
        } else if (currentElement.id === 'next') {
            this.setState(state => {
                return {
                    step: state.step < 4 ? ++state.step : state.step,
                    showPrev: state.step > 1,
                    showNext: state.step < 4
                }
            })
        }
    }

    render () {
        const lang = this.getLangFile()
        return (
            <div className='register-container'>
                <div onClick={this.props.onShowLoginForm}>{lang.back}</div>
                <div className='form-container'>
                    <IconButton className={!this.state.showPrev ? 'disable-level-button' : ''} onClick={this.handleStepClick} aria-label='delete'>
                        <PreviousIcon id='prev' fontSize='large' />
                    </IconButton>
                    <div className='forms'>
                        <div>
                            {this.state.step === 1 && (<InformationCoordonnees lang={this.props.lang} />)}
                            {this.state.step === 2 && (<ChildrenForm lang={this.props.lang} />)}
                            {this.state.step === 3 && (<div>FORMULAIRE 3</div>)}
                            {this.state.step === 4 && (<div>FORMULAIRE 4</div>)}
                        </div>
                    </div>
                    <IconButton className={!this.state.showNext ? 'disable-level-button' : ''} onClick={this.handleStepClick} aria-label='delete'>
                        <NextIcon id='next' fontSize='large' />
                    </IconButton>
                </div>
            </div>
        )
    }
}

export default RegisterContainer
