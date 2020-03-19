import React, { Component } from 'react'
import '../styles/_main.scss'
import Header from '../components/header'
import Main from './main'
import Footer from '../components/footer'
import Loading from '../components/loading'
import Snack from '../components/snack'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Fetch from '../utilities/fetch-datas'

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
            showSnack: false,
            showLoading: false,
            currentUser: null
        }
        this.onLangChanged = this.onLangChanged.bind(this)
        this.onLogInClick = this.onLogInClick.bind(this)
        this.onLogOutClick = this.onLogOutClick.bind(this)
        this.handleCloseSnack = this.handleCloseSnack.bind(this)
        this.setCurrentUserInfos = this.setCurrentUserInfos.bind(this)
    }

    componentDidMount () {
        /*
        const token = Cookie.load('token')
        token
            ? console.log('TOKEN: ' + token)
            : console.log('NO TOKEN: ' + token)
            */
    }

    getLangFile () { return require('../lang/' + this.state.lang + '/container.json') }

    onLangChanged (event) { this.setState({ lang: event.target.value }) }

    onLogOutClick () {
        console.log('Deconnexion .. .. ..')
        this.setState({
            isConnected: false,
            showSnack: true,
            currentUser: null
        })
    }

    onLogInClick () {
        this.setState({
            isConnected: true,
            showSnack: true,
            showLoading: true
        })
        // this.showConnectedLoading()
        Fetch.getCurrentUser(this.setCurrentUserInfos)
        console.log('Connexion .. .. ..')
    }

    setCurrentUserInfos (datas, role) {
        const user = {
            id: datas._id,
            firstName: datas.first_name,
            lastName: datas.last_name,
            idRole: datas.id_role,
            role: role
        }
    }

    handleCloseSnack () { this.setState({ showSnack: false }) }

    showConnectedLoading () { setTimeout(() => { this.setState({ showLoading: false }) }, 5000) }

    render () {
        const lang = this.state.lang
        const langFile = this.getLangFile()
        const messageSnack = this.state.isConnected ? langFile.logInSnack : langFile.logOutSnack
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Header lang={lang} handleLangChangedClick={this.onLangChanged} />
                    {this.state.showLoading && <Loading lang={lang} />}
                    <Main lang={lang} onhandleLogInClick={this.onLogInClick} onhandleLogOutClick={this.onLogOutClick} currentUser={this.state.currentUser} />
                    <Footer lang={lang} />
                    <Snack show={this.state.showSnack} message={messageSnack} onClose={this.handleCloseSnack} severity='success' />
                </ThemeProvider>
            </>
        )
    }
}
export default MainContainer
