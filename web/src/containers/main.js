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
                <h1>{lang}</h1>
                <Login lang={lang} />
            </main>
        )
    }
}
export default Main
