import React, { Component } from 'react'
import Login from './login'
import Dashbord from './dashbord'

class Main extends Component {
    render () {
        const ojj = true
        return (
            <main>
                {ojj
                    ? <Login lang={this.props.lang} handleConnectedEvent={this.props.onhandleLogInClick} />
                    : <Dashbord lang={this.props.lang} handleLogOutEvent={this.props.onhandleLogOutClick} />}
            </main>
        )
    }
}
export default Main
