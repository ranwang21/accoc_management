import React, { Component } from 'react'
import { Container } from '@material-ui/core'
import Schedule from '../components/calendar'
import '../styles/_dashbord.scss'

function formatDate (date) {
    const month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return date.getFullYear() + '-' + month + '-' + day
}

class Dashbord extends Component {
    constructor () {
        super()
        this.state = {
            date: new Date()
        }
        this.onhandleDateChange = this.onhandleDateChange.bind(this)
    }

    componentDidMount () {}

    onhandleDateChange (newDate) {
        console.log(newDate)
        this.setState({
            date: newDate
        })
    }

    render () {
        // const isConnected = this.props.isConnected
        // const lang = this.props.lang
        const date = formatDate(this.state.date)
        console.log(date)
        return (
            <Container className='dashbord' maxWidth={false}>
                <div className='calendar'>
                    <Schedule date={this.state.date} handleDateChange={this.onhandleDateChange} />
                </div>
                <div className='side-menu'>
                    <h1>Side Menu</h1>
                </div>
                <div className='menu'>
                    <h1>Date Selected: {date}</h1>
                </div>
            </Container>
        )
    }
}
export default Dashbord
