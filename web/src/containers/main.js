/* eslint-disable react/jsx-closing-bracket-location */
import React, { Component } from 'react'
import Cookie from 'react-cookies'
import Login from './login'
import Dashbord from './dashbord'

class Main extends Component {
    render () {
        const token = Cookie.load('token')
        return (
            <main>
                {token
                    ? <Dashbord lang={this.props.lang} handleLogOutEvent={this.props.onhandleLogOutClick} />
                    : <Login lang={this.props.lang} handleConnectedEvent={this.props.onhandleLogInClick} />}
            </main>
        )
    }
}
export default Main
