import React, { Component } from 'react'
import { Container } from '@material-ui/core'
import SideMenu from '../components/side-menu'
import '../styles/_dashbord.scss'

class Dashbord extends Component {
    constructor () {
        super()
        this.state = {}
    }

    componentDidMount () {}

    render () {
        // const isConnected = this.props.isConnected
        // const lang = this.props.lang
        return (
            <Container className='dashbord' maxWidth={false}>
                <div className='calendar'>
                    <h1>Calendar</h1>
                </div>
                <SideMenu className='side-menu' />
                <div className='menu'>
                    <h1>DashBord</h1>
                </div>
            </Container>
        )
    }
}
export default Dashbord
