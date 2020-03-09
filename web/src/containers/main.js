import React, { Component } from 'react'
import Login from './login'
import Dashbord from './dashbord-container'

class Main extends Component {
    constructor () {
        super()
        this.state = {}
    }

    componentDidMount () {}

    render () {
        const isConnected = this.props.isConnected
        const lang = this.props.lang
        const userType = this.props.userType
        return (
            <main>
                {
                    this.props.isConnected
                        ? <Dashbord lang={lang} isConnected={isConnected} userType={userType} />
                        : <Login lang={lang} handleConnectedEvent={this.props.onhandleLogInClick} />
                }
            </main>
        )
    }
}
export default Main
