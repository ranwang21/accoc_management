import React, { Component } from 'react'
import PreviousIcon from '@material-ui/icons/NavigateBeforeRounded'
import NextIcon from '@material-ui/icons/NavigateNextRounded'
import '../styles/_register-container.scss'

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

    handleStepClick () {
        if (event.target.id === 'prev') {
            this.setState(state => {
                return {
                    step: state.step > 1 ? --state.step : state.step,
                    showPrev: state.step > 1,
                    showNext: state.step < 4
                }
            })
        } else {
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
        return (
            <div className='register-container'>
                <div onClick={this.props.onShowLoginForm} />
                <div className='form-container'>
                    <h2>FORMULAIRE D'INSCRIPTION</h2>
                    <PreviousIcon id='prev' className={!this.state.showPrev ? 'disable-svg' : ''} onClick={this.handleStepClick} />
                    <div className='forms'>
                        <div>
                            {this.state.step === 1 && (<div>FORMULAIRE 1</div>)}
                            {this.state.step === 2 && (<div>FORMULAIRE 2</div>)}
                            {this.state.step === 3 && (<div>FORMULAIRE 3</div>)}
                            {this.state.step === 4 && (<div>FORMULAIRE 4</div>)}
                        </div>
                    </div>
                    <NextIcon id='next' className={!this.state.showNext ? 'disable-svg' : ''} onClick={this.handleStepClick} />
                </div>
            </div>
        )
    }
}

export default RegisterContainer
