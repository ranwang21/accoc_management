/* eslint-disable react/jsx-closing-bracket-location */
import React, { Component } from 'react'
import Login from './login'
import Dashbord from './dashbord'

class Main extends Component {
    constructor () {
        super()
        this.state = {}
    }

    componentDidMount () {}

    render () {
        return (
            <main>
                {
                    this.props.isConnected
                        ? <Dashbord
                            lang={this.props.lang}
                            isConnected={this.props.isConnected}
                            userRole={this.props.userRole}
                            handleLogOutEvent={this.props.onhandleLogOutClick}
                        />
                        : <Login
                            lang={this.props.lang}
                            handleConnectedEvent={this.props.onhandleLogInClick}
                        />
                }
            </main>
        )
    }
}
export default Main
