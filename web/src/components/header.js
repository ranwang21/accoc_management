import React, { Component } from 'react'

class Header extends Component {
    render () {
        const isConnected = this.props.isConnected
        return (
            <header>
                <h1>HEADER</h1>
                <p> Connected: {isConnected} </p>
            </header>
        )
    }
}

export default Header
