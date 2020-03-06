import React, { Component } from 'react'

class Main extends Component {
    constructor () {
        super()
        this.state = {}
    }

    componentDidMount () {}

    render () {
        const isConnected = this.props.isConnected
        return (
            <main>
                <h1>MAIN</h1>
                <p> Connected: {isConnected ? 'true' : 'false'} </p>
            </main>
        )
    }
}
export default Main
