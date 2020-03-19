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
        this.setState({
            isConnected: false,
            showLoading: true
        })
        Fetch.getCurrentUser(this.setCurrentUserInfos)
    }

    getLangFile () { return require('../lang/' + this.state.lang + '/container.json') }

    onLangChanged (event) { this.setState({ lang: event.target.value }) }

    setCurrentUserInfos (datas, role) {
        if (datas.success === true) {
            this.setState({
                currentUser: {
                    id: datas.data._id,
                    firstName: datas.data.first_name,
                    lastName: datas.data.last_name,
                    idRole: datas.data.id_role,
                    role: role
                },
                isConnected: true,
                showLoading: false,
                showSnack: true
            })
        } else {
            this.setState({
                isConnected: false,
                showLoading: false
            })
        }
    }

    onLogInClick () {
        console.log('Connexion .. .. ..')
        this.setState({
            isConnected: false,
            showLoading: true
        })
        Fetch.getCurrentUser(this.setCurrentUserInfos)
    }

    onLogOutClick () {
        console.log('Deconnexion .. .. ..')
        Fetch.logOutUser()
        this.setState({
            isConnected: false,
            showSnack: true,
            currentUser: null
        })
    }

    handleCloseSnack () { this.setState({ showSnack: false }) }

    render () {
        const lang = this.state.lang
        const langFile = this.getLangFile()
        let messageSnack = this.state.isConnected ? langFile.logInSnack : langFile.logOutSnack
        messageSnack = this.state.currentUser !== null ? messageSnack.replace('USERNAME', this.state.currentUser.firstName) : messageSnack
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Header lang={lang} handleLangChangedClick={this.onLangChanged} />
                    {this.state.showLoading && <Loading lang={lang} />}
                    <Main lang={lang} onhandleLogInClick={this.onLogInClick} onhandleLogOutClick={this.onLogOutClick} currentUser={this.state.currentUser} />
                    <Footer lang={lang} />
                    <Snack show={this.state.showSnack} duration={5000} message={messageSnack} onClose={this.handleCloseSnack} severity='success' />
                </ThemeProvider>
            </>
        )
    }
}
export default MainContainer
