/* eslint-disable no-unmodified-loop-condition */
import React, { Component } from 'react'
import '../styles/_main.scss'
import Header from '../components/header'
import Main from './main'
import Footer from '../components/footer'
import Loading from '../components/loading'
import Snack from '../components/snack'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Fetch from '../utilities/fetch-datas'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'

const variables = require('../utilities/variables').variables

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
    constructor (props) {
        super(props)
        this.state = {
            lang: 'fr',
            isConnected: false,
            showSnack: false,
            showLoading: false
        }
        this.onLangChanged = this.onLangChanged.bind(this)
        this.onLogInClick = this.onLogInClick.bind(this)
        this.onLogOutClick = this.onLogOutClick.bind(this)
        this.handleCloseSnack = this.handleCloseSnack.bind(this)
        this.setCurrentUserInfos = this.setCurrentUserInfos.bind(this)
        this.checkCurrentUser = this.checkCurrentUser.bind(this)
    }

    componentDidMount () {
        this.setState({ showLoading: true })
        const { cookies } = this.props
        const token = cookies.get(variables.cookies.token) || null
        token !== null
            ? Fetch.getCurrentUser(token, this.checkCurrentUser)
            : this.setState({ showLoading: false })

        Fetch.schedules(token, this.schedulesFunc)
    }

    getLangFile () { return require('../lang/' + this.state.lang + '/container.json') }

    onLangChanged (event) { this.setState({ lang: event.target.value }) }

    checkCurrentUser (token, datas, role) {
        const { cookies } = this.props
        if (datas.success === true) {
            const user = {
                id: datas.data._id,
                firstName: datas.data.first_name,
                lastName: datas.data.last_name,
                idRole: datas.data.id_role,
                role: role
            }
            cookies.set(variables.cookies.token, token, { path: '/' })
            cookies.set(variables.cookies.user, Fetch.encodeData(user), { path: '/' })
            this.setState({
                isConnected: true,
                showLoading: false,
                showSnack: true
            })
        } else {
            cookies.remove(variables.cookies.user)
            cookies.remove(variables.cookies.token)
        }
    }

    setCurrentUserInfos (token, datas, role) {
        const { cookies } = this.props
        if (datas.success === true) {
            const user = {
                id: datas.data._id,
                firstName: datas.data.first_name,
                lastName: datas.data.last_name,
                idRole: datas.data.id_role,
                role: role
            }
            cookies.set(variables.cookies.token, token, { path: '/' })
            cookies.set(variables.cookies.user, Fetch.encodeData(user), { path: '/' })
            this.setState({
                currentUser: user,
                isConnected: true,
                showLoading: false,
                showSnack: true
            })
        } else {
            cookies.remove(variables.cookies.user)
            cookies.remove(variables.cookies.token)
            this.setState({
                isConnected: false,
                showLoading: false
            })
        }
    }

    onLogInClick (event, token) {
        console.log('Connexion .. .. ..')
        this.setState({
            isConnected: false,
            showLoading: true
        })
        Fetch.getCurrentUser(token, this.checkCurrentUser)
    }

    onLogOutClick () {
        console.log('Deconnexion .. .. ..')
        Fetch.logOutUser()
        const { cookies } = this.props

        cookies.remove(variables.cookies.user)
        cookies.remove(variables.cookies.token)
        this.setState({
            isConnected: false,
            showSnack: true
        })
    }

    handleCloseSnack () { this.setState({ showSnack: false }) }

    schedulesFunc (usersDatas, classroomSchedulesDatas, days) {
        // console.log(usersDatas)
        // console.log(classroomSchedulesDatas)
        const lastDay = new Date('2020/04/14')
        const dayArray = []
        const childs = []
        classroomSchedulesDatas.map(classRoom => {
            classRoom.id_day.map(day => {
                usersDatas.map(user => {
                    if (user.id_classroom === classRoom.id_classroom) {
                        childs.push(user)
                        days.map(dayff => {
                            if (dayff._id === day) {
                                dayArray.push(dayff)
                            }
                        })
                    }
                })
            })
        })
        const schedule = []
        const dayToIncrement = new Date('2020/04/07')
        const strDayToIncrement = '2020/04/07'
        const differenceInDays = (lastDay.getTime() - dayToIncrement.getTime()) / (1000 * 3600 * 24)
        dayArray.map(day => {
            let increment = 0
            while (increment <= differenceInDays) {
                const today = new Date(strDayToIncrement)
                today.setDate(today.getDate() + increment)
                console.log(today)
                if (today.getDay() === day.value) {
                    const childJson = {
                        id_user: childs[0]._id,
                        id_classroom: childs[0].id_classroom,
                        date: today,
                        is_absent: false
                    }
                    const collabJson = {
                        id_user: childs[0].id_collaborater,
                        id_classroom: childs[0].id_classroom,
                        date: today,
                        is_absent: false
                    }
                    schedule.push(childJson, collabJson)
                }
                increment += 1
            }
        })
        console.log(schedule)
    }

    render () {
        const token = this.props.cookies.get(variables.cookies.token)
        const lang = this.state.lang
        const langFile = this.getLangFile()
        let messageSnack = this.state.isConnected ? langFile.logInSnack : langFile.logOutSnack
        const currentUser = this.props.cookies.get(variables.cookies.user) || null
        messageSnack = currentUser !== null ? messageSnack.replace('USERNAME', Fetch.decodeData(currentUser).firstName) : messageSnack
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Header lang={lang} handleLangChangedClick={this.onLangChanged} />
                    {this.state.showLoading && <Loading lang={lang} />}
                    <Main lang={lang} onhandleLogInClick={this.onLogInClick} onhandleLogOutClick={this.onLogOutClick} />
                    <Footer lang={lang} />
                    <Snack show={this.state.showSnack} duration={5000} message={messageSnack} onClose={this.handleCloseSnack} severity='success' />
                </ThemeProvider>
            </>
        )
    }
}
MainContainer.propTypes = {
    cookies: instanceOf(Cookies).isRequired
}
export default withCookies(MainContainer)
