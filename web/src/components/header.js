import React, { Component } from 'react'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import LogOutIcon from '@material-ui/icons/PowerSettingsNewOutlined'
import LangDropDown from './lang-dropdown'
import '../styles/_header.scss'

class Header extends Component {
    getLangFile () {
        return require('../lang/' + this.props.lang + '/header.json')
    }

    render () {
        const lang = this.props.lang
        const isConnected = this.props.isConnected
        const langFile = this.getLangFile()
        return (
            <AppBar position='static'>
                <Toolbar>
                    <IconButton className='img' />
                    <div className='right-head'>
                        <LangDropDown lang={lang} onValueChanged={this.props.handleLangChangedClick} />
                        {isConnected && (
                            <IconButton className='logout'>
                                <p className='text'>{langFile.logOutText}</p>
                                <LogOutIcon />
                            </IconButton>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Header
