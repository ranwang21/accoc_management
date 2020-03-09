import React, { Component } from 'react'
import { Container } from '@material-ui/core'
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
                <div className='side-menu'>
                    <h1>Side Menu</h1>
                </div>
                <div className='menu'>
                    <h1>DashBord</h1>
                </div>
            </Container>
        )
    }
}
export default Dashbord
