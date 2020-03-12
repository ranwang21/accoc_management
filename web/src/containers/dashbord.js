import React, { Component } from 'react'
import { Container } from '@material-ui/core'
import Schedule from '../components/calendar'
import SideMenu from '../components/side-menu'
import Table from './table'
import '../styles/_dashbord.scss'

function formatDate (date) {
    const month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return date.getFullYear() + '-' + month + '-' + day
}

const menus = {
    lists: 1,
    validation: 2,
    adminAccount: 3,
    userAccount: 4,
    classRoomMngmnt: 5
}

class Dashbord extends Component {
    constructor () {
        super()
        this.state = {
            date: new Date(),
            menuItemSelected: 1
        }
        this.onhandleDateChange = this.onhandleDateChange.bind(this)
        this.onClickMenu = this.onClickMenu.bind(this)
    }

    componentDidMount () {}

    onhandleDateChange (newDate) {
        console.log(newDate)
        this.setState({
            date: newDate
        })
    }

    onClickMenu (event, index) {
        this.setState({
            menuItemSelected: index
        })
    }

    switchToMenuSelected (lang, userType) {
        let res = (<div className='table' />)
        switch (this.state.menuItemSelected) {
        case menus.lists:
            res = (<Table lang={lang} userType={userType} />)
            break
        case menus.validation:
            break
        case menus.adminAccount:
            break
        case menus.userAccount:
            break
        case menus.classRoomMngmnt:
            break
        }
        return res
    }

    render () {
        // const isConnected = this.props.isConnected
        // const lang = this.props.lang
        const date = formatDate(this.state.date)
        console.log(date)
        const userType = this.props.userType
        const lang = this.props.lang
        return (
            <Container className='dashbord' maxWidth={false}>
                <Schedule lang={lang} date={this.state.date} handleDateChange={this.onhandleDateChange} />
                <SideMenu userType={userType} lang={lang} menuItemSelected={this.state.menuItemSelected} handleClickMenu={this.onClickMenu} />
                {this.switchToMenuSelected(lang, userType)}
            </Container>
        )
    }
}
export default Dashbord
