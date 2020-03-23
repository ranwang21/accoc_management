import React, { Component } from 'react'
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core/'
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import '../styles/_register-start.scss'
const checkId = require('../utilities/variables').variables.id.registerStart.check

class registerStart extends Component {
    constructor () {
        super()
        this.state = {
            isParent: false,
            isCollaborator: false,
            isBoth: false
        }
        this.handleCheck = this.handleCheck.bind(this)
    }

    getLangFile () {
        return require('../lang/' + this.props.lang + '/register-start.json')
    }

    handleCheck () {
        switch (event.target.id) {
        case checkId.parent:
            this.setState(state => {
                return {
                    isParent: !state.isParent,
                    isBoth: !!((!state.isParent && state.isCollaborator))
                }
            })
            break
        case checkId.collaborator:
            this.setState(state => {
                return {
                    isCollaborator: !state.isCollaborator,
                    isBoth: !!((!state.isCollaborator && state.isParent))
                }
            })
            break
        case checkId.both:
            this.setState(state => {
                return {
                    isParent: !state.isBoth,
                    isCollaborator: !state.isBoth,
                    isBoth: !state.isBoth
                }
            })
            break
        }
    }

    render () {
        const lang = this.getLangFile()
        return (
            <div className='sign-up'>
                <form noValidate autoComplete='off'>
                    <h2>{lang.titlePrimary}</h2>
                    <div className='fields'>
                        <span>{lang.titleSecondary}</span>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id={checkId.parent}
                                        checked={this.state.isParent}
                                        onChange={this.handleCheck}
                                        icon={<CheckBoxOutlineBlankRoundedIcon />}
                                        checkedIcon={<VerifiedUserRoundedIcon />}
                                    />
                                }
                                label={lang.check.parent}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id={checkId.collaborator}
                                        checked={this.state.isCollaborator}
                                        onChange={this.handleCheck}
                                        icon={<CheckBoxOutlineBlankRoundedIcon />}
                                        checkedIcon={<VerifiedUserRoundedIcon />}
                                    />
                                }
                                label={lang.check.collaborator}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id={checkId.both}
                                        checked={this.state.isBoth}
                                        onChange={this.handleCheck}
                                        icon={<CheckBoxOutlineBlankRoundedIcon />}
                                        checkedIcon={<VerifiedUserRoundedIcon />}
                                    />
                                }
                                label={lang.check.both}
                            />
                        </FormGroup>
                        {(this.state.isParent || this.state.isCollaborator) && (
                            <div
                                onClick={this.props.onShowRegisterForm}
                                className='next-step'
                            >
                                <p>NEXT</p>
                                <div />
                            </div>
                        )}
                    </div>
                </form>
            </div>
        )
    }
}

export default registerStart
