import React, { Component } from 'react'
import logo from '../pictures/logo.png'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import LogOutIcon from '@material-ui/icons/PowerSettingsNewOutlined'

class Header extends Component {
    render () {
        const isConnected = this.props.isConnected
        return (
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' className='' color='inherit' aria-label='menu'>
                        <img className='logo' src={logo} />
                    </IconButton>
                    {isConnected && (
                        <div className='logout'>
                            <IconButton
                                aria-label='account of current user'
                                aria-controls='menu-appbar'
                                aria-haspopup='true'
                                color='inherit'
                            >
                                <p className='text'>Log Out</p>
                                <LogOutIcon />
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

export default Header
