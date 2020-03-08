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
            <Container className='dashbord' maxWidth='lg'>
                <h1>DashBord</h1>
            </Container>
        )
    }
}
export default Dashbord
