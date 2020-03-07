import React, { Component } from 'react'
import '../styles/_main.scss'
import Header from '../components/header'
import Main from './main'
import Footer from '../components/footer'

class MainContainer extends Component {
    constructor () {
        super()
        this.state = {
            lang: 'fr',
            isConnected: true
        }
        this.onLangChanged = this.onLangChanged.bind(this)
    }

    componentDidMount () {}
    onLangChanged (event) {
        this.setState({
            lang: event.target.value
        })
    }

    render () {
        const lang = this.state.lang
        return (
            <>
                <Header lang={lang} handleLangChangedClick={this.onLangChanged} isConnected={this.state.isConnected} />
                <Main lang={lang} isConnected={this.state.isConnected} />
                <Footer lang={lang} />
            </>
        )
    }
}
export default MainContainer
