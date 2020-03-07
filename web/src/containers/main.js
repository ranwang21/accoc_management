import React, { Component } from 'react'
import Login from './login'

class Main extends Component {
    constructor () {
        super()
        this.state = {}
    }

    componentDidMount () {}

    render () {
        // const isConnected = this.props.isConnected
        const lang = this.props.lang
        return (
            <main>
                {!this.props.isConnected && <Login lang={lang} handleConnectedEvent={this.props.onhandleLogInClick} />}
            </main>
        )
    }
}
export default Main
