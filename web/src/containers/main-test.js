import React, { Component } from 'react'
import '../styles/_main.scss'
import Header from '../components/header'
import Main from './main'
import Footer from '../components/footer'
import Snack from '../components/snack'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgba(0, 0, 0, 0.8)'
        },
        secondary: {
            main: 'rgb(1, 144, 147)'
        }
    }
})
class MainContainer extends Component {
    constructor () {
        super()
        this.state = {
            lang: 'fr',
            isConnected: false,
            showSnack: false
        }
        this.onLangChanged = this.onLangChanged.bind(this)
        this.onLogInClick = this.onLogInClick.bind(this)
        this.onLogOutClick = this.onLogOutClick.bind(this)
        this.handleCloseSnack = this.handleCloseSnack.bind(this)
    }

    getLangFile () {
        return require('../lang/' + this.state.lang + '/main_container.json')
    }

    onLangChanged (event) {
        this.setState({
            lang: event.target.value
        })
    }

    onLogOutClick (event) {
        console.log('Deconnexion .. .. ..')
        this.setState({
            isConnected: false,
            showSnack: true
        })
    }

    onLogInClick (event) {
        console.log('Connexion .. .. ..')
        this.setState({
            isConnected: true,
            showSnack: true
        })
    }

    handleCloseSnack (event) {
        this.setState({
            showSnack: false
        })
    }

    render () {
        const lang = this.state.lang
        const langFile = this.getLangFile()
        const messageSnack = this.state.isConnected ? langFile.logInSnack : langFile.logOutSnack
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Header lang={lang} handleLangChangedClick={this.onLangChanged} isConnected={this.state.isConnected} onhandleLogOutClick={this.onLogOutClick} />
                    <Main lang={lang} isConnected={this.state.isConnected} onhandleLogInClick={this.onLogInClick} />
                    <Footer lang={lang} />
                    <Snack show={this.state.showSnack} message={messageSnack} onClose={this.handleCloseSnack} severity='success' />
                </ThemeProvider>
            </>
        )
    }
}
export default MainContainer
