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
        return (
            <main>
                <Login />
            </main>
        )
    }
}
export default Main
