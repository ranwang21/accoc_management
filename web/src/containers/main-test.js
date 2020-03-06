import React, { Component } from 'react'
import Header from '../components/header'
import Main from './main'
import Footer from '../components/footer'

class MainContainer extends Component {
    constructor () {
        super()
        this.state = {
            isConnected: false
        }
    }

    componentDidMount () {}

    render () {
        return (
            <>
                <Header isConnected={this.state.isConnected} />
                <Main isConnected={this.state.isConnected} />
                <Footer />
            </>
        )
    }
}
export default MainContainer
