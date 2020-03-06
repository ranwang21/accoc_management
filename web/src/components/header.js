import React, { Component } from 'react'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import LogOutIcon from '@material-ui/icons/PowerSettingsNewOutlined'

class Header extends Component {
    render () {
        const isConnected = this.props.isConnected
        return (
            <AppBar position='static'>
                <Toolbar>
                    <IconButton className='logout' />
                    {isConnected && (
                        <IconButton className='logout'>
                            <p className='text'>Log Out</p>
                            <LogOutIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

export default Header
