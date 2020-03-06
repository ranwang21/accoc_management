import React, { Component } from 'react'
import logo from '../pictures/logo.png'

class Header extends Component {
    render () {
        const isConnected = this.props.isConnected
        return (
            <header>
                <h1>HEADER</h1>
                <img src={logo} />
                <p> Connected: {isConnected ? 'true' : 'false'} </p>
                <p> Process.Env: {process.env.NODE_ENV} </p>
            </header>
        )
    }
}

export default Header
